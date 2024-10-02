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

const Find_user = ({navigation}) => {
  const color = useSelector(state => state.colorApp.value);
  const insets = useSafeAreaInsets();
  const {width, height} = useWindowDimensions();
  const [numberPhone, setNumberPhone] = useState('');
  const [isTouch, setIsTouch] = useState(true);
  const handlerGenaraID = async () => {
    if (numberPhone.length > 10 || numberPhone.length < 10) {
      showMessage({
        message: 'Đăng ký thất bại!',
        description: 'Có lỗi xảy ra, vui lòng thử lại.',
        type: 'danger',
        icon: 'danger',
        duration: 3000, // Thời gian hiển thị thông báo
      });
      return;
    }
    const numberRandom = Math.floor(100000 + Math.random() * 900000);
    console.log(numberRandom);
    await AsyncStorage.setItem('id_forget', numberRandom.toString());
    navigation.navigate('ForgetPass');
    // try {
    //   const respons = await axios.post(`${path}/api/user/send-forget`, {
    //     numberRandom,
    //     numberPhone,
    //   });
    //   if (respons.statusCode === 200) {
    //     showMessage({
    //       message: 'Đã gửi mã xác nhận!',
    //       description: 'Vui lòng check tin nhắn của bạn để tiếp tục.',
    //       type: 'success',
    //       icon: 'success',
    //       duration: 3000,
    //     });
    //     navigation.navigate('ForgetPass');
    //   } else {
    //     showMessage({
    //       message: 'Đăng ký thất bại!',
    //       description: 'Có l��i xảy ra, vui lòng thử lại.',
    //       type: 'danger',
    //       icon: 'danger',
    //       duration: 3000, // Th��i gian hiển thị thông báo
    //     });
    //   }
    // } catch (e) {}
  };
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
              setNumberPhone(text);
              if (text.length > 0 && isTouch === true) {
                setIsTouch(false);
              }
            }}
            placeholder="nhập số điện thoại của bạn"
            placeholderTextColor={color.black}
            keyboardType="numeric"
            style={[
              styles.textinput,
              {width: '90%', height: '76%', backgroundColor: color.gray},
            ]}
          />
        </View>
        <TouchableOpacity
          disabled={isTouch}
          onPress={handlerGenaraID}
          style={[styles.touchsend, {color: color.pink}]}>
          <Text>Xác nhận gữi sms</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Find_user;
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
    justifyContent: 'center',
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
