import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../types/routes/navigationType';
import CheckCalendar from '../components/plan/CheckCalendar';

type Props = StackScreenProps<StackParamList, 'PlanCalendarScreen'>;

const PlanCalendar = ({ navigation }: Props) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.rootContainer}>
        <CheckCalendar detail={false} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default PlanCalendar;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
