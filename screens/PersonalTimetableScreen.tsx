import {
  View,
  ScrollView,
  Text,
  Pressable,
  Modal,
  Alert,
  StyleSheet,
  StatusBar,
  ImageBackground,
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
  const [isLoading, setIsLoading] = useState(false);
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

  async function ReadMyEvents() {
    if (userID !== null) {
      const myDoc = doc(db, "userTimetables", userID.toString());
      await getDoc(myDoc).then((snapshot) => {
        if (snapshot && userTimetable.length !== 0) {
          setUserTimetable(snapshot.data().timetable);
          setIsLoading(false);
        }
      });
    }
  }

  useEffect(() => {
    setIsLoading(true);
    ReadMyEvents().then(() => {
      ReadAllEvents();
    });
  }, []);

  const eventsArray = allEvents !== null ? Object.values(allEvents) : null;

  return (
    <ScrollView style={styles.scrollView}>
      <ImageBackground
        style={styles.image}
        source={require("../assets/img/personal-timetable-background.jpg")}
      >
        <Text style={styles.header}>My Timetable</Text>

        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={styles.textStyle}>Add events</Text>
        </Pressable>
      </ImageBackground>

      {userTimetable.length === 0 ? (
        <Text>You haven't added any events yet.</Text>
      ) : (
        userTimetable.length !== 0 &&
        userTimetable.map((artist) => {
          return (
            <Card style={styles.card} key={artist.name + Math.random()}>
              <Card.Content>
                <Title>{artist.name}</Title>
                <Paragraph>{`${artist.day} ${artist.time}`} </Paragraph>
                <Paragraph>{`${artist.stage} stage`} </Paragraph>
              </Card.Content>
              <Card.Cover source={{ uri: artist.image }} />
              <Pressable
                style={[styles.button, styles.buttonRemove]}
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
              <Text style={styles.modalTextLarge}>
                Add artists to your timetable:
              </Text>
              <ScrollView style={styles.container}>
                {eventsArray !== null &&
                  eventsArray.map((artist) => {
                    return (
                      <Card
                        style={styles.card}
                        key={artist.name + Math.random()}
                      >
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
                }}
              >
                <Text style={styles.textStyle}>Save</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    marginBottom: 20,
    backgroundColor: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#edede9",
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
  card: {
    padding: 10,
    margin: 10,
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
    borderColor: "gainsboro",
    borderWidth: 1,
    backgroundColor: "white",
    margin: 10,
    width: 100,
    alignSelf: "center",
  },
  buttonClose: {
    borderColor: "gainsboro",
    borderWidth: 1,
    backgroundColor: "white",
    margin: 5,
  },
  buttonRemove: {
    borderColor: "gainsboro",
    borderWidth: 1,
    backgroundColor: "white",
    width: 85,
    alignSelf: "center",
    margin: 5,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalTextLarge: {
    marginBottom: 15,
    fontSize: 20,
    textAlign: "center",
  },
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
    marginTop: 40,
    backgroundColor: "rgba(52, 52, 52, 0.0)",
    color: "white",
    alignSelf: "center",
    padding: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
  },
  image: {
    height: 230,
  },
});
