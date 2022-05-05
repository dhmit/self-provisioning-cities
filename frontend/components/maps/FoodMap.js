import React from "react";
// import PropTypes from "prop-types";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import * as L from "leaflet";
import Legend from "./Legend";
import {TimeControl} from "./MapMicro";


const LeafIcon = L.Icon.extend({
    options: {}
});

const blueIcon = new LeafIcon({
        iconUrl:
            "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF"
    }),
    greenIcon = new LeafIcon({
        iconUrl:
            "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF"
    }),
    yellowIcon = new LeafIcon({
        iconUrl:
            "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=•|ffc800&chf=a,s,ee00FFFF"
    }),
    redIcon = new LeafIcon({
        iconUrl:
            "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|e85141&chf=a,s,ee00FFFF"
    }),
    purpleIcon = new LeafIcon({
        iconUrl:
            "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|a134eb&chf=a,s,ee00FFFF"
    });

function setMarkerColor(type) {
    if (!type) {
        return blueIcon;
    } else if (type === "grocery") {
        return purpleIcon;
    } else if (type === "convenience") {
        return greenIcon;
    } else if (type === "restaurant") {
        return yellowIcon;
    } else if (type === "liquor") {
        return redIcon;
    }
}

const MAIN_LOCATION = {
    coordinates: [38.9022, -76.9306637],
    name: "Deanwood neighborhood's food map",
    date: "Test date",
    info: "Test info"
};

function timeSlider(
    sliderName, currentRange, defaultRange, lastValid,
    sliderChangeFunc, inputChangeFunc, sliderBlurFunc
) {
    const [minValue, maxValue] = defaultRange;
    return (
        <div key={sliderName}>
            <Typography id="range-slider" gutterBottom>
                {sliderName}
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    {sliderInput(
                        currentRange[0],
                        "lower",
                        defaultRange,
                        inputChangeFunc,
                        sliderBlurFunc
                    )}
                </Grid>
                <Grid item xs>
                    <Slider
                        value={typeof lastValid === "object" ? lastValid : defaultRange}
                        onChange={(e, v) => sliderChangeFunc(e, v)}
                        min={minValue}
                        max={maxValue}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                    />
                </Grid>
                <Grid item>
                    {sliderInput(
                        currentRange[1],
                        "upper",
                        defaultRange,
                        inputChangeFunc,
                        sliderBlurFunc
                    )}
                </Grid>
            </Grid>
        </div>
    );
}

function sliderInput(value, bound, defaultRange, inputChangeFunc, sliderBlurFunc) {
    const [minValue, maxValue] = defaultRange;

    return (
        <Input
            value={value}
            margin="dense"
            onChange={e => inputChangeFunc(e, bound)}
            onBlur={() => sliderBlurFunc()}
            inputProps={{
                "step": 1,
                "min": minValue,
                "max": maxValue,
                "type": "number",
                "aria-labelledby": "input-slider"
            }}
        />
    );
}

export default class FoodMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mainLocation: MAIN_LOCATION,
            markerData: [],
            sliderState: [1900, 2022],
            timeRange: [1900, 2022],
            lastValid: [1900, 2022],
            names: ["Australia", "Canada", "USA", "Poland", "Spain", "France"]
        };
    }

    componentDidMount() {
        fetch("/api/get_food_addresses/")
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({
                    markerData: [...this.state.markerData, ...data["address_data"]]
                });
            });
    };


    setSliderValue = (newLowerBound, newUpperBound) => {
        this.setState({
            sliderState: [newLowerBound, newUpperBound],
            lastValid: [newLowerBound, newUpperBound]
        });
    }

    handleSliderChange = (event, value) => {
        const [newLowerBound, newUpperBound] = value;
        this.setSliderValue(newLowerBound, newUpperBound);
    }

    handleSliderInputChange = (event, bound) => {
        const [currentLowerValue, currentUpperValue] = this.state.sliderState;
        const [minValue, maxValue] = this.state.timeRange;
        let newSliderState = this.state.sliderState;
        let newValidState = [...this.state.lastValid];
        const isLower = (bound === "lower");
        const isUpper = (bound === "upper");

        if (event.target.value === "") {
            this.setState({
                sliderState: [isLower ? "" : currentLowerValue, isUpper ? "" : currentUpperValue],
                lastValid: newValidState
            });
            return;
        }

        const newValue = Number(event.target.value);
        // Only valid bound inputs will affect the slider by changing the newValidState
        if (isLower) {
            if (newValue <= currentUpperValue && newValue >= minValue) {
                newValidState = [newValue, currentUpperValue];
            }
            newSliderState = [newValue, currentUpperValue];

        } else if (isUpper) {
            if (newValue >= currentLowerValue && newValue <= maxValue) {
                newValidState = [currentLowerValue, newValue];
            }
            newSliderState = [currentLowerValue, newValue];
        }

        this.setState({
            sliderState: newSliderState,
            lastValid: newValidState
        });
    };

    handleSliderBlur = () => {
        // Used when slider changed by dragging after changing inputs
        // Needed if inputs are not bounded by the slider" maximum and minimum values
        const [currentLowerValue, currentUpperValue] = this.state.sliderState;
        const [minValue, maxValue] = this.state.timeRange;
        const [lastLowerValid, lastUpperValid] = this.state.lastValid;
        if (currentLowerValue < minValue || currentLowerValue > lastUpperValid) {
            this.setSliderValue(lastLowerValid, currentUpperValue);
        } else if (currentUpperValue > maxValue || currentUpperValue < lastLowerValid) {
            this.setSliderValue(currentLowerValue, lastUpperValid);
        }
    };

    render() {
        const validAddresses = this.state.markerData.filter((location) => (
            location.type && (location.coordinates && location.coordinates.length === 2 &&
                location.openyear && location.closeyear &&
                (location.openyear <= this.state.lastValid[1] &&
                    location.openyear >= this.state.lastValid[0]) ||
                (location.closeyear <= this.state.lastValid[1] &&
                    location.closeyear >= this.state.lastValid[0])
            )
        ));

        const markerObjects = validAddresses.map((location, i) => (
            <Marker key={i} position={location.coordinates} icon={setMarkerColor(location.type)}>
                <Popup>
                    {location.address}
                </Popup>
            </Marker>
        ));

        return (<>
            <h1>{this.state.mainLocation.name}</h1>
            <div className="main-element">
                <div id="map" className="pb-5">
                    <MapContainer
                        center={this.state.mainLocation.coordinates} zoom={14}
                        scrollWheelZoom={true}
                    >
                        <TileLayer
                            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                            url="http://stamen-tiles-a.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png"
                        />
                        {markerObjects}
                        <Legend options={[
                            ["#a134eb", "Grocery"],
                            ["#2ecc71", "Convenience"],
                            ["#ffc800", "Restaurant"],
                            ["#e85141", "Liquor"]
                        ]}/>
                    </MapContainer>
                    {timeSlider(
                        "Select a Time Range Below",
                        this.state.sliderState,
                        this.state.timeRange,
                        this.state.lastValid,
                        this.handleSliderChange,
                        this.handleSliderInputChange,
                        this.handleSliderBlur
                    )}
                    <TimeControl
                        sliderState={this.state.sliderState} change={this.setSliderValue}
                        defaultTime={this.state.timeRange}>
                    </TimeControl>
                </div>
            </div>
        </>);
    }
}
