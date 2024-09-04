// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNC25NOsP46KRwY_IlknebYCRaLJU-QBg",
  authDomain: "mock-capstone-project.firebaseapp.com",
  databaseURL:
    "https://mock-capstone-project-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mock-capstone-project",
  storageBucket: "mock-capstone-project.appspot.com",
  messagingSenderId: "601362887412",
  appId: "1:601362887412:web:92a292cdd37a783fe3a4a1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
