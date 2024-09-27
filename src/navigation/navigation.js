import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screen/login.js';
import Register from '../screen/register.js';

const Stack = createNativeStackNavigator();
const navigation=()=> {
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
}
export default navigation
const styles = StyleSheet.create({});
