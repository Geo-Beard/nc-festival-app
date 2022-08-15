import { Pressable, StyleSheet, Text } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";

export default function LogoutButton({ navigation }: any) {
  const auth = getAuth();
  const userID = auth.currentUser ? auth.currentUser.uid : null;
  const [error, setError] = useState(false);

  function logout() {
    signOut(auth)
      .then(() => {
        console.log("Log out successful");
        navigation.navigate("Signup");
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  }

  return (
    <>
      {console.log(userID)}
      <Pressable onPress={logout} style={styles.button}>
        <Text style={styles.textStyle}>Log out</Text>
      </Pressable>
      {error && <Text>Unable to log out, please try again</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
