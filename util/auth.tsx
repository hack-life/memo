import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";



export async function createUser(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDoc = createUserDocument(email);
    await addUserToFirestore(user.uid, userDoc);

    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function login(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

export async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in with Google:", error);
    throw error;
  }
}

export async function getUserData(token: string) {
  // const auth = getAuth(); already imported
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated");
  }

  const userSnapshot = await getDoc(doc(db, "users", user.uid));
  if (userSnapshot.exists()) {
    return userSnapshot.data();
  } else {
    throw new Error("No user data found in Firestore");
  }
}

function createUserDocument(email: string) {
  return {
    username: email,
    date_joined: new Date().toISOString().split("T")[0],
    friends: [],
    articles: [],
    streaks: 0,
    wisdomscore: 0,
  };
}

async function addUserToFirestore(UID: string, userDoc: any) {
  const userRef = doc(db, "users", UID);
  await setDoc(userRef, userDoc);
  console.log("New user added with UID:", UID);
}

export async function logout() {
  await signOut(auth);
}
