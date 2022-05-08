import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import * as PropTypes from "prop-types";
import DeanwoodNav from "./DeanwoodNav";
import interstate_highway from "../../images/deanwood/interstate-highway.jpeg";
import i295 from "../../images/deanwood/I295deanwoodkenilworth.png";
import DeanwoodHighwayCard from "../../components/transport/DeanwoodHighwayCard";
import DeanwoodI295Card from "../../components/transport/DeanwoodI295Card";
import Citation from "../../components/global/Citation";

export const DeanwoodTransport = ({resources}) => {

    return (
        <Container className="city" id="deanwood-transport">
            <Row>
                <Col lg={3} className="nav-col p-0 mr-2">
                    <h1>Deanwood, D.C.</h1>
                    <p>
                        The project tells the rise and fall of urban communities that grew their
                        own food in the 20th century United States. Taking the Deanwood
                        neighborhood in Washington, D.C. as their starting place, students
                        consulted newspaper articles and census data to design an interactive
                        site.
                    </p>
                    <DeanwoodNav selected={"transport"} resources={resources}/>
                </Col>

                <Col lg={4}/>
                <Col lg={8} className="column">
                    <DeanwoodHighwayCard
                        img_source={interstate_highway}
                    />
                </Col>
                <Col lg={4}/>
                <Col lg={8} className="column">
                    <DeanwoodI295Card
                        img_source={i295}
                    />
                </Col>
                <Col lg={4}/>
                <Col lg={8} className="justify-content-around mt-5">
                    <h2>Sources</h2>
                    <Citation identifier={"source-1"}
                              title={"Dwight D. Eisenhower Presidential Library - " +
                              "An excerpt from President Eisenhower’s Message to Congress " +
                              "regarding highways, February 22, 1955"}/>
                </Col>
            </Row>
        </Container>);

};

DeanwoodTransport.propTypes = {
    resources: PropTypes.array
};


export default DeanwoodTransport;
