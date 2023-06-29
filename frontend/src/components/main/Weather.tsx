import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Cloud from '../../assets/images/main/cloud.svg';

const Weather = () => {
  return (
    <>
      {/* 날씨는 추후 백엔드 구현 예정 */}
      <View style={styles.weatherBox}>
        <View style={styles.flex}>
          <Cloud />
          <Text style={styles.numText}>20°</Text>
        </View>
        <Text style={styles.tempText}>실외 데이트에 적당한 날씨네요~</Text>
      </View>
    </>
  );
};

export default Weather;

const styles = StyleSheet.create({
  weatherBox: {
    width: '100%',
    marginTop: 40,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: 'rgba(237, 240, 243, 0.3)',
    borderRadius: 12,
    padding: 10,
    gap: 3,
  },
  flex: {
    flexDirection: 'row',
    marginLeft: 5,
    gap: 5,
  },
  numText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  tempText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 5,
  },
});
