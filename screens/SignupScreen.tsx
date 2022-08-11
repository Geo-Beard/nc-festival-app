import React, { useEffect, useState } from "react";
import { Text, View, TextInput, Button } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase-config/firebase-config";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState<{ email: string }>({ email: "" });
  const [password, setPassword] = useState<{ password: string }>({
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<{ password: string }>({
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleEmail = (emailString: string) => {
    setEmail({ email: emailString });
  };

  const handlePassword = (passwordString: string) => {
    setPassword({ password: passwordString });
  };

  const handleConfirmPassword = (passwordString: string) => {
    setConfirmPassword({ password: passwordString });
  };

  useEffect(() => {
    if (submitted) {
      const auth = getAuth(app);
      createUserWithEmailAndPassword(auth, email.email, password.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          setSubmitted(false);
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  }, [submitted]);

  return (
    <>
      <View>
        <TextInput
          placeholder="Email"
          accessibilityLabel="Email"
          onChangeText={handleEmail}
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
        <Button onPress={() => navigation.navigate("Login")} title="Log In" />
        <Button onPress={() => navigation.navigate("Photos")} title="Photos" />
      </View>
    </>
  );
}
