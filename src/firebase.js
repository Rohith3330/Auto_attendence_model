import { initializeApp } from "@firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./keys";
const firebase = firebaseConfig

const app = initializeApp(firebase);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
