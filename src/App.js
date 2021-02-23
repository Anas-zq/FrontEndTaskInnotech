import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as ReactBootstrap from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import ModalDialog from 'react-bootstrap/ModalDialog';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Form from 'react-bootstrap/Form';
import { Patient } from './Patient';
import MyModalComponent from './Components/UpdatePatientComponent';
import MyReportComponent from './Components/ReportComponent';
import MyDeleteComponent from './Components/DeleteComponent';
import MyAddComponent from './Components/AddPatientCompnent';
import MyAddPatientRecordComponent from './PatientRecordComponent/AddPatientRecordModel';
import MyDeletePatientRecordComponent from './PatientRecordComponent/DeletePatientRecord';
import UpdatePatientRecordComponent from'./PatientRecordComponent/UpdatePatientRecordModel';

function ModelPatientRecord(props) {
  const [patientRecords, setPatientRecords] = useState([]);
  const [AddmodalShow, setAddmodalShow] = useState(false);
  const [patients, setPatients] = useState([]);
  const [UpdatemodalShow, setUpdatemodalShow] = useState(false);
  const [DeletemodalShow, setDeletemodalShow] = useState(false);
  const [deleteID, setDeleteID] = useState([]);
  const [patientRecord, setPatientRecord] = useState([]);



  const getPatientData = async () => {
    try {
      const data = await axios.get(
        "https://localhost:44390/api/Patient/GetAllPatientWithoutRecord"
      );
      setPatients(data.data);
    }
    catch (e) {
      console.log(e);
    }
  };

  const getPatientRecordData = async () => {
    try {
      const data = await axios.get(
        "https://localhost:44390/api/PatientRecord/GetAllPatientRecord"
      );
      setPatientRecords(data.data);
    }
    catch (e) {
      console.log(e);
    }
  };
  if (patientRecords.length == 0)
  getPatientRecordData();
  const columns = [
    { dataField: "id", text: "#" },
    { dataField: "diseaseName", text: "Disease Name" },
    { dataField: "amountBill", text: "Amount Bill" },
    { dataField: "timeEntry", text: "Time Entry" },
    { dataField: "patient.name", text: "Patient Name" },
    {
      dataField: "update",
      text: "Update",
      formatter: (cellContent, row) => {
        return (
          <Container fluid>
            <Row>

              <Col md={12}>
                <Row className="justify-content-center">

                  <Button type="button" id="update" className="btn btn-primary btn-xs" onClick={() => {
                      getPatientData();
                    fetch("https://localhost:44390/api/PatientRecord/GetPatientRecordById/" + row.id)
                      .then((res) => res.json())
                      .then((data) => {
                      
                        setPatientRecord(data);
                      });
                    setUpdatemodalShow(true);
                  }}
                                    >Update</Button>
                </Row>
              </Col>
            </Row>
          </Container>
        )

        return null
      },
    },
    {
      dataField: "delete",
      text: "Delete",
      formatter: (cellContent, row) => {
        return (
          <Container fluid>
            <Row>

              <Col md={12}>
                <Row className="justify-content-center">

                  <Button type="button" id="delete" className="btn btn-danger btn-xs"  onClick={() => {
                    setDeleteID(row.id);
                    setDeletemodalShow(true);
                  }}
                  >Delete</Button>
                </Row>
              </Col>
            </Row>
          </Container>


        )

        return null
      },
    },
  ];

  return (
    <Modal size="xl"
      {...props} aria-labelledby="contained-modal-title-vcenter-Record">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter-Record">
           Patient Records
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="show-grid">
        <div >
          <div >
            <Container>

              <Row >

                <Col>
                  <Row className="justify-content-end">
                    <Button className="marginButtomClasspx" variant="info" onClick={() => {
                      getPatientData();
                      setAddmodalShow(true);}}>Add New Patient Record</Button>
                  </Row>
                </Col>
              </Row>


              <Row>
                <BootstrapTable
                  keyField="id"
                  columns={columns}
                  data={patientRecords}
                  pagination={paginationFactory()}


                />
              </Row>
            </Container>


          </div>
          <UpdatePatientRecordComponent
            show={UpdatemodalShow}
            data={{patientRecord:patientRecord,patients:patients}}
            setPatientRecord={setPatientRecord}
            setPatients={setPatients}
            onHide={() => {
              getPatientRecordData();
              setUpdatemodalShow(false);
            }} />
          <MyAddPatientRecordComponent
            show={AddmodalShow}
            data={patients}
            onHide={() => {
              getPatientRecordData();
              setAddmodalShow(false);
            }} />
          <MyDeletePatientRecordComponent
            show={DeletemodalShow}
            data={deleteID}
            onHide={() => {
              getPatientRecordData();
              setDeletemodalShow(false);
            }} />
        </div>



      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>Close</Button>
      </Modal.Footer>

    </Modal>
  );
}

const App = () => {
  const [patients, setPatients] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [UpdatemodalShow, setUpdatemodalShow] = useState(false);
  const [ReportmodalShow, setReportmodalShow] = useState(false);
  const [DeletemodalShow, setDeletemodalShow] = useState(false);
  const [AddmodalShow, setAddmodalShow] = useState(false);
  const [patient, setPatient] = useState([]);
  const [report, setReport] = useState([]);
  const [deleteID, setDeleteID] = useState([]);
  const [PatientRecordmodalShow, setPatientRecordmodalShow] = useState(false);
  const getPatientData = async () => {
    try {
      const data = await axios.get(
        "https://localhost:44390/api/Patient/GetAllPatientWithTimeEntry"
      );
      setPatients(data.data);
    }
    catch (e) {
      console.log(e);
    }
  };
  

  const columns = [
    { dataField: "id", text: "#" },
    { dataField: "name", text: "Patient Name" },
    { dataField: "dateOfBirth", text: "Date Of Birth" },
    { dataField: "timeEntry", text: "Time Entry" },
    {
      dataField: "update",
      text: "Update",
      formatter: (cellContent, row) => {
        return (
          <Container fluid>
            <Row>

              <Col md={12}>
                <Row className="justify-content-center">

                  <Button type="button" id="update" className="btn btn-primary btn-xs" onClick={() => {
                    fetch("https://localhost:44390/api/Patient/GetPatientById/" + row.id)
                      .then((res) => res.json())
                      .then((data) => {
                        setPatient(data);
                      });
                    setUpdatemodalShow(true);
                  }}

                  >Update</Button>
                </Row>
              </Col>
            </Row>
          </Container>
        )

        return null
      },
    }, {
      dataField: "report",
      text: "Report",
      formatter: (cellContent, row) => {
        return (
          <Container fluid>
            <Row>

              <Col md={12}>
                <Row className="justify-content-center">

                  <Button type="button" className="btn btn-success btn-xs" onClick={() => {
                    fetch("https://localhost:44390/api/Patient/GetPatientReportById/" + row.id)
                      .then((res) => res.json())
                      .then((data) => {
                        setReport(data);
                      });
                    setReportmodalShow(true);
                  }}
                  >Report</Button>
                </Row>
              </Col>
            </Row>
          </Container>


        )

        return null
      },
    },
    {
      dataField: "delete",
      text: "Delete",
      formatter: (cellContent, row) => {
        return (
          <Container fluid>
            <Row>

              <Col md={12}>
                <Row className="justify-content-center">

                  <Button type="button" id="delete" className="btn btn-danger btn-xs" onClick={() => {
                    setDeleteID(row.id);
                    setDeletemodalShow(true);
                  }}
                  >Delete</Button>
                </Row>
              </Col>
            </Row>
          </Container>


        )

        return null
      },
    },
  ];




  useEffect(() => {
    getPatientData();
  }, []);


  return (
    <div >
      <div className="tableDiv">
        <Container>

          <Row>
            <Col md={4}><h2 className="hPatient">Patients</h2></Col>
            <Col md={4}></Col>
            <Col md={4}>
              <Row className="justify-content-end">
                <Col md={7}>
                  <Row className="justify-content-end">
                    <Button onClick={() => setAddmodalShow(true)} variant="info" onClick={() => {
                    
                        setPatientRecordmodalShow(true);
                    }}> Show Patient Records</Button>
                  </Row>
                </Col>
                <Col xs={5}>
                  <Row className="justify-content-end">
                    <Button onClick={() => setAddmodalShow(true)} variant="info">Add New Patient</Button>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <BootstrapTable
              keyField="name"
              columns={columns}
              data={patients}
              pagination={paginationFactory()}
      


            />
          </Row>
        </Container>


      </div>
      <MyModalComponent
        show={UpdatemodalShow}
        data={patient}
        setPatient={setPatient}
        onHide={() => {
          getPatientData();
          setUpdatemodalShow(false);
        }} />
      <MyReportComponent
        show={ReportmodalShow}
        data={report}
        onHide={() => {
          setReportmodalShow(false);
        }} />
      <MyDeleteComponent
        show={DeletemodalShow}
        data={deleteID}
        onHide={() => {
          getPatientData();
          setDeletemodalShow(false);
        }} />
      <MyAddComponent
        show={AddmodalShow}

        onHide={() => {
          getPatientData();
          setAddmodalShow(false);
        }} />
        <ModelPatientRecord  backdrop="static" keyboard={false} show={PatientRecordmodalShow} onHide={() => {
             
             setPatientRecordmodalShow(false);
            }} />
    </div>

  );
}

export default App;
