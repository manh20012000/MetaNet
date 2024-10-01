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
  const handlerGenaraID = async () => {
      
    }
  return (
    <ScrollView style={{flex: 1}}>
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
            placeholder="nhập số điện thoại của bạn"
            placeholderTextColor={color.black}
            keyboardType="numeric"
            style={[
              styles.textinput,
              {width: '90%', height: '76%', backgroundColor: color.gray},
            ]}></TextInput>
        </View>
        <TouchableOpacity style={[styles.touchsend, {color: color.pink}]}>
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
