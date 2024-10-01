import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screen/User_Auth/Login.js';
import Register from '../Screen/User_Auth/Register.js';

const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer
      style={{
        flex: 1,
        // paddingTop: insets.top,
      }}>
      <Stack.Navigator
        initialRouteName={'Login'}
        //   initialRouteName={isLoggedIn ? "BootonGate" : "Login"}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
const styles = StyleSheet.create({});
