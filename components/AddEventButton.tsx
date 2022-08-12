import { Pressable, StyleSheet, Text, Alert } from "react-native";
import { useState } from "react";

export default function AddEventButton({
  artist,
  userTimetable,
  setUserTimetable,
}) {
  const [isAdded, setIsAdded] = useState(false);
  return (
    <>
      {isAdded ? (
        <Text>Event added to your timetable</Text>
      ) : (
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => {
            if (!userTimetable.includes(artist)) {
              setUserTimetable([...userTimetable, artist]);
              setIsAdded(true);
            }
          }}
        >
          <Text style={styles.textStyle}>Add</Text>
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
