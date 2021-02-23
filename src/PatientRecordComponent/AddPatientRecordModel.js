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
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';



class MyAddPatientRecordComponent extends Component {
 
  constructor(props) {
    super(props);
    this.patinet={};
    this.state = {
      diseaseName: "",
      description: "",
      timeEntry: "",
      amountBill: "",
      patientID:"",
      id: 0
    };
    
    this.handleChangediseaseName = this.handleChangediseaseName.bind(this);
    this.handleChangedescription = this.handleChangedescription.bind(this);
    this.handleChangepatientID = this.handleChangepatientID.bind(this);
    this.handleChangetimeEntry = this.handleChangetimeEntry.bind(this);
    this.handleChangeamountBill = this.handleChangeamountBill.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChangediseaseName(event) {
    this.setState({ diseaseName: event.target.value });
  }
  handleChangedescription(event) {
    this.setState({ description: event.target.value });
  }
  handleChangepatientID(event) {
    this.setState({ patientID: this.props.data[event.target.value].id });
  }
  handleChangetimeEntry(event) {
    this.setState({ timeEntry: event.target.value });
  }
  handleChangeamountBill(event) {
    this.setState({ amountBill: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();

    const data = {
      diseaseName: this.state.diseaseName,
      description: this.state.description,
      timeEntry: this.state.timeEntry,
      amountBill: Number(this.state.amountBill),
      patientID: Number(this.state.patientID),
      id: 0

    }


    axios.post('https://localhost:44390/api/PatientRecord/AddPatientRecord', data)
      .then(response => { this.props.onHide(); })
      .catch(error => {
        console.error(error);
        console.error(error.message);
        if (error.message != null) alert("There are column Null ");
      });

  }

  render() {

    return (
      <div>
        <Modal size="lg" show={this.props.show} onHide={this.props.onHide}>

          <Modal.Header closeButton>
            <Modal.Title>
              Add Patient Record
                        </Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.handleSubmit}>
            <Modal.Body className="show-grid">



              <Form.Group controlId="diseaseName">
                <Form.Label>Disease Name</Form.Label>
                <Form.Control type="text" value={this.state.diseaseName}
                  onChange={this.handleChangediseaseName} placeholder="Enter Disease Name" />
              </Form.Group>


              <Form.Group controlId="description">
                <Form.Label>Discreption</Form.Label>
                <Form.Control type="text" value={this.state.description}
                  onChange={this.handleChangedescription} placeholder="Enter Discreption" />
              </Form.Group>

              <Form.Group controlId="amountBill">
                <Form.Label>Bills Amount : </Form.Label>
                <Form.Control type="number" value={this.state.amountBill}
                  onChange={this.handleChangeamountBill} placeholder="Enter Bill" />
              </Form.Group>

              <Form.Group controlId="timeEntry">
                <Form.Label>Time Entry</Form.Label>
                <Form.Control type="datetime-local" value={this.state.timeEntry}
                  onChange={this.handleChangetimeEntry} />
              </Form.Group>
              <Form.Group controlId="patients">
              <Form.Label>Patients</Form.Label>
              <Row className="selectRow">
                <select  className="selectSize" onChange={this.handleChangepatientID} >
                  {this.props.data.map((option, index) =>
                    <option key={index} value={index}>
                      {option.name}
                    </option>)}
                </select>
                </Row>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" type="submit">Add</Button>
              <Button variant="danger" onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Form>

        </Modal>
      </div>
    )
  };
}

export default MyAddPatientRecordComponent;