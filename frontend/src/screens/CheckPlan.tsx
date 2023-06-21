import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../types/routes/navigationType';
import CheckCalendar from '../components/plan/CheckCalendar';

type Props = StackScreenProps<StackParamList, 'CheckPlanScreen'>;

const CheckPlan = ({ navigation }: Props) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.marginContainer}>
        <SafeAreaView style={styles.rootContainer}>
          <CheckCalendar />
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CheckPlan;

const styles = StyleSheet.create({
  marginContainer: {
    flex: 1,
    marginLeft: 25,
    marginRight: 25,
  },
  rootContainer: {
    flex: 1,
  },
  logoView: {
    width: 200,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#E7E7E7',
    marginTop: 80,
  },
  logo: {
    fontFamily: 'Pretendard-Bold',
    color: '#909090',
    fontSize: 30,
  },
  errorText: {
    fontSize: 12,
    lineHeight: 15,
    color: '#E53C3C',
    marginTop: 15,
    fontFamily: 'Pretendard-Regular',
  },
  inputView: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    marginTop: 64,
  },
  label: {
    color: '#000000',
    fontFamily: 'Pretendard-Regular',
    marginTop: 32,
    marginBottom: 5,
  },
  inputBox: {
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#EDF0F3',
    height: 45,
    borderRadius: 8,
    paddingLeft: 12,
  },
  passwordView: {
    position: 'relative',
  },
  eyeIconView: {
    position: 'absolute',
    right: 15,
    top: 12,
  },
  checkboxView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  signupText: {
    color: '#909090',
    textDecorationLine: 'underline',
    fontFamily: 'Pretendard-Regular',
    marginBottom: 25,
  },
  buttonView: {
    width: '100%',
    marginBottom: 50,
  },
});
