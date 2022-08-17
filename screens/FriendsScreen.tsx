import { SafeAreaView } from "react-native-safe-area-context";
import AddFriends from "../components/AddFriends";
import FriendsList from "../components/FriendsList";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { Text } from "react-native";

export default function FriendsScreen({ navigation }: any) {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true)

  function checkAuthStatus() {
    return new Promise((resolve, reject) => {
      try {
        getAuth().onAuthStateChanged((user) => {
          console.log("userChecked:", user.uid);
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
