import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { BlurView } from "expo-blur";
import { Colors } from "@/constants/Colors";
import IconButtonAnt from "@/components/memoMVP/UI/IconButtonAnt";
import axios from "axios";
import { db } from "../../firebaseConfig";
import {
  addDoc,
  getDoc,
  setDoc,
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  collection,
  getCountFromServer,
} from "firebase/firestore";
import cheerio from "cheerio";
import { AuthContext } from "@/store/auth-context";
import { useContext } from "react";
import { getUserData } from "../../util/auth";

function AddURL({ isModalVisible, toggleModal }) {
  const authCtx = useContext(AuthContext);

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImport = async () => {
    const UID = "W1V7h70asObNSak0Pr1MJjjopgP2";

    if (!inputValue) {
      Alert.alert("Error", "Please enter a URL");
      return;
    }

    // Check if the user has not already uploaded the same url to the database
    try {
      const userRef = doc(db, "users", UID);
      const userDoc = await getDoc(userRef);
      const userArticles = userDoc.data()?.articles;

      const articleExists = userArticles.some(
        (article: any) => article.url === inputValue
      );
      if (articleExists) {
        Alert.alert("Error", "Article already exists in your library");
        return;
      }
    } catch (error) {
      console.error("Error checking if article exists:", error);
    }

    setIsLoading(true);

    try {
      // Fetch the HTML content of the webpage
      const response = await fetch(inputValue);
      const body = await response.text();

      // Load the HTML into cheerio
      const $ = cheerio.load(body);

      // Array to store articles
      const articles: any = [];

      // Select each article block (change the selector based on actual HTML structure)
      $("article").each((index, element) => {
        const title = $(element).find("h1, h2").text().trim(); // Adjust selector as necessary
        const content = $(element).find("p").text().trim(); // Adjust selector to get detailed content

        articles.push({ title, content });
      });

      console.log("Articles:", articles);

      // save to firestore
      const userRef = doc(db, "users", UID);

      const articleData = {
        title: articles[0].title,
        content: articles[0].content,
        url: inputValue,
        date_added: new Date().toISOString(),
      };

      console.log("articleData:", articleData);

      // add article to user's article field in firestore
      await updateDoc(userRef, {
        articles: arrayUnion(articleData),
      });

      Alert.alert("Success", "Article imported successfully");
    } catch (error) {
      console.error("Error importing article:", error);
      Alert.alert("Error", "Failed to import article. Please try again.");
    } finally {
      setIsLoading(false);
      toggleModal();
    }
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <BlurView intensity={10} style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Copy the link to an article or a twitter thread below
            </Text>

            <TextInput
              style={styles.inputText}
              placeholder="Link to webpage or pdf"
              placeholderTextColor={Colors.grey2}
              value={inputValue}
              onChangeText={setInputValue}
            />

            <TouchableOpacity
              onPress={handleImport}
              style={styles.closeButton}
              disabled={isLoading}
            >
              <Text style={styles.closeButtonText}>
                {isLoading ? "Importing..." : "Import"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.fixedButton}>
            <IconButtonAnt
              icon="closecircle"
              size={80}
              color={Colors.purple1}
              onPress={toggleModal}
            />
          </View>
        </BlurView>
      </Modal>
    </View>
  );
}

export default AddURL;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    height: "50%",
    padding: 20,
    backgroundColor: Colors.grey1,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
    justifyContent: "center",
    textAlign: "center",
    color: Colors.white1,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    paddingHorizontal: 40,
    backgroundColor: Colors.purple1,
    borderRadius: 20,

    // Shadow properties
    shadowColor: Colors.black1,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10, // Android shadow
  },
  closeButtonText: {
    color: "white",
    fontSize: 20,
  },
  fixedButton: {
    position: "absolute",
    bottom: 40,
    right: 5,
    zIndex: 1,
  },

  inputText: {
    width: "100%",
    height: 50,
    borderColor: Colors.purple1,
    backgroundColor: Colors.white1,
    borderRadius: 30,
    paddingHorizontal: 10,
    marginBottom: 20,
    textAlign: "center",

    // Shadow properties
    shadowColor: Colors.black1,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10, // Android shadow
  },
});
