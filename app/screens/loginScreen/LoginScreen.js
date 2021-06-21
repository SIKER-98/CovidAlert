import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { connect, useSelector } from "react-redux";
// import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";
import actions from "../../redux/actions/userActions";
import axios from "../../api/axiosHelper";

const LoginScreen = ({ route, navigation, login, logout }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [test, setTest] = useState("");

  useEffect(() => {
    logout();
  }, []);

  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  const loginClick = async () => {
    const api = "login";

    let status = -1;

    await axios.post(api, { email, password }, {})
      .then(res => {
        console.log(res.data);
        status = res.status;
        axios.defaults.headers = { "Authorization": `Bearer ${res.data.token}` };
        login({ email, userId: res.data.userId, token: res.data.token });
      });

    if (status === 200) {
      clearForm();
      navigation.push("Menu");
    } else {
      setErrorMessage("Invalida data");
    }
  };

  const userInfo = useSelector(state => state.users);

  return (
    <View style={styles.container}>
      {/*logo*/}
      <Text style={styles.logo}>Covid Helper</Text>

      {/*informacja o bledzie*/}
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      {/*<Text style={styles.errorMessage}>{userInfo.userId} {userInfo.username} {userInfo.email}</Text>*/}

      {/*pola tekstowe*/}
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder={"Email..."}
          placeholderTextColor={COLORS.onPrimary}
          onChangeText={text => setEmail(text)}
          defaultValue={""}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder={"Password..."}
          placeholderTextColor={COLORS.onPrimary}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
      </View>

      {/*<TouchableOpacity>*/}
      {/*  <Text style={styles.forgotText}>Forgot Password?</Text>*/}
      {/*</TouchableOpacity>*/}

      <TouchableOpacity style={styles.loginBtn}
                        onPress={() => loginClick()}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register", {})}>
        <Text style={styles.signupText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(actions.login(user)),
  logout: () => dispatch(actions.logout()),
});

export default connect(null, mapDispatchToProps)(LoginScreen);

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
