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
import OffEye from '../assets/images/off_eye.svg';
import OnEye from '../assets/images/on_eye.svg';
import Checkbox from '../components/design/CheckBoxComponent';
import ButtonComponent from '../components/design/ButtonComponent';

const RegisterUserInfo = () => {
  const [eyeClick, setEyeClick] = useState(false);
  const [userInfo, setUserInfo] = useState([
    { title: '이름', placeholder: '2-10자 한글', value: '' },
    { title: '닉네임', placeholder: '2-10자 한글', value: '' },
    { title: '전화번호', placeholder: '010-xxxx-xxxx', value: '' },
    { title: '생년월일', placeholder: 'YYYY-MM-DD', value: '' },
    { title: '성별', placeholder: '', value: '' },
    { title: '비밀번호', placeholder: '5-20자 영문, 숫자 조합', value: '' },
  ]);

  const handleInputChange = (text: string, index: number) => {
    const updatedUserInfo = [...userInfo];
    updatedUserInfo[index].value = text;
    setUserInfo(updatedUserInfo);
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: { title: string; placeholder: string; value: string };
    index: number;
  }) => {
    if (item.title === '성별') {
      return (
        <View style={{ marginTop: 28 }}>
          <Text style={styles.titleText}>{item.title}</Text>
          <View style={styles.checkBoxView}>
            <View style={{ ...styles.option, marginRight: 50 }}>
              <Checkbox />
              <Text style={{ ...styles.titleText, marginLeft: 10 }}>남</Text>
            </View>
            <View style={styles.option}>
              <Checkbox />
              <Text style={{ ...styles.titleText, marginLeft: 10 }}>여</Text>
            </View>
          </View>
        </View>
      );
    }

    return (
      <View style={{ marginTop: 28 }}>
        <Text style={styles.titleText}>{item.title}</Text>
        <TextInput
          style={styles.textInput}
          placeholder={item.placeholder}
          placeholderTextColor="#909090"
          value={item.value}
          onChangeText={(text) => handleInputChange(text, index)}
        />
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.headFont}>회원정보를 입력해주세요</Text>
          <View style={styles.inputView}>
            <FlatList
              data={userInfo}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity
              activeOpacity={1.0}
              onPress={() => setEyeClick((prev) => !prev)}
              style={styles.eyeIconView}
            >
              {eyeClick ? <OnEye /> : <OffEye />}
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <View style={styles.buttonView}>
          <ButtonComponent
            disabled={false}
            text="가입하기"
            font="bold"
            onPress={() => console.log('가입하기')}
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
  headFont: {
    marginTop: 30,
    fontFamily: 'Pretendard-Medium',
    fontWeight: '700',
    fontSize: 24,
    color: '#000000',
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
  titleText: {
    color: '#000000',
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
  },
  buttonView: {
    marginBottom: 40,
    marginLeft: 25,
    marginRight: 25,
  },
});

export default RegisterUserInfo;
