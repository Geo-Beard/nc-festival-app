import { Pressable, StyleSheet, Text } from "react-native";

export default function AddEventButton({
  artist,
  userTimetable,
  setUserTimetable,
}) {
  return (
    <>
      {userTimetable.includes(artist) ? (
        <Text>Event added to your timetable!</Text>
      ) : (
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => {
            setUserTimetable([...userTimetable, artist]);
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
