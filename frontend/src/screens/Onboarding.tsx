import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../types/navigationType';
import ButtonComponent from '../components/design/ButtonComponent';

type Props = StackScreenProps<StackParamList, 'OnboardingScreen'>;

const Onboarding = ({ navigation }: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.headFont}>함께하는 즐거움</Text>
        <Text style={styles.subFont}>좋은 하루를 만들어보아요.</Text>
        <View style={styles.hug} />
      </SafeAreaView>
      <View style={styles.buttonView}>
        <ButtonComponent
          text="시작하기"
          font="bold"
          disabled={false}
          onPress={() => navigation.navigate('RegisterPhoneScreen')}
        />
        <View style={{ marginTop: 15 }}>
          {/* 로그인 페이지 확인을 위해 임시 구현 */}
          <ButtonComponent
            text="로그인으로 이동 (임시 구현)"
            font="bold"
            disabled={false}
            onPress={() => navigation.navigate('LoginScreen')}
          />
        </View>
        <View style={{ marginTop: 15 }}>
          {/* 상대방과 연결 페이지 확인을 위해 임시 구현 */}
          <ButtonComponent
            text="상대방과 연결 페이지 이동 (임시 구현)"
            font="bold"
            disabled={false}
            onPress={() => navigation.navigate('ConnectPartnerScreen')}
          />
        </View>
      </View>
    </View>
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
    color: '#000000',
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
  // 임시 일러스트
  hug: {
    width: 327,
    height: 378,
    backgroundColor: '#E7E7E7',
    marginTop: 40,
  },
});
