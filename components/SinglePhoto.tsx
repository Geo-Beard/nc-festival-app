import { Image, StyleSheet, View, Dimensions } from "react-native";
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
  const matchingId = photo.userId === userId;
  return !isDeleted ? (
    <>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: photo.imageUrl }}
            style={styles.image}
            key={photo.imageId}
          />
        </View>
        <View style={styles.buttonContainer}>
          {matchingId && (
            <DeletePhoto photo={photo} setIsDeleted={setIsDeleted} />
          )}
          <LikeButton photo={photo} userId={userId} matchingId={matchingId}/>
        </View>
      </View>
    </>
  ) : (
    <></>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width * 0.9,
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    borderBottomRightRadius: 100,
  }
});
