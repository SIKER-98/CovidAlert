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


        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
