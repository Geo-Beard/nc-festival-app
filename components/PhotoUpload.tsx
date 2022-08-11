import React, { useState, useEffect } from "react";
import { Button, Image, View, Alert, Platform, Text } from "react-native";
//select image
import * as ImagePicker from "expo-image-picker";
//upload image to firebase
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
//unique ref per image upload
import { v4 as uuidv4 } from "uuid";
//create image database
import { collection, addDoc, serverTimestamp } from "@firebase/firestore";
import { db } from "../firebase-config/firebase-config";
//get current signed-in user
import { getAuth } from "firebase/auth";

export default function PhotoUpload() {
  const [image, setImage] = useState<string | undefined>();
  const [hasPermission, setHasPermission] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadError, setUploadError] = useState(false);

  //current logged in user
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasPermission(status === "granted");
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

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    if (image) {
      try {
        // storage itself
        const storage = getStorage();
        //how the image will be addressed inside the storage
        const uuid = uuidv4();
        const imageRef = ref(storage, `images/${uuid}`);
        //convert image to array of bytes
        const img = await fetch(image);
        const bytes = await img.blob();
        //upload images
        await uploadBytes(imageRef, bytes);
        //image database
        const imageUrl = await getDownloadURL(ref(storage, `images/${uuid}`));
        await addDoc(collection(db, "festivalImages"), {
          imageUrl: imageUrl,
          createdAt: serverTimestamp(),
          likes: 0,
          userId: user?.uid,
        });
        setIsUploaded(true);
      } catch (e) {
        setUploadError(true);
      }
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <Button
        title="Select Photo"
        onPress={() => {
          setUploadError(false);
          pickImage();
          setIsUploaded(false);
        }}
        disabled={!hasPermission}
      />
      <Button
        title="Upload Photo"
        onPress={() => {
          setIsUploaded(false);
          setUploadError(false);
          uploadImage();
        }}
      />
      {isUploaded && <Text>Photo was uploaded successfully!</Text>}
      {uploadError && (
        <Text>Unable to upload selected photo, please try again</Text>
      )}
    </View>
  );
}
