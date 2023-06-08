import {
  Keyboard,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../types/navigationType';
import ButtonComponent from '../components/design/ButtonComponent';
import OffEye from '../assets/images/register/off_eye.svg';
import OnEye from '../assets/images/register/on_eye.svg';
import Checkbox from '../components/design/CheckBoxComponent';
import { LoginFormData } from '../types/loginFormType';
import { handleLogin } from '../api/login/login';

type Props = StackScreenProps<StackParamList, 'LoginScreen'>;

const Login = ({ navigation }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: '',
      password: '',
    },
  });
  const handleComplete = (data: LoginFormData) => {
    try {
      handleLogin(data);
      // 메인페이지대신 임시 네비게이션 구현
      navigation.navigate('OnboardingScreen');
    } catch (err) {
      console.log('err 확인 : ', err);
    }
  };
  const handleNavigation = () => {
    navigation.navigate('RegisterInfoScreen');
  };
  const [checked, setChecked] = useState(false);
  const [eyeClick, setEyeClick] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.rootContainer}>
        <View style={styles.logoView}>
          <Text style={styles.logo}>Date Plan</Text>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.label}>전화번호</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="전화번호를 입력해주세요"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="phone"
          />
          {errors.phone && (
            <Text style={styles.errorText}>This is required.</Text>
          )}
          <Text style={styles.label}>비밀번호</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="비밀번호를 입력해주세요"
                secureTextEntry={!eyeClick}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
              />
            )}
            name="password"
          />
          <TouchableOpacity
            activeOpacity={1.0}
            onPress={() => setEyeClick((prev) => !prev)}
            style={{
              ...styles.eyeIconView,
              bottom: errors.password ? 33 : 0,
            }}
          >
            {eyeClick ? <OnEye /> : <OffEye />}
          </TouchableOpacity>
          {errors.password && (
            <Text style={styles.errorText}>This is required.</Text>
          )}
          <View style={styles.checkboxView}>
            <Checkbox
              checked={checked}
              onPress={() => setChecked(!checked)}
              label="자동 로그인"
            />
          </View>
        </View>
        <View style={styles.signupView}>
          <Text style={styles.signupText} onPress={handleNavigation}>
            회원가입하기
          </Text>
        </View>
        <View style={styles.buttonView}>
          <ButtonComponent
            disabled={false}
            text="로그인"
            font="bold"
            onPress={handleSubmit(handleComplete)}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginLeft: 25,
    marginRight: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoView: {
    height: 140,
  },
  logo: {
    color: '#000000',
    fontFamily: 'Pretendard-Regular',
    fontSize: 30,
    paddingTop: 76,
  },
  inputView: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 150,
  },
  label: {
    color: '#000000',
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
    marginTop: 32,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    height: 40,
    borderRadius: 4,
    paddingLeft: 12,
  },
  errorText: {
    color: 'red',
    marginTop: 2,
  },
  eyeIconView: {
    position: 'absolute',
    right: 15,
    top: 137,
  },
  checkboxView: {
    flexDirection: 'row',
    marginTop: 40,
  },
  signupView: {},
  signupText: {
    color: '#909090',
    textDecorationLine: 'underline',
    fontSize: 14,
    marginBottom: 23,
  },
  buttonView: {
    width: '100%',
    marginBottom: 40,
  },
});
