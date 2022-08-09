import React, { useEffect, useState } from "react";
import { View, TextInput, Button } from "react-native";
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
    console.log(submitted);
    if (submitted) {
      const auth = getAuth(app);
      createUserWithEmailAndPassword(auth, email.email, password.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          setSubmitted(false);
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
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
      </View>
    </>
  );
}
