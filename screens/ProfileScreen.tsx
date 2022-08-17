import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { Text, StyleSheet, View} from 'react-native';
import { Avatar } from 'react-native-paper';
import { TouchableOpacity, ImageBackground } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    setIsLoading(false);
  }, []);

    function signOut() {
      setIsLoading(true);
      auth.signOut()
        .then(() => {
          console.log("Sign out successful");
          setIsLoading(false);
          navigation.push("Signup");
        })
        .catch((error) => {
          setError(error);
          console.log(error);
          setIsLoading(false);
        });
    }

    return isLoading ? (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Loading...</Text></View>) : 
    !user ? (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Please reload the app and sign in.</Text></View>) : (
        <ImageBackground source={require('../assets/img/img_003.jpg')} resizeMode="cover" style={styles.image} imageStyle={{opacity:0.2}}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.header}>Hello, {user?.displayName}.</Text>
          <Avatar.Image size={220} source={require('../assets/img/img_003.jpg')} style={styles.avatar} />
          <View style={styles.signOut}>
            <TouchableOpacity onPress={signOut}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Entypo name='log-out' size={24} color='white' />
                  <Text style={{
                    fontSize: 15,
                    marginLeft: 5,
                    color: "white",
                    lineHeight: 45
                  }}
                  >Sign Out</Text>
              </View>
            </TouchableOpacity>
          </View>
          {error && <Text>Unable to sign out. Please try again.</Text>}
        </View>
        </ImageBackground>
      );

  return isLoading ? (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text>Loading...</Text>
    </SafeAreaView>
  ) : !user ? (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text>Please reload the app and sign in.</Text>
    </SafeAreaView>
  ) : (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text style={styles.header}>Hello, {user?.displayName}.</Text>
      <Avatar.Image
        size={120}
        source={require("../assets/img/avatar_001.jpg")}
        style={styles.avatar}
      />
      <TouchableOpacity onPress={signOut}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Entypo name="log-out" size={24} color="black" />
          <Text
            style={{
              fontSize: 15,
              marginLeft: 5,
            }}
          >
            Sign Out
          </Text>
        </View>
      </TouchableOpacity>
      {error && <Text>Unable to sign out. Please try again.</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    justifyContent: 'center',
    marginBottom: 75
  },
  avatar: {
    justifyContent: 'center',
    marginBottom: 75,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  signOut: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 30,
    width: "50%",
    height: 45,
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
  },
});
