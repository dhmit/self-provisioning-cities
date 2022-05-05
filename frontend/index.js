import React from "react";
import ReactDOM from "react-dom";
import "./scss/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Base from "./components/global/Base";
import ErrorNotFoundComponent from "./components/global/ErrorNotFoundComponent";
import ExampleId from "./components/ExampleId";
import Home from "./pages/Home";
import MapConsolidated from "./components/maps/MapConsolidated";
import {Timeline} from "./pages/Timeline";
import MapLegend from "./components/maps/MapLegend";
import MapMicro from "./components/maps/MapMicro";
import MapMacro from "./components/maps/MapMacro";
import TimelineTest from "./components/timeline/TimelineTest";
import API from "./pages/API";
import CensusCharts from "./components/charts/CensusCharts";

// DEANWOOD COMPONENTS
import DeanwoodOverview from "./pages/deanwood/DeanwoodOverview";
import DeanwoodHealth from "./pages/deanwood/Health";
import DeanwoodTransport from "./pages/deanwood/DeanwoodTransport";
import DeanwoodFood from "./pages/deanwood/DeanwoodFood";
import DeanwoodCommunity from "./pages/deanwood/DeanwoodCommunity";
import DeanwoodHousing from "./pages/deanwood/DeanwoodHousing";
import FutureWorkOverview from "./pages/future/FutureWorkOverview";

const COMPONENT_PROPS_RAW = document.getElementById("component_props").text;
const COMPONENT_NAME_RAW = document.getElementById("component_name").text;
const COMPONENT_PROPS = JSON.parse(COMPONENT_PROPS_RAW);
const COMPONENT_NAME = JSON.parse(COMPONENT_NAME_RAW);

const COMPONENTS = {
    ErrorNotFoundComponent,
    ExampleId,
    Home,
    Timeline,
    MapMicro,
    MapLegend,
    MapMacro,
    TimelineTest,
    API,
    MapConsolidated,
    CensusCharts,
    DeanwoodTransport,
    DeanwoodFood,
    DeanwoodOverview,
    DeanwoodHousing,
    DeanwoodHealth,
    DeanwoodCommunity,
    FutureWorkOverview
};

const PreselectedComponent = COMPONENTS[COMPONENT_NAME || "ErrorNotFoundComponent"];

ReactDOM.render(
    <Base>
        <PreselectedComponent {...COMPONENT_PROPS} />
    </Base>,
    document.getElementById("app_root")
);
