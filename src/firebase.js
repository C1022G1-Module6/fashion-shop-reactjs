// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB4vStpFoZ3Z3XAQv4IbSCfrIBEGQPrcpo",
    authDomain: "project-fashion-73b52.firebaseapp.com",
    projectId: "project-fashion-73b52",
    storageBucket: "project-fashion-73b52.appspot.com",
    messagingSenderId: "364228763451",
    appId: "1:364228763451:web:c81d89aa2d677ba891611e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)