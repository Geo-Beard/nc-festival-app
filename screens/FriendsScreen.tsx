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

export default function FriendsScreen({ navigation }: any) {
  const [email, setEmail] = useState<string | null>(null);

  const auth = getAuth();
  const user = auth.currentUser;

  const updateFriends = async (friendUid: string) => {
    try {
      await updateDoc(doc(db, "users", `${user?.uid}`), {
        friends: arrayUnion(friendUid),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const fetchFriendUid = async () => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userEmail", "==", `${email}`));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      updateFriends(doc.id);
    });
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
