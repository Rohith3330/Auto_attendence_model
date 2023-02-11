import React from 'react';
import { useState } from 'react';
import { getNextId, getStudentData, getStudentDocId, getStudentsAttendance, removeStudentFromDB, updateStudentsAttendance } from '../utils/fireBaseUtils';

const Testing = () => {
    const [value, setValue] = useState("");
    const handleChange = (event) => {
        setValue(event.target.value);
    }
    const handleClick = async () => {
        console.log("value ", value);
        // console.log(await updateStudentsAttendance(value, "math", false));
    }
    return ( 
        <div>
            <h1>Testing</h1>
            <input type="text" value={value} onChange={(e) => handleChange(e)}/>
            <button onClick={handleClick}>Submit</button>
        </div>
     );
}
 
export default Testing;