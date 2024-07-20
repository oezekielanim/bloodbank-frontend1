// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import {collection, getFirestore}from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDB5qYJ_5RR0aDP-1PsTw43fyCyjGsFxG0",
  authDomain: "bloodbank-29eb7.firebaseapp.com",
  projectId: "bloodbank-29eb7",
  storageBucket: "bloodbank-29eb7.appspot.com",
  messagingSenderId: "212059890150",
  appId: "1:212059890150:web:6400a38c913f419046f627",
  measurementId: "G-7DMR847X4S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export  const auth = getAuth(app)
export const db= getFirestore(app)
export const UserRef = collection(db,"Users")
export const RequestRef = collection(db,"BloodRequests")
const analytics = getAnalytics(app);