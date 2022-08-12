import { Button } from "react-native";
//retrieve data
import { db } from "../firebase-config/firebase-config";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { getAuth } from "firebase/auth";

interface photosProp {
  photoId: string;
}

export default function LikeButton({ photoId }: photosProp) {
    //currentUser
    const auth = getAuth();
    const user = auth.currentUser;
  return (
    <Button
      title="like"
      onPress={async () => {
        const imageDocRef = doc(db, "festivalImages", photoId);

        await updateDoc(imageDocRef, {
          likes: increment(1),
          likedByUsers: arrayUnion(user?.uid),
        });
      }}
    />
  );
}
