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
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { Controller, useForm } from 'react-hook-form';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../types/routes/navigationType';
import ButtonComponent from '../components/design/ButtonComponent';
import TimerComponent from '../components/register/TimerComponent';
import { phoneFields } from '../utils/register/registerFormText';
import {
  handleCheckedCode,
  handleVerify,
} from '../api/register/verifyPhoneNumber';
import { PhoneVerifyData } from '../types/register/signupFormType';
import { toastConfig } from '../components/design/ToastComponent';
import Back from '../assets/images/register/back.svg';

type Props = StackScreenProps<StackParamList, 'RegisterPhoneScreen'>;

const RegisterPhoneNum = ({ navigation }: Props) => {
  const [resetTimer, setResetTimer] = useState(false);
  const [request, setRequest] = useState(false);

  const {
    control,
    getValues,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<PhoneVerifyData>({
    mode: 'onChange',
    defaultValues: { phoneNumber: '', code: '' },
  });

  // 폰 번호 입력값이 유효한지 확인하는 조건식
  const isPhoneNumberValid =
    !!errors.phoneNumber || getValues().phoneNumber.length === 0;

  // 인증완료 버튼 충족조건
  const disableButton =
    Object.keys(errors).length > 0 ||
    Object.values(getValues()).some((value) => value === '');

  // 인증번호 요청 & 재전송 버튼 기능
  const handleRequest = (phone: string) => {
    // 휴대폰 인증 번호 발송
    handleVerify(phone)
      .then(() => {
        // 요청이 성공한 경우 처리할 로직
        // 최초 클릭시
        if (!request) setRequest(true);
        // 재전송 클릭시 리셋 요청 & state 초기화
        else {
          setResetTimer(true);
          clearErrors();
          setValue('code', '');
        }
      })
      .catch((error) => {
        // 요청이 실패한 경우 처리할 로직
        const errorMessage = error.response?.data?.message;
        Alert.alert(errorMessage);
      });
  };

  // 인증 완료 버튼 기능
  const handleComplete = async (phone: string, code: string) => {
    try {
      await handleCheckedCode(phone, code);
      handleCodeSuccess();
    } catch (error) {
      Alert.alert('인증 번호가 일치하지 않습니다. 다시 시도해주세요.');
    }
  };

  // 인증 성공시 기능
  const handleCodeSuccess = () => {
    setRequest(false); // timer clear을 위해
    navigation.navigate('RegisterInfoScreen', {
      phone: getValues().phoneNumber,
    });

    // 회원가입에서 유저 만료시 다시 리다이렉트 되기 때문에 인증완료시 state 초기화
    reset();
  };

  // 토스트 메세지
  const showToast = () => {
    setValue('code', '');
    clearErrors();
    Toast.show({
      position: 'bottom',
      bottomOffset: 140,
      visibilityTime: 3000,
      type: 'codeToast',
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          {/* 헤더 UI */}
          <Back
            onPress={() => navigation.navigate('LoginScreen')}
            style={{ marginTop: 30 }}
          />
          <Text style={styles.headText}>
            회원가입을 위해{'\n'}
            휴대폰 번호를 인증해주세요
          </Text>

          {/* 인증 UI */}
          <View style={styles.inputView}>
            <FlatList
              data={phoneFields}
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
                          keyboardType="phone-pad"
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
                          placeholder={item.placeholder}
                          placeholderTextColor="#909090"
                        />
                      )}
                    />
                    {item.key === 'phoneNumber' ? (
                      <TouchableOpacity
                        disabled={isPhoneNumberValid}
                        activeOpacity={1.0}
                        style={styles.sendButton}
                        onPress={() => handleRequest(getValues().phoneNumber)}
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
                          handleComplete={showToast}
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
          <Text style={styles.infoText}>
            ∙ 3분 이내로 인증번호를 입력해 주세요.{'\n'}∙ 인증번호가 전송되지
            않을경우 &quot;재전송&quot; 버튼을 눌러주세요. {'\n'}∙ 1일 최대 인증
            시도 횟수는 5회로 제한되며, 초과시 인증 번호가{'\n'} 발송되지
            않습니다.
          </Text>
        </SafeAreaView>
        <Toast config={toastConfig} />

        {/* 하단 버튼 UI */}
        <View style={styles.buttonView}>
          <ButtonComponent
            disabled={disableButton}
            text="인증완료"
            font="bold"
            onPress={() =>
              handleComplete(getValues().phoneNumber, getValues().code)
            }
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
    marginTop: 45,
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
    fontFamily: 'Pretendard-Regular',
    color: '#FFFFFF',
  },
  errorText: {
    fontSize: 12,
    fontFamily: 'Pretendard-Regular',
    color: '#E53C3C',
    marginTop: 5,
  },
  infoText: {
    marginTop: 10,
    fontSize: 12,
    fontFamily: 'Pretendard-Regular',
    color: '#909090',
  },
  numberInput: {
    width: '75%',
    color: '#000000',
    height: 46,
    borderWidth: 1,
    borderColor: '#EDF0F3',
    borderRadius: 8,
    padding: 15,
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    marginRight: 10,
  },
  sendButton: {
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF9696',
    borderRadius: 4,
  },
});
