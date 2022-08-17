
import { db } from "../firebase-config/firebase-config";
import {
  doc,
  getDoc,
  getDocs,
  query,
  collection,
  where,
} from "@firebase/firestore";
import { Text } from "react-native";

import { useEffect, useState } from "react";

export default function FriendsList({ user }: any) {
  const [accessToFriends, setAccessToFriends] = useState<string[] | null>(null);

  useEffect(() => {
    //fetch users friends to which the user has access to their locations
    fetchAccessToFriends();
  }, []);

  const fetchAccessToFriends = () => {
    //query database for user's friends
    getDoc(doc(db, "users", `${user?.uid}`))
      .then((docSnap) => {
        const userData = docSnap.data();
        return userData?.friends;
      })
      .then((usersUidData) => {
        //query database for documents containing friendsUid
        const q = query(
          collection(db, "users"),
          where("userId", "in", [...usersUidData])
        );
        return getDocs(q);
      })
      .then((docs) => {
        //obtain email strings
        const friends: string[] = [];
        docs.forEach((doc) => {
          const friend = doc.data().userEmail;
          friends.push(friend);
        });
        setAccessToFriends(friends);
      });
  };

  return (
    <>
      <Text>Friends that you have location access to:</Text>
      {accessToFriends ? (
        accessToFriends.map((friend) => {
          return <Text key={friend}>{friend}</Text>;
        })
      ) : (
        <Text>No friends...but there's still time!</Text>
      )}
    </>
  );
}
