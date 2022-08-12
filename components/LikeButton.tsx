import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
//retrieve data
import { db } from "../firebase-config/firebase-config";
import {
  doc,
  updateDoc,
  increment,
  arrayUnion,
  getDoc,
  arrayRemove,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

interface photosProp {
  photoId: string;
}

export default function LikeButton({ photoId }: photosProp) {
  //currentUser
  const auth = getAuth();
  const user = auth.currentUser;
  const [likeCount, setLikeCount] = useState<number | null>(null);
  const [isClicked, setIsClicked] = useState<boolean | null>(null);

  useEffect(() => {
    const getImageDoc = async () => {
      const imageDocRef = doc(db, "festivalImages", photoId);
      const docSnap = await getDoc(imageDocRef);
      //required for like button css logic
      const likedByUser = docSnap.data()?.likedByUsers.includes(user?.uid);
      setIsClicked(likedByUser);
      setLikeCount(docSnap.data()?.likes);
    };
    getImageDoc();
  }, [likeCount]);

  const handleLike = async () => {
    try {
      const imageDocRef = doc(db, "festivalImages", photoId);
      const docSnap = await getDoc(imageDocRef);
      const likedByUser = docSnap.data()?.likedByUsers.includes(user?.uid);
      const likeIncrement = likedByUser ? -1 : 1;

      if (likedByUser) {
        await updateDoc(imageDocRef, {
          likes: increment(likeIncrement),
          likedByUsers: arrayRemove(user?.uid),
        });
        setLikeCount(likeCount && likeCount - 1);
      }
      if (!likedByUser && imageDocRef) {
        await updateDoc(imageDocRef, {
          likes: increment(likeIncrement),
          likedByUsers: arrayUnion(user?.uid),
        });
        setLikeCount(likeCount && likeCount + 1);
      }
    } catch (e) {
      //error occurs when navigating to photos with an already logged in user on initial app load. Navigating away and back to the photos page sorts the issue. But should check this out when we have time
      console.log("error----->", e);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={!isClicked ? styles.buttonLike : styles.buttonUnlike} onPress={handleLike}>
        <Text>
          {!isClicked ? "Like" : "Liked"} {`| ${likeCount}`}
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
    borderRadius:100,
    height: 40,
    width: 100,
  },
  buttonUnlike: {
    alignItems: "center",
    backgroundColor: "#57cc99",
    padding: 10,
    borderRadius:100,
    height: 40,
    width: 100,
  },
});
