// Import the functions you need from the SDKs you need
// import firebase from "firebase/app";
const firebase = require("firebase/app");
require("firebase/storage");
require("firebase/firestore");
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDSbBSR4eh8YZYzJ0l34lTLQpdYQcguyNw",
  authDomain: "xclone-927.firebaseapp.com",
  projectId: "xclone-927",
  storageBucket: "xclone-927.appspot.com",
  messagingSenderId: "119121980940",
  appId: "1:119121980940:web:9e7da8e1b0335930050829",
  measurementId: "G-T6PY6V54M8",
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const firestore = firebase.firestore();
console.log("Initializing Firebase");

module.exports = { storage, firestore };
