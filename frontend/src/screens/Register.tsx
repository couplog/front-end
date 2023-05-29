import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Register = () => {
  return (
    <SafeAreaView style={{ marginLeft: 25, marginRight: 25 }}>
      <Text style={styles.headFont}>
        회원가입을 위해{'\n'}
        휴대폰 번호를 인증해주세요
      </Text>
      <View style={styles.boxView}>
        <Text>본인 확인을 위한 약관 모두 동의</Text>
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  headFont: {
    marginTop: 70,
    fontFamily: 'Pretendard-Medium',
    fontWeight: '700',
    lineHeight: 32,
    fontSize: 24,
    color: '#000000',
  },
  boxView: {
    marginTop: 25,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: 327,
    height: 54,
  },
});
