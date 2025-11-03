// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSkBw5Wdja-kM0fEx_etigeRGW2hUFhB4",
  authDomain: "apptodos-71060.firebaseapp.com",
  projectId: "apptodos-71060",
  storageBucket: "apptodos-71060.firebasestorage.app",
  messagingSenderId: "705326429513",
  appId: "1:705326429513:web:564c11fc112db8f5e09698"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);