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
const OverPickerView = ({onPressAdd}) => {
  const [photos, setPhotos] = useState([]);
  const {width, height} = useWindowDimensions();
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

  useEffect(() => {
    console.log('hahahahah');
    // Fetch photos from CameraRoll
    const fetchPhotos = async () => {
      if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
        return;
      }
      const Photos = await CameraRoll.getPhotos({
        assetType: 'All',
        first: 10,
      });

      setPhotos([{node: {image: 'may ảnh'}}, ...Photos.edges]);
    };

    fetchPhotos();
  }, []);
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
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Photos</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Images */}
      <View style={styles.gridContainer}>
        <FlatList
          data={photos}
          renderItem={({item}) => (
            <>
              {item.node.image === 'may ảnh' ? (
                <TouchableOpacity
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
                  {/* Đảm bảo chuỗi văn bản nằm trong <Text> */}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.imageWrapper,
                    {
                      backgroundColor: 'pink',
                      width: width / 2,
                      height: height / 3,
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}>
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
                </TouchableOpacity>
              )}
            </>
          )}
          keyExtractor={item => item.node.image.uri} // Sử dụng URI làm key
          numColumns={3}
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
