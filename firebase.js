// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQCy3gBuTCs1yMUtaUFrSaxJNcgAGGz54",
  authDomain: "insta-2-ce779.firebaseapp.com",
  projectId: "insta-2-ce779",
  storageBucket: "insta-2-ce779.appspot.com",
  messagingSenderId: "354631743834",
  appId: "1:354631743834:web:55c854f5f01b0eb8055b63",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
