import { Button } from "react-native";
//retrieve data
import { db } from "../firebase-config/firebase-config";
import { doc, updateDoc, increment } from "firebase/firestore";

interface photosProp {
  photoId: string;
}

export default function LikeButton({ photoId }: photosProp) {
  return (
    <Button
      title="like"
      onPress={async () => {
        const imageDocRef = doc(db, "festivalImages", photoId);

        await updateDoc(imageDocRef, {
          likes: increment(1),
        });
      }}
    />
  );
}
