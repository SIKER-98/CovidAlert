import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";

const RegisterScreen = ({ route, navigation, login }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function registerClick() {
    if (email === "") {
      setErrorMessage("Enter email address");
      return;
    } else if (username === "") {
      setErrorMessage("Enter username");
      return;
    } else if (password1 === "") {
      setErrorMessage("Enter password");
      return;
    } else if (password2 === "") {
      setErrorMessage("Enter password confirmation");
      return;
    } else if (password1 !== password2) {
      setErrorMessage("Passwords are different");
      return;
    }

    setErrorMessage("Register complete");
  }

  return (
    <View style={styles.container}>
      {/*logo*/}
      <Text style={styles.logo}>Covid Helper</Text>

      {/*bledy*/}
      <Text style={styles.errorMessage}>{errorMessage}</Text>

      <View style={styles.inputView}>
        <TextInput style={styles.inputText}
                   placeholder={"Email..."}
                   placeholderTextColor={COLORS.onPrimary}
                   onChangeText={text => setEmail(text)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput style={styles.inputText}
                   placeholder={"Username..."}
                   placeholderTextColor={COLORS.onPrimary}
                   onChangeText={text => setUsername(text)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput style={styles.inputText}
                   placeholder={"Password..."}
                   placeholderTextColor={COLORS.onPrimary}
                   onChangeText={text => setPassword1(text)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput style={styles.inputText}
                   placeholder={"Password confirmation..."}
                   placeholderTextColor={COLORS.onPrimary}
                   onChangeText={text => setPassword2(text)}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn}
                        onPress={() => registerClick()}
      >
        <Text style={styles.loginText}>REGISTER</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login", {})}>
        <Text style={styles.signupText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

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
