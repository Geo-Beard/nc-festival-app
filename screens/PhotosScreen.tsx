import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
} from "react-native";
//retrieve data
import { db } from "../firebase-config/firebase-config";
import {
  collection,
  DocumentData,
  getDocs,
  Timestamp,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";

export default function PhotosScreen({ navigation }) {
  const [photos, setPhotos] = useState<DocumentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const retrievedDocuments = async () => {
    const querySnapshot = await getDocs(collection(db, "festivalImages"));
    const photoArray = [];
    setIsLoading(false);
    querySnapshot.forEach((doc) => {
      photoArray.push(doc.data());
      setPhotos([...photoArray]);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    retrievedDocuments();
  }, []);

  return (
    <>
      <Button
        onPress={() => navigation.navigate("UploadPhoto")}
        title="Upload photo"
      />
      <ScrollView>
        {!isLoading &&
          photos &&
          photos.map((photo) => {
            return (
              <>
                <Image key={photo.imageId}
                  source={{ uri: photo.imageUrl }}
                  style={{ width: "90%", height: 200 }}
                />
              </>
            );
          })}
      </ScrollView>
    </>
  );
}
