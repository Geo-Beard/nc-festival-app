
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
import { Button, TextInput } from "react-native";
import { useState } from "react";
import { showMessage } from "react-native-flash-message";

export default function FriendsScreen({ navigation }: any) {
  const [email, setEmail] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false)

  const auth = getAuth();
  const user = auth.currentUser;

  const updateFriends = async (friendUid: string) => {
    try {
      await updateDoc(doc(db, "users", `${friendUid}`), {
        friends: arrayUnion(user?.uid),
      });
      
      
      showMessage({
        message:
          "Success. Your friend can now see your location.",
        type: "success",
      });
    } catch (e) {
      // console.log(e);
      showMessage({
        message:
          "Something went wrong. Please try again.",
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
      if (array.length < 1) {throw "No user found."}
      setSubmitted(true);
    } catch (e) {
      showMessage({
        message:
          "No user found.",
        type: "danger",
      });
    }

  };

  const handleEmail = (emailInput: string) => {
    setEmail(emailInput);
  };

  return (
    <>
      <TextInput
        onChangeText={handleEmail}
        placeholder="Email"
        accessibilityLabel="Email"
      />
      <Button title="Submit" onPress={fetchFriendUid} />
    </>
  );
}

