// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAuth, GoogleAuthProvider } = require("firebase/auth");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5laWtI0CRHuY9X7nlAS3eIyKuQ2REW2Q",
  authDomain: "cop4808-final-project.firebaseapp.com",
  projectId: "cop4808-final-project",
  storageBucket: "cop4808-final-project.appspot.com",
  messagingSenderId: "65517849064",
  appId: "1:65517849064:web:04270ac702f206b703bc5d",
  measurementId: "G-JWB7ZKFFKW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

module.exports = { auth, provider };