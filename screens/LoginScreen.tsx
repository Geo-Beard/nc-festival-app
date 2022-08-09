import { View, Text, Button, TextInput } from "react-native"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase-config/firebase-config";
import { useState, useEffect } from "react";


export default function LoginScreen ({navigation, setUser}) {
    const [submitted, setSubmitted] = useState(false)
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
              setUser({uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName })
                
              // ...
            })
            .then(() => {
                navigation.navigate("Map")
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
           <Button onPress={() => setSubmitted(true)} title="Log In" />
    </View>
    )
}