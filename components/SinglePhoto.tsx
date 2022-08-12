import { Image } from "react-native";
import { DocumentData } from "firebase/firestore";
import LikeButton from "./LikeButton";

export default function SinglePhoto({ photo }: DocumentData) {
  return (
    <>
      <Image
        source={{ uri: photo.imageUrl }}
        style={{ width: "90%", height: 200 }}
        key={photo.imageId}
      />
      <LikeButton photoId={photo.imageId} />
    </>
  );
}
