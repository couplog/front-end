import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';
import DragIcon from '../assets/images/delete.svg';
import Checkbox from '../components/design/CheckBoxComponent';
import ButtonComponent from '../components/design/ButtonComponent';

const Register = () => {
  // 와이어프레임 임시 디자인 => 휴대폰만 인증하기로함

  const [phoneNumber, setPhoneNumber] = useState('');
  const [codeNumber, setCodeNumber] = useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.headFont}>
            회원가입을 위해{'\n'}
            휴대폰 번호를 인증해주세요
          </Text>
          <View style={styles.boxView}>
            <Checkbox />
            <Text style={styles.checkFont}>본인 확인을 위한 약관 모두 동의</Text>
            <DragIcon />
          </View>
          <View style={{ marginTop: 25 }}>
            <Text>휴대폰 인증</Text>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <TextInput
                style={{ ...styles.numberInput, flex: 9 }}
                placeholder="휴대폰 11자리"
                keyboardType="phone-pad"
                placeholderTextColor="#909090"
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
              />
              <TouchableOpacity activeOpacity={1.0} style={styles.sendButton}>
                <Text style={styles.sendFont}>인증요청</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 10 }}>
              <TextInput
                style={styles.numberInput}
                placeholder="인증번호 6자리"
                placeholderTextColor="#909090"
                value={codeNumber}
                onChangeText={(code) => setCodeNumber(code)}
              />
            </View>
          </View>
        </SafeAreaView>
        <View style={styles.buttonView}>
          <ButtonComponent disabled={false} text="인증완료" font="bold" onPress={() => console.log('인증완료')} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    marginLeft: 25,
    marginRight: 25,
    flex: 1,
  },
  boxView: {
    marginTop: 25,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '100%',
    height: 54,
  },
  buttonView: {
    marginBottom: 50,
    marginLeft: 25,
    marginRight: 25,
  },
  headFont: {
    marginTop: 70,
    fontFamily: 'Pretendard-Medium',
    fontWeight: '700',
    lineHeight: 32,
    fontSize: 24,
    color: '#000000',
  },
  checkFont: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
    color: '#000000',
    marginRight: 10,
  },
  sendFont: {
    fontSize: 12,
    fontFamily: 'Pretendard-Medium',
    color: '#000000',
  },
  numberInput: {
    width: '100%',
    color: '#000000',
    height: 44,
    borderWidth: 1,
    borderColor: '#EDF0F3',
    borderRadius: 8,
    padding: 15,
    fontSize: 14,
    marginRight: 10,
  },
  sendButton: {
    width: '23%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 4,
  },
});
