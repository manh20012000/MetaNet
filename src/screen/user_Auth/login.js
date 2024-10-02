import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
// import {AuthContext} from '../Navigation/useContext';
import styles from './StyleLogin.js';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import path from '../../util/path_confige.js';
import {HandlerNotification} from '../../util/checking_fcmtoken.js';
import {useSelector, useDispatch} from 'react-redux';
import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  NativeModuleError,
  statusCodes,
  User,
} from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';
import {
  Avatar_user,
  Passkey,
  Logos,
  Showeyes,
  Hideeys,
  Google,
  Facebook,
} from '../../assets/svg/svgfile.js';
GoogleSignin.configure({
  client_id:
    '696940661197-03ljc2ptvfmdghjiun0gbfc1l8cdmnep.apps.googleusercontent.com',
});
const Login = ({navigation}) => {
  const color = useSelector(state => state.colorApp.value);
  // const {datas, setData} = useContext([]);
  const [emailphone, setName] = useState('');
  const [matkhau, setPass] = useState('');
  const [hienthi, setHienthi] = useState(true);
  const hanlderlogin = async () => {
    navigation.navigate('Bottomtab_Navigation');
    // try {
    //   if (emailphone == '' || matkhau == '') {
    //     alert('vui lòng nhập tài khoản hoặc mật khẩu ');
    //     return;
    //   }

    //   const {data} = await axios.post(
    //     `${path}/api/user/login`,
    //     {
    //       email: emailphone,
    //       password: matkhau,
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     },
    //   );

    //   if (data) {
    //     await HandlerNotification.checknotificationPemision(data);

    //     await AsyncStorage.setItem('data', JSON.stringify(data));
    //     await AsyncStorage.setItem(
    //       'accessToken',
    //       JSON.stringify(data.ascesstoken),
    //     );
    //     await AsyncStorage.setItem(
    //       'refreshToken',
    //       JSON.stringify(data.refreshtoken),
    //     );
    //     const getdata = await AsyncStorage.getItem('data');

    //     navigation.navigate('Home');
    //     // setPass('');
    //     // setName('');
    //   } else {
    //     alert('tài khoản hoặc mật khẩu không chính xác');
    //   }
    // } catch (eror) {
    //   if (eror === 403) {
    //     console.log('tai khoan mât khẩu không chình xác');
    //   } else {
    //     console.log(eror, 'looi dang nhap  voiw gg');
    //   }
    // }
  };
  const [eye, setEys] = useState(false);
  const anhien = () => {
    console.log('anhien');
    setHienthi(!hienthi);
  };
  const SiginWithGg = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      await GoogleSignin.hasPlayServices();
      const userInfor = await GoogleSignin.signIn();
      const gguser = userInfor.data;
      console.log(gguser);
      const authStatus = await messaging().requestPermission();
      if (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      ) {
        const fcmtoken = await AsyncStorage.getItem('fcmtoken');
        console.log(fcmtoken, 'fcmtoken');
        if (!fcmtoken) {
          const token = await messaging().getToken();
          let avatar = gguser.photo;
          if (gguser.photo == null) {
            avatar =
              'https://cdn.thoitiet247.edu.vn/wp-content/uploads/2024/04/nhung-hinh-anh-girl-xinh-de-thuong.webp';
          }
          const user = {
            email: gguser.email,
            password: gguser.id,
            name: gguser.name,
            avatar: avatar,
            fcmtoken: [token],
          };
          const {data} = await axios.post(
            `${path}/api/user/siginGoogle`,
            user,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );
          console.log(data, 'giá strij dâtta');
          await AsyncStorage.setItem('data', JSON.stringify(data));
          await AsyncStorage.setItem(
            'accessToken',
            JSON.stringify(data.ascesstoken),
          );
          await AsyncStorage.setItem(
            'refreshToken',
            JSON.stringify(data.refreshtoken),
          );
          // await setData(JSON.stringify(data));
          navigation.navigate('Home');
        }
      }
    } catch (error) {
      console.log('Error with Google Sign-In:', error, error.code);
    }
  };

  const handlerLogoutGg = async () => {
    await GoogleSignin.signOut();
    console.log('logout');
  };
  return (
    <ScrollView style={[styles.container]}>
      <View style={[styles.header]}>
        <Logos />
        <Text style={[{color: 'black', fontSize: 24, fontWeight: 'bold'}]}>
          Đăng Nhập Tài Khoản
        </Text>
      </View>
      <View style={styles.body}>
        <View style={styles.bodycon}>
          <Text style={{color: color.black, fontWeight: 'bold'}}>UserName</Text>
          <View
            style={[
              styles.IuserName,
              {
                borderRadius: 24,
                borderWidth: 1,
                borderColor: 'black',
                paddingLeft: '2%',
              },
            ]}>
            <Avatar_user />
            <TextInput
              placeholderTextColor={color.gray}
              placeholder="Enter email or phone"
              style={[
                styles.textinput,
                {fontFamily: 'Fredoka-Bold.ttf', placeholderTextColor: 'pink'},
              ]}
              value={emailphone}
              onChangeText={emailphone => setName(emailphone)}
              keyboardType="email-address"
            />
          </View>
          <Text style={{color: color.black, fontWeight: 'bold'}}>PassWord</Text>
          <View
            style={[
              styles.IuserName,
              {
                borderRadius: 24,
                borderWidth: 1,
                borderColor: 'black',
                paddingHorizontal: '2%',
              },
            ]}>
            <Passkey />
            <TextInput
              placeholderTextColor={color.gray}
              placeholder="Enter password"
              style={[styles.textinput, {fontFamily: 'Fredoka-Bold'}]}
              secureTextEntry={hienthi}
              titleAler="vui long nhap thong tin chnh sac"
              value={matkhau}
              onChangeText={matkhau => {
                setPass(matkhau);
                if (matkhau != '') {
                  console.log('jajaaj');
                  setEys(true);
                } else {
                  setEys(false);
                }
              }}
            />
            {eye === true && (
              <TouchableOpacity onPress={anhien}>
                {hienthi ? <Showeyes /> : <Hideeys />}
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            style={{justifyContent: 'flex-end', alignSelf: 'flex-end'}}>
            <Text style={{color: color.black, fontWeight: 'bold'}}>
              Quyên mật khẩu
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: 'red',
                justifyContent: 'center',
                borderRadius: 20,
                alignItems: 'center',
              },
            ]}
            onPress={hanlderlogin}>
            <Text
              style={[
                styles.btnTxt,
                {textAlign: 'center', color: color.black},
              ]}>
              Login
            </Text>
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: '5%',
            }}>
            <Text style={{color: color.black, fontWeight: '400'}}>
              Bạn chưa có tài khoản
              <Text
                onMagicTap={() => {
                  console.log('sjndscnjsdn');
                }}
                onPress={() => {
                  console.log('dbsjdsjn');
                  navigation.navigate('Register');
                }}
                style={{color: 'green'}}>
                {' '}
                ? Đăng ký ngay
              </Text>
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          width: '80%',
          alignSelf: 'center',
          flexDirection: 'row',
          marginBottom: '5%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '40%',
            height: 2,
            flexDirection: 'row',

            backgroundColor: color.black,
            alignItems: 'center',
            justifyContent: 'center',
          }}></View>
        <Text style={{alignSelf: 'center', color: color.black}}>Hoặc</Text>
        <View
          style={{
            width: '40%',
            backgroundColor: color.black,
            height: 2,
            alignSelf: 'center',
            flexDirection: 'row',
          }}></View>
      </View>
      <View
        style={{
          width: '50%',
          height: '10%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <TouchableOpacity
          onPress={SiginWithGg}
          style={{
            justifyContent: 'center',
            flexDirection: 'row',

            alignItems: 'center',
          }}>
          <Google />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Facebook />
        </TouchableOpacity>
      </View>
      <View style={styles.flooter}></View>
    </ScrollView>
  );
};
export default Login;
