import { useEffect, useState } from "react";
import { Button, ScrollView } from "react-native";
//retrieve data
import { db } from "../firebase-config/firebase-config";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import SinglePhoto from "../components/SinglePhoto";
import { getAuth } from "firebase/auth";

export default function PhotosScreen({ navigation }) {
  const auth = getAuth();
  const user = auth.currentUser;

  const [photos, setPhotos] = useState<DocumentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const retrievedDocuments = async () => {
    const querySnapshot = await getDocs(collection(db, "festivalImages"));
    const photoArray = [];
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
        {!isLoading &&
          photos && user &&
          photos.map((photo: DocumentData) => {
            return <SinglePhoto key={photo.imageId}photo={photo} userId={user.uid}/>;
          })}
      </ScrollView>
    </>
  );
}
