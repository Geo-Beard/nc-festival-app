import React, { useState, useEffect } from "react";
import { Button, Image, View, Alert, Platform } from "react-native";
//select image
import * as ImagePicker from "expo-image-picker";
//upload image to firebase
import { getStorage, ref, uploadBytes } from "firebase/storage";

export default function PhotoUpload() {
  const [image, setImage] = useState<string | undefined>();
  const [hasPermission, setHasPermission] = useState(false);
  // const [uploading, setUploading] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasPermission(status === "granted")
        if (status !== "granted") {
          Alert.alert(
            "sorry, we need camera roll permissions to make this work!"
          );
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      // storage itself
      const storage = getStorage();
      //how the image will be addressed inside the storage
      const imageRef = ref(storage, "image.jpg");
      //convert image to array of bytes
      const img = await fetch(result.uri);
      const bytes = await img.blob();
      //upload images
      await uploadBytes(imageRef, bytes);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <Button title="Select Photo" onPress={pickImage} disabled={!hasPermission}/>
      {/* <Button title="Upload Photo" onPress={uploadImage} /> */}
    </View>
  );
}
