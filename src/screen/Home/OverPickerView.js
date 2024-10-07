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
import VideoManager from '@salihgun/react-native-video-processor';
const OverPickerView = ({onAddPress, navigation}) => {
  const [photos, setPhotos] = useState([]);
  const [imagePickture, setImagePickture] = useState([]);
  const [page, setPage] = useState(1); // State quản lý pagination (số lượng đã tải)
  const {width, height} = useWindowDimensions();
  const [isSelect, setIsSelect] = useState(false);
  const [ArraySelect, setArrayselectImage] = useState([]);
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
      first: 15 * page, // Số lượng tải tùy thuộc vào số trang hiện tại
    });

    if (Photos.edges && Photos.edges.length > 0) {
      const data = [{node: {image: 'máy ảnh', id: '12345'}}, ...Photos.edges];

      setPhotos(data);
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

        setImagePickture(response.assets);
        onAddPress();
        navigation.navigate('OnpicktureUpload', [{imagepicker}]);
      }
    });
  };
  /**  const selectTed = item => {
    setArrayselectImage(prevSelectedItems => {
      const isSelected = prevSelectedItems.some(
        selected => selected?.id === item.node.id,
      );
      if (isSelected) {
        // If item is already selected, remove it
        return prevSelectedItems.filter(
          selected => selected?.id !== item.node.id,
        );
      } else {
        // If item is not selected, add it
        const imagepicker = {
          id: item.node.id,
          uri: item.node.image.uri,
          width: item.node.image.width,
          height: item.node.image.height,
          name: item.node.image.filename,
          type: item.node.image.type,
          fileSize: item.node.image.fileSize,
        };
        return [...prevSelectedItems, imagepicker];
      }
    });
  };
 */
  const selectTed = async item => {
    try {
      const uri = item.node.image.uri;
      // console.log(uri);
      // const result = await VideoManager.getVideoInfo(uri);
      // console.log(result, 'jahjshdjs');

      // console.log(resultimage, 'jahjshdjs');
      let result = {};
      if (item.node.type === 'image/jpeg') {
        result = await Image.getSize(uri);
      }
      setArrayselectImage(prevSelectedItems => {
        const isSelected = prevSelectedItems.some(
          selected => selected?.id === item.node.id,
        );
        if (isSelected) {
          // If item is already selected, remove it
          return prevSelectedItems.filter(
            selected => selected?.id !== item.node.id,
          );
        } else {
          if (item.node.type === 'image/jpeg') {
            // Sử dụng VideoProcessor để lấy thông tin vide
            console.log(result, 'hahah');
            const imagepicker = {
              id: item.node.id,
              uri: item.node.image.uri,
              width: result.width,
              height: result.height,
              name: item.node.image.filename,
              type: item.node.type,
              fileSize: item.node.image.fileSize,
            };
            return [...prevSelectedItems, imagepicker];
          } else {
            const imagepicker = {
              id: item.node.id,
              uri: item.node.image.uri,
              width: item.node.image.width,
              height: item.node.image.height,
              name: item.node.image.filename,
              type: item.node.type,
              fileSize: item.node.image.fileSize,
            };
            return [...prevSelectedItems, imagepicker];
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
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
      <TouchableOpacity
        onPress={() => {
          const checked = ArraySelect.length;
          console.log(checked > 0, 'jaasjhsj');
          if (checked > 0) {
            setIsSelect(false);
            onAddPress();
            navigation.navigate('OnpicktureUpload', ArraySelect);
          } else {
            setIsSelect(!isSelect);
          }
        }}
        style={styles.selectButton}>
        <Text style={styles.selectText}>
          {ArraySelect.length > 0 ? 'Tiếp' : 'Select'}
        </Text>
      </TouchableOpacity>
      <View style={styles.gridContainer}>
        <FlatList
          data={photos}
          keyExtractor={item => item.node.id}
          renderItem={({item, index}) => {
            // console.log(index, 'haahahindex');
            return (
              <>
                {item.node.image === 'máy ảnh' ? (
                  <TouchableOpacity
                    onPress={() => {
                      requestCameraPermission();
                    }}
                    style={[
                      styles.imageWrapper,
                      // eslint-disable-next-line react-native/no-inline-styles
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
                      // eslint-disable-next-line react-native/no-inline-styles
                      {
                        backgroundColor: 'black',
                        width: width / 2,
                        height: height / 3,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                      },
                    ]}>
                    {isSelect && (
                      // eslint-disable-next-line react/self-closing-comp
                      <TouchableOpacity
                        onPress={() => {
                          selectTed(item);
                        }}
                        // eslint-disable-next-line react-native/no-inline-styles
                        style={{
                          width: width / 15,
                          height: width / 15,
                          position: 'absolute',
                          top: '2%',
                          right: '2%',
                          backgroundColor: ArraySelect.some(
                            selected => selected?.id === item.node.id,
                          )
                            ? 'blue'
                            : 'rgba(255,255,255,0.5)', // Sửa "rbga" thành "rgba"
                          borderWidth: 3,
                          borderColor: 'white',
                          borderRadius: 100,
                          zIndex: 1,
                          opacity: 0.7,
                        }}></TouchableOpacity>
                    )}
                    {item.node.type === 'image/jpeg' ? (
                      <Image
                        source={{uri: item.node.image.uri}}
                        style={styles.image}
                        resizeMode="contain"
                      />
                    ) : (
                      <View>
                        <Text>Video </Text>
                      </View>
                      // <Video
                      //   source={{uri: item.node.image.uri}}
                      //   style={styles.image}
                      //   resizeMode="contain"
                      //   paused={true}

                      // />
                    )}
                  </View>
                )}
              </>
            );
          }}
          numColumns={3}
          initialNumToRender={10} // Initial number of items to render
          maxToRenderPerBatch={10} // Maximum number of items to render per batch
          // windowSize={5}
          onEndReached={fetchPhotos}
          onEndReachedThreshold={0.3}
          getItemLayout={(data, index) => ({
            length: height / 3,
            offset: (height / 3) * index,
            index,
          })}
        />
      </View>
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
    // paddingVertical: 15,
    backgroundColor: '#1c1c1e',
    width: '100%',
    height: '10%',
  },
  navButton: {
    width: '20%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
  },
  navText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
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
    backgroundColor: '#007aff',
    padding: 10,
    borderRadius: 5,
  },
  selectText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
