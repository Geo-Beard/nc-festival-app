import React, {useRef} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
// import 'firebaseui/dist/firebaseui.css'
// import { Form, Button, Card } from 'react-native-bootstrap-styles'


export default function LoginScreen({ navigation }) {
  const email = useRef(null);
    return (
      <>
      <TextInput placeholder='Enter your email' ref={email}>

      </TextInput>
      <Button onSubmit={console.log(email)}></Button>
      </>
    );
}