import {View, ScrollView, Text, Pressable, Modal, Alert, StyleSheet, SectionList} from "react-native";
import { useState } from "react";

export default function PersonalTimetableScreen () {

    const [modalVisible, setModalVisible] = useState(false);


    const DATA = [
        {
        title: "Friday",
        data: ["Wolf Alice", "Fontaines D.C.", "Bad Boy Chiller Crew", "Arctic Monkeys", "Tame Impala", "The Mouse Outfit", "Khruangbin", "Too Many Zooz"]
        },
        {
        title: "Saturday",
        data: ["Wolf Alice", "Fontaines D.C.", "Bad Boy Chiller Crew", "Arctic Monkeys", "Tame Impala", "The Mouse Outfit", "Khruangbin", "Too Many Zooz"]
        }
    ];

    return (
      <ScrollView>
        <Text>My Timetable</Text>
        <Text>You haven't added any events yet.</Text>

        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Hello World!</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>Add events</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
});