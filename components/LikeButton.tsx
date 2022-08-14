import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
//update database after 'like'
import { db } from "../firebase-config/firebase-config";
import {
  doc,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
  DocumentData,
} from "firebase/firestore";
import { useState } from "react";

//types
interface propsInterface {
  photo: DocumentData;
  userId: string;
}

export default function LikeButton({ photo, userId }: propsInterface) {
  //states
  const [likeCount, setLikeCount] = useState<number>(photo.likes);
  const [isLiked, setIsLiked] = useState<boolean>(
    photo.likedByUsers.includes(userId)
  );

  const handleLike = async () => {
    const initialLikeCount = likeCount;

    try {
      setIsLiked(!isLiked);
      const imageDocRef = doc(db, "festivalImages", photo.imageId);
      const likeIncrement = isLiked ? -1 : 1;

      if (isLiked) {
        //optimized rendering before updating doc
        setLikeCount(likeCount - 1);
        await updateDoc(imageDocRef, {
          likes: increment(likeIncrement),
          likedByUsers: arrayRemove(userId),
        });
      }
      if (!isLiked && imageDocRef) {
        setLikeCount(likeCount + 1);
        await updateDoc(imageDocRef, {
          likes: increment(likeIncrement),
          likedByUsers: arrayUnion(userId),
        });
      }
    } catch (e) {
      setIsLiked(!isLiked);
      setLikeCount(initialLikeCount);
      //error occurs when navigating to photos with an already logged in user on initial app load. Navigating away and back to the photos page sorts the issue. But should check this out when we have time
      console.log("error----->", e);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={!isLiked ? styles.buttonLike : styles.buttonUnlike}
        onPress={handleLike}
      >
        <Text>
          {!isLiked ? "Like" : "Liked"} {`| ${likeCount}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  buttonLike: {
    alignItems: "center",
    backgroundColor: "#a2d2ff",
    padding: 10,
    borderRadius: 100,
    height: 40,
    width: 100,
  },
  buttonUnlike: {
    alignItems: "center",
    backgroundColor: "#57cc99",
    padding: 10,
    borderRadius: 100,
    height: 40,
    width: 100,
  },
});
