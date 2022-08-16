import { Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config/firebase-config";
import { useEffect, useState } from "react";
import { Card, Title, Paragraph } from "react-native-paper";

export default function TimetableScreen({ navigation }) {
  const [timetable, setTimetable] = useState(null);

  function Read() {
    const myDoc = doc(db, "events", "artists");
    getDoc(myDoc).then((snapshot) => {
      if (snapshot) {
        setTimetable(snapshot.data());
      }
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

  return (
    <ScrollView>
      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.navigate("PersonalTimetable");
        }}
      >
        <Text>View my timetable</Text>
      </Pressable>
      <Text>Friday</Text>
      <Text>Main Stage</Text>
      {friMain !== null &&
        friMain.map((artist) => {
          return (
            <Card key={artist.name + Math.random()}>
              <Card.Content>
                <Title>{artist.name}</Title>
                <Paragraph>{artist.time}</Paragraph>
              </Card.Content>
              <Card.Cover source={{ uri: artist.image }} />
            </Card>
          );
        })}
      <Text>Tent Stage</Text>
      {friTent !== null &&
        friTent.map((artist) => {
          return (
            <Card key={artist.name + Math.random()}>
              <Card.Content>
                <Title>{artist.name}</Title>
                <Paragraph>{artist.time}</Paragraph>
              </Card.Content>
              <Card.Cover source={{ uri: artist.image }} />
            </Card>
          );
        })}
      <Text>Local Stage</Text>
      {friLocal !== null &&
        friLocal.map((artist) => {
          return (
            <Card key={artist.name + Math.random()}>
              <Card.Content>
                <Title>{artist.name}</Title>
                <Paragraph>{artist.time}</Paragraph>
              </Card.Content>
              <Card.Cover source={{ uri: artist.image }} />
            </Card>
          );
        })}

      <Text>Saturday</Text>
      <Text>Main Stage</Text>
      {satMain !== null &&
        satMain.map((artist) => {
          return (
            <Card key={artist.name + Math.random()}>
              <Card.Content>
                <Title>{artist.name}</Title>
                <Paragraph>{artist.time}</Paragraph>
              </Card.Content>
              <Card.Cover source={{ uri: artist.image }} />
            </Card>
          );
        })}
      <Text>Tent Stage</Text>
      {satTent !== null &&
        satTent.map((artist) => {
          return (
            <Card key={artist.name + Math.random()}>
              <Card.Content>
                <Title>{artist.name}</Title>
                <Paragraph>{artist.time}</Paragraph>
              </Card.Content>
              <Card.Cover source={{ uri: artist.image }} />
            </Card>
          );
        })}
      <Text>Local Stage</Text>
      {satLocal !== null &&
        satLocal.map((artist) => {
          return (
            <Card key={artist.name + Math.random()}>
              <Card.Content>
                <Title>{artist.name}</Title>
                <Paragraph>{artist.time}</Paragraph>
              </Card.Content>
              <Card.Cover source={{ uri: artist.image }} />
            </Card>
          );
        })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Card: {
    backgroundColor: "red",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#F194FF",
  },
});
