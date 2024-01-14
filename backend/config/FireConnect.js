const { initializeApp } = require("firebase/app");
const multer = require("multer");
const { getStorage } = require("firebase/storage");

// var serviceAccount = require("./xclone-927-firebase-adminsdk-14pp3-ee1ef5e83f.json");
const firebaseConfig = {
  // credential: admin.credential.cert(serviceAccount),
  apiKey: "AIzaSyDSbBSR4eh8YZYzJ0l34lTLQpdYQcguyNw",
  authDomain: "xclone-927.firebaseapp.com",
  projectId: "xclone-927",
  storageBucket: "xclone-927.appspot.com",
  messagingSenderId: "119121980940",
  appId: "1:119121980940:web:9e7da8e1b0335930050829",
  measurementId: "G-T6PY6V54M8",
};

initializeApp(firebaseConfig);
const storage = getStorage();
const upload = multer({ storage: multer.memoryStorage() });

console.log("Initializing Firebase");

module.exports = { storage, upload };
