import * as React from 'react';
import { Text, View } from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';

export default function ProfileScreen() {

    return (
      <>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Profile Screen</Text>
          <FontAwesome5 name="user-alt" size={24} color="black" />
        </View>
      </>
    );
}