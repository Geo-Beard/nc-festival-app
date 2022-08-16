import * as React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Modal,
  Pressable,
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
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase-config/firebase-config";
import { getAuth } from "firebase/auth";
import { async } from "@firebase/util";

export default function MapScreen({ navigation }: any) {
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

  //Shared Markers
  const [shareMarker, setShareMarker] = useState<any | null>(null);
  const [sharedMarkers, setSharedMarkers] = useState<any | null>(null);
  const [friendVisible, setFriendVisible] = useState<boolean>(true);

  //Navigation state
  const [navigateTo, setNavigateTo] = useState<any | null>(null);

  //Button state
  const [selectMyTent, setSelectMyTent] = useState<boolean>(false);
  const [selectMyPosition, setSelectMyPosition] = useState<boolean>(false);
  const [selectMyMeeting, setSelectMyMeeting] = useState<boolean>(false);

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

  async function ReadSharedMarkers() {
    const friendArray = await ReadFriendsMarkers();
    const markerRef = collection(db, "userMarkers");
    const q = query(markerRef, where("userId", "in", [...friendArray]));
    const allSharedMarkers = await getDocs(q);
    const sharedMarkerArray: any = [];
    allSharedMarkers.forEach((sharedMarker) => {
      sharedMarkerArray.push(sharedMarker.data());
    });
    setSharedMarkers([...sharedMarkerArray]);
    setMarkerLoading(false);
  }

  async function ReadFriendsMarkers() {
    const friendsRef = await getDoc(doc(db, "users", `${user?.uid}`));
    const friendData = friendsRef.data();
    const friendArray: any = [];
    friendData?.friends.forEach((friend: string) => {
      friendArray.push(friend);
    });
    return friendArray;
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

  async function handlePosition() {
    let location = await Location.getCurrentPositionAsync({});
    const newMarker = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      markerId: uuidv4(),
      userId: user?.uid,
      pinIcon: mapPins.greenCrossPin,
      myMarker: "myPosition",
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

        {/* FESTIVAL STAGE MARKER LOCATIONS */}
        <View>
          {/* MAIN STAGE */}
          <Marker
            coordinate={{ latitude: 53.8330422, longitude: -1.5027245 }}
            icon={mapPins.stagePin}
            anchor={{ x: 0.5, y: 0.5 }}
            onPress={() => {
              setNavigateTo({ latitude: 53.8330422, longitude: -1.5027245 });
            }}
          >
            <Callout
              onPress={() => {
                NavigateTo();
              }}
            >
              <Text>Navigate To: Main Stage</Text>
            </Callout>
          </Marker>
          {/* SECOND STAGE */}
          <Marker
            coordinate={{ latitude: 53.8368202, longitude: -1.5012567 }}
            icon={mapPins.stageTwoPin}
            anchor={{ x: 0.5, y: 0.5 }}
            onPress={() => {
              setNavigateTo({ latitude: 53.8368202, longitude: -1.5012567 });
            }}
          >
            <Callout
              onPress={() => {
                NavigateTo();
              }}
            >
              <Text>Navigate To: Local Stage</Text>
            </Callout>
          </Marker>
          {/* TENT STAGE */}
          <Marker
            coordinate={{ latitude: 53.8361333, longitude: -1.5031872 }}
            icon={mapPins.tentStagePin}
            anchor={{ x: 0.5, y: 0.5 }}
            onPress={() => {
              setNavigateTo({ latitude: 53.8361333, longitude: -1.5031872 });
            }}
          >
            <Callout
              onPress={() => {
                NavigateTo();
              }}
            >
              <Text>Navigate To: Tent Stage</Text>
            </Callout>
          </Marker>
          {/* NIGHT ENTERTAINMENT STAGE */}
          <Marker
            coordinate={{ latitude: 53.8371708, longitude: -1.4993836 }}
            icon={mapPins.tentStagePin}
            anchor={{ x: 0.5, y: 0.5 }}
            onPress={() => {
              setNavigateTo({ latitude: 53.8371708, longitude: -1.4993836 });
            }}
          >
            <Callout
              onPress={() => {
                NavigateTo();
              }}
            >
              <Text>Navigate To: Night Entertainment</Text>
            </Callout>
          </Marker>
        </View>

        {/* POLYLINE RENDER */}
        <View>
          {routePolyline !== null && <Polyline coordinates={routePolyline} />}
        </View>

        {/* SHARED MARKERS */}

        {sharedMarkers !== null && friendVisible && (
          <View>
            {sharedMarkers.map((mark: any) => {
              return (
                <Marker
                  key={mark.markerId}
                  coordinate={{
                    latitude: mark.latitude,
                    longitude: mark.longitude,
                  }}
                  anchor={{ x: 0.5, y: 0.5 }}
                  icon={mark.pinIcon}
                  onPress={() => {
                    setNavigateTo({
                      latitude: mark.latitude,
                      longitude: mark.longitude,
                    });
                  }}
                >
                  <Callout onPress={() => NavigateTo()}>
                    <Text>Navigate To</Text>
                  </Callout>
                </Marker>
              );
            })}
          </View>
        )}

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

      {/* MAP BUTTONS */}
      <View style={styles.mapButtonContainer}>
        <Pressable
          onPress={() => {
            setMyMarker("myTent");
            setMyPinIcon(mapPins.yellowTentPin);
            setSelectMyTent(true);
            setSelectMyPosition(false);
            setSelectMyMeeting(false);
          }}
          style={() => [
            {
              backgroundColor: selectMyTent ? "grey" : "cornflowerblue",
            },
            styles.myButton,
          ]}
        >
          <Text style={styles.text}>My Tent</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            handlePosition();
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "grey" : "cornflowerblue",
            },
            styles.myButton,
          ]}
        >
          <Text style={styles.text}>My Position</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setMyMarker("myMeeting");
            setMyPinIcon(mapPins.redCrossPin);
            setSelectMyTent(false);
            setSelectMyPosition(false);
            setSelectMyMeeting(true);
          }}
          style={() => [
            {
              backgroundColor: selectMyMeeting ? "grey" : "cornflowerblue",
            },
            styles.myButton,
          ]}
        >
          <Text style={styles.text}>My Meeting</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setNavigateTo(null);
            setRoutePolyline(null);
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "grey" : "cornflowerblue",
            },
            styles.myButton,
          ]}
        >
          <Text style={styles.text}>Clear Route</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            ReadSharedMarkers();
            setFriendVisible(true);
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "grey" : "cornflowerblue",
            },
            styles.myButton,
          ]}
        >
          <Text style={styles.text}>Update Friend Markers</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setFriendVisible(!friendVisible);
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "grey" : "cornflowerblue",
            },
            styles.myButton,
          ]}
        >
          <Text style={styles.text}>Toggle Friend Markers</Text>
        </Pressable>
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
  mapButtonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  myButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
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
