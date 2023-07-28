import {
  Keyboard,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Header from '../../components/myPage/Header';
import OffEye from '../../assets/images/register/off_eye.svg';
import OnEye from '../../assets/images/register/on_eye.svg';
import { useRecoilValue } from 'recoil';
import { userState } from '../../state/atoms/userAtom';
import { validatePassword } from '../../utils/register/registerValidation';
import { handlePassword } from '../../api/myPage/password';
import { StackParamList } from '../../types/routes/navigationType';
import { StackScreenProps } from '@react-navigation/stack';
import { removeData } from '../../utils/storage';

type Props = StackScreenProps<StackParamList, 'ChangePasswordScreen'>;

const ChangePasswordScreen = ({ navigation }: Props) => {
  const userInfo = useRecoilValue(userState);
  const [eyeClick, setEyeClick] = useState(false);
  const [checkEyeClick, setCheckEyeClick] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [originError, setOriginError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const valid = passwordError.length > 5;

  // 비밀번호 확인
  const handlePasswordCheck = async () => {
    try {
      const res = await handlePassword(userInfo.memberId, password, 'POST');

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

  // console.log(newPassword);
  // console.log(newPassword.length);

  // 유효성 체크
  const handleValidCheck = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    const value = event.nativeEvent.text;
    const error = validatePassword(value);
    setPasswordError(error as string);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
          <Header password onPress={handlePasswordCheck} />
          <Text style={styles.headerText}>비밀번호 변경</Text>

          <Text style={styles.label}>기존 비밀번호</Text>
          <View>
            <TextInput
              style={[
                styles.inputBox,
                { borderColor: originError ? '#E53C3C' : '#EDF0F3' },
              ]}
              placeholder="기존 비밀번호를 입력해주세요"
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
          {originError ? (
            <Text style={styles.errorText}>{originError}</Text>
          ) : null}

          <Text style={styles.label}>새 비밀번호</Text>
          <View>
            <TextInput
              style={[
                styles.inputBox,
                { borderColor: valid ? '#E53C3C' : '#EDF0F3' },
              ]}
              placeholder="5-20자 영문, 숫자 조합"
              placeholderTextColor="#909090"
              secureTextEntry={!checkEyeClick}
              onChangeText={setNewPassword}
              onChange={handleValidCheck}
              value={newPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              activeOpacity={1.0}
              onPress={() => setCheckEyeClick((prev) => !prev)}
              style={styles.eyeIconView}
            >
              {checkEyeClick ? <OnEye /> : <OffEye />}
            </TouchableOpacity>
          </View>
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
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
