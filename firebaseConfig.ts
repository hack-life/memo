import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, initializeFirestore, setLogLevel } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Enable Firestore logs
setLogLevel("debug");

const firebaseConfig = {
  apiKey: "AIzaSyBCzKG9xi8LmhXVkScj4P2-SDUzF7dxTbk",
  authDomain: "memo-ae862.firebaseapp.com",
  projectId: "memo-ae862",
  storageBucket: "memo-ae862.appspot.com",
  messagingSenderId: "371867286010", // For sending messages via Firebase Cloud Messaging (FCM)
  appId: "1:371867286010:web:0902c806ddae9c12864c43", // Identifies your app instance for Firebase services
  measurementId: "G-831ENZE591", // Used for Google Analytics
};

// Initialize Firebase app (only initialize if no other apps are initialized)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
const db = initializeFirestore(app, {
  ignoreUndefinedProperties: false,
}, "test1");

// Initialize Firebase Auth with default settings
const auth = getAuth(app);

// Set up Google Auth Provider
const provider = new GoogleAuthProvider();

export { app, db, auth, provider };
