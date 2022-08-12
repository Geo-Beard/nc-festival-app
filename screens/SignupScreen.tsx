import React, { useEffect, useState } from "react";
import { Text, View, TextInput, Button } from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default function LoginScreen({ navigation }) {
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
            }
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
    <>
      {signupSuccess && (
        <Text>Signup successful! Please log in to continue</Text>
      )}
      <View>
        <TextInput
          placeholder="Email"
          accessibilityLabel="Email"
          onChangeText={handleEmail}
        />
        <TextInput
          placeholder="Username"
          accessibilityLabel="Username"
          onChangeText={handleUsername}
        />
        <TextInput
          placeholder="Password"
          accessibilityLabel="Password"
          onChangeText={handlePassword}
          secureTextEntry={true}
        />
        <TextInput
          placeholder="Confirm Password"
          accessibilityLabel="Confirm Password"
          onChangeText={handleConfirmPassword}
          secureTextEntry={true}
        />
        <Button onPress={() => setSubmitted(true)} title="Sign Up" />
        {missingDetailsError && <Text>Missing Details</Text>}
        {mismatchedPasswordsError && <Text>Passwords Do Not Match</Text>}
        <Button onPress={() => navigation.navigate("Login")} title="Log In" />
        {/* DEV NAVIGATION */}
        <Button onPress={() => navigation.navigate("Photos")} title="Photos" />
        <Button onPress={() => navigation.navigate("Map")} title="Map" />
      </View>
    </>
  );
}
