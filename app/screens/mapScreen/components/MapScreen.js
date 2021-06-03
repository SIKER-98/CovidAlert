import React, { useEffect, useState } from "react";
import { BackHandler, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";


const MapScreen = ({ route, navigation }) => {

    function handleBackButtonClick() {
      navigation.goBack();
      return true;
    }

    useEffect(() => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
      };
    }, []);


    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: 37.78825, longitude: -122.4324,
            }}
            title="this is a marker"
            description="this is a marker example"
          />
        </MapView>
      </View>
    )
      ;
  }
;

export default MapScreen;
