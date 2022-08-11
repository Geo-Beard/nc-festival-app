import * as React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function PhotosScreen({navigation}) {
  return (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Photos Screen</Text>
        <Button onPress={() => navigation.navigate("UploadPhoto")} title="Upload photo" />
      </View>
    </>
  );
}
