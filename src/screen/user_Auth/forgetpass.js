import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector, useDispatch} from 'react-redux';
import {
  Logos,
  Phone,
  Pass2,
  Email,
  Backsvg,
  Avatar_user,
  Passkey,
  Showeyes,
  Hideeys,
  Google,
  Facebook,
} from '../../assets/svg/svgfile';
import path from '../../util/path_confige';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import * as Yup from 'yup';
import {Formik} from 'formik';
import Spinner from 'react-native-loading-spinner-overlay';
import FlashMessage, {showMessage} from 'react-native-flash-message';

const Forgetpass = ({navigation}) => {
  const color = useSelector(state => state.colorApp.value);
  const insets = useSafeAreaInsets();
  const {width, height} = useWindowDimensions();
  const [numberPhone1, setNumberPhone1] = useState('');
  const [numberPhone2, setNumberPhone2] = useState('');
  const [numberPhone3, setNumberPhone3] = useState('');
  const [numberPhone4, setNumberPhone4] = useState('');
  const [numberPhone5, setNumberPhone5] = useState('');
  const [numberPhone6, setNumberPhone6] = useState('');
  const [timer, setTimer] = useState(180);
  const [isTouch, setIsTouch] = useState(true);
  const veryfinelpass = async () => {
    // if (numberPhone.length > 10 || numberPhone.length < 10) {
    //   showMessage({
    //     message: 'Đăng ký thất bại!',
    //     description: 'Có lỗi xảy ra, vui lòng thử lại.',
    //     type: 'danger',
    //     icon: 'danger',
    //     duration: 3000, // Thời gian hiển thị thông báo
    //   });
    //   return;
    // }
    const numberRandom = Math.floor(Math.random() * 1000000) + 1;
    console.log(numberRandom);
    await AsyncStorage.setItem('id_forget', numberRandom);

    try {
    } catch (e) {}
  };
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prevSeconds => prevSeconds - 1);
      }, 1000);

      // Clear interval khi component unmount hoặc khi đếm ngược kết thúc
      return () => clearInterval(interval);
    }
  }, [timer]);
  return (
    <ScrollView style={{flex: 1}}>
      <FlashMessage
        position="top"
        style={{borderRadius: 10, marginTop: '5%'}}
      />
      <View
        style={[
          styles.container,
          {
            width: width,
            height: height,
            backgroundColor: color.backgroudcolor,
            paddingTop: insets.top,
          },
        ]}>
        <FlashMessage position="top" style={{borderRadius: 10}} />
        <TouchableOpacity
          style={[styles.naviBack]}
          onPress={() => navigation.goBack()}>
          <Backsvg />
          <Text>Back for pass word</Text>
        </TouchableOpacity>
        <View style={[styles.logo]}>
          <Logos />
          <Text style={[styles.title, {color: color.black}]}>
            Bạn muốn lấy lại password
          </Text>
        </View>
        <View style={[styles.viewinput, {width: width, height: width / 5}]}>
          <TextInput
            onChangeText={text => {
              setNumberPhone1(text);
              if (text.length > 0 && isTouch === true) {
                setIsTouch(false);
              }
            }}
            placeholder=" "
            placeholderTextColor={color.black}
            keyboardType="numeric"
            style={[
              styles.textinput,
              {width: '10%', height: '76%', backgroundColor: color.gray},
            ]}
          />
          <TextInput
            onChangeText={text => {
              setNumberPhone2(text);
              if (text.length > 0 && isTouch === true) {
                setIsTouch(false);
              }
            }}
            placeholder=" "
            placeholderTextColor={color.black}
            keyboardType="numeric"
            style={[
              styles.textinput,
              {width: '10%', height: '76%', backgroundColor: color.gray},
            ]}
          />
          <TextInput
            onChangeText={text => {
              setNumberPhone3(text);
              if (text.length > 0 && isTouch === true) {
                setIsTouch(false);
              }
            }}
            placeholder=" "
            placeholderTextColor={color.black}
            keyboardType="numeric"
            style={[
              styles.textinput,
              {width: '10%', height: '76%', backgroundColor: color.gray},
            ]}
          />
          <TextInput
            onChangeText={text => {
              setNumberPhone4(text);
              if (text.length > 0 && isTouch === true) {
                setIsTouch(false);
              }
            }}
            placeholder=" "
            placeholderTextColor={color.black}
            keyboardType="numeric"
            style={[
              styles.textinput,
              {width: '10%', height: '76%', backgroundColor: color.gray},
            ]}
          />
          <TextInput
            onChangeText={text => {
              setNumberPhone5(text);
              if (text.length > 0 && isTouch === true) {
                setIsTouch(false);
              }
            }}
            placeholder=" "
            placeholderTextColor={color.black}
            keyboardType="numeric"
            style={[
              styles.textinput,
              {width: '10%', height: '76%', backgroundColor: color.gray},
            ]}
          />
          <TextInput
            onChangeText={text => {
              setNumberPhone6(text);
              if (text.length > 0 && isTouch === true) {
                setIsTouch(false);
              }
            }}
            placeholder=" "
            placeholderTextColor={color.black}
            keyboardType="numeric"
            style={[
              styles.textinput,
              {width: '10%', height: '76%', backgroundColor: color.gray},
            ]}
          />
        </View>
        <View
          style={[
            styles.viewinput,
            {width: width, height: width / 6, marginTop: '5%'},
          ]}>
          <Text style={{color: color.white, fontWeight: '700'}}>
            Thời gian còn lại :  <Text style={{color: color.red}}>{timer}</Text>
          </Text>
        </View>
        <TouchableOpacity
          disabled={isTouch}
          onPress={veryfinelpass}
          style={[styles.touchsend, {color: color.pink}]}>
          <Text>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Forgetpass;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  naviBack: {
    width: '100%',
    height: '5%',
    paddingHorizontal: 10,
    alignContent: 'center',
  },
  logo: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewinput: {
    paddingHorizontal: '2%',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textinput: {
    fontWeight: 'bold',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  touchsend: {
    width: '90%',
    height: '7%',
    backgroundColor: '#F44336',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    top: '30%',
    alignSelf: 'center',
  },
});
