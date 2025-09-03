// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
console.log("api", process.env.REACT_APP_FIREBASE_API_KEY);
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "mern-ecommerce-66fc4.firebaseapp.com",
  projectId: "mern-ecommerce-66fc4",
  storageBucket: "mern-ecommerce-66fc4.appspot.com",
  messagingSenderId: "361095495781",
  appId: "1:361095495781:web:0e9363fad7e95180d9468c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
