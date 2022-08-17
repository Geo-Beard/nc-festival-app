import { SafeAreaView } from "react-native-safe-area-context";
import AddFriends from "../components/AddFriends";
import FriendsList from "../components/FriendsList";
import { getAuth } from "firebase/auth";
import { useEffect, useState, useCallback } from "react";
import { DocumentData } from "firebase/firestore";
import { ScrollView, RefreshControl } from "react-native";

export default function FriendsScreen({ navigation }: any) {
  const [currentUser, setCurrentUser] = useState<DocumentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  function checkAuthStatus() {
    return new Promise((resolve, reject) => {
      try {
        getAuth().onAuthStateChanged((user) => {
          setCurrentUser(user);
          resolve(user);
          setIsLoading(false);
        });
      } catch {
        reject("api failed");
        setIsLoading(false);
      }
    });
  }

  useEffect(() => {
    setIsLoading(true);
    checkAuthStatus();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <AddFriends />
        {currentUser && !isLoading && (
          <FriendsList user={currentUser} refreshing={refreshing} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
