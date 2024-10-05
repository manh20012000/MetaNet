import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Notification_screen from '../Screen/Notification/Notification_screen';
import Home_screen from '../Screen/Home/Home_screen';
import User_profile from '../Screen/User/User_profile';
import Media_screen from '../Screen/Add_Media/Media_screen';
import Watch from '../Screen/Video_Watch/Watch';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Notifi_icon,
  Video_icon,
  Add_icon,
  Home_icon,
  User_icon,
} from '../assets/svg/svgfile.js';

const Tab = createBottomTabNavigator();

const Bottomtab_Navigation = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {backgroundColor: 'black'},
        tabBarIcon: ({focused, color, size}) => {
          let iconComponent;
          if (route.name === 'Home') {
            iconComponent = (
              <Home_icon
                width={28}
                height={28}
                size={focused ? 32 : 28}
                stroke={focused ? 'white' : '#888888'}
                fill={focused ? 'white' : '#888888'}
              />
            );
          } else if (route.name === 'Watch') {
            iconComponent = (
              <Video_icon
                width={28}
                height={28}
                size={focused ? 32 : 28}
                stroke={focused ? 'white' : '#888888'}
                fill={focused ? 'white' : '#888888'}
              />
            );
          } else if (route.name === 'Notifi') {
            iconComponent = (
              <Notifi_icon
                width={32}
                height={32}
                size={focused ? 32 : 28}
                stroke={focused ? 'white' : '#888888'}
                fill={focused ? 'white' : '#888888'} // Thay đổi thuộc tính fill
              />
            );
          } else if (route.name === 'User') {
            iconComponent = (
              <User_icon
                name="user"
                style={{
                  marginTop: 10,
                }}
                stroke={focused ? 'white' : '#888888'}
                size={focused ? 28 : 24}
                fill={focused ? 'white' : '#888888'} // Thay đổi thuộc tính fill
              />
            );
          }

          return iconComponent;
        },
      })}>
      <Tab.Screen name="Home" component={Home_screen} />
      <Tab.Screen name="Watch" component={Watch} />
      <Tab.Screen
        name="  "
        component={Media_screen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <Add_icon
              name=" "
              width={32}
              height={32}
              fill={'white'}
              stroke={'white'}
              style={{
                marginTop: 10,
                backgroundColor: 'white',
              }}
            />
          ),
        }}
      />
      <Tab.Screen name="Notifi" component={Notification_screen} />
      <Tab.Screen name="User" component={User_profile} />
    </Tab.Navigator>
  );
};
export default Bottomtab_Navigation;
const styles = StyleSheet.create({});
