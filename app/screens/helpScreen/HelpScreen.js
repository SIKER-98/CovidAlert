import React, { useEffect, useState } from "react";
import { Alert, BackHandler, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { connect, useSelector } from "react-redux";
import reportActions from "../../redux/actions/reportActions";
import findCoordinates from "../../functions/findCoordinates";

import store from "../../redux/store";

const HelpScreen = ({ route, navigation, addReport }) => {
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [coords, setCoords] = useState({});
  const user = useSelector(state => state.users);

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  useEffect(() => {
    findCoordinates(setCoords);
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    };
  }, []);

  const validateReport = (userId, username, latitude, longitude, message, contactNumber) => {
    if (userId === 0) {
      Alert.alert("Problem with user!");
      return false;
    }

    if (username === "") {
      Alert.alert("Problem with username!");
      return false;
    }

    if (!latitude || !longitude) {
      Alert.alert("Problem with geolocations!");
      return false;
    }

    if (message === "") {
      Alert.alert("Enter message!");
      return false;
    }

    if (contactNumber === "") {
      Alert.alert("Enter contact number!");
      return false;
    }

    return true;
  };

  const pressAddReport = () => {
    const validation = validateReport(user.userId, user.username, coords.latitude, coords.longitude, message, number);

    if (validation) {
      const item = {
        userId: user.userId,
        username: user.username,
        latitude: coords.latitude,
        longitude: coords.longitude,
        message: message,
        phoneNumber: number,
      };
      console.log("New report:", item);

      //TODO: wysalnie na backend
      addReport(item);
      Alert.alert("Report added!");
      navigation.navigate("Menu");
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Help is needed?</Text>

      <View style={styles.inputView}>
        <TextInput style={styles.inputText}
                   placeholder={"Contact number..."}
                   placeholderTextColor={COLORS.onPrimary}
                   onChangeText={text => setNumber(text)}
                   keyboardType={"phone-pad"}
        />
      </View>

      <View style={styles.inputViewMulti}>
        <TextInput style={styles.inputText}
                   placeholder={"Your message..."}
                   placeholderTextColor={COLORS.onPrimary}
                   onChangeText={text => setMessage(text)}
                   multiline={true}
                   numberOfLines={8}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn}
                        onPress={() => pressAddReport()}
      >
        <Text style={styles.loginText}>Add report</Text>
      </TouchableOpacity>
    </View>
  );
};


const mapDispatchToProps = dispatch => ({
  addReport: item => dispatch(reportActions.addReport(item)),
});

export default connect(null, mapDispatchToProps)(HelpScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    ...FONTS.largeTitle,
    fontWeight: "bold",
    color: COLORS.primary2,
    marginBottom: SIZES.padding * 3,
  },

  inputView: {
    width: "80%",
    backgroundColor: COLORS.primary2,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding * 2,
  },

  inputViewMulti: {
    width: "80%",
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding * 2,
  },

  inputText: {
    ...FONTS.h3,
    color: COLORS.onPrimary,
  },

  loginBtn: {
    width: "80%",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SIZES.padding * 4,
    marginBottom: SIZES.padding,
  },

  loginText: {
    ...FONTS.h3,
    color: COLORS.onPrimary,
  },

  errorMessage: {
    ...FONTS.body2,
    color: COLORS.error,
    marginBottom: SIZES.padding,
  },

});
