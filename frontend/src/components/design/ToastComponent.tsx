import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Warn from '../../assets/images/register/warn.svg';

// 토스트 메세지
export const toastConfig = {
  codeToast: () => (
    <View style={styles.toastView}>
      <Warn />
      <Text style={styles.toastText}>입력시간이 초과되었습니다.</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  toastView: {
    height: 45,
    width: 218,
    backgroundColor: '#5A5A5A',
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toastText: {
    marginLeft: 10,
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    color: '#FFFFFF',
  },
});
