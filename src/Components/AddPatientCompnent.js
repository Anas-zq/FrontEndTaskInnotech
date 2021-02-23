import React, { Component } from "react";

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

class MyAddComponent extends Component {
    
      constructor(props) {
        super(props);
        this.state = {
            email: "",
            officialID: 0,
            birthDate: "",
            name: "",
            id: 0,
          };
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeofficialID = this.handleChangeofficialID.bind(this);
        this.handleChangebirthDate = this.handleChangebirthDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeEmail(event) {
        this.setState({ email: event.target.value });
      }
      handleChangeName(event) {
        this.setState({ name: event.target.value });
      }
      handleChangeofficialID(event) {
        this.setState({ officialID: event.target.value });
      }
      handleChangebirthDate(event) {
        this.setState({ birthDate: event.target.value });
      }
    handleSubmit(event ) {
        event.preventDefault();
    
        const data = {
          name: this.state.name,
          email: this.state.email,
          officialID: Number(this.state.officialID),
          dateOfBirth: this.state.birthDate

        }
    
    
        axios.post('https://localhost:44390/api/Patient/AddPatient', data)
          .then(response => { this.props.onHide(); })
          .catch(error => {
            console.error(error);
            console.error(error.message);
            if (error.message.includes("code 500")) alert("Column Official ID is unique ");
            if (error.message.includes("code 400")) alert("There are column Null ");
          });
    
      }
  
    render() {

        return (
            <div>
                <Modal size="lg" show={this.props.show} onHide={this.props.onHide}>

                    <Modal.Header closeButton>
                        <Modal.Title>
                            Add Patient
                        </Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.handleSubmit}>
                        <Modal.Body className="show-grid">

                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text"  value={this.state.name}
                  onChange={this.handleChangeName} placeholder="Enter Name" />
                            </Form.Group>

                            <Form.Group controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email"  value={this.state.email}
                  onChange={this.handleChangeEmail} placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group controlId="officialID">
                                <Form.Label>Official ID</Form.Label>
                                <Form.Control type="number"  value={this.state.officialID}
                onChange={this.handleChangeofficialID} placeholder="Enter Official ID" />
                            </Form.Group>

                            <Form.Group controlId="dateOfBirth">
                                <Form.Label>Date Of Birth</Form.Label>
                                <Form.Control type="date"  value={this.state.birthDate}
                onChange={this.handleChangebirthDate} />
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

export default MyAddComponent;