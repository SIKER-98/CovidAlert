import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";

const LoginScreen = ({ route, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <View style={styles.container}>
      {/*logo*/}
      <Text style={styles.logo}>Covid Helper</Text>

      {/*informacja o bledzie*/}
      <Text style={styles.errorMessage}>{errorMessage}</Text>

      {/*pola tekstowe*/}
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder={"Email..."}
          placeholderTextColor={COLORS.onPrimary}
          onChangeText={text => setEmail(text)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder={"Password..."}
          placeholderTextColor={COLORS.onPrimary}
          onChangeText={text => setPassword(text)}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.signupText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

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

  inputText: {
    ...FONTS.h3,
    color: COLORS.onPrimary,
  },

  forgotText: {
    ...FONTS.body3,
    color: COLORS.onBackground,
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

  signupText: {
    ...FONTS.body3,
    color: COLORS.onBackground,
  },

  errorMessage: {
    ...FONTS.body2,
    color: COLORS.error,
    marginBottom: SIZES.padding,
  },


});
