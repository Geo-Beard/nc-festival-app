import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { db } from "../firebase-config/firebase-config";
import { doc, updateDoc, deleteDoc, DocumentData } from "firebase/firestore";
import { Dispatch, SetStateAction, useState } from "react";

interface propsInterface {
  photo: DocumentData;
  setIsDeleted: Dispatch<SetStateAction<boolean>>;
}

export default function DeletePhoto({ photo, setIsDeleted }: propsInterface) {
  const handleDelete = async () => {
    await deleteDoc(doc(db, "festivalImages", photo.imageId));
    setIsDeleted(true);
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
    paddingHorizontal: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#ff477e",
    padding: 10,
    borderRadius: 100,
    height: 40,
    width: 100,
  },
});
