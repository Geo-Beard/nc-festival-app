import {View, ScrollView, Text, Pressable, Modal, Alert, StyleSheet, SectionList, StatusBar} from "react-native";
import { useState, useEffect} from "react";
import { db } from '../firebase-config/firebase-config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

export default function PersonalTimetableScreen () {

    const [modalVisible, setModalVisible] = useState(false);
    const [userTimetable, setUserTimetable] = useState([]);
    const [userDoc, setUserDoc] = useState([])
    const auth = getAuth();
    const userID = auth.currentUser ? auth.currentUser.uid : null;

    function Create() {
      if (userID !== null) {
        const myDoc = doc(db,"userTimetables", userID.toString());
        const docData = {
          "timetable": userTimetable
        };
        setDoc(myDoc,docData)
            .catch(() => {
                Alert.alert("Something went wrong. Please re-add your events.");
            })
      }
    }

    function Read() {
      const myDoc = doc(db,"events","artists");
      getDoc(myDoc)
          .then((snapshot) => {
              if(snapshot) {
                  setUserDoc(snapshot.data());
              }
          })
  }

  useEffect(() => {
    Read();
  }, []);


    const artistArray = [];

    if (userDoc !== null) {
    for (let i = 1; i < 61; i++) {
      artistArray.push([userDoc[i]])
    }
  }
    const DATA = [
        {
        title: "Friday",
        data: artistArray
        },
        // {
        // title: "Saturday",
        // data: [["Foals", 1300], ["The Libertines", 1400], ["Idles", 1500], ["Hak Baker", 1600], ["Lianne La Havas", 1300], ["Skunk Anansie", 1400], ["Metronomy", 1500], ["Haim", 1600]]
        // }
    ];

    const Item = ({ title }) => (
      <View style={styles.item}>
        <Text style={styles.title}>{title["name"]}</Text>
        <Text>{title["time"]}</Text>
        <Pressable
          disabled={false}
          style={[styles.button, styles.buttonClose]}
          onPress={() => {
            if (!userTimetable.includes(title[0])) {
              setUserTimetable([...userTimetable, title[0]]);
            }
          }}
        >
          <Text style={styles.textStyle}>Add</Text>
        </Pressable>
      </View>
    );

    return (
      <ScrollView>
        <Text>My Timetable</Text>
        {userTimetable.length === 0 && <Text>You haven't added any events yet.</Text>}
        {userTimetable.length !== 0 && userTimetable.map(event => {return (
        <>
        
          <Text key={event}>{event}</Text>
          <Pressable key={event+Math.random()}><Text key={event+Math.random()}>x</Text></Pressable></>)})}


        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Add artists to your timetable:</Text>
                <View style={styles.container}>
                  <SectionList
                    sections={DATA}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => <Item title={item} />}
                    renderSectionHeader={({ section: { title } }) => (
                      <Text style={styles.header}>{title}</Text>
                    )}
                  />
                </View>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    Create();
                    console.log(`events added to ${userID}'s timetable on Firebase.`);
                  }}
                >
                  <Text style={styles.textStyle}>Add</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => {setModalVisible(true);
                            console.log(artistArray)}}
          >
            <Text style={styles.textStyle}>Add events</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    // MODAL:

    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },

    // SECTION LIST:

    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      marginHorizontal: 16
    },
    item: {
      backgroundColor: "#f9c2ff",
      padding: 20,
      marginVertical: 8
    },
    header: {
      fontSize: 32,
      backgroundColor: "#fff"
    },
    title: {
      fontSize: 24
    }
});