import React from "react";
import {Container, Row, Col} from "react-bootstrap";

import HomePageCard from "../components/home/HomePageCard";
import deanwood_img from "../images/wymar.jpg";
import detroit_img from "../images/detroit.png";

const city_data = [
    {
        img: deanwood_img,
        title: "DEANWOOD, D.C.",
        text: "Explore the rise and fall of a self-sustaining neighborhood right in the US" +
            " capital.",
        resources: ["overview", "housing", "transport", "food", "community", "health", "future"],
        class: ""
    },
    {
        img: detroit_img,
        title: "DETROIT, MI",
        text: "Research to come",
        resources: ["overview", "housing", "community", "health"],
        class: "disabled"
    },
    {
        img: deanwood_img,
        title: "MEMPHIS, TN",
        text: "Research to come",
        resources: ["overview", "housing", "community", "health"],
        class: "disabled"
    }
    // {
    //     img: dh_logo,
    //     title: "Sampleville",
    //     text: "More coming soon?",
    //     resources: ["oral_history", "timeline"]
    // }
];

export default class Home extends React.Component {
    render() {
        return <>
            <Container>
                <Row xs={1} md={2} className='justify-content-around'>
                    <Col md={4} className={"city-heading"}>
                        <h1>Self-Sufficient Cities</h1>
                        <p>
                            The project tells the rise and fall of urban communities that grew their
                            own food in the 20th century United States. Taking the Deanwood
                            neighborhood in Washington, D.C. as their starting place, students
                            consulted newspaper articles and census data to design an interactive
                            site.
                        </p>
                    </Col>
                    <Col>
                        <Row xs={1} md={2}>
                            {city_data.map((data, idx) => {
                                return (
                                    <HomePageCard
                                        extra_class={data.class}
                                        img_source={data.img}
                                        title={data.title}
                                        text={data.text}
                                        resources={data.resources}
                                        key={idx}
                                    />
                                );
                            })}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>;
    }

};

