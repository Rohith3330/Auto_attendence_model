import { initializeApp } from "@firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCh4cI6AvDIVBJJzawvsdhaHlaAE80hufE",
  authDomain: "netra-11e76.firebaseapp.com",
  projectId: "netra-11e76",
  storageBucket: "netra-11e76.appspot.com",
  messagingSenderId: "47197423092",
  appId: "1:47197423092:web:73e68a3506a0bbd1b8a5a1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
