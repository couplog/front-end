import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const Footer = () => {
  return (
    <View style={{ marginBottom: 60 }}>
      {/* 클릭시 캘린더 화면으로 이동 */}
      <TouchableOpacity activeOpacity={1.0}>
        <Text style={styles.text}>일정 등록 취소</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  text: {
    color: '#E53C3CB2',
    fontFamily: 'Pretendard-Regular',
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontWeight: '600',
  },
});
