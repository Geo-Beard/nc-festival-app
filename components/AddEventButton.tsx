import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export default function AddEventButton({
  artist,
  userTimetable,
  setUserTimetable,
}) {
  let isInTimetable = false;
  if (userTimetable.length !== 0)
    userTimetable.forEach((time) => {
      if (time.name === artist.name) {
        isInTimetable = true;
      }
    });
  return (
    <>
      {isInTimetable ? (
        <Text style={{ alignSelf: "center" }}>
          Event added to your timetable!
        </Text>
      ) : (
        <>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              if (userTimetable) {
                setUserTimetable([...userTimetable, artist]);
              } else {
                setUserTimetable([artist]);
              }
            }}
          >
            <Text style={styles.textStyle}>Add</Text>
          </Pressable>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    margin: 10,
    elevation: 2,
  },
  buttonClose: {
    borderColor: "gainsboro",
    borderWidth: 2,
    backgroundColor: "white",
    marginBottom: 20,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});
