import { View, Button, Text, StyleSheet, ScrollView } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config/firebase-config";
import { useEffect, useState } from "react";
import { Card, Title, Paragraph } from "react-native-paper";

export default function TimetableScreen() {
  const [userDoc, setUserDoc] = useState(null);

  function Read() {
    const myDoc = doc(db, "events", "artists");
    getDoc(myDoc).then((snapshot) => {
      if (snapshot) {
        setUserDoc(snapshot.data());
      }
    });
  }

  useEffect(() => {
    Read();
  }, []);

  const dataArray = userDoc !== null ? Object.values(userDoc) : null;
  const friMain = dataArray?.filter((artist) => {
    return artist.day === "Friday" && artist.stage === "Main";
  });
  const friTent = dataArray?.filter((artist) => {
    return artist.day === "Friday" && artist.stage === "Tent";
  });
  const friLocal = dataArray?.filter((artist) => {
    return artist.day === "Friday" && artist.stage === "Local";
  });
  const satMain = dataArray?.filter((artist) => {
    return artist.day === "Saturday" && artist.stage === "Main";
  });
  const satTent = dataArray?.filter((artist) => {
    return artist.day === "Saturday" && artist.stage === "Tent";
  });
  const satLocal = dataArray?.filter((artist) => {
    return artist.day === "Saturday" && artist.stage === "Local";
  });

  return (
    <ScrollView>
      <Text>Timetable</Text>
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
});
