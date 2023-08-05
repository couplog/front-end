import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { format } from 'date-fns';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { StackScreenProps } from '@react-navigation/stack';
import Header from '../../components/plan/detail/Header';
import RepeatOption from '../../components/plan/detail/RepeatStartOption';
import Footer from '../../components/plan/detail/Footer';
import RepeatEndOption from '../../components/plan/detail/RepeatEndOption';
import { planState } from '../../state/atoms/userPlanDetail';
import { userState } from '../../state/atoms/userAtom';
import { handleCreateDate, handleCreatePlan } from '../../api/plan/createPlan';
import { UserPlanDetailProps } from '../../types/atom/userPlanType';
import { StackParamList } from '../../types/routes/navigationType';
import { coupleState } from '../../state/atoms/coupleAtom';
import { modeState } from '../../state/atoms/creatModeAtom';

type Props = StackScreenProps<StackParamList, 'PlanRepeatScreen'>;

const PlanRepeat = ({ navigation }: Props) => {
  const userData = useRecoilValue(userState);
  const coupleData = useRecoilValue(coupleState);
  const createMode = useRecoilValue(modeState);
  const [planAtom, setPlanAtom] = useRecoilState(planState);
  const [repeatStart, setRepeatStart] = useState('없음');
  const [repeatCode, setRepeatCode] = useState('N');
  const [repeatEnd, setRepeatEnd] = useState('');
  const [startVisible, setStartVisible] = useState(false);
  const [endVisible, setEndVisible] = useState(false);

  const reset = useResetRecoilState(planState);

  const startOptionVisible = () => {
    setStartVisible(!startVisible);
    setEndVisible(false);
  };

  const endOptionVisible = () => {
    setEndVisible(!endVisible);
    setStartVisible(false);
  };

  const handleCloseOptions = () => {
    setStartVisible(false);
    setEndVisible(false);
  };

  const repeatEndVisible = repeatStart === '' || repeatStart === '없음';

  const repeatTextStyle = {
    ...styles.text,
    color: repeatStart === '없음' ? '#909090' : '#000000',
  };

  // 개인 일정 or 데이트 생성 기능
  const handlePlanCreation = async (
    planData: UserPlanDetailProps,
    memberId: number | null
  ) => {
    try {
      const res = await handleCreatePlan(planData, memberId);
      console.log('개인: ', res.data.success);
      navigation.navigate('PlanCalendarScreen');
    } catch (err: any) {
      Alert.alert(err.response.data.message);
    }
  };

  const handleDateCreation = async (
    planData: UserPlanDetailProps,
    coupleId: number | null
  ) => {
    try {
      const res = await handleCreateDate(planData, coupleId);
      console.log('데이트: ', res.data.success);
      navigation.navigate('PlanCalendarScreen');
    } catch (err: any) {
      Alert.alert(err.response.data.message);
    }
  };

  const handleSetPlan = () => {
    // 없음 = 백엔드에서 ''로 받아야함
    const updatedRepeatEnd = repeatEnd === '없음' ? '' : repeatEnd;

    const planData = {
      ...planAtom,
      repeatRule: repeatCode,
      repeatEndTime: updatedRepeatEnd,
    };

    // atom 업데이트
    setPlanAtom(planData);
    console.log(planData);

    // 일정 or 데이트 생성 함수 실행
    createMode === 'plan'
      ? handlePlanCreation(planData, userData.memberId)
      : handleDateCreation(planData, coupleData.coupleId);
  };

  // 일정 취소
  const handelCancel = () => {
    reset();
    setRepeatStart('');
    setRepeatEnd('');
    setRepeatCode('');

    navigation.navigate('PlanCalendarScreen');
  };

  return (
    <TouchableWithoutFeedback onPress={handleCloseOptions}>
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
            <TouchableWithoutFeedback onPress={() => setStartVisible(false)}>
              <View>
                <RepeatOption
                  selectedOption={repeatStart}
                  setOptionVisible={setStartVisible}
                  setSelectedOption={setRepeatStart}
                  setRepeatCode={setRepeatCode}
                />
              </View>
            </TouchableWithoutFeedback>
          )}

          {/* 반복 종료 list option */}
          {!repeatEndVisible && (
            <View style={styles.inputView}>
              <Text style={styles.inputText}>반복 종료</Text>
              <TouchableOpacity
                activeOpacity={1.0}
                style={styles.placeInputBox}
                onPress={endOptionVisible}
              >
                <Text style={repeatTextStyle}>
                  {repeatEnd && repeatEnd !== '없음'
                    ? format(new Date(repeatEnd), 'yyyy. MM. dd')
                    : '없음'}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {endVisible && (
            <RepeatEndOption
              setSelectedOption={setRepeatEnd}
              setOptionVisible={setEndVisible}
              selectedOption={repeatEnd}
              setRepeatCode={setRepeatCode}
            />
          )}
        </SafeAreaView>
        <Footer onPress={handelCancel} />
      </View>
    </TouchableWithoutFeedback>
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
