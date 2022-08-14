import { Image } from "react-native";
import { DocumentData } from "firebase/firestore";
import LikeButton from "./LikeButton";

interface propsInterface {
  photo: DocumentData;
  userId: string;
}

export default function SinglePhoto({ photo, userId }: propsInterface) {
  return (
    <>
      <Image
        source={{ uri: photo.imageUrl }}
        style={{ width: "90%", height: 200 }}
        key={photo.imageId}
      />
      <LikeButton photo={photo} userId={userId} />
    </>
  );
}
