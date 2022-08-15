import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import MapView, { Polyline } from "react-native-maps";
import { Marker, Callout } from "react-native-maps";
import Geojson from "react-native-geojson";
import * as Location from "expo-location";
import { v4 as uuidv4 } from "uuid";
import * as polys from "../assets/polygons/index";
import * as builds from "../assets/buildings/index";
import * as mapPins from "../assets/map-pins/index";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase-config/firebase-config";
import { getAuth } from "firebase/auth";

export default function MapScreen({ navigation }) {
  const auth = getAuth();
  const user = auth.currentUser;
  const [userMarkers, setUserMarkers] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [markerPlaced, setMarkerPlaced] = useState(false);
  const [markerDeleted, setMarkerDeleted] = useState(false);
  const [routePolyline, setRoutePolyline] = useState(null);

  //User authentication for using geolocation
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
  

  //CRUD methods for firestore
  //READ
  async function ReadMarker() {
    const markerRef = collection(db, "userMarkers");
    const q = query(markerRef, where("userId", "==", `${user?.uid}`));
    const allUserMarkers = await getDocs(q);
    const markerArray = [];
    allUserMarkers.forEach((userMarker) => {
      markerArray.push(userMarker.data());
    });
    setUserMarkers([...markerArray]);
  }

  useEffect(() => {
    ReadMarker();
    setMarkerPlaced(false);
    setMarkerDeleted(false);
  }, [markerPlaced, markerDeleted]);

  //CREATE
  function CreateMarker(newMarker) {
    const createMarker = doc(db, "userMarkers", `${newMarker.markerId}`);
    setDoc(createMarker, newMarker);
    setMarkerPlaced(true);
  }

  function handleMarker(event) {
    const newMarker = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
      markerId: uuidv4(),
      userId: user?.uid,
    };
    CreateMarker(newMarker);
  }

  //DELETE
  async function DeleteMarker(markerId) {
    const markerRef = doc(db, "userMarkers", `${markerId}`);
    await deleteDoc(markerRef);
    setMarkerDeleted(true);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        customMapStyle={mapStyle} // toggle as it may make the basemap not work
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
          handleMarker(event);
        }}
      >
        {/* GEOJSON MAP BOUNDARY BASE LAYER */}
        <View>
          <Geojson
            geojson={builds.festivalBoundary}
            fillColor="rgba(100, 10, 0, 0.3)"
          />
        </View>

        {/* GEOJSON MAP OVERLAYS */}
        <View>
          <Geojson
            geojson={polys.mainParking}
            fillColor="rgba(42, 30, 190, 0.5)"
          />
          <Geojson
            geojson={polys.accessPath}
            fillColor="rgba(42, 30, 190, 0.5)"
          />
          <Geojson
            geojson={polys.accessPath2}
            fillColor="rgba(42, 30, 190, 0.5)"
          />
          <Geojson
            geojson={polys.campingArea}
            fillColor="rgba(42, 30, 190, 0.5)"
          />
          <Geojson
            geojson={polys.dropOff}
            fillColor="rgba(130, 30, 190, 0.5)"
          />
          <Geojson
            geojson={polys.dropOff2}
            fillColor="rgba(42, 30, 190, 0.5)"
          />
          <Geojson
            geojson={polys.mainAreaOne}
            fillColor="rgba(42, 30, 190, 0.5)"
          />
          <Geojson
            geojson={polys.mainCamping}
            fillColor="rgba(42, 30, 190, 0.5)"
          />
          <Geojson
            geojson={polys.mainParking}
            fillColor="rgba(42, 30, 190, 0.5)"
          />
          <Geojson
            geojson={polys.mainRoad}
            fillColor="rgba(42, 30, 190, 0.5)"
          />
          <Geojson
            geojson={polys.mainRoad2}
            fillColor="rgba(42, 30, 190, 0.5)"
          />
          <Geojson
            geojson={polys.mainStages}
            fillColor="rgba(42, 30, 190, 0.5)"
          />
          <Geojson
            geojson={polys.nightEntertainment}
            fillColor="rgba(42, 30, 190, 0.5)"
          />
          <Geojson
            geojson={polys.staffCamping}
            fillColor="rgba(42, 30, 190, 0.5)"
          />
          <Geojson
            geojson={polys.staffEntrance}
            fillColor="rgba(42, 30, 190, 0.5)"
          />
          <Geojson
            geojson={polys.staffParking}
            fillColor="rgba(42, 30, 190, 0.5)"
          />
          <Geojson
            geojson={polys.vendorsArea}
            fillColor="rgba(42, 30, 190, 0.5)"
          />
          <Geojson
            geojson={polys.vendorArea2}
            fillColor="rgba(42, 30, 190, 0.5)"
          />
          <Geojson
            geojson={polys.vipCamping}
            fillColor="rgba(42, 30, 190, 0.5)"
          />
          <Geojson
            geojson={polys.westRoad}
            fillColor="rgba(42, 30, 190, 0.5)"
          />
        </View>

        {/* GEOJSON MAP BUILDINGS */}
        <View>
          <Geojson
            geojson={builds.festivalFood}
            fillColor="rgba(100, 10, 0, 0.4)"
          />
          <Geojson
            geojson={builds.festivalInfoTickets}
            fillColor="rgba(100, 10, 0, 0.4)"
          />
          <Geojson
            geojson={builds.festivalMedical}
            fillColor="rgba(100, 10, 0, 0.4)"
          />
          <Geojson
            geojson={builds.festivalStages}
            fillColor="rgba(100, 10, 0, 0.4)"
          />
          <Geojson
            geojson={builds.festivalToilets}
            fillColor="rgba(100, 10, 0, 0.4)"
          />
          <Geojson
            geojson={builds.festivalVendors}
            fillColor="rgba(100, 10, 0, 0.4)"
          />
        </View>

        {/* FESTIVAL MARKER LOCATIONS */}
        <View>
          <Marker
            coordinate={{ latitude: 53.8330422, longitude: -1.5027245 }}
            icon={mapPins.stagePin}
            anchor={{ x: 0.5, y: 0.5 }}
          />
          <Marker
            coordinate={{ latitude: 53.8368202, longitude: -1.5012567 }}
            icon={mapPins.stageTwoPin}
            anchor={{ x: 0.5, y: 0.5 }}
          />
          {/* TENT STAGE */}
          <Marker
            coordinate={{ latitude: 53.8361067, longitude: -1.5031648 }}
            icon={mapPins.tentStagePin}
            anchor={{ x: 0.5, y: 0.5 }}
          />
          {/* NIGHT ENTERTAINMENT STAGE */}
          <Marker
            coordinate={{ latitude: 53.8371708, longitude: -1.4993836 }}
            icon={mapPins.tentStagePin}
            anchor={{ x: 0.5, y: 0.5 }}
          />
        </View>

        {/* POLYLINE TEST */}
        <View>
          <Polyline
            coordinates={[
              { latitude: 53.8362441, longitude: -1.5009048 },
              { latitude: 53.8341043, longitude: -1.5022191 },
            ]}
          />
          {location !== null &&<Polyline
            coordinates={[
              {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              },
              { latitude: 53.8341043, longitude: -1.5022191 },
            ]}
          />}
        </View>

        {/* USER MARKERS */}
        {userMarkers !== null && (
          <View>
            {userMarkers.map((mark) => {
              return (
                <Marker
                  key={mark.markerId}
                  coordinate={{
                    latitude: mark.latitude,
                    longitude: mark.longitude,
                  }}
                  anchor={{ x: 0.5, y: 0.5 }}
                  icon={mapPins.yellowTentPin}
                >
                  <Callout
                    onPress={() => {
                      DeleteMarker(mark.markerId);
                    }}
                  >
                    <Text>Delete Marker</Text>
                  </Callout>
                </Marker>
              );
            })}
          </View>
        )}
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

const mapStyle = [
  {
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];
