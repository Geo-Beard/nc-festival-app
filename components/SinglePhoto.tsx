import { Image, StyleSheet, View, Dimensions } from "react-native";
import { DocumentData } from "firebase/firestore";
import { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
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
          <LinearGradient colors={['transparent', "rgba(0, 0, 0, 0.8)"]} style={styles.buttonGradient}>
            <View style={styles.buttonContainer}>
              {matchingId && (<DeletePhoto photo={photo} setIsDeleted={setIsDeleted} />)}
              <LikeButton photo={photo} userId={userId} matchingId={matchingId}/>
            </View>
          </LinearGradient>
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
    width: Dimensions.get("window").width * 1,
  },
  image: {
    width: "100%",
    height: '100%',
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 200
  },
  buttonGradient: {
    zIndex: 1,
    position: "absolute",
    bottom: 0,
    width: '100%',
    height: 70,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    position: 'absolute',
    bottom: 0
  }
});
