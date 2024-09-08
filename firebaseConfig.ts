import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { setLogLevel } from "firebase/firestore";

// Enable logs
setLogLevel("debug");

const firebaseConfig = {
  apiKey: "AIzaSyBCzKG9xi8LmhXVkScj4P2-SDUzF7dxTbk",
  authDomain: "memo-ae862.firebaseapp.com",
  projectId: "memo-ae862",
  storageBucket: "memo-ae862.appspot.com",
  messagingSenderId: "371867286010",
  appId: "1:371867286010:web:0902c806ddae9c12864c43",
  measurementId: "G-831ENZE591",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
const db = initializeFirestore(
  app,
  {
    ignoreUndefinedProperties: false,
  },
  "test1"
);

// Initialize Firebase Auth
const auth = getAuth(app);

export { app, db, auth };
