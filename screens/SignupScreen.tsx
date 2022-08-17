import React, { useEffect, useState } from "react";
import { Text, View, TextInput, Pressable, ImageBackground, StyleSheet } from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config/firebase-config";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState<{ email: string }>({ email: "" });
  const [password, setPassword] = useState<{ password: string }>({
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<{ password: string }>({
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [missingDetailsError, setMissingDetailsError] = useState(false);
  const [mismatchedPasswordsError, setMismatchedPasswordsError] =
    useState(false);

  const handleEmail = (emailString: string) => {
    setEmail({ email: emailString });
  };

  const handleUsername = (usernameString: string) => {
    setUsername(usernameString);
  };

  const handlePassword = (passwordString: string) => {
    setPassword({ password: passwordString });
  };

  const handleConfirmPassword = (passwordString: string) => {
    setConfirmPassword({ password: passwordString });
  };

  function passwordLogic() {
    setMismatchedPasswordsError(false);
    if (password.password === confirmPassword.password) {
      return true;
    }
    setMismatchedPasswordsError(true);
  }

  function missingDetailsLogic() {
    setMissingDetailsError(false);
    if (
      password.password &&
      confirmPassword.password &&
      username &&
      email.email
    ) {
      return true;
    }
    setMissingDetailsError(true);
  }

  useEffect(() => {
    if (submitted) {
      const missingDetails = missingDetailsLogic();
      const passwordMatch = passwordLogic();
      if (submitted && missingDetails && passwordMatch) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email.email, password.password)
          .then(() => {
            const user = auth.currentUser;
            if (user) {
              updateProfile(user, {
                displayName: username,
              });
              return user;
            }
          })
          .then((user) => {
            setDoc(doc(db, "users", `${user?.uid}`), {
              friends: [],
              userEmail: email.email,
              userId: user?.uid
            });
          })
          .then(() => {
            setSignupSuccess(true);
          })
          .catch((error) => {
            setSubmitted(false);
            const errorCode = error.code;
            const errorMessage = error.message;
          });
      }
      setSubmitted(false);
    }
  }, [submitted]);

  return (
    <View style={styles.container}>
      {signupSuccess && (
        <Text>Signup successful! Please log in to continue</Text>
      )}
        <ImageBackground source={require('../assets/img/img_005.jpg')} resizeMode="cover" style={styles.image}>
        <View style={styles.outerInputView}>
          <View style={styles.inputView}>
            <TextInput style={styles.inputText}
              placeholder="Email"
              placeholderTextColor="gainsboro"
              accessibilityLabel="Email"
              onChangeText={handleEmail}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput style={styles.inputText}
              placeholder="Display name"
              placeholderTextColor="gainsboro"
              accessibilityLabel="Username"
              onChangeText={handleUsername}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput style={styles.inputText}
              placeholder="Password"
              placeholderTextColor="gainsboro"
              accessibilityLabel="Password"
              onChangeText={handlePassword}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput style={styles.inputText}
              placeholder="Confirm password"
              placeholderTextColor="gainsboro"
              accessibilityLabel="Confirm Password"
              onChangeText={handleConfirmPassword}
              secureTextEntry={true}
            />
          </View>
          <Pressable style={styles.submitButtons} onPress={() => setSubmitted(true)}>
            <Text style={styles.buttonText}>Sign up</Text>
          </Pressable>
          <Text style={styles.accountText}>Have an account already?</Text>
          <Pressable style={styles.submitButtons} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.buttonText}>Log in</Text>
          </Pressable>
          {missingDetailsError && <Text>Missing Details</Text>}
          {mismatchedPasswordsError && <Text>Passwords Do Not Match</Text>}
        </View>
        </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  outerInputView: {
    marginTop: 45
  },
  image: {
    flex: 1,
    justifyContent: "center",
    
  },
  inputView: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
    alignItems: "center",
  },
  inputText: {
    width: "100%",
    height: "100%",
    color: "white",
    textAlign: "center",
    lineHeight: 45,
  },
  submitButtons: {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
    alignItems: "center",
  },
  accountText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 70,
    marginBottom: 20
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 45
  }
});