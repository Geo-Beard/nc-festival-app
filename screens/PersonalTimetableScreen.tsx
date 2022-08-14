import {
  View,
  ScrollView,
  Text,
  Pressable,
  Modal,
  Alert,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useState, useEffect } from "react";
import { db } from "../firebase-config/firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Card, Title, Paragraph } from "react-native-paper";
import AddEventButton from "../components/AddEventButton";

export default function PersonalTimetableScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [userTimetable, setUserTimetable] = useState([]);
  const [allEvents, setAllEvents] = useState(null);
  const auth = getAuth();
  const userID = auth.currentUser ? auth.currentUser.uid : null;

  function Create() {
    if (userID !== null) {
      const myDoc = doc(db, "userTimetables", userID.toString());
      const docData = {
        timetable: userTimetable,
      };
      setDoc(myDoc, docData).catch(() => {
        Alert.alert("Something went wrong. Please re-add your events.");
      });
    }
  }

  function ReadAllEvents() {
    const myDoc = doc(db, "events", "artists");
    getDoc(myDoc).then((snapshot) => {
      if (snapshot) {
        setAllEvents(snapshot.data());
      }
    });
  }

  function ReadMyEvents() {
    if (userID !== null) {
      const myDoc = doc(db, "userTimetables", userID.toString());
      getDoc(myDoc).then((snapshot) => {
        if (snapshot) {
          // console.log(snapshot.data().timetable);
          setUserTimetable(snapshot.data().timetable);
        }
      });
    }
  }

  useEffect(() => {
    ReadAllEvents();
  }, []);

  useEffect(() => {
    ReadMyEvents();
  }, []);

  const eventsArray = allEvents !== null ? Object.values(allEvents) : null;

  return (
    <ScrollView>
      <Text>My Timetable</Text>
      {userTimetable.length === 0 && (
        <Text>You haven't added any events yet.</Text>
      )}

      {userTimetable.length !== 0 &&
        userTimetable.map((artist) => {
          return (
            <Card key={artist.name + Math.random()}>
              <Card.Content>
                <Title>{artist.name}</Title>
                <Paragraph>{`${artist.day} ${artist.time}`} </Paragraph>
                <Paragraph>{`${artist.stage} stage`} </Paragraph>
              </Card.Content>
              <Card.Cover source={{ uri: artist.image }} />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  const indexOfArtist = userTimetable.indexOf(artist);
                  userTimetable.splice(indexOfArtist, 1);
                  const updatedTimetable = [...userTimetable];
                  setUserTimetable(updatedTimetable);
                  Create();
                }}
              >
                <Text style={styles.textStyle}>Remove</Text>
              </Pressable>
            </Card>
          );
        })}

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
              <Text style={styles.modalText}>
                Add artists to your timetable:
              </Text>
              <ScrollView style={styles.container}>
                {eventsArray !== null &&
                  eventsArray.map((artist) => {
                    return (
                      <Card key={artist.name + Math.random()}>
                        <Card.Content>
                          <Title>{artist.name}</Title>
                          <Paragraph>
                            {`${artist.day} ${artist.time}`}{" "}
                          </Paragraph>
                          <Paragraph>{`${artist.stage} stage`} </Paragraph>
                        </Card.Content>
                        <Card.Cover source={{ uri: artist.image }} />
                        <AddEventButton
                          style={[styles.button, styles.buttonClose]}
                          artist={artist}
                          userTimetable={userTimetable}
                          setUserTimetable={setUserTimetable}
                        >
                          <Text style={styles.textStyle}>Add</Text>
                        </AddEventButton>
                      </Card>
                    );
                  })}
              </ScrollView>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  Create();
                  console.log(
                    `events added to ${userID}'s timetable on Firebase.`
                  );
                }}
              >
                <Text style={styles.textStyle}>Save</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => {
            setModalVisible(true);
          }}
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
    marginTop: 22,
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  // SECTION LIST:

  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
  },
});
