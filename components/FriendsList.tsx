import { getAuth } from "firebase/auth";
import { db } from "../firebase-config/firebase-config";
import {
  doc,
  getDoc,
  getDocs,
  query,
  collection,
  where,
} from "@firebase/firestore";
import { Button, TextInput, Text } from "react-native";
import { useEffect, useState } from "react";
import { showMessage } from "react-native-flash-message";

export default function FriendsList({ user }: any) {
  //friends that have access to the users location data
  // const [friendsAccessUid, setFriendsAccessUid] = useState(null);

  useEffect(() => {
    //fetch users friends to which the user has access to their locations
    getDoc(doc(db, "users", `${user?.uid}`))
      .then((docSnap) => {
        const userData = docSnap.data();
        return userData?.friends;
      })
      .then((usersUidData) => {
        // console.log(usersUidData);
        // const q = query(
        //   collection(db, "users"),
        //   where("capital", "in", [...usersUidData])
        // );
        // return getDocs(q);
        return getDocs(collection(db, "users"));
      })
      .then((docs) => {
        console.log(docs);
        docs.forEach((doc) => {
          console.log(doc);
        });
      });
  }, []);

  return <></>;
}
