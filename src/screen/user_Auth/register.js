import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';

const Register = ({navigation}) => {
  return (
    <View style={[{backgroundColor: 'pink'}]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>register</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Register;
const styles = StyleSheet.create({});
