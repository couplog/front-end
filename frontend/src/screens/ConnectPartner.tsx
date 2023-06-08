import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';
import ButtonComponent from '../components/design/ButtonComponent';
import ModalComponent from '../components/design/ModalComponent';

const ConnectPartner = () => {
  const [visible, setModalVisible] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const reg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6}$/;
  const validCheck = () => {
    if (reg.test(inviteCode)) {
      setError(false);
      setDisabled(false);
    } else {
      setError(true);
      setDisabled(true);
    }
  };

  const handleSubmit = () => {
    console.log('submit');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.rootContainer}>
        <View style={styles.headTextView}>
          <Text style={styles.headText}>연결할 상대방의</Text>
          <Text style={styles.headText}>초대 코드를 입력해주세요</Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="숫자, 문자 6자리"
            onChangeText={(code) => setInviteCode(code)}
            value={inviteCode}
            onBlur={validCheck}
            keyboardType="phone-pad"
          />
          {error && (
            <Text style={styles.errorText}>
              잘못된 코드 형식입니다. 6자리 숫자, 문자
            </Text>
          )}
        </View>

        <ModalComponent visible={visible} setModalVisible={setModalVisible} />
        <View style={styles.checkCodeView}>
          <Text
            style={styles.checkCodeFont}
            onPress={() => setModalVisible(true)}
          >
            나의 초대코드 확인하기
          </Text>
        </View>
        <View style={styles.buttonView}>
          <ButtonComponent
            disabled={disabled}
            text="연결하기"
            font="bold"
            onPress={handleSubmit}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ConnectPartner;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginLeft: 25,
    marginRight: 25,
    justifyContent: 'space-between',
  },
  headTextView: {
    marginTop: 32,
  },
  headText: {
    fontFamily: 'Pretendard-Medium',
    fontWeight: '700',
    lineHeight: 32,
    fontSize: 24,
    color: '#000000',
  },
  inputView: {
    width: '100%',
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 350,
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
  checkboxView: {
    flexDirection: 'row',
    marginTop: 40,
  },
  autoLoginText: {
    marginLeft: 12,
  },
  checkCodeView: {},
  checkCodeFont: {
    textAlign: 'center',
    color: '#000000',
    textDecorationLine: 'underline',
    fontSize: 14,
    marginBottom: 23,
  },
  buttonView: {
    width: '100%',
    marginBottom: 40,
  },
});
