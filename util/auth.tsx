import axios from "axios";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "@firebase/auth";
import {
  addDoc,
  setDoc,
  doc,
  collection,
  getCountFromServer,
} from "firebase/firestore";
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
    const token = await authenticate("signUp", email, password);
    const userData = await getUserData(token);
    const UID = userData.localId;

    const userDoc = createUserDocument(email);
    await addUserToFirestore(UID, userDoc);

    return token;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

async function getUserData(token) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`;
  const response = await axios.post(url, { idToken: token });

  if (response.data.error) {
    throw new Error(response.data.error.message);
  }

  if (!response.data.users || response.data.users.length === 0) {
    throw new Error("Failed to retrieve user data");
  }

  return response.data.users[0];
}

function createUserDocument(email) {
  return {
    username: email,
    date_joined: new Date().toISOString().split("T")[0],
    friends: [],
    articles: [],
    streaks: 0,
    wisdomscore: 0,
  };
}

async function addUserToFirestore(UID, userDoc) {
  const userRef = doc(db, "users", UID);
  await setDoc(userRef, userDoc);
  console.log("New user added with UID:", UID);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
