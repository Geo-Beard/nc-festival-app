import { SafeAreaView } from "react-native-safe-area-context";
import AddFriends from "../components/AddFriends";
import FriendsList from "../components/FriendsList";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";

export default function FriendsScreen({ navigation }: any) {
  const [currentUser, setCurrentUser] = useState<DocumentData | null>(null);
  const [isLoading, setIsLoading] = useState(true)

  function checkAuthStatus() {
    return new Promise((resolve, reject) => {
      try {
        getAuth().onAuthStateChanged((user) => {
          setCurrentUser(user);
          resolve(user);
          setIsLoading(false)
        });
      } catch {
        reject("api failed");
        setIsLoading(false)
      }
    });
  }

  useEffect(() => {
    setIsLoading(true)
    checkAuthStatus();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <AddFriends />
      {currentUser && !isLoading && <FriendsList user={currentUser} />}
    </SafeAreaView>
  );
}
