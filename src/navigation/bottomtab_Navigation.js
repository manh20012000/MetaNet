import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Notification_screen from '../screen/Notification/Notification_screen';
import Home_screen from '../screen/Home/Home_screen';
import User_profile from '../screen/User/User_profile';
import Media_screen from '../screen/Add_Media/Media_screen';
import Watch from '../screen/Video_Watch/Watch';
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
