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
import { useRecoilValue } from 'recoil';
import DatePicker from 'react-native-date-picker';
import ButtonComponent from '../components/design/ButtonComponent';
import ModalComponent from '../components/modal/ModalComponent';
import { getFormattedDate } from '../utils/formattedDate';
import { userState } from '../state/atoms/userAtom';
import {
  handleGettingCode,
  handlePostingCode,
} from '../api/connectCode/connectCode';

const ConnectPartner = () => {
  const [visible, setModalVisible] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [validCheckError, setValidCheckError] = useState(false);
  const [error, setError] = useState(false);
  const [date, setDate] = useState<Date | ''>('');
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [myCode, setMyCode] = useState('');
  const userInfo = useRecoilValue(userState);
  const { memberId } = userInfo;

  const reg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6}$/;
  const validCheck = () => {
    if (reg.test(inviteCode)) {
      setValidCheckError(false);
      setError(false);
    } else if (inviteCode.length === 0) {
      setValidCheckError(false);
      setError(false);
    } else {
      setValidCheckError(true);
    }
  };

  const disableButton =
    formattedDate.length === 0 ||
    inviteCode.length === 0 ||
    !reg.test(inviteCode);

  // 상대방과 연결하기 버튼
  const handleSubmit = () => {
    const userFormData = {
      connectionCode: inviteCode,
      firstDate: formattedDate,
    };

    if (memberId !== null) {
      console.log(
        `req: {connectCode : ${inviteCode}, firstDate: ${formattedDate}}`
      );
      // 상대방과 연결하기 API
      handlePostingCode(memberId, userFormData)
        .then((res) => {
          console.log(res);
          // 메인화면으로 이동 예정
        })
        .catch((err) => {
          setError(true);
          console.log(err.response.data);
        });
    }
  };

  // 처음 만난 날 설정 함수
  const handleFirstDate = (date: Date) => {
    setOpen(false);
    setDate(date);
    const formattedDate = getFormattedDate(date);
    setFormattedDate(formattedDate);
  };

  // 본인 코드 확인 함수
  const handleCheckCode = async () => {
    console.log(userInfo);
    if (memberId !== null) {
      const res = await handleGettingCode(memberId);
      setMyCode(res.data.data.connectionCode);
    }

    setModalVisible(true);
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
            keyboardType="name-phone-pad"
          />
          {validCheckError && (
            <Text style={styles.errorText}>
              잘못된 코드 형식입니다. 6자리 숫자, 문자
            </Text>
          )}
          {error && !validCheckError && (
            <Text style={styles.errorText}>존재하지 않는 코드입니다.</Text>
          )}
        </View>
        <View style={styles.firstDateView}>
          <Text style={styles.firstDateText}>우리가 처음 만난 날</Text>
          <TextInput
            onPressIn={() => setOpen(true)}
            value={date ? formattedDate : undefined}
            style={styles.dateInput}
            editable={false}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#000000"
          />
          <DatePicker
            modal
            open={open}
            mode="date"
            date={date || new Date()}
            locale="ko"
            onConfirm={(date) => handleFirstDate(date)}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>

        <ModalComponent
          visible={visible}
          setModalVisible={setModalVisible}
          code={myCode}
        />
        <View style={styles.checkCodeView}>
          <Text style={styles.checkCodeFont} onPress={handleCheckCode}>
            나의 초대코드 확인하기
          </Text>
        </View>
        <View style={styles.buttonView}>
          <ButtonComponent
            disabled={disableButton}
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
    marginTop: 68,
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
    marginBottom: 32,
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
    color: '#E53C3C',
    marginTop: 2,
  },
  firstDateView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 32,
    marginBottom: 400,
  },
  firstDateText: {
    color: '#000000',
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
  },
  dateInput: {
    width: 151,
    height: 32,
    borderWidth: 1,
    borderColor: '#EDF0F3',
    borderRadius: 8,
    padding: 15,
    fontSize: 14,
    textAlign: 'center',
  },
  checkCodeView: {},
  checkCodeFont: {
    textAlign: 'center',
    fontFamily: 'Pretendard-Medium',
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
