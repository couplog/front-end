import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const CalendarDetailBox = () => {
  return (
    <View style={styles.containerView}>
      <View style={styles.colorView} />
      <View style={styles.detailBoxView}>
        <Text style={styles.detailHeaderText}>롯데월드</Text>
        <Text style={styles.placeText}>롯데월드</Text>
      </View>
    </View>
  );
};

export default CalendarDetailBox;

const styles = StyleSheet.create({
  containerView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 24,
    marginRight: 9,
  },
  colorView: {
    width: 13,
    height: 44,
    backgroundColor: '#FC887B',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  detailBoxView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    height: 44,
    borderColor: '#EDF0F3',
    borderWidth: 1,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
  },
  detailHeaderText: {
    fontFamily: 'Pretendard-Medium',
    fontWeight: '400',
    fontSize: 14,
    color: '#000000',
  },
  placeText: {
    fontFamily: 'Pretendard-Medium',
    fontWeight: '400',
    fontSize: 12,
    color: '#909090',
  },
});
