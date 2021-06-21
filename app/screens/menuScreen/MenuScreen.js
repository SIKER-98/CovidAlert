import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, BackHandler, Alert } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { connect, useDispatch, useSelector } from "react-redux";
import actions from "../../redux/actions/userActions";

const MenuScreen = ({ route, navigation, logout }) => {
  const user = useSelector(state => state.users);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "YES", onPress: () => {
            logout();
            BackHandler.exitApp();
          },
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, []);


  function logoutPress() {
    logout();
    navigation.navigate("Login", {});
  }

  return (
    <View style={styles.container}>

      <Text style={styles.logo}>Covid Helper</Text>
      <Text style={styles.userText}>Hello: {user.username}</Text>

      <TouchableOpacity style={styles.menuBtn}
                        onPress={() => navigation.navigate("Help")}
      >
        <Text style={styles.btnText}>I need help</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuBtn}
                        onPress={() => navigation.navigate("Map")}
      >
        <Text style={styles.btnText}>Persons who need help</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuBtn}
                        onPress={() => navigation.navigate("Report")}
      >
        <Text style={styles.btnText}>My reports list</Text>
      </TouchableOpacity>

      {/*<TouchableOpacity style={styles.menuBtn}*/}
      {/*                  onPress={() => navigation.navigate("Credits")}*/}
      {/*>*/}
      {/*  <Text style={styles.btnText}>Credits</Text>*/}
      {/*</TouchableOpacity>*/}

      <TouchableOpacity style={styles.logoutBtn}
                        onPress={() => logoutPress()}
      >
        <Text style={styles.btnText}>LOGOUT</Text>
      </TouchableOpacity>

    </View>
  );
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout()),
});

export default connect(null, mapDispatchToProps)(MenuScreen);

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

    menuBtn: {
      width: "80%",
      backgroundColor: COLORS.primary2,
      borderRadius: SIZES.radius,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: SIZES.padding * 4,
      marginBottom: SIZES.padding,
    },

    logoutBtn: {
      width: "80%",
      backgroundColor: COLORS.primary,
      borderRadius: SIZES.radius,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: SIZES.padding * 4,
      marginBottom: SIZES.padding,
    },

    btnText: {
      ...FONTS.h3,
      color: COLORS.onPrimary,
    },

    userText: {
      ...FONTS.body3,
      color: COLORS.onBackground,
    },
  },
);
