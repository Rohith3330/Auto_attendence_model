import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import MarkAttendance from "./components/markAttendance/markAttendance";
import Navbar from "./components/Navbar";
import Sidenav from "./components/SideBar";
import { StudentList } from "./components/studentsList/StudentList";
import Testing from "./components/Testing";
import axios, * as others from 'axios';
import { addStudentIntoDB, getNextId, getStudentData, removeStudentFromDB } from "./utils/fireBaseUtils";
import { API_KEY } from "./keys";

function App() {
  const [Students, setStudent] = useState([]);
  console.log(API_KEY);
  useEffect(()=> {
    const loadData = async () => {
      const stuData = await getStudentData();
      setStudent(stuData);
    }
    loadData();
  }, [])
  const onDelete = async (stud) => {
    await removeStudentFromDB(stud.id)
    const stuData = await getStudentData();


    var config = {
      method: 'delete',
      url: API_KEY+'/delete-student?name='+stud.name,
      headers: {
        'Access-Control-Allow-Origin' : '*'
      }
    };
    
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });


    setStudent(stuData);
  };
  const addStudent = async (name, email) => {
    // console.log("I am adding this todo",title,desc)
    let id = await getNextId();
    const myStudents = {
      id: id,
      name: name,
      email: email,
    };
    addStudentIntoDB(myStudents);
    const newStuDetails = await getStudentData();
    setStudent(newStuDetails);
    // setStudent([...Students, myStudents]);
    // console.log(myTodo,myTodo);
  };

  return (
    <div className="app">
      <div className="side-bar-container">
        <Sidenav />
      </div>

      <div className="main-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/mark-attendance" element={<MarkAttendance />}></Route>
          <Route
            path="/students"
            element={
              <StudentList
                Students={Students}
                onDelete={onDelete}
                addStudent={addStudent}
              />
            }
          />
          <Route path="/settings" element={<Testing />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
