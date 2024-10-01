import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Notification_screen from '../Screen/Notification/Notification_screen';
import Home_screen from '../Screen/Home/Home_screen';
import User_profile from '../Screen/User/User_profile';
import Media_screen from '../Screen/Add_Media/Media_screen';
import Watch from '../Screen/Video_Watch/Watch';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

const bottomtab_Navigation = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {backgroundColor: 'black'},
      })}>
      <Tab.Screen
        name="Home_screen"
        component={Home_screen}
        // initialParams={{ data: route.params }}
      />
      <Tab.Screen name="Watch" component={Watch} />
      <Tab.Screen
        name="Media_screen "
        component={Media_screen}
        options={{
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen name="Notification_screen" component={Notification_screen} />
      <Tab.Screen name="User_profile" component={User_profile} />
    </Tab.Navigator>
  );
};
export default bottomtab_Navigation;
const styles = StyleSheet.create({});
