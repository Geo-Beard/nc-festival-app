import { View, Button, Text, StyleSheet } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config/firebase-config";
import { useEffect, useState } from "react";
import { Card, Title, Paragraph } from "react-native-paper";

export default function TimetableScreen() {
  const [userDoc, setUserDoc] = useState(null);

  function Read() {
    const myDoc = doc(db, "timetableCol", "timetablesDoc");
    getDoc(myDoc).then((snapshot) => {
      if (snapshot) {
          setUserDoc(snapshot.data());
      }
    });
  }

  useEffect(() => {
    Read();
  }, []);

  const friday_stage1_times = userDoc["roundhay-festival"]["friday"]["stage-1"]["times"];
  const friday_stage2_times = userDoc["roundhay-festival"]["friday"]["stage-2"]["times"];
  const saturday_stage1_times = userDoc["roundhay-festival"]["saturday"]["stage-1"]["times"];
  const saturday_stage2_times = userDoc["roundhay-festival"]["saturday"]["stage-2"]["times"];

  return (
      
    <>
      <Text>Timetable</Text>
      <Text>Switch for Friday/Saturday</Text>
       { userDoc !== null && friday_stage1_times.map((time) => {
        return    (
        <Card>
        <Card.Content>
          <Title>{time.artist}</Title>
          <Paragraph>{time.time}</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      </Card>)
    })}
               { userDoc !== null && friday_stage2_times.map((time) => {
        return    (
        <Card>
        <Card.Content>
          <Title>{time.artist}</Title>
          <Paragraph>{time.time}</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      </Card>)
    })}
           { userDoc !== null && saturday_stage1_times.map((time) => {
        return    (
        <Card>
        <Card.Content>
          <Title>{time.artist}</Title>
          <Paragraph>{time.time}</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      </Card>)
    })}
           { userDoc !== null && saturday_stage2_times.map((time) => {
        return    (
        <Card>
        <Card.Content>
          <Title>{time.artist}</Title>
          <Paragraph>{time.time}</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      </Card>)
    })}
    </>
  );
}

const styles = StyleSheet.create({
    Card: {
      backgroundColor: 'red',
    },
  });


