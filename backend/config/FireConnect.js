const { initializeApp } = require("firebase/app");
const multer = require("multer");
const { getStorage } = require("firebase/storage");

// var serviceAccount = require("./xclone-927-firebase-adminsdk-14pp3-ee1ef5e83f.json");
const firebaseConfig = {
  // credential: admin.credential.cert(serviceAccount),
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID,
};

initializeApp(firebaseConfig);
const storage = getStorage();
const upload = multer({ storage: multer.memoryStorage() });

console.log("Initializing Firebase");

module.exports = { storage, upload };
