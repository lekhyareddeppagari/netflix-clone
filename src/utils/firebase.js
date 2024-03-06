// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0lwkyLZjJfWo8J42hxtG7xKD6WC4R-OY",
  authDomain: "neftlix-gpt-lekhya.firebaseapp.com",
  projectId: "neftlix-gpt-lekhya",
  storageBucket: "neftlix-gpt-lekhya.appspot.com",
  messagingSenderId: "896743730934",
  appId: "1:896743730934:web:6f4a420fd9ed0b05e686d7",
  measurementId: "G-FT9R503H9R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();