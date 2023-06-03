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
import { useRecoilState } from 'recoil';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import OffEye from '../assets/images/off_eye.svg';
import OnEye from '../assets/images/on_eye.svg';
import Checkbox from '../components/design/CheckBoxComponent';
import ButtonComponent from '../components/design/ButtonComponent';
import { userState } from '../state/atoms/userAtom';
import { validateNameWrapper, validatePassword } from '../utils/validation';
import { SignupFormData } from '../types/signupFormType';

const RegisterUserInfo = () => {
  const [userInfo, setUserInfo] = useRecoilState(userState);

  const [eyeClick, setEyeClick] = useState(false);
  const [disable, setDisable] = useState(true);
  const [checked, setChecked] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);

  console.log(userInfo);

  const {
    control,
    getValues,
    formState: { errors },
  } = useForm<SignupFormData>({ mode: 'onChange' });

  const handleSubmit = (data: SignupFormData) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      name: data.name,
      nickname: data.nickname,
      birth: formattedDate,
      gender: selectedGender,
      password: data.password,
    }));
  };

  // 생년월일 기능
  // 생년월일 포맷
  const year = date?.getFullYear();
  const month = date ? String(date.getMonth() + 1).padStart(2, '0') : '';
  const day = date ? String(date.getDate()).padStart(2, '0') : '';
  const formattedDate = date ? `${year}-${month}-${day}` : '';

  // 생년월일 함수
  const handleBirthConfirm = (date: Date) => {
    setOpen(false);
    setDate(date);
  };

  // 성별 선택 기능
  const handleCheckboxPress = (gender: '남자' | '여자') => {
    setChecked((prevChecked) => !prevChecked);
    setSelectedGender(gender);
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
                  style={{
                    ...styles.textInput,
                    borderColor:
                      errors.name && value.length !== 0 ? '#E53C3C' : '#EDF0F3',
                  }}
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
                  style={{
                    ...styles.textInput,
                    borderColor:
                      errors.nickname && value.length !== 0
                        ? '#E53C3C'
                        : '#EDF0F3',
                  }}
                  placeholder="2-10자 한글"
                  placeholderTextColor="#909090"
                />
              )}
            />
            {errors.nickname && (
              <Text style={styles.errorText}>{errors.nickname.message}</Text>
            )}

            <Text style={styles.titleTextMargin}>전화번호</Text>
            <TextInput
              editable={false}
              selectTextOnFocus={false}
              value={userInfo.phone}
              style={styles.textInput}
            />

            <Text style={styles.titleTextMargin}>생년월일</Text>
            <TextInput
              onPressIn={() => setOpen(true)}
              value={date ? formattedDate : undefined}
              style={styles.textInput}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#909090"
            />
            <DatePicker
              modal
              open={open}
              mode="date"
              date={date || new Date()}
              locale="ko"
              onConfirm={(date) => handleBirthConfirm(date)}
              onCancel={() => {
                setOpen(false);
              }}
            />

            <Text style={styles.titleTextMargin}>성별</Text>
            <View style={styles.checkBoxView}>
              <Checkbox
                checked={selectedGender === '남자'}
                label="남"
                onPress={() => handleCheckboxPress('남자')}
              />
              <Checkbox
                checked={selectedGender === '여자'}
                label="여"
                onPress={() => handleCheckboxPress('여자')}
              />
            </View>

            <Text style={styles.titleTextMargin}>비밀번호</Text>
            <Controller
              control={control}
              rules={{ validate: validatePassword }}
              name="password"
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  style={{
                    ...styles.textInput,
                    borderColor:
                      errors.password && value.length !== 0
                        ? '#E53C3C'
                        : '#EDF0F3',
                  }}
                  secureTextEntry={!eyeClick}
                  placeholder="5-20자 영문, 숫자 조합"
                  placeholderTextColor="#909090"
                />
              )}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
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
            disabled={false}
            text="가입하기"
            font="bold"
            onPress={() => handleSubmit(getValues())}
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
    justifyContent: 'space-between',
    marginRight: 210,
    alignItems: 'center',
    marginTop: 15,
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
    marginTop: 15,
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
  buttonView: {
    marginBottom: 40,
    marginLeft: 25,
    marginRight: 25,
  },
});

export default RegisterUserInfo;
