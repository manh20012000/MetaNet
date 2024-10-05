import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector, useDispatch} from 'react-redux';
import {Search, Message, Add} from '../../assets/svg/svgfile';
import path from '../../util/path_confige';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import * as Yup from 'yup';
import {Formik} from 'formik';
import Spinner from 'react-native-loading-spinner-overlay';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {FlashList} from '@shopify/flash-list';
import {Backsvg} from '../../assets/svg/svgfile';
const OnpicktureUpload = ({route, navigation}) => {
  const color = useSelector(state => state.colorApp.value);
  const insets = useSafeAreaInsets({});
  console.log(route.params);
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color.gray2, paddingTop: insets.top},
      ]}>
      <TouchableOpacity style={[styles.backsvg]}>
        <Backsvg
          backgroundColor="white"
          fill={'white'}
          stroke={'white'}
          style={{backgroundColor: color.white}}
        />
      </TouchableOpacity>
    </View>
  );
};
export default OnpicktureUpload;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '3%',
    paddingVertical: '2%',
    backgroundColor: '#212121',
    width: '100%',
    height: '5%',
  },
  backsvg: {
    width: '10%',
    height: '5%',
    left: 15,
    top: 20,
  },
});
