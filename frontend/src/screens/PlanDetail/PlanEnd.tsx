import { SafeAreaView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { StackScreenProps } from '@react-navigation/stack';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import Header from '../../components/plan/detail/Header';
import InputGroup from '../../components/plan/detail/InputGroup';
import Footer from '../../components/plan/detail/Footer';
import { StackParamList } from '../../types/routes/navigationType';
import { planState } from '../../state/atoms/userPlanDetail';
import { editModeState } from '../../state/atoms/createEditModeAtom';

type Props = StackScreenProps<StackParamList, 'PlanEndScreen'>;

const PlanEnd = ({ navigation }: Props) => {
  const setPlanAtom = useSetRecoilState(planState);
  const createEditMode = useRecoilValue(editModeState);
  const [daySelected, setDaySelected] = useState(
    format(new Date(), 'yyyy-MM-dd')
  );
  const [timeSelected, setTimeSelected] = useState('');

  const reset = useResetRecoilState(planState);
  const editReset = useResetRecoilState(editModeState);

  const isDisabled = daySelected === '' || timeSelected === '';

  const handleEndDayTime = () => {
    setPlanAtom((prevPlan) => ({
      ...prevPlan,
      endDateTime: `${daySelected}T${timeSelected}`,
    }));

    navigation.navigate('PlanPlaceContentScreen');
  };

  // 일정 취소
  const handelCancel = () => {
    createEditMode.mode ? editReset() : reset();
    setDaySelected('');
    setTimeSelected('');

    navigation.navigate('PlanCalendarScreen');
  };

  // 수정 모드일시
  useEffect(() => {
    if (createEditMode.mode) {
      const dateTime = new Date(createEditMode.detail.endDateTime);

      // 날짜 부분 추출 (YYYY-MM-DD 형식)
      const datePart = dateTime.toISOString().split('T')[0];
      setDaySelected(datePart);

      // 시간 부분 추출 (HH:mm 형식)
      const timePart = dateTime.toTimeString().slice(0, 5);
      setTimeSelected(timePart);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createEditMode.mode]);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Header text="다음" onPress={handleEndDayTime} disabled={isDisabled} />

        <InputGroup
          text="종료"
          daySelected={daySelected}
          setDaySelected={setDaySelected}
          timeSelected={timeSelected}
          setTimeSelected={setTimeSelected}
        />
      </SafeAreaView>
      <Footer onPress={handelCancel} />
    </View>
  );
};

export default PlanEnd;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 25,
    marginRight: 25,
  },
});
