import { db } from "../firebase-config/firebase-config";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { useState } from 'react';
export default function Test() {
    const [userDoc, setUserDoc] = useState(null);
    function Create() {
        const myDoc = doc(db,"timetableCol","timetablesDoc");
        const docData = {
            "roundhay-festival": {
                "friday": {
                    "stage-1": {
                        "times": {
                        "1300": "Wolf Alice",
                        "1400": "Fontaines D.C.",
                        "1500": "Bad Boy Chiller Crew",
                        "1600": "Arctic Monkeys"
                        }
                    },
                    "stage-2": {
                        "times": {
                        "1300": "Tame Impala",
                        "1400": "The Mouse Outfit",
                        "1500": "Khruangbin",
                        "1600": "Too Many Zoos"
                        }
                    }
                },
                "saturday": {
                    "stage-1": {
                        "times": {
                        "1300": "Foals",
                        "1400": "The Libertines",
                        "1500": "Idles",
                        "1600": "Hak Baker"
                        }
                    },
                    "stage-2": {
                        "times": {
                        "1300": "Lianne La Havas",
                        "1400": "Skunk Anansie",
                        "1500": "Metronomy",
                        "1600": "Haim"
                        }
                    }
                }
            }
        };
        setDoc(myDoc,docData)
            .then(() => {
                Alert.alert("Document created!");
            })
            .catch(() => {
                Alert.alert("Something went wrong!");
            })
    }
    function Read() {
        const myDoc = doc(db,"timetableCol","timetablesDoc");
        getDoc(myDoc)
            .then((snapshot) => {
                if(snapshot) {
                    setUserDoc(snapshot.data());
                }
            })
    }
    function Update() {
    }
    function Delete() {
    }
    return (
        <View style={styles.container}>
            <Button title="Create New Doc" onPress={Create}></Button>
            <Button title="Read Doc" onPress={Read}></Button>
            {
                userDoc !== null &&
                    <Text>Stage1 Friday @ 1300: {userDoc["roundhay-festival"]["friday"]["stage-1"]["times"][1300]}</Text>
            }
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });








