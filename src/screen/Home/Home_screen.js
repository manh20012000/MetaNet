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
import OverPickerView from './OverPickerView.js';
import HeaderComponent from './HeaderComponent.js';
const Home_screen = ({navigation}) => {
  const color = useSelector(state => state.colorApp.value);
  const insets = useSafeAreaInsets();
  const [isModal, setIsModal] = useState(false);
  const onPressAdd = () => {
    setIsModal(!isModal);
  };
  // Hàm xử lý sự kiện khi nhấn vào Search
  const onPressSearch = () => {
    alert('Search button pressed');
    // Xử lý logic tìm kiếm ở đây
  };

  // Hàm xử lý sự kiện khi nhấn vào Message
  const onPressMessage = () => {
    alert('Message button pressed');
    // Xử lý logic tin nhắn ở đây
  };
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color.gray2, paddingTop: insets.top},
      ]}>
      <FlashList
        ListHeaderComponent={
          <HeaderComponent
            onAddPress={onPressAdd}
            onSearchPress={onPressSearch}
            onMessagePress={onPressMessage}
          />
        }
        data={data}
        renderItem={({item}) => <Text>{item.title}</Text>}
        estimatedItemSize={200}
      />
      <Modal visible={isModal} transparent={false}>
        <OverPickerView onAddPress={onPressAdd} navigation={navigation} />
      </Modal>
    </View>
  );
};
export default Home_screen;
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
