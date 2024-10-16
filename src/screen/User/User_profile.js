import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSocket} from '../../util/socket.io';
import {logout} from '../../Redux_Toolkit/Reducer/auth.slice';
import {HandlerNotification} from '../../util/checking_fcmtoken';
import {CommonActions} from '@react-navigation/native';
const User_profile = ({navigation}) => {
  const socket = useSocket();
  const user = useSelector(state => state.auth.value);
  const color = useSelector(state => state.colorApp.value);
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const handlerArrayfcmToken = fcmtoken => {
    return user.fcmToken.filter(token => token !== fcmtoken);
  };
  const handlerLogout = async () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {name: 'Login'}, // hoặc 'BootonGate' tùy thuộc vào màn hình mặc định bạn muốn
        ],
      }),
    );
    dispatch(logout());
    const fcmtoken = await AsyncStorage.getItem('fcmtoken');

    HandlerNotification.update(
      handlerArrayfcmToken(fcmtoken),
      user,
      '',
    );
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('fcmtoken');
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    socket?.disconnect();
    socket?.removeAllListeners();
    socket?.close();
  };
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color.black, paddingTop: insets.top},
      ]}>
      <Text>User_profile</Text>
      <TouchableOpacity
        onPress={handlerLogout}
        style={{
          backgroundColor: 'red',
          width: insets.top * 2,
          height: insets.top,
          alignSelf: 'flex-end',
        }}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
export default User_profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
