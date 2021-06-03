import React, { useEffect, useState } from "react";
import { BackHandler, Text, StyleSheet, View, Alert } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

import Geolocation from "@react-native-community/geolocation";

const MapScreen = ({ route, navigation }) => {

    function handleBackButtonClick() {
      navigation.goBack();
      return true;
    }

    useEffect(() => {
      findCoordinates();
      BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
      };
    }, []);

    const [location, setLocation] = useState();
    const [myLatitude, setMyLatitude] = useState(0);
    const [myLongitude, setMyLongitude] = useState(0);

    const findCoordinates = () => {
      Geolocation.getCurrentPosition(
        position => {
          const location = JSON.stringify(position);

          setLocation(location);
          Alert.alert(location);
          console.log(position.coords);
          setMyLatitude(position.coords.latitude)
          setMyLongitude(position.coords.longitude)
        },
        error => Alert.alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );

      Alert.alert(location);
    };


    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: myLatitude,
            longitude: myLongitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >

        </MapView>
      </View>
    )
      ;
  }
;

export default MapScreen;


const styles = StyleSheet.create({});
