import {
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  View,
  ImageBackground,
} from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config/firebase-config";
import { useEffect, useState } from "react";
import { Card, Title, Paragraph } from "react-native-paper";

export default function TimetableScreen({ navigation }) {
  const [timetable, setTimetable] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function Read() {
    setIsLoading(true);
    const myDoc = doc(db, "events", "artists");
    getDoc(myDoc).then((snapshot) => {
      if (snapshot) {
        setTimetable(snapshot.data());
      }
      setIsLoading(false);
    });
  }

  useEffect(() => {
    Read();
  }, []);

  const dataArray = timetable !== null ? Object.values(timetable) : null;

  const friMain =
    dataArray !== null
      ? dataArray?.filter((artist) => {
          return artist.day === "Friday" && artist.stage === "Main";
        })
      : null;

  const friTent =
    dataArray !== null
      ? dataArray?.filter((artist) => {
          return artist.day === "Friday" && artist.stage === "Tent";
        })
      : null;
  const friLocal =
    dataArray !== null
      ? dataArray?.filter((artist) => {
          return artist.day === "Friday" && artist.stage === "Local";
        })
      : null;
  const satMain =
    dataArray !== null
      ? dataArray?.filter((artist) => {
          return artist.day === "Saturday" && artist.stage === "Main";
        })
      : null;
  const satTent =
    dataArray !== null
      ? dataArray?.filter((artist) => {
          return artist.day === "Saturday" && artist.stage === "Tent";
        })
      : null;
  const satLocal =
    dataArray !== null
      ? dataArray?.filter((artist) => {
          return artist.day === "Saturday" && artist.stage === "Local";
        })
      : null;

  return isLoading ? (
    <Text>Loading...</Text>
  ) : (
    <ScrollView style={styles.scrollView}>
      <ImageBackground
        style={styles.image}
        source={require("../assets/img/timetable-background.jpg")}
      >
        <Text style={styles.header}>Timetable</Text>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate("PersonalTimetable");
          }}
        >
          <Text style={styles.textStyle}>View my timetable</Text>
        </Pressable>
      </ImageBackground>
      <Text style={styles.medHeader}>Friday</Text>
      <View style={styles.stageContainer}>
        <Text style={styles.smallHeader}>Main Stage</Text>
        {friMain !== null &&
          friMain.map((artist) => {
            return (
              <Card style={styles.card} key={artist.name + Math.random()}>
                <Card.Content style={styles.cardContent}>
                  <Title>{artist.name}</Title>
                  <Paragraph>{artist.time}</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: artist.image }} />
              </Card>
            );
          })}
      </View>
      <View style={styles.stageContainer}>
        <Text style={styles.smallHeader}>Tent Stage</Text>
        {friTent !== null &&
          friTent.map((artist) => {
            return (
              <Card style={styles.card} key={artist.name + Math.random()}>
                <Card.Content>
                  <Title>{artist.name}</Title>
                  <Paragraph>{artist.time}</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: artist.image }} />
              </Card>
            );
          })}
        <View style={styles.stageContainer}></View>
        <Text style={styles.smallHeader}>Local Stage</Text>
        {friLocal !== null &&
          friLocal.map((artist) => {
            return (
              <Card style={styles.card} key={artist.name + Math.random()}>
                <Card.Content>
                  <Title>{artist.name}</Title>
                  <Paragraph>{artist.time}</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: artist.image }} />
              </Card>
            );
          })}
      </View>

      <Text style={styles.medHeader}>Saturday</Text>
      <View style={styles.stageContainer}>
        <Text style={styles.smallHeader}>Main Stage</Text>
        {satMain !== null &&
          satMain.map((artist) => {
            return (
              <Card style={styles.card} key={artist.name + Math.random()}>
                <Card.Content>
                  <Title>{artist.name}</Title>
                  <Paragraph>{artist.time}</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: artist.image }} />
              </Card>
            );
          })}
      </View>
      <View style={styles.stageContainer}>
        <Text style={styles.smallHeader}>Tent Stage</Text>
        {satTent !== null &&
          satTent.map((artist) => {
            return (
              <Card style={styles.card} key={artist.name + Math.random()}>
                <Card.Content>
                  <Title>{artist.name}</Title>
                  <Paragraph>{artist.time}</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: artist.image }} />
              </Card>
            );
          })}
      </View>
      <View style={styles.stageContainer}>
        <Text style={styles.smallHeader}>Local Stage</Text>
        {satLocal !== null &&
          satLocal.map((artist) => {
            return (
              <Card style={styles.card} key={artist.name + Math.random()}>
                <Card.Content>
                  <Title>{artist.name}</Title>
                  <Paragraph>{artist.time}</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: artist.image }} />
              </Card>
            );
          })}
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
  stageContainer: {
    padding: 10,
    margin: 10,
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
  medHeader: {
    fontSize: 27,
    marginTop: 40,

    backgroundColor: "white",
    color: "black",
    alignSelf: "center",
  },
  smallHeader: {
    fontSize: 20,
    marginTop: 40,
    backgroundColor: "white",
    color: "black",
    alignSelf: "center",
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
    margin: 20,
    elevation: 2,
    borderColor: "grey",
    borderWidth: 1,
    backgroundColor: "white",
    justifyContent: "center",
    width: 150,

    alignSelf: "center",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    height: 250,
  },
});
