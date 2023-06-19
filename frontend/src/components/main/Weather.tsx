import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Cloud from '../../assets/images/main/cloud.svg';

const Weather = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 40,
      }}
    >
      <View style={{ flexDirection: 'row', gap: 5 }}>
        <Cloud />
        <Text style={styles.numText}>20°</Text>
      </View>
      <Text style={styles.basicText}>실외 데이트에 적당한 날씨네요~ </Text>
    </View>
  );
};

export default Weather;

const styles = StyleSheet.create({
  numText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  basicText: {
    fontFamily: 'Pretendard-Regular',
    color: '#FFFFFF',
  },
});
