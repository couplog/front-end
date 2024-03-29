import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Controller, useForm } from 'react-hook-form';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../types/routes/navigationType';
import OffEye from '../assets/images/register/off_eye.svg';
import OnEye from '../assets/images/register/on_eye.svg';
import Checkbox from '../components/design/CheckBoxComponent';
import ButtonComponent from '../components/design/ButtonComponent';
import { SignupFormData } from '../types/register/signupFormType';
import { getFormattedDate } from '../utils/formattedDate';
import { formFields } from '../utils/register/registerFormText';
import { handleSignup } from '../api/signup/signup';

type Props = StackScreenProps<StackParamList, 'RegisterInfoScreen'>;

const RegisterUserInfo = ({ navigation, route }: Props) => {
  const { phone } = route.params;
  const [eyeClick, setEyeClick] = useState(false);
  const [checkedGender, setCheckedGender] = useState<'male' | 'female' | null>(
    null
  );
  const [date, setDate] = useState<Date | ''>('');
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [open, setOpen] = useState(false);

  const {
    control,
    getValues,
    setError,
    reset,
    formState: { errors },
  } = useForm<SignupFormData>({ mode: 'onChange' });

  // 가입하기 버튼 충족조건
  const disableButton =
    Object.keys(errors).length > 0 ||
    Object.values(getValues()).some((value) => value === '') ||
    date === '' ||
    checkedGender === null;

  // 생년월일 함수
  const handleBirthConfirm = (date: Date) => {
    setOpen(false);
    setDate(date);
    const formattedDate = getFormattedDate(date);
    setFormattedDate(formattedDate);
  };

  // 성별 선택 기능
  const handleCheckboxPress = (gender: 'male' | 'female') => {
    setCheckedGender(gender);
  };

  // 가입하기 버튼 기능
  const handleSubmit = (data: SignupFormData) => {
    const userFormData = {
      name: data.name,
      nickname: data.nickname,
      password: data.password,
      phone,
      birthDay: formattedDate,
      gender: checkedGender,
    };

    handleSignup(userFormData)
      .then(() => handleCodeSuccess())
      .catch((err) =>
        err.response.data.code === 'C015'
          ? codeVerifyOver()
          : setError('nickname', { message: err.response.data.message })
      );
  };

  // 가입 성공
  const handleCodeSuccess = () => {
    navigation.navigate('LoginScreen');
    reset();
  };

  // 휴대폰 인증시간 만료
  const codeVerifyOver = () => {
    Alert.alert(
      `인증이 만료되었습니다. ${'\n'} 휴대폰 인증을 다시 진행해주세요.`
    );
    navigation.navigate('RegisterPhoneScreen');
    reset();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          {/* 헤더 UI */}
          <View style={styles.headerView}>
            <Text style={styles.headText}>회원정보를 입력해주세요</Text>
            <TouchableOpacity
              activeOpacity={1.0}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backText}>취소</Text>
            </TouchableOpacity>
          </View>

          {/* Input UI */}
          <View style={styles.inputView}>
            <FlatList
              data={formFields}
              renderItem={({ item }) => (
                <>
                  <Text style={{ ...styles.inputTitleText, marginTop: 15 }}>
                    {item.title}
                  </Text>
                  <Controller
                    control={control}
                    rules={{
                      validate: item.validate,
                    }}
                    name={item.key as keyof SignupFormData}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        value={value}
                        onChangeText={onChange}
                        secureTextEntry={
                          item.key === 'password' ? !eyeClick : undefined
                        }
                        style={{
                          ...styles.textInput,
                          borderColor:
                            errors[item.key as keyof SignupFormData] &&
                            value.length !== 0
                              ? '#E53C3C'
                              : '#EDF0F3',
                        }}
                        placeholder={item.placeholder}
                        placeholderTextColor="#909090"
                      />
                    )}
                  />
                  {errors[item.key as keyof SignupFormData]?.message && (
                    <Text style={styles.errorText}>
                      {errors[item.key as keyof SignupFormData]?.message}
                    </Text>
                  )}
                  {item.key === 'password' ? (
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
                  ) : null}
                </>
              )}
              keyExtractor={(item) => item.key}
            />

            {/* 전화 번호 입력 필드(값 넘어옴) */}
            <Text style={styles.titleTextMargin}>전화번호</Text>
            <TextInput
              editable={false}
              selectTextOnFocus={false}
              value={phone}
              style={styles.textInput}
            />

            {/* 생년월일 입력 필드 */}
            <Text style={styles.titleTextMargin}>생년월일</Text>
            <TouchableOpacity
              activeOpacity={1.0}
              onPress={() => setOpen(true)}
              style={styles.datePickBox}
            >
              <Text
                style={{
                  ...styles.dateText,
                  color: formattedDate ? '#000000' : '#909090',
                }}
              >
                {formattedDate ? formattedDate : 'YYYY-MM-DD'}
              </Text>
            </TouchableOpacity>
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

            {/* 성별 입력 필드 */}
            <Text style={styles.titleTextMargin}>성별</Text>
            <View style={styles.checkBoxView}>
              <Checkbox
                checked={checkedGender === 'male'}
                label="남"
                onPress={() => handleCheckboxPress('male')}
              />
              <Checkbox
                checked={checkedGender === 'female'}
                label="여"
                onPress={() => handleCheckboxPress('female')}
              />
            </View>
          </View>
        </SafeAreaView>

        {/* 가입하기 버튼 UI */}
        <View style={styles.buttonView}>
          <ButtonComponent
            disabled={disableButton as boolean}
            text="가입하기"
            font="bold"
            onPress={() => handleSubmit(getValues())}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const marginBottom = Platform.OS === 'ios' ? 50 : 30;
const marginTop = Platform.OS === 'ios' ? 25 : 10;

const styles = StyleSheet.create({
  container: {
    marginLeft: 25,
    marginRight: 25,
  },
  inputView: {
    marginTop: marginTop,
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
    right: 15,
    top: 60,
  },
  buttonView: {
    marginTop: marginBottom,
    marginLeft: 25,
    marginRight: 25,
  },
  headerView: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headText: {
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
    height: 45,
    borderWidth: 1,
    borderColor: '#EDF0F3',
    borderRadius: 8,
    paddingLeft: 15,
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    marginTop: 15,
  },
  datePickBox: {
    width: '100%',
    color: '#000000',
    height: 46,
    borderWidth: 1,
    borderColor: '#EDF0F3',
    borderRadius: 8,
    marginTop: 15,
    fontFamily: 'Pretendard-Regular',
    justifyContent: 'center',
    paddingLeft: 15,
  },
  dateText: {
    color: '#000000',
    fontFamily: 'Pretendard-Regular',
  },
  backText: {
    fontFamily: 'Pretendard-Regular',
    fontWeight: '500',
    fontSize: 14,
    color: '#FF6564',
  },
});

export default RegisterUserInfo;
