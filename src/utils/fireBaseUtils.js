import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { boolToString, isPresent } from "./generalUtils";

const getStudentDocs = async () => {
  const studentCollectionRef = await collection(db, "students");
  const q = query(studentCollectionRef);
  const data = await getDocs(q);
  return data.docs;
};

const getNumOfStudents = async () => {
  return (await getStudentDocs()).length;
}

const getStudentData = async () => {
  const data = await getStudentDocs();
  return data
    .map((doc) => doc.data())
    .sort(function (x, y) {
      return x.id - y.id;
    });
};

const getStudentDocId = async (studentId) => {
  const data = await getStudentDocs();
  for (var i = 0; i < data.length; i++) {
    if (data[i].data().id === parseInt(studentId)) return data[i].id;
  }
  return -1;
};

const getNextId = async () => {
  const data = await getStudentDocs();
  if (data.length === 0) return 1;
  console.log(Math.max(...data.map((student) => student.data().id)) + 1);
  return Math.max(...data.map((student) => student.data().id)) + 1;
};

const addAttendanceIntoDB = async (stuId) => {
  await updateStudentsAttendance(stuId, "math", false);
  await updateStudentsAttendance(stuId, "science", false);
}
const addStudentIntoDB = async (details) => {
  await addDoc(collection(db, "students"), details);
  await addAttendanceIntoDB(details.id);
};

const removeAttendanceOfSubject = async (studentId, subject) => {
  const attendanceCollectionRef = await collection(db, "attendance");
  const q = query(attendanceCollectionRef, where("subject", "==", subject));
  const data = await getDocs(q);
  const subjectDoc = doc(db, "attendance", data.docs[0].id);
  const dataObj = data.docs[0].data();
  delete dataObj.students[studentId];
  await updateDoc(subjectDoc, { ...dataObj });
}
const removeAttendanceFromDB = async (studentId) => {
  await removeAttendanceOfSubject(studentId, "math");
  await removeAttendanceOfSubject(studentId, "science");
}
const removeStudentFromDB = async (studentId) => {
  const docId = await getStudentDocId(parseInt(studentId));
  if (docId === -1) return;
  console.log(docId);
  const docRef = await doc(db, "students", docId);
  console.log(docRef);
  await deleteDoc(docRef);
  await removeAttendanceFromDB(studentId);
};

const getStudentsAttendance = async (subject) => {
  const attendanceCollectionRef = await collection(db, "attendance");
  const q = query(attendanceCollectionRef, where("subject", "==", subject));
  const data = await getDocs(q);
  const stuAttendance = data.docs[0].data().students;
  for (const stuID in stuAttendance) {
    stuAttendance[stuID] = isPresent(stuAttendance[stuID]);
  }
  return stuAttendance;
};

const updateStudentsAttendance = async (stuId, subject, updateTo) => {
  const attendanceCollectionRef = await collection(db, "attendance");
  const q = query(attendanceCollectionRef, where("subject", "==", subject));
  const data = await getDocs(q);
  const subjectDoc = doc(db, "attendance", data.docs[0].id);
  const dataObj = data.docs[0].data();
  dataObj.students[stuId] = boolToString(updateTo);
  await updateDoc(subjectDoc, { ...dataObj });
};

export {
  getStudentDocId,
  getStudentData,
  getNextId,
  addStudentIntoDB,
  removeStudentFromDB,
  getStudentsAttendance,
  updateStudentsAttendance,
  getNumOfStudents,
};
