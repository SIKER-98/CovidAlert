import React, { useEffect, useState } from "react";
import { BackHandler, StyleSheet, View, TouchableOpacity, Linking, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import findCoordinates from "../../functions/findCoordinates";
import icons from "../../assets/icons";
import CustomMarker from "./components/CustomMarker";
import { connect } from "react-redux";
import locationActions from "../../redux/actions/locationActions";
import ReportInfo from "./components/ReportInfo";
import { COLORS } from "../../constants/theme";
import axios from "../../api/axiosHelper";

const MapScreen = ({ route, navigation, locationReset, locationAdd, reports, users }) => {
  const [myCoords, setMyCoords] = useState({});
  const [selectedReport, setSelectedReport] = useState(null);
  const [actualRegion, setActualRegion] = useState(null);

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  useEffect(async () => {
    findCoordinates(setMyCoords);
    await refreshPress();


    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    };
  }, []);


  function makeCall() {
    Linking.openURL(`tel:${selectedReport.number}`);
  }

  function calculateSquare() {
    let square = {};
    if (actualRegion && myCoords?.latitude) {
      const maxLatitude = actualRegion.latitude + actualRegion.latitudeDelta;
      const minLatitude = actualRegion.latitude - actualRegion.latitudeDelta;
      const maxLongitude = actualRegion.longitude + actualRegion.longitudeDelta;
      const minLongitude = actualRegion.longitude - actualRegion.longitudeDelta;

      square = { maxLatitude, maxLongitude, minLatitude, minLongitude };
    }
    return square;
  }

  const refreshPress = async () => {
    console.log("REFRESH");

    while (!actualRegion.latitude) {
      console.log(actualRegion);
    }

    let square = calculateSquare();

    locationReset();

    const api = "activeRequests/byArea?";
    const params = new URLSearchParams({
      latitudeMAX: square.maxLatitude,
      latitudeMIN: square.minLatitude,
      longitudeMAX: square.maxLongitude,
      longitudeMIN: square.minLongitude,
    });

    axios.get(api + params)
      .then(res => {
        console.log("refresh:", res.data);
        res.data.map(item => locationAdd(item));
      })
      .catch(e => {
        console.log(e.message);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      {}
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          ...myCoords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}

        onRegionChangeComplete={(region) => {
          setActualRegion(region);
          console.log("region: ", region);
        }
        }
      >
        {/*my location*/}
        <CustomMarker coords={myCoords}
                      icon={icons.pin}
        />

        {/*report locations*/}
        {reports?.filter(report => report.userId !== 2).map((x, index) => (
          <TouchableOpacity onPress={() => setSelectedReport(x)}
                            key={index}
          >
            <CustomMarker coords={x}
                          icon={icons.redPin}
                          selected={setSelectedReport}
            />
          </TouchableOpacity>
        ))}


      </MapView>

      {selectedReport &&
      <ReportInfo selectedReport={selectedReport}
                  makeCall={makeCall}
                  setSelectedReport={setSelectedReport}
      />
      }

      <TouchableOpacity style={styles.refreshButton}
                        onPress={() => refreshPress()}
      >
        <Image source={icons.refresh}
               style={styles.icon}
        />
      </TouchableOpacity>

    </View>
  )
    ;
};

const mapStateToProps = state => ({
  reports: state.locations.reportCoords,
  users: state.users,
});

const mapDispatchToProps = dispatch => ({
  locationAdd: (item) => dispatch(locationActions.locationAdd(item)),
  locationReset: () => dispatch(locationActions.locationReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);

const styles = StyleSheet.create({
  refreshButton: {
    position: "absolute",
    top: 15,
    left: 15,

    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 30,
    backgroundColor: COLORS.surface,
  },

  icon: {
    width: "70%",
    height: "70%",
    tintColor: COLORS.onSurface,

  },

});
