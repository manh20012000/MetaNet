/* eslint-disable no-shadow */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TextInput,
  Modal,
  Animated,
  useWindowDimensions,
  Image,
  FlatList,
  ActivityIndicator,
  Pressable,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState, useRef, useCallback, useMemo} from 'react';
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
import {launchCamera} from 'react-native-image-picker';
import {
  Backsvg,
  Map,
  Images,
  Mention,
  Tagname,
  Cameras,
  Loock,
  Public,
} from '../../assets/svg/svgfile';
import MediaGrid from '../Component/GridMedia';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {MentionInput, Suggestion} from 'react-native-controlled-mentions';
import OverPickerView from './OverPickerView.js';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';
import Geolocation from 'react-native-geolocation-service';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {useFocusEffect} from '@react-navigation/native';
const OnpicktureUpload = ({route, navigation}) => {
  const {width} = useWindowDimensions();
  const color = useSelector(state => state.colorApp.value);
  const insets = useSafeAreaInsets({});
  const user = useSelector(state => state.auth.value);
  const [value, setValue] = useState('');
  const [showFlatList, setShowFlatList] = useState(false);
  const [users, setUsers] = useState([]);
  const [tags, setTags] = useState([]);
  const [mediaList, setMediaList] = useState(route.params || []);
  const [isModal, setIsModal] = useState(false);
  const [hidesWhenStopped, sethidesWhenStopped] = useState(false);
  const [showEmojiSelector, setShowEmojiSelector] = useState(false); // Để kiểm soát hiển thị EmojiSelector
  const [showModaLocal, setShowModaLocal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [selectedEmoji, setSelectedEmoji] = useState(null); // Lưu emoji đã chọn
  const [permission, setPermision] = useState('public');
  const [expanded, setExpanded] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [places, setPlaces] = useState([]);
  const animation = useRef(new Animated.Value(0)).current;
  const onPressAdd = () => {
    setIsModal(!isModal);
  };

  useEffect(() => {
    const words = value.split(/\s+/); // Tách chuỗi thành các từ
    const lastWord = words[words.length - 1]; // Lấy từ cuối cùng

    // Gửi cả từ khóa bắt đầu với '@' hoặc '#'
    if (lastWord.startsWith('@') && lastWord.length > 0) {
      fetchMentionUsers(lastWord); // Gọi API với từ khóa bao gồm '@'
      // Hiển thị danh sách tìm kiếm
      setShowFlatList(true);
    } else if (lastWord.startsWith('#') && lastWord.length > 0) {
      fetchTagNames(lastWord); // Gọi API với từ khóa bao gồm '#'
      setShowFlatList(true);
      // Hiển thị danh sách tìm kiếm
    } else if (
      lastWord.endsWith(' ') ||
      (!lastWord.startsWith('@') && !lastWord.startsWith('#'))
    ) {
      setShowFlatList(false); // Ẩn FlatList khi từ kết thúc bằng dấu cách
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // Call API để lấy danh sách mention (users)
  const fetchMentionUsers = async keyword => {
    sethidesWhenStopped(true);
    try {
      const {data} = await axios.get(
        `${path}/api/getMention/${keyword}?_id=${user._id}`,
      );

      setUsers(data.data); // Cập nhật danh sách users từ API
      setShowFlatList(true);
    } catch (error) {
      console.error('Error fetching mention users:', error);
    } finally {
      sethidesWhenStopped(false);
    }
  };

  // Call API để lấy danh sách tagname (tags)
  const fetchTagNames = async keyword => {
    sethidesWhenStopped(true);
    try {
      const response = await axios.get(`${path}/api/getTagname`, {
        params: {
          keyword,
        },
      });
      let results = response.data.data;
      if (results.length === 0) {
        const myId = uuidv4();

        const cleanedKeyword = keyword.replace('#', '');
        results = [{id: myId, name: cleanedKeyword, isNew: true}]; // Tag mới
      }
      setTags(results); // Cập nhật danh sách tags từ API
      setShowFlatList(true);
    } catch (error) {
      console.error('Error fetching tag names:', error);
    } finally {
      sethidesWhenStopped(false);
    }
  };
  const renderSuggestions =
    suggestions =>
    ({keyword, onSuggestionPress}) => {
      if (keyword == null) {
        return null;
      }

      return (
        <View
          style={{
            position: 'absolute',
            top: insets.top + 100,
            left: 0,
            right: 0,
            backgroundColor: 'red',
            zIndex: 10,
            width: '100%',
          }}>
          {hidesWhenStopped && (
            <ActivityIndicator hidesWhenStopped={hidesWhenStopped} />
          )}
          <FlatList
            data={suggestions}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent: 'space-between',
                  marginRight: '5%',
                  alignItems: 'center',
                }}
                onPress={async () => {
                  onSuggestionPress(item);
                  setShowFlatList(false);
                  if (item.isNew === true) {
                    console.log(item);
                    try {
                      // Gọi API để thêm hashtag vào database
                      await axios.post(`${path}/api/addTagname`, {
                        hagtag: {...item, id: user._id},
                      });
                    } catch (error) {
                      console.error('Error adding hashtag:', error);
                    } finally {
                      setTags([]);
                    }
                  }
                }}>
                <Text style={[styles.suggestionItem, {color: color.white}]}>
                  {item.name}
                </Text>
                {item.isNew && (
                  <TouchableOpacity
                    onPress={async () => {
                      try {
                        // Gọi API để thêm hashtag vào database
                        await axios.post(`${path}/api/addTagname`, {
                          hagtag: {...item, id: user._id},
                        });
                      } catch (error) {
                        console.error('Error adding hashtag:', error);
                      } finally {
                        onSuggestionPress(item);
                        setTags([]);
                      }
                    }}
                    style={{
                      backgroundColor: color.blue,
                      padding: 5,
                      borderRadius: 5,
                      justifyContent: 'space-around',
                      flexDirection: 'row',
                      alignContent: 'center',
                      paddingRight: '60%',
                    }}>
                    {item?.avatar !== 'null' && (
                      <Image
                        source={{uri: item.avatar}}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 100,
                        }}
                      />
                    )}
                    <Text style={{color: color.white}}>Add</Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      );
    };
  const renderMentionSuggestions = renderSuggestions(users);

  const renderHashtagSuggestions = renderSuggestions(tags);
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        openCamera();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err, 'lỗi với mở camera ');
    }
  };
  const openCamera = () => {
    let options = {
      mediaType: 'photo',
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera error: ', response.errorMessage);
      } else {
        const item = response.assets[0];
        //[{"fileName": "rn_image_picker_lib_temp_c005111d-c2a7-48e9-b297-31e98d7b19bd.jpg", "fileSize": 1989291, "height": 3264, "originalPath": "file:///data/user/0/com.metanet/cache/rn_image_picker_lib_temp_c005111d-c2a7-48e9-b297-31e98d7b19bd.jpg", "type": "image/jpeg", "uri": "file:///data/user/0/com.metanet/cache/rn_image_picker_lib_temp_c005111d-c2a7-48e9-b297-31e98d7b19bd.jpg", "width": 2448}] */
        const imagepicker = {
          id: item.id,
          uri: item.uri,
          width: item.width,
          height: item.height,
          name: item.filename,
          type: item.type,
          fileSize: item.fileSize,
        };
        setMediaList([imagepicker]);
      }
    });
  };
  const toggleMenu = () => {
    setExpanded(!expanded);
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1, // 0: ẩn, 1: hiển thị
      duration: 500,
      useNativeDriver: true, //tối uus hóa hiệu xuất chuyển động
    }).start();
  };
  const scaleY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1], // Tăng scale từ 0 đến 1
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1], // Hiệu ứng opacity từ 0 -> 1
  });

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0], // "Mọc" từ dưới lên (di chuyển Y từ 50 đơn vị phía dưới)
  });

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['85%'], []);
  useFocusEffect(
    useCallback(() => {
      //  handleList();
      bottomSheetModalRef.current?.present();
    }, []),
  );

  const handlerbottonshet = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current?.expand();
    }
  };
  const handleSheetChanges = useCallback(index => {
    if (index === -1) {
      bottomSheetModalRef.current?.present();
    }
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Yêu cầu truy cập vị trí',
          message: 'Ứng dụng cần truy cập vị trí của bạn',
          buttonNeutral: 'Hỏi sau',
          buttonNegative: 'Hủy',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Bạn đã cho phép truy cập vị trí');
        return true;
      } else {
        console.log('Bạn đã từ chối truy cập vị trí');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  // Hàm lấy vị trí hiện tại của người dùng
  const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    await Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = await position.coords;
        console.log(`Vị trí hiện tại: ${latitude}, ${longitude}`);
        // Sau khi có tọa độ, gọi API để lấy danh sách địa điểm gần đây
        // fetchNearbyPlaces(latitude, longitude);
        console.log(await fetchNearbyPlaces(latitude, longitude));
      },
      error => {
        console.log('Error getting location: ', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  // Hàm gọi API Google Places để lấy danh sách địa điểm gần đây
  const fetchNearbyPlaces = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=establishment&key=AIzaSyB44Yutd3jtcMwS7f1Q8LbWPyORrAY-dA8`, // Thay YOUR_API_KEY bằng key thật của bạn
      );
      const places = await response.data.results;
      setPlaces(places);
      console.log('Danh sách địa điểm gần đây: ', places);
      return places;
    } catch (error) {
      console.error('Error fetching nearby places: ', error);
    }
  };

  return (
    <BottomSheetModalProvider>
      <View
        style={[
          styles.container,
          {
            backgroundColor: color.gray2,
            paddingTop: insets.top,
            paddingHorizontal: '2%',
          },
        ]}>
        <View style={[styles.containerheader, {height: width / 10}]}>
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
          <TouchableOpacity
            disabled
            style={[
              styles.bntPost,
              {width: '15%', backgroundColor: color.black},
            ]}>
            <Text
              style={{
                fontFamily: 'Fredoka_Condensed-Bold.ttf',
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              POST
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{backgroundColor: color.white, width: '100%', height: 2}}
        />
        <View style={[styles.viewUser, {height: width / 5}]}>
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
              style={{width: '100%', height: '100%', borderRadius: 100}}
            />
          </View>
          <Text style={{color: color.white, fontWeight: 'bold', fontSize: 24}}>
            {user.name}
          </Text>
        </View>
        <View
          style={[
            styles.wiewText,
            {backgroundColor: color.gray2, height: width / 5},
          ]}>
          <MentionInput
            value={value}
            onChange={setValue}
            partTypes={[
              {
                trigger: '#',
                renderSuggestions: renderHashtagSuggestions,
                textStyle: {fontWeight: 'bold', color: 'green'},
              },
              {
                trigger: '@',
                renderSuggestions: renderMentionSuggestions,
                textStyle: {fontWeight: 'bold', color: 'pink'},
              },
              {
                pattern:
                  '/(https?://|www.)[-a-zA-Z0-9@:%._+~#=]{1,256}.(xn--)?[a-z0-9-]{2,20}\b([-a-zA-Z0-9@:%_+[],.~#?&/=]*[-a-zA-Z0-9@:%_+]~#?&/=])*/gi',
                textStyle: {color: 'blue'},
              },
            ]}
            style={[styles.input, {color: color.white, width: '100%'}]}
            placeholder="Mention ai đó bằng cách dùng @"
            placeholderTextColor={color.gray}
          />
        </View>
        {!showFlatList && (
          <>
            <View
              style={[
                styles.viewImage,
                {
                  backgroundColor: color.white,
                  width: '100%',
                  height: mediaList.length > 1 ? width + 50 : width + 70,
                },
              ]}>
              <MediaGrid mediaList={mediaList} onViewMore={() => {}} />
            </View>
            <Animated.View
              style={[
                styles.menuContainer,
                {
                  opacity: opacity,
                  transform: [{translateY: translateY}, {scaleY: scaleY}],
                },
              ]}>
              <TouchableOpacity
                style={[
                  styles.menuItem,
                  {backgroundColor: permission === 'public' ? 'pink' : 'black'},
                ]}
                onPress={() => {
                  toggleMenu();
                  setPermision('public');
                }}>
                <Public />
                <Text style={styles.menuText}>Public</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.menuItem,
                  {
                    backgroundColor:
                      permission === 'private' ? 'pink' : 'black',
                  },
                ]}
                onPress={() => {
                  toggleMenu();
                  setPermision('private');
                }}>
                <Loock />
                <Text style={styles.menuText}>Private</Text>
              </TouchableOpacity>
            </Animated.View>
            <View
              style={[
                styles.status,
                {backgroundColor: color.gray, height: 45},
              ]}>
              <TouchableOpacity onPress={onPressAdd} style={[styles.icon]}>
                <Images />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={requestCameraPermission}
                style={[styles.icon]}>
                <Cameras />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.icon]}
                onPress={() => {
                  setShowModaLocal(true);
                  getCurrentLocation();
                }}>
                <Map />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handlerbottonshet}
                style={[styles.icon]}>
                <Tagname />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={toggleMenu}>
                <Mention />
              </TouchableOpacity>
            </View>
          </>
        )}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={-1}
          snapPoints={snapPoints}
          // animateOnMount={true}
          onChange={handleSheetChanges}>
          <BottomSheetView style={styles.contentContainer}>
            <EmojiSelector
              category={Categories.all}
              onEmojiSelected={emoji => {
                setSelectedEmoji(emoji); // Cập nhật emoji đã chọn
                // setShowEmojiSelector(false); // Ẩn EmojiSelector sau khi chọn emoji
              }}
              emojiSize={20}
              showSearchBar={true} // Tùy chọn, hiển thị thanh tìm kiếm
            />
          </BottomSheetView>
        </BottomSheetModal>
        <Modal
          style={{
            flex: 0.8,
            alignSelf: 'flex-end',
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }}
          visible={showModaLocal}
          animationType="slide"
          transparent
          onRequestClose={() => setShowModaLocal(false)}>
          <View
            style={{
              flex: 0.95,

              justifyContent: 'flex-end',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
            }}>
            <View
              style={{
                backgroundColor: color.white,
                flex: 0.7,
                borderRadius: 10,
              }}>
              <TextInput
                style={{color: color.black, padding: '2%', fontWeight: '700'}}
                placeholderTextColor={color.gray2}
                placeholder="nhập vị trí ">
                <Text>dbsdsjfdbdbnjcvcvs</Text>
              </TextInput>
              <FlatList
                data={places}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{
                        backgroundColor: color.gray,
                        padding: 10,
                        marginHorizontal: 10,
                        borderRadius: 10,
                      }}>
                      <Text style={{color: color.white, fontWeight: 'bold'}}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        </Modal>
        <Modal visible={isModal} transparent={false}>
          <OverPickerView onAddPress={onPressAdd} navigation={navigation} />
        </Modal>
      </View>
    </BottomSheetModalProvider>
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
    width: '100%',
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
    // borderWidth: 2,
    // borderColor: 'red',
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    fontSize: 18,
    borderRadius: 5,
  },
  suggestionItem: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  bntPost: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
  },
  iconButton: {
    padding: 10,
  },
  menuContainer: {
    borderRadius: 5,
    flexDirection: 'row',
    overflow: 'hidden',
    alignSelf: 'flex-end',
  },
  menuItem: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    marginLeft: 5,
    fontSize: 16,
  },
  contentContainer: {flex: 1, alignItems: 'center'},
});
