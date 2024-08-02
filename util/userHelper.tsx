import { collection, getCountFromServer, getDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

/**
 * Get a user object by email
 * @param email
 * @returns the user object
 */
export async function getUserById(userId) {
  try {
    const usersRef = doc(db, "users", userId);
    const userDoc = await getDoc(usersRef);
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log("No such user!");
      return null;
    }
  } catch (error) {
    console.log("Error getting user by email: ", error);
    throw error;
  }
}

/**
 * Get the articles saved by a user
 * @param userId
 * @returns the articles the user has saved
 */
export async function getUserArticles(userId) {
  try {
    const usersRef = doc(db, "users", userId);
    const userDoc = await getDoc(usersRef);
    if (userDoc.exists()) {
      // If the document exists, return the articles array
      const userData = userDoc.data();
      return userData.articles || []; // Return an empty array if articles doesn't exist
    } else {
      console.log("No such user!");
      return [];
    }
  } catch (error) {
    console.error("Error getting user articles:", error);
    throw error;
  }
}

/**
 * Get the user's friends
 * @param userId
 * @returns the user's friends list
 */
export async function getUserFriends(userId) {
  try {
    const usersRef = doc(db, "users", userId);
    
  } catch (error) {
    console.log("Error getting user friends: ", error);
    throw error;
  }

/**
 * Get the number of documents in a collection
 * @param collectionName
 * @returns the number of documents in the collection
 */
export async function getCollectionCount(collectionName) {
  try {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getCountFromServer(collectionRef);
    return snapshot.data().count;
  } catch (error) {
    console.log("Error getting collection count: ", error);
    throw error;
  }
}
