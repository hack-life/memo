import { useState } from "react";
import { Alert, StyleSheet, View, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";

import FlatButton from "../UI/FlatButton";
import AuthForm from "./AuthForm";
import { Colors } from "@/constants/Colors";

/**
 * AuthContent component
 * This component is responsible for rendering the authentication form and handling the authentication process.
 * @param {boolean} isLogin
 * @param {function} onAuthenticate
 * @returns {JSX.Element}
 */
function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace("Signup");
    } else {
      navigation.replace("Login");
    }
  }

  function submitHandler(credentials) {
    let { email, password } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 3;

    if (!emailIsValid || !passwordIsValid) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? "Create a new user" : "Log in instead"}
        </FlatButton>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 40,
    marginHorizontal: 20,
    padding: 15,
  },
  buttons: {
    marginTop: 8,
  },
});
