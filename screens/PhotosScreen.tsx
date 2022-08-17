import { useEffect, useState } from "react";
import { TouchableOpacity, ScrollView, View, StyleSheet, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
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

  // useEffect(() => {
  //   if (navigation.isFocused()) {
  //     setIsLoading(true);
  //     retrievedDocuments();
  //   }
  // }, [navigation.isFocused()]);

  return (
    <View style={{ flex: 1, alignItems: 'center', paddingTop: 80 }}>
      <View style={styles.uploadBtn}>
        <TouchableOpacity onPress={() => navigation.navigate("UploadPhoto")}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="add-circle" size={24} color="white" />
            <Text style={{
              fontSize: 15,
              marginLeft: 5,
              color: "white",
              lineHeight: 45
            }}
            > Post photo</Text>
          </View>
        </TouchableOpacity>
      </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  uploadBtn: {
    backgroundColor: "#000000c0",
    borderRadius: 30,
    width: "50%",
    height: 45,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
    alignItems: "center",
  }
});
