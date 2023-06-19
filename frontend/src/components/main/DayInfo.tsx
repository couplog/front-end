import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface DayInfoProps {
  days: string;
  date: string;
}

export const DayInfo = ({ days, date }: DayInfoProps) => {
  return (
    <View style={styles.dayBox}>
      <Text style={styles.dayText}>{days}</Text>
      <Text style={styles.dayText}>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dayBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 7,
  },
  dayText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    fontWeight: '500',
    color: '#FFFFFF',
  },
});
