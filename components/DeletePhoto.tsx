import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { db } from "../firebase-config/firebase-config";
import { doc, deleteDoc, DocumentData } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
//error notification
import { showMessage } from "react-native-flash-message";

interface propsInterface {
  photo: DocumentData;
  setIsDeleted: Dispatch<SetStateAction<boolean>>;
}

export default function DeletePhoto({ photo, setIsDeleted }: propsInterface) {
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "festivalImages", photo.imageId));
      setIsDeleted(true);
    } catch (e) {
      setIsDeleted(false);
      showMessage({
        message:
          "Photo could not be deleted at this time. Please refresh the page and try again.",
        type: "warning",
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleDelete}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#ff477e",
    padding: 10,
    borderBottomLeftRadius: 25,
    height: 40,
  },
});
