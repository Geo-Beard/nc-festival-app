import { useEffect, useState } from "react";
import { Button, ScrollView } from "react-native";
//retrieve data
import { db } from "../firebase-config/firebase-config";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import SinglePhoto from "../components/SinglePhoto";

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
          photos.map((photo: DocumentData) => {
            return <SinglePhoto photo={photo} />;
          })}
      </ScrollView>
    </>
  );
}
