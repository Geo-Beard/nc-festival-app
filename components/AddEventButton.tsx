import { Pressable, StyleSheet, Text } from "react-native";
import { useState } from "react";

export default function AddEventButton({
  artist,
  userTimetable,
  setUserTimetable,
}) {
  const [isDisabled, setIsDisabled] = useState(false);
  return (
    <Pressable
      style={[styles.button, styles.buttonClose]}
      onPress={() => {
        if (!userTimetable.includes(artist)) {
          setUserTimetable([...userTimetable, artist]);
        }
      }}
    >
      <Text style={styles.textStyle}>Add</Text>
    </Pressable>
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
