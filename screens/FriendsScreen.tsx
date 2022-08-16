import { SafeAreaView } from "react-native-safe-area-context";
import AddFriends from "../components/AddFriends";
import FriendsList from "../components/FriendsList";

export default function FriendsScreen({ navigation }: any) {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <AddFriends />
      <FriendsList />
    </SafeAreaView>
  );
}
