import React, { Component } from "react";
import './patientRecord.css'

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

class UpdatePatientRecordComponent extends Component {
 
    componentDidUpdate(){
        this.getIndex();
    }

    constructor(props) {
        super(props);
        this.indexRecord = 0 ;
        this.handleChangediseaseName = this.handleChangediseaseName.bind(this);
        this.handleChangedescription = this.handleChangedescription.bind(this);
        this.handleChangepatientID = this.handleChangepatientID.bind(this);
        this.handleChangetimeEntry = this.handleChangetimeEntry.bind(this);
        this.handleChangeamountBill = this.handleChangeamountBill.bind(this);
        this.getIndex = this.getIndex.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangediseaseName(event) {
        this.props.setPatientRecord({ ...this.props.data.patientRecord, diseaseName: event.target.value })
    }
    handleChangedescription(event) {
        this.props.setPatientRecord({ ...this.props.data.patientRecord, description: event.target.value })
    }
    handleChangepatientID(event) {
        console.log(event.target.value);
        this.props.setPatientRecord({ ...this.props.data.patientRecord, patientID: this.props.data.patients[event.target.value].id })
    }
    handleChangetimeEntry(event) {
        this.props.setPatientRecord({ ...this.props.data.patientRecord, timeEntry: event.target.value })
    }
    handleChangeamountBill(event) {
        this.props.setPatientRecord({ ...this.props.data.patientRecord, amountBill: event.target.value })
    }
    getIndex() {
        for (let index = 0; index < this.props.data.patients.length; index++) {
            const element = this.props.data.patients[index];
            if(element.id == this.props.data.patientRecord.patient.id)
              this.indexRecord = index;
        }
        
    }
    handleSubmit(event) {
        event.preventDefault();

        const data = {
            diseaseName: this.props.data.patientRecord.diseaseName,
            description: this.props.data.patientRecord.description,
            timeEntry: this.props.data.patientRecord.timeEntry,
            amountBill: Number(this.props.data.patientRecord.amountBill),
            patientID: Number(this.props.data.patientRecord.patientID),
            id: this.props.data.patientRecord.id
        }


        axios.put('https://localhost:44390/api/PatientRecord/UpdatePatientRecord', data)
            .then(response => { this.props.onHide(); })
            .catch(error => {
                console.error(error);
                console.error(error.message);
                if (error.message.includes("code 400")) alert("There are column Null ");
            });

    }

    render() {

        return (
            <div>
                <Modal size="lg" show={this.props.show} onHide={this.props.onHide}>

                    <Modal.Header closeButton>
                        <Modal.Title>
                            Update Patient Record 
                        </Modal.Title>
                    </Modal.Header>

                    <Form onSubmit={this.handleSubmit}>
                        <Modal.Body className="show-grid">



                            <Form.Group controlId="diseaseName">
                                <Form.Label>Disease Name</Form.Label>
                                <Form.Control type="text" value={this.props.data.patientRecord.diseaseName}
                                    onChange={this.handleChangediseaseName} placeholder="Enter Disease Name" />
                            </Form.Group>


                            <Form.Group controlId="description">
                                <Form.Label>Discreption</Form.Label>
                                <Form.Control type="text" value={this.props.data.patientRecord.description}
                                    onChange={this.handleChangedescription} placeholder="Enter Discreption" />
                            </Form.Group>

                            <Form.Group controlId="amountBill">
                                <Form.Label>Bills Amount : </Form.Label>
                                <Form.Control type="number" value={this.props.data.patientRecord.amountBill}
                                    onChange={this.handleChangeamountBill} placeholder="Enter Bill" />
                            </Form.Group>

                            <Form.Group controlId="timeEntry">
                                <Form.Label>Time Entry</Form.Label>
                                <Form.Control type="datetime-local" value={this.props.data.patientRecord.timeEntry}
                                    onChange={this.handleChangetimeEntry} />
                            </Form.Group>
                            <Form.Group controlId="patients">
                                <Form.Label>Patients</Form.Label>
                                <Row className="selectRow">
                                    <select className="selectSize" value={this.indexRecord}  onChange={this.handleChangepatientID} >
                                        {this.props.data.patients.map((option, index) =>
                                            <option key={index} value={index}>
                                                {option.name}
                                            </option>)}
                                    </select>
                                </Row>
                            </Form.Group>


                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" type="submit">Update</Button>
                            <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                        </Modal.Footer>
                    </Form>

                </Modal>
            </div>
        )
    };
}

export default UpdatePatientRecordComponent;