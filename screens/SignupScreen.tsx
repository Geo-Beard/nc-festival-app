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
  const [missingDetailsError, setMissingDetailsError] = useState< string | null >(null);
  const [mismatchedPasswordsError, setMismatchedPasswordsError] = useState< string | null >(null);



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
    if (password !== confirmPassword) {
      setMismatchedPasswordsError("Passwords don't match");
    }
    else if (password && confirmPassword && username && email && password === confirmPassword) {
      return true;
    }
  }

  function passwordLogic () {
    if (password === confirmPassword) {
      return true;
    }
  }

  function missingDetailsLogic () {
    if (password && confirmPassword && username && email) {
      return true;
    }
  } 

  useEffect(() => {

    setMismatchedPasswordsError(null);
    setMissingDetailsError(null);
    if (submitted && missingDetailsLogic() && passwordLogic()) {
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
    if (!missingDetailsLogic() && submitted) {
      setMissingDetailsError("Missing details")
    }
    if (!passwordLogic() && submitted) {
      setMismatchedPasswordsError("Passwords don't match");
    }
    setSubmitted(false);
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
        {missingDetailsError && <Text>{missingDetailsError}</Text>}
        {mismatchedPasswordsError && <Text>{mismatchedPasswordsError}</Text>}
        <Button onPress={() => navigation.navigate("Login")} title="Log In" />
      </View>

    </>
  );
}
