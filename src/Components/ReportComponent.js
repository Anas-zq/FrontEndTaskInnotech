import React, { Component } from "react";
import './ReportCss.css';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as ReactBootstrap from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalDialog from 'react-bootstrap/ModalDialog';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

class MyReportComponent extends Component {


    componentDidUpdate() {

 

    }
    constructor(props) {
        super(props);

    }

    render() {

        return (
            <div>
                <Modal size="lg" show={this.props.show} onHide={this.props.onHide}>

                    <Modal.Header closeButton>
                        <Modal.Title>
                            Report For Patient {this.props.data.name}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="show-grid">

                        <Container fluid>
                            <Row className="marginButtomClass">
                                <Col xs={6} md={3}>
                                    <h5> Name Of Patient :  </h5>
                                </Col>
                                <Col xs={6} md={3}>
                                    <h5 className="colorValue"> {this.props.data.name}</h5>
                                </Col>
                                <Col xs={6} md={3}>
                                    <h5> Age :  </h5>
                                </Col>
                                <Col xs={6} md={3}>
                                    <h5 className="colorValue"> {this.props.data.age}</h5>
                                </Col>
                            </Row>
                            <Row className="marginButtomClass">
                                <Col xs={6} md={3}>
                                    <h5> Avg Of Bills :  </h5>
                                </Col>
                                <Col xs={6} md={3}>
                                    <h5 className="colorValue"> {this.props.data.avgOfBill}</h5>
                                </Col>
                                <Col xs={6} md={5}>
                                    <h5>  Avg Of Bills Removing Outliers :  </h5>
                                </Col>
                                <Col xs={6} md={1}>
                                    <h5 className="colorValue"> {this.props.data.avgOfBillRemovingOutliers}</h5>
                                </Col>
                            </Row>
                            <Row className="marginButtomClass">
                                <Col xs={6} md={8}>
                                    <h5> The Month That Contains Highest Number Of Visits:  </h5>
                                </Col>
                                <Col xs={6} md={4}>
                                    <h5 className="colorValue"> {this.props.data.monthHighVisit}</h5>
                                </Col>

                            </Row>
                            <Row>
                                <Col xs={12} md={12}>
                                    {(() => {
                                        if (this.props.data.fifthRecordExist ) {
                                            return <Row className="marginButtomClass backStyle" >
                                                <Col md={{ span: 6, offset: 4 }}>
                                                    <h4  > Fifth Patient Record  </h4>
                                                </Col>

                                            </Row>
                                        }
                                    })()}
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} md={12}>
                                    {(() => {
                                        if (this.props.data.fifthRecordExist ) {
                                            return <Row className="marginButtomClass">
                                                <Col xs={6} md={3}>
                                                    <h5> Disease Name  :</h5>
                                                </Col>
                                                <Col xs={6} md={3}>
                                                    <h5 className="colorValue"> {this.props.data.fifthPatientRecord.diseaseName}</h5>
                                                </Col>

                                                <Col xs={6} md={3}>
                                                    <h5> Amount Bill  :</h5>
                                                </Col>
                                                <Col xs={6} md={3}>
                                                    <h5 className="colorValue"> {this.props.data.fifthPatientRecord.amountBill} </h5>
                                                </Col>
                                            </Row>
                                        }
                                    })()}
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} md={12}>
                                    {(() => {
                                        if (this.props.data.fifthRecordExist ) {
                                            return <Row className="marginButtomClass">
                                                <Col xs={6} md={3}>
                                                    <h5> Time Entry  :</h5>
                                                </Col>
                                                <Col xs={6} md={9}>
                                                    <h5 className="colorValue">{this.props.data.fifthPatientRecord.timeEntry&&this.props.data.fifthPatientRecord.timeEntry.split("T")[0]} </h5>
                                                </Col>
                                            </Row>
                                        }
                                    })()}
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} md={12}>
                                    {(() => {
                                        if (this.props.data.showArray) {
                                            return <Row className="marginButtomClass backStyle" >
                                                <Col md={{ span: 12, offset: 2 }}>
                                                    <h4 > List Of Other Patients With Similar Diseases </h4>
                                                </Col>

                                            </Row>
                                        }
                                    })()}
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} md={12}>
                                    {(() => {
                                        if (this.props.data.showArray) {
                                            return <Row className="marginButtomClass">
                                                <BootstrapTable
                                                    keyField="id"
                                                    data={this.props.data.listOfPatientWithSameTwoDisease}
                                                    columns={this.props.data.columns}
                                                />
                                            </Row>
                                        }
                                    })()}
                                </Col>
                            </Row>

                        </Container>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => {
                          
                            
                            this.props.onHide();
                        }
                        }>Close</Button>
                    </Modal.Footer>

                </Modal>
            </div>
        )
    };
}

export default MyReportComponent;