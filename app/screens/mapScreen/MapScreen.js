import React, { useEffect, useState } from "react";
import { BackHandler, Text, StyleSheet, View, Alert, Image, TouchableOpacity, Linking } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

import Geolocation from "@react-native-community/geolocation";
import findCoordinates from "../../functions/findCoordinates";

import icons from "../../assets/icons";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import CustomMarker from "./components/CustomMarker";
import { connect, useSelector } from "react-redux";
import locationActions from "../../redux/actions/locationActions";
import ReportInfo from "./components/ReportInfo";

const MapScreen = ({ route, navigation, locationRefresh, reports }) => {
  const [myCoords, setMyCoords] = useState({});
  const [selectedReport, setSelectedReport] = useState(null);

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  useEffect(async () => {
    findCoordinates(setMyCoords);
    locationRefresh();

    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    };
  }, []);


  function makeCall() {
    Linking.openURL(`tel:${selectedReport.number}`);
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          ...myCoords,
          latitudeDelta: 0.0121,
          longitudeDelta: 0.0121,
        }}
      >
        {/*my location*/}
        <CustomMarker coords={myCoords}
                      icon={icons.pin}
        />

        {/*report locations*/}
        {reports?.map(x => (
          <TouchableOpacity onPress={() => setSelectedReport(x)}>
            <CustomMarker coords={x}
                          icon={icons.redPin}
                          selected={setSelectedReport}
            />
          </TouchableOpacity>
        ))}


      </MapView>

      {selectedReport &&
      <View style={styles.infoContainer}>
        <Text style={styles.usernameText}>{selectedReport.username.toUpperCase()}</Text>
        <Text style={styles.messageText}>{selectedReport.message}</Text>
        <TouchableOpacity style={styles.callButton}
                          onPress={() => makeCall()}
        >
          <Text style={styles.callText}>CALL TO HE/SHE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.closeButton}
                          onPress={() => setSelectedReport(null)}
        >
          <Image source={icons.close}
                 style={styles.closeIcon}
          />
        </TouchableOpacity>
      </View>
      }

    </View>
  )
    ;
};

const mapStateToProps = state => ({
  reports: state.locations.reportCoords,
});

const mapDispatchToProps = dispatch => ({
  locationRefresh: () => dispatch(locationActions.locationRefresh()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);

const customData = [
  {
    longitude: 21.158,
    latitude: 51.427,
  },
  {
    longitude: 21.159,
    latitude: 51.427,
  },
  {
    longitude: 21.156,
    latitude: 51.427,
  },
  {
    longitude: 21.158,
    latitude: 51.428,
  },
  {
    longitude: 21.158,
    latitude: 51.426,
  },
];

const styles = StyleSheet.create({
  infoContainer: {
    position: "absolute",
    backgroundColor: COLORS.surface,
    width: "80%",
    // height: 100,
    bottom: 30,
    marginHorizontal: "10%",
    borderRadius: SIZES.radius,
    borderWidth: 2,
    borderColor: COLORS.primary,
    padding: SIZES.padding,
    alignItems: "center",
    justifyContent: "center",
  },
  usernameText: {
    ...FONTS.h2,
    color: COLORS.primary,
  },
  messageText: {
    ...FONTS.body3,
  },

  callButton: {
    marginTop: 10,
    padding: SIZES.padding,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radius,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },

  callText: {
    ...FONTS.body2,
    color: COLORS.onPrimary,
  },

  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,

    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 30,

  },
  closeIcon: {
    width: "70%",
    height: "70%",
    tintColor: COLORS.primary,

  },

});
