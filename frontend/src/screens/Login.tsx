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
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../types/routes/navigationType';
import ButtonComponent from '../components/design/ButtonComponent';
import OffEye from '../assets/images/register/off_eye.svg';
import OnEye from '../assets/images/register/on_eye.svg';
import { LoginFormData } from '../types/login/loginFormType';
import { handleLogin, handleMemberInfo } from '../api/login/login';
import { getData, removeData, storeData } from '../utils/storage';
import { userState } from '../state/atoms/userAtom';
import Logo from '../assets/images/login/logo.svg';
import UnCheck from '../assets/images/login/unCheck.svg';
import Check from '../assets/images/login/check.svg';

type Props = StackScreenProps<StackParamList, 'LoginScreen'>;

const Login = ({ navigation }: Props) => {
  const [checked, setChecked] = useState(false);
  const [eyeClick, setEyeClick] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [error, setError] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    checkAutoLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 자동 로그인 check
  const checkAutoLogin = async () => {
    // refresh 만료되면 다시 로그인해야함
    const refreshToken = await getData('refreshToken');
    const connection = await getData('connection');
    const autoLogin = await getData('autoLogin');

    if (autoLogin) {
      // refresh 만료 체크
      const decodedToken = jwtDecode(refreshToken) as JwtPayload;
      const tokenExpirationTime = decodedToken.exp as number;

      const currentTime = Math.floor(Date.now() / 1000);

      if (tokenExpirationTime > currentTime) {
        // refreshToken이 만료되지 않은 경우에만 자동 로그인을 진행합니다.
        const autoLogin = await getData('autoLogin');
        if (autoLogin) {
          handleUserInfo();

          // 자동로그인 시에도 연결 안되어있는 경우 분기처리
          connection
            ? navigation.navigate('MainBottomTabScreen')
            : navigation.navigate('ConnectPartnerScreen');
        }
      } else {
        // 만료되었을 경우에는 만료된 토큰 삭제후 다시 로그인 진행
        removeData('refreshToken');
      }
    }
  };

  // 로그인 기능
  const handleComplete = async (data: LoginFormData) => {
    try {
      // 로그인 API 호출
      const res = await handleLogin(data);
      const connection = res.data.data.isConnected;
      const token = res.headers.authorization;
      const refreshToken = res.headers.refreshtoken;

      // 자동 로그인 체크 시, 저장된 자동 로그인 상태를 변경
      if (checked) {
        await storeData('autoLogin', 'true');
      }
      await storeData('token', token);
      await storeData('refreshToken', refreshToken);
      await storeData('connection', connection);

      // memberID & 연결 여부 조회 및 저장
      handleUserInfo();

      connection
        ? navigation.navigate('MainBottomTabScreen')
        : navigation.navigate('ConnectPartnerScreen');
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  // 로그인 성공 시, memberID 정보 우선 저장(상대방과 연결 페이지 이동을 생각해서)
  const handleUserInfo = async () => {
    const memberRes = await handleMemberInfo();
    const memberInfo = memberRes?.data.data;
    const updateUserInfo = {
      ...userInfo,
      memberId: memberInfo.memberId,
    };
    setUserInfo(updateUserInfo);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.marginContainer}>
        <SafeAreaView style={styles.rootContainer}>
          {/* 헤더 UI  */}
          <View style={styles.logoView}>
            <Logo />
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

            <TouchableWithoutFeedback onPress={() => setChecked(!checked)}>
              <View style={styles.checkboxView}>
                {checked ? <Check /> : <UnCheck />}
                <Text>자동 로그인</Text>
              </View>
            </TouchableWithoutFeedback>
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
            <Text style={styles.signUpText}>회원가입하기</Text>
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
    alignItems: 'center',
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
    gap: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  signUpText: {
    color: '#909090',
    textDecorationLine: 'underline',
    fontWeight: '600',
    fontFamily: 'Pretendard-Regular',
    marginBottom: 25,
  },
  buttonView: {
    width: '100%',
    marginBottom: 50,
  },
});
