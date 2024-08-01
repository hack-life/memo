import axios from "axios";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "@firebase/auth";
import { addDoc, collection, getCountFromServer } from "firebase/firestore";
import { db } from "../firebaseConfig";

const API_KEY = "AIzaSyBCzKG9xi8LmhXVkScj4P2-SDUzF7dxTbk"; /// Memo project

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;
  return token;
}

export async function createUser(email, password) {
  try {
    // Sign up using the API
    const token = await authenticate("signUp", email, password);
    const userCount = await getCollectionCount("users");

    // Add user to Firestore
    const dateJoined = new Date().toISOString().split("T")[0];
    const userRef = await addDoc(collection(db, "users"), {
      id: userCount + 1,
      username: email,
      date_joined: dateJoined,
      friends: [],
      articles: [],
      streaks: 0,
      wisdomscore: 0,
    });

    console.log("New user added with ref: ", userRef.id);
    return token;
  } catch (error) {
    console.log("Error creating user: ", error);
    throw error;
  }
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}

async function getCollectionCount(collectionName) {
  try {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getCountFromServer(collectionRef);
    return snapshot.data().count;
  } catch (error) {
    console.log("Error getting collection count: ", error);
    throw error;
  }
}
