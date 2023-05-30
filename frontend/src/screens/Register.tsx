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
import ButtonComponent from '../components/design/ButtonComponent';

const Register = () => {
  // 폰번호, 코드 data type 확인하기
  const [phoneNumber, setPhoneNumber] = useState('');
  const [codeNumber, setCodeNumber] = useState('');
  const [disabled, setDisabled] = useState(true);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          {/* 헤더 UI */}
          <Text style={styles.headFont}>
            회원가입을 위해{'\n'}
            휴대폰 번호를 인증해주세요
          </Text>
          <Text style={styles.subFont}>본인인증을 하시면 휴대폰 번호로{'\n'}로그인을 할 수 있어요</Text>

          {/* 인증 UI */}
          <View style={styles.inputView}>
            <Text>휴대폰 번호</Text>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <TextInput
                style={styles.numberInput}
                placeholder="휴대폰 11자리"
                keyboardType="phone-pad"
                placeholderTextColor="#909090"
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
              />
              <TouchableOpacity activeOpacity={1.0} style={styles.sendButton}>
                {/* API 구현할때 인증요청 - 재요청 텍스트 분기처리 */}
                <Text style={styles.sendFont}>인증요청</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 15 }}>
              {/* 인증번호 정규식 불일치 -> border red, 3분 타이머 */}
              <Text>인증번호</Text>
              <TextInput
                style={{ ...styles.numberInput, marginTop: 5, width: '100%' }}
                placeholder="인증번호 6자리"
                placeholderTextColor="#909090"
                value={codeNumber}
                onChangeText={(code) => setCodeNumber(code)}
              />
            </View>
          </View>
        </SafeAreaView>

        {/* 하단 버튼 UI */}
        <View style={styles.buttonView}>
          <ButtonComponent disabled={disabled} text="인증완료" font="bold" onPress={() => console.log('인증완료')} />
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
  inputView: {
    marginTop: 35,
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
  subFont: {
    fontFamily: 'Pretendard-Medium',
    color: '#000000',
    fontSize: 16,
    lineHeight: 20,
    marginTop: 15,
  },
  sendFont: {
    fontSize: 12,
    fontFamily: 'Pretendard-Medium',
    color: '#000000',
  },
  numberInput: {
    width: '75%',
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
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCCCCC',
    borderRadius: 4,
  },
});
