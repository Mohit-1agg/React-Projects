// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDz7zSVwECnL6sWYSyOhv2Ky82_LIam9zU",
  authDomain: "netflixgpt-3ee80.firebaseapp.com",
  projectId: "netflixgpt-3ee80",
  storageBucket: "netflixgpt-3ee80.appspot.com",
  messagingSenderId: "291697230676",
  appId: "1:291697230676:web:b53cd0f34fb78405c2fec1",
  measurementId: "G-H0QXQ8THJJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
