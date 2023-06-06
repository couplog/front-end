import {
  Alert,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Controller, useForm } from 'react-hook-form';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../types/navigationType';
import ButtonComponent from '../components/design/ButtonComponent';
import TimerComponent from '../components/register/TimerComponent';
import { userState } from '../state/atoms/userAtom';
import { phoneFileds } from '../utils/registerFormText';

type Props = StackScreenProps<StackParamList, 'RegisterPhoneScreen'>;

interface PhoneVerifyData {
  phoneNumber: string;
  code: string;
}

const RegisterPhoneNum = ({ navigation }: Props) => {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  // const [codeNumber, setCodeNumber] = useState('');
  // const [errorText, setErrorText] = useState('');
  // const [codeErrorText, setCodeErrorText] = useState('');
  const [resetTimer, setResetTimer] = useState(false);
  const [request, setRequest] = useState(false);
  // const [disable, setDisable] = useState(true);

  const {
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<PhoneVerifyData>({
    mode: 'onChange',
    defaultValues: { phoneNumber: '', code: '' },
  });

  // 폰 번호 입력값이 유효한지 확인하는 조건식
  const isPhoneNumberValid =
    !!errors.phoneNumber || getValues().phoneNumber.length === 0;

  // 가입하기 버튼 충족조건
  const disableButton =
    Object.keys(errors).length > 0 ||
    Object.values(getValues()).some((value) => value === '');

  // // 휴대폰 번호 기능
  // const handleChangePhone = (value: string) => {
  //   setUserInfo((prevUserInfo) => {
  //     return {
  //       ...prevUserInfo,
  //       phone: value,
  //     };
  //   });
  // };

  // 요청 & 재전송 버튼 기능
  const handleRequest = () => {
    // 최초 클릭시
    if (!request) setRequest(true);
    // 재전송 클릭시 리셋 요청 & state 초기화
    else {
      setResetTimer(true);
      setValue('code', '');
    }

    // 추후 서버 올라오면 번호 인증 API 추가
    console.log('번호 인증');
  };

  // 인증 완료 기능 (API 예정)
  const handleComplete = () => {
    navigation.navigate('RegisterInfoScreen');
    setRequest(false); // timer clear을 위해
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          {/* 헤더 UI */}
          <Text style={styles.headText}>
            회원가입을 위해{'\n'}
            휴대폰 번호를 인증해주세요
          </Text>

          {/* 인증 UI */}
          <View style={styles.inputView}>
            <FlatList
              data={phoneFileds}
              renderItem={({ item }) => (
                <>
                  <Text style={{ ...styles.inputTitleText, marginTop: 15 }}>
                    {item.title}
                  </Text>
                  <View
                    style={{
                      ...styles.inputContainer,
                      alignItems: item.key === 'code' ? 'center' : undefined,
                    }}
                  >
                    <Controller
                      control={control}
                      rules={{
                        validate: item.validate,
                      }}
                      name={item.key as keyof PhoneVerifyData}
                      defaultValue=""
                      render={({ field: { onChange, value } }) => (
                        <TextInput
                          value={value}
                          onChangeText={onChange}
                          style={{
                            ...styles.numberInput,
                            width: item.key === 'phoneNumber' ? '75%' : '100%',
                            borderColor:
                              errors[item.key as keyof PhoneVerifyData] &&
                              value.length !== 0
                                ? '#E53C3C'
                                : '#EDF0F3',
                          }}
                          keyboardType="phone-pad"
                          placeholder={item.placeholder}
                          placeholderTextColor="#909090"
                        />
                      )}
                    />
                    {item.key === 'phoneNumber' ? (
                      <TouchableOpacity
                        disabled={isPhoneNumberValid}
                        activeOpacity={1.0}
                        style={{
                          ...styles.sendButton,
                          opacity: isPhoneNumberValid ? 0.3 : 1.0,
                        }}
                        onPress={handleRequest}
                      >
                        <Text style={styles.sendText}>
                          {request ? '재전송' : '인증요청'}
                        </Text>
                      </TouchableOpacity>
                    ) : request ? (
                      <View style={styles.timerContainer}>
                        <TimerComponent
                          resetTimer={resetTimer}
                          onReset={() => setResetTimer(false)}
                          // 타이머 만료시 기능(UI 예정)
                          handleComplete={() => Alert.alert('시간 만료')}
                        />
                      </View>
                    ) : null}
                  </View>
                  {errors[item.key as keyof PhoneVerifyData]?.message && (
                    <Text style={styles.errorText}>
                      {errors[item.key as keyof PhoneVerifyData]?.message}
                    </Text>
                  )}
                </>
              )}
              keyExtractor={(item) => item.key}
            />
          </View>
        </SafeAreaView>

        {/* 하단 버튼 UI */}
        <View style={styles.buttonView}>
          <ButtonComponent
            disabled={disableButton}
            text="인증완료"
            font="bold"
            onPress={handleComplete}
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
    marginTop: 5,
  },
  timerContainer: {
    position: 'absolute',
    right: 15,
  },
  inputView: {
    marginTop: 20,
  },
  buttonView: {
    marginBottom: 40,
    marginLeft: 25,
    marginRight: 25,
  },
  headText: {
    marginTop: 70,
    fontFamily: 'Pretendard-Medium',
    fontWeight: '700',
    lineHeight: 32,
    fontSize: 24,
    color: '#000000',
  },
  inputTitleText: {
    color: '#000000',
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
  },
  sendText: {
    fontSize: 12,
    fontFamily: 'Pretendard-Medium',
    color: '#000000',
  },
  errorText: {
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
