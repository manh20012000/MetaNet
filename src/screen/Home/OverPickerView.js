import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Platform,
  useWindowDimensions,
} from 'react-native';
import Video, {VideoRef} from 'react-native-video';
import React, {useEffect, useReducer, useState} from 'react';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {Cameraicon} from '../../assets/svg/svgfile';
import {launchCamera} from 'react-native-image-picker';
const OverPickerView = ({onPressAdd, navigation}) => {
  const [photos, setPhotos] = useState([]);
  const [imagePickture, setImagePickture] = useState([]);
  const [page, setPage] = useState(1); // State quản lý pagination (số lượng đã tải)
  const {width, height} = useWindowDimensions();
  const [list_image, setListImage] = useState([]);
  const [Is_selected, setSelectedItems] = useState(false);
  async function hasAndroidPermission() {
    const getCheckPermissionPromise = () => {
      if (Platform.Version >= 33) {
        return Promise.all([
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          ),
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          ),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission,
        );
      } else {
        return PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      }
    };

    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    }
    const getRequestPermissionPromise = () => {
      if (Platform.Version >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          statuses =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    };

    return await getRequestPermissionPromise();
  }
  const fetchPhotos = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    const Photos = await CameraRoll.getPhotos({
      assetType: 'All',
      first: 5, // Số lượng tải tùy thuộc vào số trang hiện tại
    });

    if (Photos.edges && Photos.edges.length > 0) {
      setPhotos([{node: {image: 'máy ảnh', id: '12345'}}, ...Photos.edges]);
      setPage(prevPage => prevPage + 1);
    } else {
      console.log('No photos found');
    }
  };
  useEffect(() => {
    fetchPhotos();
  }, []);
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
      saveToPhotos: true,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera error: ', response.errorMessage);
      } else {
        console.log('Image URI: ', response.assets);
        setImagePickture(response.assets);
        navigation.navigate('OnpicktureUpload');
      }
    });
    /*[{"fileName": "rn_image_picker_lib_temp_c005111d-c2a7-48e9-b297-31e98d7b19bd.jpg", "fileSize": 1989291, "height": 3264, "originalPath": "file:///data/user/0/com.metanet/cache/rn_image_picker_lib_temp_c005111d-c2a7-48e9-b297-31e98d7b19bd.jpg", "type": "image/jpeg", "uri": "file:///data/user/0/com.metanet/cache/rn_image_picker_lib_temp_c005111d-c2a7-48e9-b297-31e98d7b19bd.jpg", "width": 2448}] */
  };
  const selectTed = item => {
    setSelectedItems(prevSelectedItems => {
      if (prevSelectedItems.includes(item.node.id)) {
        // If item is already selected, remove it
        return prevSelectedItems.filter(id => id !== item.node.id);
      } else {
        // If item is not selected, add it
        return [...prevSelectedItems, item.node.id];
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Music</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Templates</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Memories</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => {
            console.log('Press');
            fetchPhotos();
          }}>
          <Text style={styles.navText}>Photos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.gridContainer}>
        <FlatList
          data={photos}
          keyExtractor={(item, index) => {
            index.toString();
          }}
          renderItem={({item}) => (
            <>
              {item.node.image === 'máy ảnh' ? (
                <TouchableOpacity
                  onPress={() => {
                    requestCameraPermission();
                  }}
                  style={[
                    styles.imageWrapper,
                    {
                      backgroundColor: '#333333',
                      width: width / 3,
                      height: height / 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    },
                  ]}>
                  <Cameraicon />
                </TouchableOpacity>
              ) : (
                <View
                  style={[
                    styles.imageWrapper,
                    {
                      backgroundColor: 'black',
                      width: width / 2,
                      height: height / 3,
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'relative',
                    },
                  ]}>
                  <TouchableOpacity
                    onPress={() => {
                      selectTed(item);
                    }}
                    style={{
                      width: width / 15,
                      height: width / 15,
                      position: 'absolute',
                      top: '2%',
                      right: '2%',
                      backgroundColor: Is_selected
                        ? 'blue'
                        : 'rbga(255,255,255,0.5)',
                      borderWidth: 3,
                      borderColor: 'white',
                      borderRadius: 100,
                      zIndex: 1,
                      opacity: 0.7,
                    }}></TouchableOpacity>
                  {item.node.type === 'image/jpeg' ? (
                    <Image
                      source={{uri: item.node.image.uri}}
                      style={styles.image}
                      resizeMode="contain"
                    />
                  ) : (
                    <Video
                      source={{uri: item.node.image.uri}}
                      style={styles.image}
                      resizeMode="contain"
                      repeat
                    />
                  )}
                </View>
              )}
            </>
          )}
          numColumns={3}
          // initialNumToRender={10} // Initial number of items to render
          // maxToRenderPerBatch={10} // Maximum number of items to render per batch
          // windowSize={5}
          // onEndReached={fetchPhotos}
          // onEndReachedThreshold={0.3}
          // getItemLayout={(data, index) => ({
          //   length: height / 3,
          //   offset: (height / 3) * index,
          //   index,
          // })}
        />
      </View>
      {/* Select Button */}
      <TouchableOpacity style={styles.selectButton}>
        <Text style={styles.selectText}>Select</Text>
      </TouchableOpacity>
    </View>
  );
};
export default OverPickerView;
const styles = StyleSheet.create({
  imageWrapper: {
    flex: 1,
    margin: 2,
  },
  container: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#1c1c1e',
    width: '100%',
    height: '20%',
  },
  navButton: {
    width: '20%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,

    paddingHorizontal: 10,
  },
  navText: {
    color: '#fff',
    fontSize: 14,
  },
  gridContainer: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: '#333333',
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  selectButton: {
    position: 'absolute',
    top: '0%',
    right: '2%',
    backgroundColor: '#007aff',
    padding: 10,
    borderRadius: 5,
  },
  selectText: {
    color: '#fff',
    fontSize: 16,
  },
});
