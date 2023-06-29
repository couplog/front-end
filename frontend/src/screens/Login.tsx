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
import { StackParamList } from '../types/routes/navigationType';
import ButtonComponent from '../components/design/ButtonComponent';
import OffEye from '../assets/images/register/off_eye.svg';
import OnEye from '../assets/images/register/on_eye.svg';
import Checkbox from '../components/design/CheckBoxComponent';
import { LoginFormData } from '../types/login/loginFormType';
import { handleLogin, handleMemberInfo } from '../api/login/login';
import { storeData } from '../utils/storage';
import { userState } from '../state/atoms/userAtom';

type Props = StackScreenProps<StackParamList, 'LoginScreen'>;

const Login = ({ navigation }: Props) => {
  const [checked, setChecked] = useState(false);
  const [eyeClick, setEyeClick] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [error, setError] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // 로그인 버튼
  const handleComplete = async (data: LoginFormData) => {
    try {
      // 로그인 API 호출
      const res = await handleLogin(data);
      const connection = res?.data.data.isConnected;
      const token = res?.headers.authorization;
      const refreshToken = res?.headers.refreshtoken;

      await storeData('token', token);
      await storeData('refreshToken', refreshToken);

      // 현재 로그인 회원 정보 조회 및 저장
      handleUserInfo();

      connection
        ? // ? navigation.navigate('MainScreen')
          navigation.navigate('PlanCalendarScreen')
        : navigation.navigate('ConnectPartnerScreen');
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  // 로그인 성공 시, 유저 정보 저장
  const handleUserInfo = async () => {
    const memberRes = await handleMemberInfo();
    const memberInfo = memberRes?.data.data;
    const updateUserInfo = {
      ...userInfo,
      memberId: memberInfo.memberId,
      name: memberInfo.name,
      nickname: memberInfo.nickname,
      phone: memberInfo.phone,
      birth: memberInfo.birth,
      gender: memberInfo.gender,
      profileImageUrl: memberInfo.profileImageURL,
    };
    setUserInfo(updateUserInfo);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.marginContainer}>
        <SafeAreaView style={styles.rootContainer}>
          {/* 헤더 UI  */}
          {/* 임시 */}
          <View style={styles.logoView}>
            <Text style={styles.logo}>로고</Text>
          </View>

          {/* Input Field UI */}
          <View style={styles.inputView}>
            <Text style={styles.label}>전화번호</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="전화번호를 입력해주세요"
              placeholderTextColor="#909090"
              onChangeText={setPhone}
              value={phone}
              keyboardType="phone-pad"
            />
            <Text style={styles.label}>비밀번호</Text>
            <View style={styles.passwordView}>
              <TextInput
                style={styles.inputBox}
                placeholder="비밀번호를 입력해주세요"
                placeholderTextColor="#909090"
                secureTextEntry={!eyeClick}
                onChangeText={setPassword}
                value={password}
                autoCapitalize="none"
              />
              <TouchableOpacity
                activeOpacity={1.0}
                onPress={() => setEyeClick((prev) => !prev)}
                style={styles.eyeIconView}
              >
                {eyeClick ? <OnEye /> : <OffEye />}
              </TouchableOpacity>
            </View>
            <View style={styles.checkboxView}>
              <Checkbox
                checked={checked}
                onPress={() => setChecked(!checked)}
                label="자동 로그인"
              />
            </View>
            {error && (
              <Text style={styles.errorText}>
                유저의 번호 또는 비밀번호를 잘못 입력했습니다.{'\n'}입력하신
                내용을 다시 확인해주세요.
              </Text>
            )}
          </View>
        </SafeAreaView>

        {/* Footer UI */}
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            activeOpacity={1.0}
            onPress={() => navigation.navigate('RegisterPhoneScreen')}
          >
            <Text style={styles.signupText}>회원가입하기</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonView}>
          <ButtonComponent
            disabled={phone === '' || password === ''}
            text="로그인"
            font="bold"
            onPress={() => handleComplete({ password, phone })}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  marginContainer: {
    flex: 1,
    marginLeft: 25,
    marginRight: 25,
  },
  rootContainer: {
    flex: 1,
  },
  logoView: {
    width: 200,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#E7E7E7',
    marginTop: 80,
  },
  logo: {
    fontFamily: 'Pretendard-Bold',
    color: '#909090',
    fontSize: 30,
  },
  errorText: {
    fontSize: 12,
    lineHeight: 15,
    color: '#E53C3C',
    marginTop: 15,
    fontFamily: 'Pretendard-Regular',
  },
  inputView: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    marginTop: 64,
  },
  label: {
    color: '#000000',
    fontFamily: 'Pretendard-Regular',
    marginTop: 32,
    marginBottom: 5,
  },
  inputBox: {
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#EDF0F3',
    height: 45,
    borderRadius: 8,
    paddingLeft: 12,
  },
  passwordView: {
    position: 'relative',
  },
  eyeIconView: {
    position: 'absolute',
    right: 15,
    top: 12,
  },
  checkboxView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  signupText: {
    color: '#909090',
    textDecorationLine: 'underline',
    fontFamily: 'Pretendard-Regular',
    marginBottom: 25,
  },
  buttonView: {
    width: '100%',
    marginBottom: 50,
  },
});
