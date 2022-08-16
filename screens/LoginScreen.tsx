import { View, Text, Button, TextInput, ImageBackground, StyleSheet, Pressable } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase-config/firebase-config";
import { useState, useEffect } from "react";

export default function LoginScreen({ navigation }) {
  const image = { uri: "https://images.unsplash.com/photo-1520095972714-909e91b038e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80" };
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState<{ email: string }>({ email: "" });
  const [password, setPassword] = useState<{ password: string }>({
    password: "",
  });

  const handleEmail = (emailString: string) => {
    setEmail({ email: emailString });
  };

  const handlePassword = (passwordString: string) => {
    setPassword({ password: passwordString });
  };

  useEffect(() => {
    if (submitted) {
      const auth = getAuth(app);
      signInWithEmailAndPassword(auth, email.email, password.password)
        .then((userCredential) => {
          // Signed in
          const firebaseUser = userCredential.user;
          // ...
        })
        .then(() => {
          navigation.navigate("Profile");
        })
        .catch((error) => {
          setSubmitted(false);
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  }, [submitted]);

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
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
            placeholder="Password"
            placeholderTextColor="gainsboro"
            accessibilityLabel="Password"
            onChangeText={handlePassword}
            secureTextEntry={true}
          />
        </View>
      </View>
      <Pressable style={styles.submitButtons} onPress={() => setSubmitted(true)} >
        <Text style={styles.buttonText}>Log in</Text>
      </Pressable>
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