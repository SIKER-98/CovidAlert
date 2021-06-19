/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import type { Node } from "react";
import LoginScreen from "./app/screens/loginScreen/LoginScreen";
import { Provider } from "react-redux";
import store from "./app/redux/store";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import RegisterScreen from "./app/screens/registerScreen/components/RegisterScreen";
import MenuScreen from "./app/screens/menuScreen/MenuScreen";
import MapScreen from "./app/screens/mapScreen/MapScreen";
import HelpScreen from "./app/screens/helpScreen/HelpScreen";
import ReportScreen from "./app/screens/reportScreen/ReportScreen";

const Stack = createStackNavigator();

const App: () => Node = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}
                         initialRouteName={"Login"}>

          <Stack.Screen name={"Login"}
                        component={LoginScreen} />

          <Stack.Screen name={"Register"}
                        component={RegisterScreen} />

          <Stack.Screen name={"Menu"}
                        component={MenuScreen} />

          <Stack.Screen name={"Map"}
                        component={MapScreen} />

          <Stack.Screen name={"Help"}
                        component={HelpScreen} />

          <Stack.Screen name={"Report"}
                        component={ReportScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
