import { Button } from "react-native";
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
import { useEffect } from "react";

interface photosProp {
  photoId: string;
}

export default function LikeButton({ photoId }: photosProp) {
  //currentUser
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {});

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
      }
      if (!likedByUser) {
        await updateDoc(imageDocRef, {
          likes: increment(likeIncrement),
          likedByUsers: arrayUnion(user?.uid),
        });
      }
    } catch (e) {
      //error occurs when navigating to photos with an already logged in user on initial app load. Navigating away and back to the photos page sorts the issue. But should check this out when we have time
      console.log("error----->", e);
    }
  };
  return <Button title="like" onPress={handleLike} />;
}
