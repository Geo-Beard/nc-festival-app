import * as React from "react";
import MapView from "react-native-maps";
import { Marker, Callout } from "react-native-maps";
import Geojson from "react-native-geojson";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import { roundhay } from "../assets/polygons/Festival_Map";
import { v4 as uuidv4 } from "uuid";

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const testCoord = {
    latitude: 53.8369815,
    longitude: -1.4964706,
    markerId: 1,
  };
  const [markers, setMarkers] = useState([testCoord]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  function handleMarker(event) {
    const newMarker = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
      markerId: uuidv4(),
    };
    setMarkers([...markers, newMarker]);
    console.log(markers, "<<< handleMarker");
  }

  function deleteMarker(markerId) {
    const updatedMarkers = markers.filter((marker) => {
      return marker.markerId !== markerId;
    });
    setMarkers(updatedMarkers);
    console.log(updatedMarkers, "<<< deleteMarker");
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={"google"}
        mapType={"standard"}
        showsCompass={true}
        showsUserLocation={true}
        initialRegion={{
          latitude: 53.8369815,
          longitude: -1.4964706,
          latitudeDelta: 0.009,
          longitudeDelta: 0.0,
        }}
        onLongPress={(event) => {
          console.log(event.nativeEvent);
          handleMarker(event);
        }}
      >
        <Geojson geojson={roundhay} />
        <View>
          {markers.map((mark) => {
            return (
              <Marker
                key={mark.markerId}
                coordinate={{
                  latitude: mark.latitude,
                  longitude: mark.longitude,
                }}
              >
                <Callout
                  onPress={() => {
                    deleteMarker(mark.markerId);
                  }}
                >
                  <Text>Delete Marker</Text>
                </Callout>
              </Marker>
            );
          })}
        </View>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 1.1,
  },
});
