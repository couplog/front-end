import {
  Keyboard,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInputChangeEventData,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Header from '../../components/myPage/Header';
import { useRecoilValue } from 'recoil';
import { userState } from '../../state/atoms/userAtom';
import { validatePassword } from '../../utils/register/registerValidation';
import { handlePassword } from '../../api/myPage/password';
import { StackParamList } from '../../types/routes/navigationType';
import { StackScreenProps } from '@react-navigation/stack';
import { removeData } from '../../utils/storage';
import PasswordInput from '../../components/myPage/PasswordInput';

type Props = StackScreenProps<StackParamList, 'ChangePasswordScreen'>;

const ChangePasswordScreen = ({ navigation }: Props) => {
  const userInfo = useRecoilValue(userState);
  const [eyeClick, setEyeClick] = useState(false);
  const [checkEyeClick, setCheckEyeClick] = useState(false);
  const [originPassword, setOriginPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [originError, setOriginError] = useState('');
  const [newError, setNewError] = useState('');

  // 유효성 검사
  const newPasswordValid = newError.length > 5;
  const isPasswordValid =
    !newPasswordValid && newPassword.length > 0 && originPassword.length > 0;

  // 비밀번호 확인 (확인 성공시 -> 변경 API)
  const handlePasswordCheck = async () => {
    try {
      const res = await handlePassword(
        userInfo.memberId,
        originPassword,
        'POST'
      );

      // password check
      res.data.data.checkPassword
        ? handlePasswordChange()
        : setOriginError('비밀번호가 틀렸습니다.');
    } catch (error) {
      console.log(error);
    }
  };

  // 비밀번호 변경
  const handlePasswordChange = async () => {
    try {
      const res = await handlePassword(userInfo.memberId, newPassword, 'PUT');
      console.log(res.data);

      // 비밀번호 변경과 함께 재로그인 요청 -> 로그인 정보 초기화
      removeData('autoLogin');
      removeData('refreshToken');
      removeData('token');

      navigation.navigate('LoginScreen');
    } catch (error) {
      console.log(error);
    }
  };

  // 유효성 체크
  const handleValidCheck = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    const value = event.nativeEvent.text;
    const error = validatePassword(value);
    setNewError(error as string);
  };

  // 스타일 코드
  const originStyle = [
    styles.inputBox,
    { borderColor: originError ? '#E53C3C' : '#EDF0F3' },
  ];

  const newStyle = [
    styles.inputBox,
    { borderColor: newPasswordValid ? '#E53C3C' : '#EDF0F3' },
  ];

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
          <Header
            disabled={!isPasswordValid}
            password
            onPress={handlePasswordCheck}
          />

          {/* Title */}
          <Text style={styles.headerText}>비밀번호 변경</Text>

          <PasswordInput
            label="기존 비밀번호"
            style={originStyle}
            placeholder="기존 비밀번호를 입력해주세요"
            placeholderTextColor="#909090"
            eyeClick={eyeClick}
            secureTextEntry={!eyeClick}
            onChangeText={setOriginPassword}
            value={originPassword}
            handleEyeToggle={() => setEyeClick((prev) => !prev)}
          />
          {originError ? (
            <Text style={styles.errorText}>{originError}</Text>
          ) : null}

          <PasswordInput
            label="새 비밀번호"
            style={newStyle}
            placeholder="5-20자 영문, 숫자 조합"
            placeholderTextColor="#909090"
            eyeClick={checkEyeClick}
            secureTextEntry={!checkEyeClick}
            onChangeText={setNewPassword}
            onChange={handleValidCheck}
            value={newPassword}
            handleEyeToggle={() => setCheckEyeClick((prev) => !prev)}
          />
          {newError ? <Text style={styles.errorText}>{newError}</Text> : null}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  wrapper: {
    marginLeft: 25,
    marginRight: 25,
  },
  headerText: {
    fontSize: 24,
    color: '#000000',
    fontFamily: 'Pretendard-Bold',
    marginTop: 30,
  },
  errorText: {
    fontSize: 12,
    color: '#E53C3C',
    marginTop: 5,
    fontFamily: 'Pretendard-Regular',
  },
  label: {
    color: '#000000',
    fontFamily: 'Pretendard-Regular',
    marginTop: 35,
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
    color: '#000000',
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
  },
  eyeIconView: {
    position: 'absolute',
    right: 15,
    top: 12,
  },
});
