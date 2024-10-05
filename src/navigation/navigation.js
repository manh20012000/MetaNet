import {StyleSheet, Text, View, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screen/User_Auth/login.js';
import Register from '../Screen/User_Auth/register.js';
import Bottomtab_Navigation from './bottomtab_Navigation.js';
import OnpicktureUpload from '../Screen/Home/OnUpArticle.js';
import {useDispatch} from 'react-redux';
import {login} from '../Redux_Toolkit/Reducer/auth.slice.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
const Stack = createNativeStackNavigator();
const Navigation = () => {
  const dispath = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkLoginStatus = async () => {
      const userTokenString = await AsyncStorage.getItem('user');
      const userTokenObject = JSON.parse(userTokenString);
      // console.log(typeof userTokenObject, "giá trị sau khi navigate ");
      try {
        if (userTokenObject !== null) {
          const decoded = jwtDecode(userTokenObject.refreshToken);
          const isTokenExpired = decoded.exp * 1000 < Date.now();
          if (isTokenExpired) {
            setIsLoggedIn(false);
          } else {
            console.log('hahah');
            setIsLoggedIn(true);
            dispath(login(userTokenObject));
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.log(err, 'navigation log err');
      }
      setLoading(true);
    };
    checkLoginStatus();
  }, []);
  return (
    loading && (
      <NavigationContainer
        style={{
          flex: 1,
        }}>
        <Stack.Navigator
          // initialRouteName={'Login'}
          initialRouteName={isLoggedIn ? 'Bottomtab_Navigation' : 'Login'}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="Bottomtab_Navigation"
            component={Bottomtab_Navigation}
          />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="OnpicktureUpload" component={OnpicktureUpload} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
};
export default Navigation;
const styles = StyleSheet.create({});
