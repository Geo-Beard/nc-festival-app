import { getAuth } from "firebase/auth";
import { db } from "../firebase-config/firebase-config";
import { doc, setDoc } from "@firebase/firestore";
import { Button, TextInput } from "react-native";

export default function FriendsScreen() {
  const auth = getAuth();
  const user = auth.currentUser;

  const updateFriends = async () => {
    try {
      await setDoc(doc(db, "users", `${user?.uid}`), {
        friends: [],
      });
    } catch (e) {
      console.log(e);
    }
  };

  const fetchFriendUid = () => {
  };

  return (
    <>
      <TextInput placeholder="Email" accessibilityLabel="Email" />
      <Button title="Submit" />
    </>
  );
}
