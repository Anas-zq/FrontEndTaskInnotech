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

class MyDeleteComponent extends Component {


    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }
   
    handleDelete (event ) {
        event.preventDefault();
       axios.delete('https://localhost:44390/api/Patient/DeletePatientById/' + this.props.data)
       .then(response => { this.props.onHide() })
    }
    render() {

        return (
            <div>
                <Modal centered  show={this.props.show} onHide={this.props.onHide}>

                    <Modal.Header closeButton>
                        <Modal.Title>
                            Delete Patient
                        </Modal.Title>
                    </Modal.Header>

                        <Modal.Body className="show-grid">

                            Are you sure you want to delete this patient ?
                        </Modal.Body>
                        <Modal.Footer>
                            
                            <Button variant="success" onClick={this.handleDelete}>Confirm</Button>
                            <Button variant="danger" onClick={this.props.onHide}>Cancel</Button>
                        </Modal.Footer>
                

                </Modal>
            </div>
        )
    };
}

export default MyDeleteComponent;