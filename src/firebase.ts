// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDr5x838OGiWZ-29YeIaKoz7L8iPExvWm0",
  authDomain: "arifrustam-299ca.firebaseapp.com",
  projectId: "arifrustam-299ca",
  storageBucket: "arifrustam-299ca.appspot.com",
  messagingSenderId: "953754469295",
  appId: "1:953754469295:web:b467e7dc0df430d5fba55a",
  measurementId: "G-P9GMZ0M1BP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
