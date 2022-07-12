// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMBvfExUu1FElE-7enBdQwaNWzyKTkoi0",
  authDomain: "sentiment-72f98.firebaseapp.com",
  projectId: "sentiment-72f98",
  storageBucket: "sentiment-72f98.appspot.com",
  messagingSenderId: "796429346492",
  appId: "1:796429346492:web:1513f0ff757bcb8eb3d2b9",
  measurementId: "G-LT07KH80B5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

