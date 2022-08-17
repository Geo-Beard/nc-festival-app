import { getAuth } from "firebase/auth";
import { db } from "../firebase-config/firebase-config";
import {
  doc,
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  arrayUnion,
} from "@firebase/firestore";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useState } from "react";
import { showMessage } from "react-native-flash-message";

export default function AddFriends() {
  const [email, setEmail] = useState<string | null>(null);

  const auth = getAuth();
  const user = auth.currentUser;

  const updateFriends = async (friendUid: string) => {
    try {
      await updateDoc(doc(db, "users", `${friendUid}`), {
        friends: arrayUnion(user?.uid),
      });

      showMessage({
        message: "Success. Your friend can now see your location.",
        type: "success",
      });
    } catch (e) {
      // console.log(e);
      showMessage({
        message: "Something went wrong. Please try again.",
        type: "warning",
      });
    }
  };

  const fetchFriendUid = async () => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("userEmail", "==", `${email}`));
      const querySnapshot = await getDocs(q);
      const array = [];
      querySnapshot.forEach((doc) => {
        doc.id && updateFriends(doc.id);
        array.push(doc.id);
      });
      if (array.length < 1) {
        throw "No user found.";
      }
    } catch (e) {
      showMessage({
        message: "No user found.",
        type: "danger",
      });
    }
  };

  const handleEmail = (emailInput: string) => {
    setEmail(emailInput);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>
          Give permission to a friend:
        </Text>
        <TextInput
          onChangeText={handleEmail}
          placeholder="Email"
          accessibilityLabel="Email"
          style={styles.textInput}
        />
        <TouchableOpacity onPress={fetchFriendUid} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#fb8500",
    padding: 10,
    marginTop: 10,
    width: 150,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 25,
  },
  textInput: {
    width: Dimensions.get("window").width * 0.9,
    padding: 5,
    marginBottom: 10,
    backgroundColor: "#e5e5e5",
    borderRadius: 5,
  },
  text: {
    justifyContent: "center",
    fontSize: 15,
  },
});
