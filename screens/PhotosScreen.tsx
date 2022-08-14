import { useEffect, useState } from "react";
import { Button, ScrollView, View, StyleSheet } from "react-native";
//retrieve data
import { db } from "../firebase-config/firebase-config";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
//components
import SinglePhoto from "../components/SinglePhoto";

export default function PhotosScreen({ navigation }: any) {
  const auth = getAuth();
  const user = auth.currentUser;

  const [photos, setPhotos] = useState<DocumentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const retrievedDocuments = async () => {
    const querySnapshot = await getDocs(collection(db, "festivalImages"));
    const photoArray: any = [];
    setIsLoading(false);
    querySnapshot.forEach((doc) => {
      photoArray.push(doc.data());
    });
    setPhotos([...photoArray]);
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
      <View style={styles.container}>
          {!isLoading &&
            photos &&
            user &&
            photos.map((photo: DocumentData) => {
              return (
                <SinglePhoto
                  key={photo.imageId}
                  photo={photo}
                  userId={user.uid}
                />
              );
            })}
      </View>
        </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  }
});
