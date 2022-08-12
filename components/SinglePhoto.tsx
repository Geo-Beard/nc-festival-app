
import {
  Button,
  Image,
} from "react-native";
//retrieve data
import { db } from "../firebase-config/firebase-config";
import {
  DocumentData,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";

export default function SinglePhoto({ photo }: DocumentData) {
  return (
    <>
      <Image
        source={{ uri: photo.imageUrl }}
        style={{ width: "90%", height: 200 }}
        key={photo.imageId}
      />
      <Button
        title="like"
        onPress={async () => {
          const washingtonRef = doc(db, "festivalImages", photo.imageId);

          await updateDoc(washingtonRef, {
            likes: increment(1),
          });
        }}
      />
    </>
  );
}
