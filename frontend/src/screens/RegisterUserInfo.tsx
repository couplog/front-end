import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { useRecoilValue } from 'recoil';
import { Controller, useForm } from 'react-hook-form';
import OffEye from '../assets/images/off_eye.svg';
import OnEye from '../assets/images/on_eye.svg';
import Checkbox from '../components/design/CheckBoxComponent';
import ButtonComponent from '../components/design/ButtonComponent';
import { userState } from '../state/atoms/userAtom';

interface SignupFormData {
  name: string;
  nickname: string;
  birth: string;
}
const RegisterUserInfo = () => {
  const [eyeClick, setEyeClick] = useState(false);
  const [disable, setDisable] = useState(true);
  const userInfo = useRecoilValue(userState);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({ mode: 'onChange' });

  const onSubmit = (data: SignupFormData) => {
    console.log('가입 정보:', data);
  };

  // 이름, 닉네임 정규식
  const validateName = (value: string, fieldName: string) => {
    if (value.length === 0) {
      return '';
    }
    if (value.length < 2 || value.length > 10 || !/^[가-힣]+$/.test(value)) {
      return `잘못된 ${fieldName} 형식입니다. 2-10자 한글`;
    }
    return true;
  };

  const validateNameWrapper = (fieldName: string) => (value: string) => {
    const validation = validateName(value, fieldName);
    return typeof validation === 'string' ? validation : undefined;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          {/* 헤더 UI */}
          <Text style={styles.headText}>회원정보를 입력해주세요</Text>

          {/* Input UI */}
          <View style={styles.inputView}>
            <Text style={styles.inputTitleText}>이름</Text>
            <Controller
              control={control}
              rules={{ validate: validateNameWrapper('이름') }}
              name="name"
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  style={styles.textInput}
                  placeholder="2-10자 한글"
                  placeholderTextColor="#909090"
                />
              )}
            />
            {errors.name && (
              <Text style={styles.errorText}>{errors.name.message}</Text>
            )}

            <Text style={styles.titleTextMargin}>닉네임</Text>
            <Controller
              control={control}
              rules={{ validate: validateNameWrapper('닉네임') }}
              name="nickname"
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  style={styles.textInput}
                  placeholder="2-10자 한글"
                  placeholderTextColor="#909090"
                />
              )}
            />
            {errors.nickname && (
              <Text style={styles.errorText}>{errors.nickname.message}</Text>
            )}

            <Text style={styles.titleTextMargin}>전화번호</Text>
            <TextInput value={userInfo.phone} style={styles.textInput} />

            <Text style={styles.titleTextMargin}>생년월일</Text>
            <Controller
              control={control}
              rules={{ validate: validateNameWrapper('닉네임') }}
              name="nickname"
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  style={styles.textInput}
                  placeholder="2-10자 한글"
                  placeholderTextColor="#909090"
                />
              )}
            />
            {errors.nickname && (
              <Text style={styles.errorText}>{errors.nickname.message}</Text>
            )}

            <TouchableOpacity
              activeOpacity={1.0}
              onPress={() => setEyeClick((prev) => !prev)}
              style={styles.eyeIconView}
            >
              {eyeClick ? <OnEye /> : <OffEye />}
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* 가입하기 버튼 UI */}
        <View style={styles.buttonView}>
          <ButtonComponent
            disabled={disable}
            text="가입하기"
            font="bold"
            onPress={() => console.log('상대방과 연결하기 navigate')}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 25,
    marginRight: 25,
    flex: 1,
  },
  inputView: {
    marginTop: 35,
  },
  checkBoxView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  eyeIconView: {
    position: 'absolute',
    right: 0,
    bottom: -25,
  },
  headText: {
    marginTop: 30,
    fontFamily: 'Pretendard-Medium',
    fontWeight: '700',
    fontSize: 24,
    color: '#000000',
  },
  errorText: {
    marginTop: 5,
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    color: '#E53C3C',
  },
  inputTitleText: {
    color: '#000000',
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
  },
  titleTextMargin: {
    color: '#000000',
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    marginTop: 20,
  },
  textInput: {
    width: '100%',
    color: '#000000',
    height: 44,
    borderWidth: 1,
    borderColor: '#EDF0F3',
    borderRadius: 8,
    padding: 15,
    fontSize: 14,
    marginTop: 5,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  buttonView: {
    marginBottom: 40,
    marginLeft: 25,
    marginRight: 25,
  },
});

export default RegisterUserInfo;
