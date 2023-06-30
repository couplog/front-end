import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { StackScreenProps } from '@react-navigation/stack';
import Header from '../../components/plan/detail/Header';
import RepeatOption from '../../components/plan/detail/RepeatStartOption';
import Footer from '../../components/plan/detail/Footer';
import RepeatEndOption from '../../components/plan/detail/RepeatEndOption';
import { planState } from '../../state/atoms/userPlanDetail';
import { userState } from '../../state/atoms/userAtom';
import { handleCreatePlan } from '../../api/plan/createPlan';
import { UserPlanDetailProps } from '../../types/atom/userPlanType';
import { StackParamList } from '../../types/routes/navigationType';

type Props = StackScreenProps<StackParamList, 'PlanEndScreen'>;

const PlanRepeat = ({ navigation }: Props) => {
  const userData = useRecoilValue(userState);
  const [planAtom, setPlanAtom] = useRecoilState(planState);
  const [repeatStart, setRepeatStart] = useState('');
  const [repeatCode, setRepeatCode] = useState('');
  const [repeatEnd, setRepeatEnd] = useState('');
  const [startVisible, setStartVisible] = useState(false);
  const [endVisible, setEndVisible] = useState(false);

  const startOptionVisible = () => {
    setStartVisible(!startVisible);
  };

  const endOptionVisible = () => {
    setEndVisible(!endVisible);
  };

  const repeatEndVisible = repeatStart === '' || repeatStart === '없음';

  const repeatTextStyle = {
    ...styles.text,
    color: repeatStart ? '#000000' : '#909090',
  };

  // 일정 생성 기능
  const handlePlanCreation = async (
    planData: UserPlanDetailProps,
    memberId: number | null
  ) => {
    try {
      const res = await handleCreatePlan(planData, memberId);
      // 임시 이동 (캘린더 페이지 이동 구현 예정)
      console.log(res.data.success);
      navigation.navigate('MainScreen');
    } catch (err: any) {
      Alert.alert(err.response.data.message);
    }
  };

  const handleSetPlan = async () => {
    // 없음 = 백엔드에서 ''로 받아야함
    const updatedRepeatEnd = repeatEnd === '없음' ? '' : repeatEnd;

    const planData = {
      ...planAtom,
      repeatRule: repeatCode,
      repeatEndTime: updatedRepeatEnd,
    };

    // atom 업데이트
    setPlanAtom(planData);

    // 일정 생성 함수 실행
    handlePlanCreation(planData, userData.memberId);
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Header text="추가" disabled={!repeatStart} onPress={handleSetPlan} />

        <View style={styles.inputView}>
          <Text style={styles.inputText}>반복</Text>
          <TouchableOpacity
            activeOpacity={1.0}
            style={styles.placeInputBox}
            onPress={startOptionVisible}
          >
            <Text style={repeatTextStyle}>
              {repeatStart ? repeatStart : '없음'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 반복 list option */}
        {startVisible && (
          <RepeatOption
            selectedOption={repeatStart}
            setOptionVisible={setStartVisible}
            setSelectedOption={setRepeatStart}
            setRepeatCode={setRepeatCode}
          />
        )}

        {/* 반복 종료 list option */}
        {!repeatEndVisible ? (
          <View style={styles.inputView}>
            <Text style={styles.inputText}>반복 종료</Text>
            <TouchableOpacity
              activeOpacity={1.0}
              style={styles.placeInputBox}
              onPress={endOptionVisible}
            >
              <Text style={repeatTextStyle}>
                {repeatEnd ? repeatEnd : '없음'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {endVisible ? (
          <RepeatEndOption
            setSelectedOption={setRepeatEnd}
            setOptionVisible={setEndVisible}
            selectedOption={repeatEnd}
            setRepeatCode={setRepeatCode}
          />
        ) : null}
      </SafeAreaView>
      <Footer />
    </View>
  );
};

export default PlanRepeat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 25,
    marginRight: 25,
  },
  inputView: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    color: '#000000',
  },
  placeInputBox: {
    width: 155,
    height: 32,
    backgroundColor: '#EDF0F3',
    borderRadius: 8,
    textAlign: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Pretendard-Regular',
    textAlign: 'center',
  },
});
