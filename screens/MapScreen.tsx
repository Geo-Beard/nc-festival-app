import * as React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Modal,
} from "react-native";
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
  updateDoc,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase-config/firebase-config";
import { getAuth } from "firebase/auth";

export default function MapScreen({ navigation }) {
  const auth = getAuth();
  const user = auth.currentUser;
  const [userMarkers, setUserMarkers] = useState<any | null>(null);
  const [location, setLocation] = useState<any | null>(null);
  const [locations, setLocations] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [markerPlaced, setMarkerPlaced] = useState(false);
  const [markerDeleted, setMarkerDeleted] = useState(false);
  const [routePolyline, setRoutePolyline] = useState<any | null>(null);
  const [markerLoading, setMarkerLoading] = useState<any | null>(null);
  const [myPinIcon, setMyPinIcon] = useState(mapPins.yellowTentPin);
  const [myMarker, setMyMarker] = useState("myTent");

  //Modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMarkerId, setModalMarkerId] = useState<any | null>(null);
  const [navigateMarker, setNavigateMarker] = useState<any | null>(null);

  //Navigation state
  const [navigateTo, setNavigateTo] = useState<any | null>(null);

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

      let locations = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 3000,
          distanceInterval: 2,
        },
        (loc) => {
          setLocations(loc.coords);
          console.log(loc.coords, "<<<loc.coords");
        }
      );
      setMarkerLoading(true);
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
    const markerArray: any = [];
    allUserMarkers.forEach((userMarker) => {
      markerArray.push(userMarker.data());
    });
    setUserMarkers([...markerArray]);
    setMarkerLoading(false);
  }

  useEffect(() => {
    ReadMarker();
    setMarkerPlaced(false);
    setMarkerDeleted(false);
  }, [markerPlaced, markerDeleted, markerLoading]);

  useEffect(() => {
    if (locations && navigateTo) {
      setRoutePolyline(null);
      NavigateTo();
    }
  }, [locations]);

  //CREATE
  function CreateMarker(newMarker: any) {
    let checkExists: any = "";
    userMarkers.forEach((mark: any) => {
      if (mark.myMarker === newMarker.myMarker) {
        checkExists = mark.markerId;
      }
    });
    if (checkExists.length === 0) {
      const createMarker = doc(db, "userMarkers", `${newMarker.markerId}`);
      setDoc(createMarker, newMarker);
      setMarkerPlaced(true);
    } else {
      const createMarker = doc(db, "userMarkers", `${checkExists}`);
      updateDoc(createMarker, { ...newMarker, markerId: checkExists });
      setMarkerPlaced(true);
    }
  }

  function handleMarker(event: any) {
    const newMarker = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
      markerId: uuidv4(),
      userId: user?.uid,
      pinIcon: myPinIcon,
      myMarker: myMarker,
    };
    CreateMarker(newMarker);
  }

  //DELETE
  async function DeleteMarker(markerId: any) {
    const markerRef = doc(db, "userMarkers", `${markerId}`);
    await deleteDoc(markerRef);
    setMarkerDeleted(true);
  }

  //NAVIGATE

  function NavigateTo() {
    setRoutePolyline([
      { latitude: locations.latitude, longitude: locations.longitude },
      navigateTo,
    ]);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        // customMapStyle={mapStyle} // toggle as it may make the basemap not work
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

        {/* POLYLINE RENDER */}
        <View>
          {console.log(routePolyline, "<<<routePolyline")}
          {routePolyline !== null && <Polyline coordinates={routePolyline} />}
        </View>

        {/* USER MARKERS */}
        {userMarkers !== null && (
          <View>
            {userMarkers.map((mark: any) => {
              return (
                <Marker
                  key={mark.markerId}
                  coordinate={{
                    latitude: mark.latitude,
                    longitude: mark.longitude,
                  }}
                  anchor={{ x: 0.5, y: 0.5 }}
                  icon={mark.pinIcon}
                >
                  <View>
                    <Callout
                      onPress={() => {
                        setNavigateMarker([mark.latitude, mark.longitude]);
                        setNavigateTo({
                          latitude: mark.latitude,
                          longitude: mark.longitude,
                        });
                        setModalMarkerId(mark.markerId);
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <Text>Options</Text>

                      {modalVisible && (
                        <Modal
                          animationType="fade"
                          transparent={true}
                          visible={modalVisible}
                          onRequestClose={() => {
                            setModalVisible(!modalVisible);
                          }}
                        >
                          <Button
                            title="Navigate To"
                            onPress={() => {
                              setModalVisible(!modalVisible);
                              NavigateTo();
                            }}
                          />
                          <Button title="Share Marker" onPress={() => {}} />
                          <Button
                            title="Delete Marker"
                            onPress={() => {
                              setModalVisible(!modalVisible);
                              setRoutePolyline(null);
                              DeleteMarker(modalMarkerId);
                            }}
                          />
                          <Button
                            title="Close Options"
                            onPress={() => {
                              setModalVisible(!modalVisible);
                            }}
                          ></Button>
                        </Modal>
                      )}
                    </Callout>
                  </View>
                </Marker>
              );
            })}
          </View>
        )}
      </MapView>
      <View>
        <Button
          title="My Tent"
          onPress={() => {
            setMyMarker("myTent");
            setMyPinIcon(mapPins.yellowTentPin);
          }}
        />
        <Button
          title="My Friend"
          onPress={() => {
            setMyMarker("myFriend");
            setMyPinIcon(mapPins.blueTentPin);
          }}
        />
        <Button
          title="My Meeting"
          onPress={() => {
            setMyMarker("myMeeting");
            setMyPinIcon(mapPins.crossPin);
          }}
        />
        <Button
          title="Clear Route"
          onPress={() => {
            setNavigateTo(null);
            setRoutePolyline(null);
          }}
        />
      </View>
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
    height: Dimensions.get("window").height * 0.7,
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
