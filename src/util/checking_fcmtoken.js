import messaging from '@react-native-firebase/messaging';
import {useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../Navigation/useContext';
import axios from 'axios';
import path from './path_confige';
export class HandlerNotification {
  static userData = '';
  static checknotificationPemision = async datauser => {
    const authStatus = await messaging().requestPermission();
    this.userData = datauser;
    console.log('caap nhat laij fcmtoken4');
    if (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      this.getFcmToken();
    }
  };
  static getFcmToken = async () => {
    console.log('caap nhat laij fcmtoken3');
    const fcmtoken = await AsyncStorage.getItem('fcmtoken');
    if (!fcmtoken) {
      const token = await messaging().getToken();
      if (token) {
        await AsyncStorage.setItem('fcmtoken', token);
        await this.updatatokenforuser(token);
      }
    }
  };
  static updatatokenforuser = async token => {
    // console.log('caap nhat laij fcmtoken2', token);
    try {
      if (this.userData) {
        const {fcmToken} = this.userData;

        if (fcmToken && !fcmToken.includes(token)) {
          console.log(typeof fcmToken);
          // console.log(Object.isFrozen(fcmToken)); // Kiểm tra xem mảng có bị đóng băng không
          // fcmToken.push(token);
          const arraysToken = [...fcmToken, token];

          await this.update(arraysToken, this.userData);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  static update = async (fcmtoken, auth) => {
    try {
      console.log('caap nhat laij fcmtoken1', this.userData._id, fcmtoken);
      const {data} = await axios.put(
        `${path}/api/user/fcmtoken/${auth._id}`,
        {fcmtoken},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (data.status === 200) {
        const dataUser = {
          _id: data.data._id,
          name: data.data.name,
          avatar: data.data.avatar,
          email: data.data.email,
          fcmToken: data.data.fcmToken,
          accessToken: this.userData.accessToken,
          refreshToken: this.userData.refreshToken,
        };
        await AsyncStorage.setItem('user', JSON.stringify(dataUser));
      }
    } catch (err) {
      console.log('can not update token fail err', err);
      return null;
    }
  };
}
