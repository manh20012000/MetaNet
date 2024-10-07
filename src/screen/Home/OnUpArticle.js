import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TextInput,
  Modal,
  useWindowDimensions,
  Image,
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
import MediaGrid from '../Component/GridMedia';
const OnpicktureUpload = ({route, navigation}) => {
  const color = useSelector(state => state.colorApp.value);
  const insets = useSafeAreaInsets({});
  const user = useSelector(state => state.auth.value);
  // console.log(user);
  const {width, height} = useWindowDimensions();
  console.log(route.params);
  const [lemngthSelectImage, setLengtSelectImage] = useState(
    route.params.length,
  );
  // sử lý với phần thực hiện hiển thhi ảnh
  const handlerOnviewMore = () => {
    console.log('hahahah ');
  };
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: color.gray2,
          paddingTop: insets.top,
          paddingHorizontal: '2%',
        },
      ]}>
      <View style={styles.containerheader}>
        <TouchableOpacity
          style={[styles.backsvg]}
          onPress={() => {
            navigation.goBack();
          }}>
          <Backsvg
            backgroundColor="white"
            fill={'white'}
            stroke={'white'}
            style={{backgroundColor: color.white}}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.textHeader,
            {
              color: color.white,
              fontSize: 18,
              fontWeight: 'bold',
              fontFamily: 'fontsFredoka_Condensed-Bold.ttf',
            },
          ]}>
          Tạo bài viết
        </Text>
      </View>
      <View
        style={{
          backgroundColor: color.white,
          width: '100%',
          height: 2,
        }}></View>
      <View style={styles.viewUser}>
        <View
          style={{
            backgroundColor: color.gray,
            width: width / 6,
            height: width / 6,
            borderRadius: 100,
            borderWidth: 1,
          }}>
          <Image
            source={{uri: user.avatar}}
            style={{width: '100%', height: '100%', borderRadius: 100}}></Image>
        </View>
        <Text style={{color: color.white, fontWeight: 'bold', fontSize: 24}}>
          {user.name}
        </Text>
      </View>

      <View
        style={[
          styles.wiewText,
          {
            backgroundColor: color.white,
          },
        ]}></View>
      <View
        style={[
          styles.viewImage,
          {
            backgroundColor: color.white,
            width: lemngthSelectImage > 1 ? '100%' : '100%',
            height: lemngthSelectImage > 1 ? '50%' : width + 100,
          },
        ]}>
        <MediaGrid mediaList={route.params} onViewMore={handlerOnviewMore} />
      </View>

      <View style={[styles.status, {backgroundColor: color.gray}]}></View>
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
    paddingVertical: '2%',
    backgroundColor: '#212121',
    width: '100%',
    height: '5%',
  },
  containerheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    height: '5%',
    marginTop: '5%',
  },
  backsvg: {
    width: '10%',
    height: '5%',
  },
  viewUser: {
    width: '60%',
    height: '10%',
    paddingHorizontal: '2%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  wiewText: {
    width: '100%',
    height: '20%',
    marginVertical: '2%',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'red',
    marginHorizontal: '4%',
    alignSelf: 'center',
  },
  viewImage: {
    marginVertical: '2%',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'gray',
    alignItems: 'center',
    marginBottom: '5%',
  },
  status: {
    width: '100%',
    height: '5%',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'gray',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
});
