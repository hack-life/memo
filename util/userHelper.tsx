import {
  doc,
  getDoc,
  collection,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

/**
 * Get a user document by ID
 * @param {string} userId - The UID for the user
 * @returns {Object|null} The user object or null if not found
 */
export async function getUserById(userId) {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {
    console.error("Error getting user by ID:", error);
    throw error;
  }
}

/**
 * Get a specific field from a user document
 * @param {string} userId - The UID for the user
 * @param {string} field - The field to retrieve
 * @returns {Array} The requested field data or an empty array
 */
async function getUserField(userId, field) {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    return userDoc.exists() ? userDoc.data()[field] || [] : [];
  } catch (error) {
    console.error(`Error getting user ${field}:`, error);
    throw error;
  }
}

/**
 * Get the articles saved by a user
 * @param {string} userId - The UID for the user
 * @returns {Array} The articles the user has saved
 */
export function getUserArticles(userId) {
  return getUserField(userId, "articles");
}

/**
 * Get the user's friends
 * @param {string} userId - The UID for the user
 * @returns {Array} The user's friends list
 */
export function getUserFriends(userId) {
  return getUserField(userId, "friends");
}

/**
 * Get the number of documents in a collection
 * @param {string} collectionName - The name of the collection
 * @returns {number} The number of documents in the collection
 */
export async function getCollectionCount(collectionName) {
  try {
    const snapshot = await getCountFromServer(collection(db, collectionName));
    return snapshot.data().count;
  } catch (error) {
    console.error("Error getting collection count:", error);
    throw error;
  }
}
