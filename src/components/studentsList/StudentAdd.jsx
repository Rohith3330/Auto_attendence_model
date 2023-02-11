import React from "react";
import { useState } from "react";
// import Popup from 'reactjs-popup';
import axios, * as others from 'axios';
import "bootstrap/dist/css/bootstrap.css";
import { Modal, ModalHeader, Row, ModalBody, Col } from "reactstrap";
import "./styles.css";
var FormData = require('form-data')

export default function StudentAdd({ addStudent }) {
  // const [id,setid] = useState("")
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState();

  const submit = async (e) => {
    // e.preventDefault();
    if (!name || !email) {
      alert("Name or email cannot be empty");
    } else {
      await addStudent(name, email);
      var data = new FormData();
      const newFile = new File([file], `${name.replace(" ", "_")}.jpeg`);
      data.append('file', newFile);
      data.append('name', setName);

      var config = {
          method: 'post',
          url: 'https://c4d8-183-82-111-80.in.ngrok.io/new-student',
          headers: { 
            'content-type': 'multipart/form-data',
            'Access-Control-Allow-Origin' : '*', 
          },
          data : data
      };
      axios(config)
      .then(function (response) {
          console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
          console.log(error);
      });

      setmodal(false);
      setName("");
      setEmail("");
    }
  };

  function handleChange(e){
    console.log(e.target.files);
    setFile(e.target.files[0]);
  }

  const [modal, setmodal] = useState(false);
  return (
    <div>
      <Modal size="lg" isOpen={modal} toggle={() => setmodal(!modal)}>
        <ModalHeader toggle={() => setmodal(!modal)}>
          Add Student a Student
        </ModalHeader>
        <ModalBody>
          <form onSubmit={submit}>
            <Row>
              <Col lg={12}>
                <div className="mb-3">
                  <label htmlFor="title" class="form-label">
                    Student Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    class="form-control"
                    id="name"
                    placeholder="Enter name"
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <label htmlFor="desc" class="form-label">
                    Student email
                  </label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    class="form-control"
                    id="email"
                    placeholder="Enter Email"
                  />
                </div>
              </Col>

              <Col lg={12}>
                <div className="mb-3">
                    <label htmlFor="desc" class="form-label">Insert Image</label>
                    <input type="file"  onChange={handleChange}/>
                </div>
              </Col>
            </Row>
          </form>
          <button type="submit" class="btn btn-sm btn-success" onClick={submit}>
            submit
          </button>
        </ModalBody>
      </Modal>
      <button
        className="btn btn-outline-secondary"
        style={{ backgroundColor: "#555555", color: "white" }}
        onClick={() => setmodal(true)}
      >
        Add
      </button>
    </div>
  );
}
