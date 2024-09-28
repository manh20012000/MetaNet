import messaging from '@react-native-firebase/messaging';
import {useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../Navigation/useContext';
import axios from 'axios';
import {USER_URL} from '../Util/Url';
export class HandlerNotification {
  static userda = '';
  static checknotificationPemision = async datauser => {
    const authStatus = await messaging().requestPermission();
    this.userda = datauser;

    if (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      this.getFcmToken();
    }
  };
  static getFcmToken = async () => {
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
    if (this.userda) {
      const {fcmtoken} = this.userda;

      if (fcmtoken && !fcmtoken.includes(token)) {
        fcmtoken.push(token);
        await this.update(fcmtoken, this.userda);
      }
    }
  };
  static update = async (fcmtoken, auth) => {
    try {
      const {data} = await axios.post(
        `${USER_URL}/api/user/getFCMTOKEN`,
        {fcmtoken, id: this.userda._id},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: auth.accesstoken,
            'Refresh-Token': auth.refreshtoken,
          },
        },
      );

      await AsyncStorage.setItem('data', JSON.stringify(data.user));
    } catch (err) {
      console.log('can not update token fail err', err);
    }
  };
}
