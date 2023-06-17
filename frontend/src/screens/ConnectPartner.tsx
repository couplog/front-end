import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { StackScreenProps } from '@react-navigation/stack';
import DatePicker from 'react-native-date-picker';
import ButtonComponent from '../components/design/ButtonComponent';
import ModalComponent from '../components/modal/ModalComponent';
import { getFormattedDate } from '../utils/formattedDate';
import { userState } from '../state/atoms/userAtom';
import {
  handleGettingCode,
  handlePostingCode,
} from '../api/connectCode/connectCode';
import { StackParamList } from '../types/routes/navigationType';

type Props = StackScreenProps<StackParamList, 'ConnectPartnerScreen'>;

const ConnectPartner = ({ navigation }: Props) => {
  const [visible, setModalVisible] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [errorText, setErrorText] = useState('');
  const [date, setDate] = useState<Date | ''>('');
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [myCode, setMyCode] = useState('');
  const userInfo = useRecoilValue(userState);
  const { memberId } = userInfo;

  const validCheck = (code: string) => {
    const pattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6}$/;
    if (code.length === 0) {
      setErrorText('');
    } else if (!pattern.test(code)) {
      setErrorText('잘못된 코드 형식입니다. 6자리 숫자, 문자');
    } else {
      setErrorText('');
    }
  };

  // 버튼 비활성화
  const disableButton =
    formattedDate.length === 0 || inviteCode.length === 0 || errorText;

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
        // 일치하지 않는 코드
        .catch((err) => {
          setErrorText('존재하지 않는 코드입니다.');
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
      <View style={{ flex: 1, marginLeft: 25, marginRight: 25 }}>
        <SafeAreaView style={styles.rootContainer}>
          <View style={styles.headTextView}>
            <Text style={styles.headText}>연결할 상대방의</Text>
            <Text style={styles.headText}>초대 코드를 입력해주세요</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={{
                ...styles.codeInput,
                borderColor: errorText ? '#E53C3C' : '#EDF0F3',
              }}
              placeholder="숫자, 문자 6자리"
              placeholderTextColor="#909090"
              onChangeText={(code) => setInviteCode(code)}
              value={inviteCode}
              onChange={(event) => validCheck(event.nativeEvent.text)}
            />
            {errorText && <Text style={styles.errorText}>{errorText}</Text>}
          </View>
          <View style={styles.firstDateView}>
            <Text style={styles.firstDateText}>우리가 처음 만난 날</Text>
            <TouchableOpacity
              style={styles.dateInput}
              activeOpacity={1.0}
              onPress={() => setOpen(true)}
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
              onConfirm={(date) => handleFirstDate(date)}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
        </SafeAreaView>
        <View style={styles.checkCodeView}>
          <Text style={styles.checkCodeFont} onPress={handleCheckCode}>
            나의 초대코드 확인하기
          </Text>
        </View>
        <View style={styles.buttonView}>
          <ButtonComponent
            disabled={disableButton as boolean}
            text="연결하기"
            font="bold"
            onPress={handleSubmit}
          />
        </View>
        <ModalComponent
          visible={visible}
          setModalVisible={setModalVisible}
          code={myCode}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ConnectPartner;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  headTextView: {
    marginTop: 30,
    marginBottom: 30,
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
    marginBottom: 30,
  },
  codeInput: {
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#EDF0F3',
    height: 45,
    borderRadius: 8,
    paddingLeft: 12,
  },
  errorText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    color: '#E53C3C',
    marginTop: 2,
  },
  firstDateView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  firstDateText: {
    color: '#000000',
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
  },
  dateInput: {
    width: '48%',
    height: 32,
    borderWidth: 1,
    borderColor: '#EDF0F3',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontFamily: 'Pretendard-Medium',
  },
  checkCodeView: { alignItems: 'center', marginBottom: 25 },
  checkCodeFont: {
    color: '#000000',
    fontFamily: 'Pretendard-Medium',
    textDecorationLine: 'underline',
  },
  buttonView: {
    width: '100%',
    marginBottom: 40,
  },
});
