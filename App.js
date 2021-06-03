/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import type { Node } from "react";
import LoginScreen from "./app/screens/loginScreen/components/LoginScreen";
import { Provider } from "react-redux";
import store from "./store";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import RegisterScreen from "./app/screens/registerScreen/components/RegisterScreen";
import MenuScreen from "./app/screens/menuScreen/components/MenuScreen";
import MapScreen from "./app/screens/mapScreen/components/MapScreen";

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

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
