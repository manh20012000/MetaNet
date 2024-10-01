import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TextInput,
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

const Register = ({navigation}) => {
  const color = useSelector(state => state.colorApp.value);
  const insets = useSafeAreaInsets();
  const [selectedGender, setSelectedGender] = useState('Nữ');
  const genders = ['Nữ', 'Nam'];
  const [selectedDay, setSelectedDay] = useState('1');
  const [selectedMonth, setSelectedMonth] = useState('1');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [avatar, setAvatar] = useState(
    'https://ss-images.saostar.vn/wwebp1200/pc/1613810558698/Facebook-Avatar_2.png',
  );
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const days = Array.from({length: 31}, (_, i) => (i + 1).toString());
  const months = Array.from({length: 12}, (_, i) => (i + 1).toString());
  const years = Array.from({length: 100}, (_, i) => (2024 - i).toString());
  const handlerRegister = async () => {
    if (!firstName || !lastName || !email || !phone || !password) {
      alert('Thông báo', 'Vui lòng điền đầy đủ thông tin!');
      return;
    }
    
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('password', password);
    formData.append('gender', selectedGender);
    formData.append('day', selectedDay);
    formData.append('month', selectedMonth);
    formData.append('year', selectedYear);
    formData.append('avatar', avatar);
    try {
      console.log(avatar, lastName, path, 'ahahah');
      const response = await axios.post(`${path}/api/user/register`, formData);
      console.log(response);
      if (response.data.success) {
        // Handle successful registration
        console.log('Registration successful');
      } else {
        // Handle registration error
        console.log('Registration failed');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };
  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const user = await axios.post(`${path}/api/user/get_all_user`);
  //       console.log(user);
  //     } catch (error) {
  //       console.error('Error :', error);
  //     }
  //   };
  //   getUser();
  // }, []);
  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: color.backgroudcolor,
          paddingTop: insets.top,
        },
      ]}>
      <TouchableOpacity
        style={[styles.naviBack]}
        onPress={() => navigation.goBack()}>
        <Backsvg />
      </TouchableOpacity>
      <View style={[styles.logo]}>
        <Logos />
        <Text style={[styles.title, {color: color.black}]}>
          Đăng Ký Tài Khoản
        </Text>
        <Text style={[{color: color.gray}]}>
          Đăng ký tài khoản để được tham gia cùng chúng tôi
        </Text>
      </View>
      <View style={[styles.input]}>
        <View style={[styles.Viewinput, {}]}>
          <Avatar_user />
          <TextInput
            placeholder="Nhập Họ ...."
            placeholderTextColor={color.gray}
            value={firstName}
            onChangeText={setFirstName}
            style={[styles.textinput]}></TextInput>
        </View>
        <View style={[styles.Viewinput, {}]}>
          <Avatar_user />
          <TextInput
            placeholder="Nhập Tên ...."
            placeholderTextColor={color.gray}
            value={lastName}
            onChangeText={setLastName}
            style={[styles.textinput]}></TextInput>
        </View>
        <View style={[styles.Viewinput, {}]}>
          <Email />
          <TextInput
            placeholder="Địa chỉ email ...."
            placeholderTextColor={color.gray}
            value={email}
            onChangeText={setEmail}
            style={[styles.textinput]}></TextInput>
        </View>
        <View style={[styles.Viewinput]}>
          <Phone />
          <TextInput
            keyboardType="numeric"
            placeholder="Số điện thoại  ...."
            placeholderTextColor={color.gray}
            value={phone}
            onChangeText={setPhone}
            style={[styles.textinput]}></TextInput>
        </View>
        <View style={[styles.Viewinput, {paddingLeft: '1%'}]}>
          <Pass2 />
          <TextInput
            placeholder="Mật khẩu ...."
            placeholderTextColor={color.gray}
            value={password}
            onChangeText={setPassword}
            style={[styles.textinput]}></TextInput>
        </View>
        <View
          style={[
            {
              paddingLeft: '1%',
              height: '12%',
              borderColor: 'gray',
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
          ]}>
          <Picker
            numberOfLines={7}
            dropdownIconColor
            mode={'dialog'}
            themeVariant={'black'}
            label={'năm'}
            processColor={'black'}
            selectedValue={selectedDay}
            style={[styles.picker, {color: color.black}]}
            onValueChange={itemValue => setSelectedDay(itemValue)}>
            {days.map(day => (
              <Picker.Item key={day} label={day} value={day} />
            ))}
          </Picker>
          <Picker
            numberOfLines={7}
            themeVariant={'light'}
            processColor={'black'}
            dropdownIconColor
            selectedValue={selectedMonth}
            style={[styles.picker, {color: color.black}]}
            onValueChange={itemValue => setSelectedMonth(itemValue)}>
            {months.map(month => (
              <Picker.Item key={month} label={month} value={month} />
            ))}
          </Picker>
          <Picker
            numberOfLines={7}
            processColor={'pink'}
            themeVariant={'light'}
            selectedValue={selectedYear}
            style={[styles.picker, {color: color.black}]}
            onValueChange={itemValue => setSelectedYear(itemValue)}>
            {years.map(year => (
              <Picker.Item key={year} label={year} value={year} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.container2}>
        <Text style={[styles.label, {color: color.black, fontWeight: 'bold'}]}>
          Giới tính
        </Text>
        <View style={styles.genderContainer}>
          {genders.map(gender => (
            <TouchableOpacity
              key={gender}
              style={[
                styles.genderOption,
                selectedGender === gender && styles.selectedOption,
              ]}
              onPress={() => {
                if (gender === 'Nam') {
                  setAvatar(
                    'https://ss-images.saostar.vn/wwebp1200/pc/1613810558698/Facebook-Avatar_2.png',
                  );
                } else {
                  setAvatar(
                    'https://ss-images.saostar.vn/wwebp1200/pc/1613810558698/Facebook-Avatar_2.png',
                  );
                }

                setSelectedGender(gender);
              }}>
              <Text
                style={[
                  styles.genderText,
                  selectedGender === gender && styles.selectedText,
                  {color: color.black},
                ]}>
                {gender}
              </Text>
              <View
                style={[
                  styles.radioButton,
                  selectedGender === gender && styles.radioSelected,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <TouchableOpacity onPress={handlerRegister} style={[styles.bntregister]}>
        <Text>ĐĂNG KÝ</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Register;

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
  input: {
    width: '100%',
    height: '60%',
    marginTop: '5%',
    paddingHorizontal: '4%',
    justifyContent: 'space-around',
  },
  Viewinput: {
    height: '12%',
    borderWidth: 1,
    borderColor: 'gray',
    width: '100%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textinput: {
    fontWeight: 'bold',
    marginLeft: '3%',
  },
  container2: {
    marginHorizontal: '5%',
    marginTop: '2%',
    marginBottom: '10%',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    width: '45%',
    justifyContent: 'center',
  },
  selectedOption: {
    borderColor: '#007AFF',
  },
  genderText: {
    fontSize: 16,
    marginRight: 10,
  },
  selectedText: {
    fontWeight: 'bold',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  radioSelected: {
    backgroundColor: '#007AFF',
  },
  bntregister: {
    alignSelf: 'center',
    width: '90%',
    height: '8%',
    backgroundColor: 'green',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    width: '30%',
    height: 20,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
  },
});
