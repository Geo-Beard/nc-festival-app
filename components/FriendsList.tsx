import { db } from "../firebase-config/firebase-config";
import {
  doc,
  getDoc,
  getDocs,
  query,
  collection,
  where,
} from "@firebase/firestore";
import { Text, StyleSheet, View, Dimensions } from "react-native";

import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FriendsList({ user, refreshing }: any) {
  const [accessToFriends, setAccessToFriends] = useState<string[] | null>(null);
  const [friendsWithAccess, setFriendsWithAccess] = useState<string[] | null>(
    null
  );

  useEffect(() => {
    //fetch users friends to which the user has access to their locations
    fetchAccessToFriends();
    fetchFriendsWithAccess();
  }, []);

  //useEffect to run on refresh
  useEffect(() => {
    if (refreshing) {
      fetchAccessToFriends();
      fetchFriendsWithAccess();
    }
  }, [refreshing]);

  const fetchAccessToFriends = () => {
    //query database for user's friends
    getDoc(doc(db, "users", `${user.uid}`))
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

  const fetchFriendsWithAccess = () => {
    const q = query(
      collection(db, "users"),
      where("friends", "array-contains", user.uid)
    );
    getDocs(q).then((docs) => {
      const friends: string[] = [];
      docs.forEach((doc) => {
        const friend = doc.data().userEmail;
        friends.push(friend);
      });
      setFriendsWithAccess(friends);
    });
  };

  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <Text style={styles.headings}>
              Friends locations you have access to:
            </Text>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.friends}>
              {accessToFriends ? (
                accessToFriends.map((friend) => {
                  return (
                    <Text key={friend} style={styles.friend}>
                      {friend}
                    </Text>
                  );
                })
              ) : (
                <Text>No friends...but there's still time!</Text>
              )}
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <Text style={styles.headings}>
              Friends with access to your location:
            </Text>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.friends}>
              {friendsWithAccess &&
                friendsWithAccess.map((friend) => {
                  return (
                    <Text key={friend} style={styles.friend}>
                      {friend}
                    </Text>
                  );
                })}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(230,230,230,0.8)",
    borderRadius: 10,
    width: Dimensions.get("window").width * 0.9,
    marginVertical: 15,
  },
  topContainer: {
    alignItems: "center",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width: "100%",
    backgroundColor: "#fb8500",
  },
  bottomContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headings: {
    fontWeight: "900",
    fontSize: 16,
    marginVertical: 10,
  },
  friends: {
    alignItems: "center",
  },
  friend: {
    fontSize: 15,
    marginBottom: 4,
  },
});
