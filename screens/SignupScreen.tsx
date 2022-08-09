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
  const [error, setError] = useState< string | null >(null);


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

  function signUpLogic () {
    if (password && confirmPassword && username && email) {

      return true;
    }
  }

  useEffect(() => {
    if (submitted && signUpLogic()) {
      const auth = getAuth();

      createUserWithEmailAndPassword(auth, email.email, password.password)
        .then(() => {
          // Signed in
          //update displayname
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
    else if (submitted) {
      setError("Missing details")
    }
  }, [submitted]);

  return (
    <>
    {signupSuccess && <Text>Signup successful! Please log in to continue</Text>}
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
        {error && <Text>{error}</Text>}
        <Button onPress={() => navigation.navigate("Login")} title="Log In" />
      </View>

    </>
  );
}
