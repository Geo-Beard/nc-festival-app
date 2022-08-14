import { Image } from "react-native";
import { DocumentData } from "firebase/firestore";
import { useState } from "react";
//components
import LikeButton from "./LikeButton";
import DeletePhoto from "../components/DeletePhoto";

interface propsInterface {
  photo: DocumentData;
  userId: string;
}

export default function SinglePhoto({ photo, userId }: propsInterface) {
  const [isDeleted, setIsDeleted] = useState(false);
  const matchingId = photo.userId === userId
  return !isDeleted ? (
    <>
      <Image
        source={{ uri: photo.imageUrl }}
        style={{ width: "90%", height: 200 }}
        key={photo.imageId}
      />
      <LikeButton photo={photo} userId={userId} />
      {matchingId && <DeletePhoto photo={photo} setIsDeleted={setIsDeleted} />}
    </>
  ) : (
    <></>
  );
}
