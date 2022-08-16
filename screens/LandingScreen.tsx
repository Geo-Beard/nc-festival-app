import {useState} from 'react';
import { Text, View, ImageBackground, StyleSheet, TextInput } from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';
import { AuthErrorCodes } from 'firebase/auth';

export default function LandingScreen() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const image = { uri: "https://images.unsplash.com/photo-1520095972714-909e91b038e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80" };

    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <Text style={styles.text}>festfriend</Text>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="email"
                        placeholderTextColor="white"
                        onChangeText={(email) => setEmail(email)}
                    />
                </View>
                
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="password"
                        placeholderTextColor="white"
                        secureTextEntry={true}
                        onChangeText={(password) => setPassword(password)}
                    />
                </View>
            </ImageBackground>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: "center"
    },
    text: {
      color: "white",
      fontSize: 42,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000c0",
      marginBottom: 80
    },
    subtext: {
        color: "white",
        fontSize: 15,
        lineHeight: 30,
        textAlign: "center",
        backgroundColor: "#000000c0"
      },
      inputView: {
        backgroundColor: "#000000c0",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 20,
        alignItems: "center",
      },
      TextInput: {
        color: "white",
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
      }
  });