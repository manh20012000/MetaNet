import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import { color } from '../../assets/color/color';
import { Logos } from '../../assets/svg/svgfile';
const Register = ({navigation}) => {
  const color = useSelector(state => state.colorApp.value);

  return (
    <View style={[{backgroundColor: 'pink'}, styles.container]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>register</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Register;
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.backgroudcolor,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
