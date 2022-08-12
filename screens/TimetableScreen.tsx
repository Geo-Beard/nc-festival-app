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

  // const friday_stage1_times =
  //   userDoc !== null
  //     ? userDoc["roundhay-festival"]["friday"]["stage-1"]["times"]
  //     : null;
  // const friday_stage2_times =
  //   userDoc !== null
  //     ? userDoc["roundhay-festival"]["friday"]["stage-2"]["times"]
  //     : null;
  // const saturday_stage1_times =
  //   userDoc !== null
  //     ? userDoc["roundhay-festival"]["saturday"]["stage-1"]["times"]
  //     : null;
  // const saturday_stage2_times =
  //   userDoc !== null
  //     ? userDoc["roundhay-festival"]["saturday"]["stage-2"]["times"]
  //     : null;

  const dataArray = userDoc !== null ? Object.values(userDoc) : null;

  return (
    <ScrollView>
      {userDoc !== null && console.log(Object.values(userDoc))}
      <Text>Timetable</Text>
      <Text>Friday</Text>
      <Text>Stage 1</Text>
      {dataArray !== null &&
        dataArray.map((artist) => {
          return (
            <Card key={artist.name}>
              <Card.Content>
                <Title>{artist.name}</Title>
                <Paragraph>{artist.time}</Paragraph>
              </Card.Content>
              <Card.Cover source={{ uri: artist.image }} />
            </Card>
          );
        })}
      {/* <Text>Stage 2</Text>
      {userDoc !== null &&
        friday_stage2_times.map((time) => {
          return (
            <Card key={time.artist}>
              <Card.Content>
                <Title>{time.artist}</Title>
                <Paragraph>{time.time}</Paragraph>
              </Card.Content>
              <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
            </Card>
          );
        })}
      <Text>Saturday</Text>
      <Text>Stage 1</Text>
      {userDoc !== null &&
        saturday_stage1_times.map((time) => {
          return (
            <Card key={time.artist}>
              <Card.Content>
                <Title>{time.artist}</Title>
                <Paragraph>{time.time}</Paragraph>
              </Card.Content>
              <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
            </Card>
          );
        })}
      <Text>Stage 2</Text>
      {userDoc !== null &&
        saturday_stage2_times.map((time) => {
          return (
            <Card key={time.artist}>
              <Card.Content>
                <Title>{time.artist}</Title>
                <Paragraph>{time.time}</Paragraph>
              </Card.Content>
              <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
            </Card>
          );
        })} */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Card: {
    backgroundColor: "red",
  },
});
