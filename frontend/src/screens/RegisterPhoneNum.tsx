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
import { useRecoilState } from 'recoil';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../types/navigationType';
import ButtonComponent from '../components/design/ButtonComponent';
import TimerComponent from '../components/register/TimerComponent';
import { userState } from '../state/atoms/userAtom';

type Props = StackScreenProps<StackParamList, 'RegisterPhoneScreen'>;

const RegisterPhoneNum = ({ navigation }: Props) => {
  // 폰번호, 코드 data type 확인하기
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [codeNumber, setCodeNumber] = useState('');
  const [errorText, setErrorText] = useState('');
  const [resetTimer, setResetTimer] = useState(false);
  const [request, setRequest] = useState(false);
  const [disable, setDisable] = useState(true);

  // 요청 & 재전송 버튼 기능
  const handleRequest = () => {
    // 최초 클릭시
    if (!request) setRequest(true);
    // 재전송 클릭시
    else {
      setResetTimer(true);
      setCodeNumber('');
      setDisable(true);
    }

    // 추후 서버 올라오면 번호 인증 API 추가
    console.log('번호 인증');
  };

  // 인증번호 입력 기능(상태관리 & 유효성 검사)
  const handleCodeNumberChange = (code: string) => {
    if (code.length !== 6 && code.length !== 0) {
      setErrorText('올바르지 않은 인증번호 형식입니다. 6자 숫자');
      setDisable(true);
    } else {
      setErrorText('');
      if (code.length === 6) setDisable(false);
    }
    setCodeNumber(code);
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          {/* 헤더 UI */}
          <Text style={styles.headFont}>
            회원가입을 위해{'\n'}
            휴대폰 번호를 인증해주세요
          </Text>
          <Text style={styles.subFont}>
            본인인증을 하시면 휴대폰 번호로{'\n'}로그인을 할 수 있어요
          </Text>

          {/* 인증 UI */}
          <View style={styles.inputView}>
            <Text>휴대폰 인증</Text>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <TextInput
                style={styles.numberInput}
                placeholder="휴대폰 11자리"
                keyboardType="phone-pad"
                placeholderTextColor="#909090"
                value={userInfo.phone}
                onChangeText={(value) => setUserInfo({ phone: value })}
              />
              <TouchableOpacity
                activeOpacity={1.0}
                style={styles.sendButton}
                onPress={handleRequest}
              >
                <Text style={styles.sendFont}>
                  {request ? '재전송' : '인증요청'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 15 }}>
              {/* 인증번호 정규식 불일치 -> border red, 3분 타이머 */}
              <Text>인증번호</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={{
                    ...styles.numberInput,
                    marginTop: 5,
                    width: '100%',
                    borderColor: errorText ? '#E53C3C' : '#EDF0F3',
                  }}
                  placeholder="인증번호 6자리"
                  placeholderTextColor="#909090"
                  autoComplete="off"
                  value={codeNumber}
                  onChangeText={(code) => handleCodeNumberChange(code)}
                />
                {request ? (
                  <View style={styles.timerContainer}>
                    <TimerComponent
                      resetTimer={resetTimer}
                      onReset={() => setResetTimer(false)}
                      // 타이머 만료시 기능(예정)
                      handleComplete={() => console.log('시간 만료')}
                    />
                  </View>
                ) : null}
              </View>
              {errorText && <Text style={styles.errorFont}>{errorText}</Text>}
            </View>
          </View>
        </SafeAreaView>

        {/* 하단 버튼 UI */}
        <View style={styles.buttonView}>
          <ButtonComponent
            disabled={disable}
            text="인증완료"
            font="bold"
            onPress={() => navigation.navigate('RegisterInfoScreen')}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegisterPhoneNum;

const styles = StyleSheet.create({
  container: {
    marginLeft: 25,
    marginRight: 25,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerContainer: {
    position: 'absolute',
    right: 15,
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
    marginBottom: 40,
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
  errorFont: {
    fontSize: 12,
    fontFamily: 'Pretendard-Medium',
    color: '#E53C3C',
    marginTop: 5,
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
