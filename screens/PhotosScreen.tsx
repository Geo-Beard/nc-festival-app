import * as React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import PhotoUpload from "../components/PhotoUpload";

export default function PhotosScreen() {
  return (
    <>
      <PhotoUpload />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Photos Screen</Text>
      </View>
    </>
  );
}
