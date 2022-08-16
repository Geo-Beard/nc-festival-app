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
  const [userTimetable, setUserTimetable] = useState(null);
  const [allEvents, setAllEvents] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurentUser] = useState<any>(null);

  function Create() {
    if (currentUser) {
      const myDoc = doc(db, "userTimetables", currentUser.uid.toString());
      const docData = {
        timetable: userTimetable,
      };
      setDoc(myDoc, docData).catch(() => {
        Alert.alert("Something went wrong. Please re-add your events.");
      });
    }
  }

  async function ReadAllEvents() {
    const myDoc = doc(db, "events", "artists");
    await getDoc(myDoc).then((snapshot) => {
      if (snapshot) {
        setAllEvents(snapshot.data());
      }
    });
  }

  async function ReadMyEvents(user) {
    if (user.uid) {
      const myDoc = doc(db, "userTimetables", user.uid.toString());
      await getDoc(myDoc).then((snapshot) => {
        if (snapshot) {
          setUserTimetable(snapshot.data().timetable);
        }
      });
    }
  }

  function checkAuthStatus() {
    return new Promise((resolve, reject) => {
      try {
        getAuth().onAuthStateChanged((user) => {
          setCurentUser(user);
          resolve(user);
        });
      } catch {
        reject("api failed");
      }
    });
  }

  useEffect(() => {
    checkAuthStatus().then((user) => {
      ReadMyEvents(user).then(() => {
        ReadAllEvents();
      });
    });
    setIsLoading(false);
  }, []);

  const eventsArray = allEvents !== null ? Object.values(allEvents) : null;

  return isLoading ? (
    <Text>Loading...</Text>
  ) : (
    <ScrollView>
      <Text>My Timetable</Text>

      {!userTimetable ? (
        <Text>You haven't added any events yet.</Text>
      ) : (
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
        })
      )}

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
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
                          isLoading={isLoading}
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
                    `events added to ${currentUser.uid}'s timetable on Firebase.`
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
