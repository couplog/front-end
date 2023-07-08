import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DayInfoProps } from '../../types/main/mainPageTypes';

export const DayInfo = ({
  title,
  date,
  backgroundColor,
  opacity,
}: DayInfoProps) => {
  return (
    <View style={[styles.dayBox, { backgroundColor, opacity }]}>
      <Text style={[styles.dayText, { marginLeft: 5 }]}>{title}</Text>
      <Text style={[styles.dayText, { marginRight: 5 }]}>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dayBox: {
    width: '100%',
    padding: 15,
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 12,
  },
  dayText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    fontWeight: '500',
    color: '#000000',
  },
});
