import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { getStudentsAttendance, updateStudentsAttendance } from "../../utils/fireBaseUtils";
import CircleIcon from "./CircleIcon";
import "./style.css";
const MarkAttendance = () => {
  const [date, setDate] = useState("");
  const [subject, setSubject] = useState("--select a subject--");
  const [displayStudents, setDisplayStudents] = useState(false);
  const [numStundets, setNumStudents] = useState({});

  const changeDate = (event) => {
    setDate(event.target.value);
  };
  const changeSubject = (event) => {
    setSubject(event.target.value);
  };
  const handleChange = async (num) => {
    const newAttendance = {...numStundets};
    newAttendance[num] = !newAttendance[num];
    setNumStudents(newAttendance);
    await updateStudentsAttendance(num, subject, !numStundets[num]);
  };
  useEffect(() => {
    const loadData = async () => {
      setNumStudents(await getStudentsAttendance(subject));
    }
    loadData();
  }, [subject]);
  useEffect(() => {
    if (date != "" && subject != "--select a subject--") {
      setDisplayStudents(true);
    }
    else setDisplayStudents(false);
  }, [date, subject]);

  const subjects = ["math", "science"];

  return (
    <div className="mark-attendance-container">
      <div className="date-subject-div">
        <label htmlFor="date" className="label">
          Select a date:
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => changeDate(e)}
          />
        </label>
        <label>
          Select a subject:
          <select value={subject} onChange={(e) => changeSubject(e)}>
            <option>--select a subject--</option>
            {subjects.map((sub) => (
              <option key={sub}>{sub}</option>
            ))}
          </select>
        </label>
      </div>
      {displayStudents && (
        <div className="students-display">
          <Grid container>
            {Object.keys(numStundets).map((key, ind) => (
              <Grid key={ind} item xs={2} style={{ padding: "5px 20px" }}>
                <CircleIcon
                  name={key}
                  number={key}
                  color={numStundets[key]}
                  onChange={handleChange}
                />
              </Grid>

            ))}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default MarkAttendance;
