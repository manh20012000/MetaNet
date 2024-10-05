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
import {data} from './fectdata.js';

const HeaderComponent = ({
  onAddPress,
  onSearchPress,
  onMessagePress,
  navigation,
}) => {
  const color = useSelector(state => state.colorApp.value);
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          width: '100%',
          height: '50%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
        },
      ]}>
      <Text
        style={{
          color: color.white,
          fontWeight: '800',
          fontSize: 20,
          fontFamily: 'Helvetica',
        }}>
        METANET
      </Text>
      <View style={[styles.header2]}>
        <TouchableOpacity onPress={onAddPress}>
          <Add
            style={{
              width: 28,
              height: 28,

              boderRadius: 100,
            }}
            width={28}
            height={28}
            stroke={'white'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onSearchPress}>
          <Search
            style={{
              width: 28,
              height: 28,

              boderRadius: 100,
            }}
            width={28}
            height={28}
            stroke={'white'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onMessagePress}>
          <Message
            style={{
              width: 28,
              height: 28,
              boderRadius: 100,
            }}
            width={28}
            height={28}
            stroke={'white'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderComponent;
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
  header2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '30%',
  },
});
