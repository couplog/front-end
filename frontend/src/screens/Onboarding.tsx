import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../types/routes/navigationType';
import ButtonComponent from '../components/design/ButtonComponent';

type Props = StackScreenProps<StackParamList, 'OnboardingScreen'>;

const Onboarding = ({ navigation }: Props) => {
  return (
    <ImageBackground
      source={require('../assets/images/onboarding/backgroundStart.png')}
      resizeMode="contain"
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.headFont}>함께 쓰는 커플로그</Text>
        <Text style={styles.subFont}>
          둘만의 이야기를 기록하고 기억해보세요.
        </Text>
      </SafeAreaView>
      <View style={styles.buttonView}>
        <ButtonComponent
          text="시작하기"
          font="bold"
          disabled={false}
          onPress={() => navigation.navigate('LoginScreen')}
        />
      </View>
    </ImageBackground>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    marginLeft: 25,
    marginRight: 25,
    flex: 1,
  },
  headFont: {
    marginTop: 90,
    fontFamily: 'Pretendard-Medium',
    fontWeight: '700',
    fontSize: 32,
    color: '#FF6564',
  },
  subFont: {
    fontFamily: 'Pretendard-Medium',
    color: '#000000',
    fontSize: 18,
    lineHeight: 20,
    marginTop: 15,
  },
  buttonView: {
    marginBottom: 50,
    marginLeft: 25,
    marginRight: 25,
  },
});
