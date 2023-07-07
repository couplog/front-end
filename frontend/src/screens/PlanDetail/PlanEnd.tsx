import { SafeAreaView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import Header from '../../components/plan/detail/Header';
import InputGroup from '../../components/plan/detail/InputGroup';
import Footer from '../../components/plan/detail/Footer';
import { StackParamList } from '../../types/routes/navigationType';
import { planState } from '../../state/atoms/userPlanDetail';

type Props = StackScreenProps<StackParamList, 'PlanEndScreen'>;

const PlanEnd = ({ navigation }: Props) => {
  const setPlanAtom = useSetRecoilState(planState);
  const [daySelected, setDaySelected] = useState('');
  const [timeSelected, setTimeSelected] = useState('');

  const reset = useResetRecoilState(planState);

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
    reset();
    setDaySelected('');
    setTimeSelected('');

    navigation.navigate('PlanCalendarScreen');
  };

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
