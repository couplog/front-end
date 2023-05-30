import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../types/navigationType';

type Props = StackScreenProps<StackParamList, 'OnboardingScreen'>;

const Onboarding = ({ navigation }: Props) => {
  return (
    <SafeAreaView>
      <Text>Onboarding</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('RegisterInfoScreen')}
      >
        <Text>회원가입</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
