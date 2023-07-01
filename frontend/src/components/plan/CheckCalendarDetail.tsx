import {
  Animated,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';

interface Props {
  selected: string;
  today: string;
}

const CheckCalendarDetail = ({ selected, today }: Props) => {
  // 한 자릿수 월 일 때 0을 삭제해 주는 함수
  const handleMonth = (month: string) => {
    if (Number(month) > 9) {
      return month;
    }
    return month[1];
  };

  // 한 자릿수 일 일 때 0을 삭제해 주는 함수
  const handleDay = (day: string) => {
    if (Number(day) > 9) {
      return day;
    }
    return day[1];
  };
  return (
    <View style={styles.calendarDetailView}>
      <View style={styles.calendarDetailHeaderView}>
        <Text
          style={{
            ...styles.selectedDateText,
          }}
        >
          {handleMonth(selected.substring(5, 7) || today.substring(5, 7))}월
          {handleDay(selected.substring(8, 10) || today.substring(8, 10))}일
        </Text>
        <View style={styles.dividerView} />
        <Text
          style={{
            ...styles.anniversaryDateText,
          }}
        >
          300일
        </Text>
      </View>
    </View>
  );
};

export default CheckCalendarDetail;

const styles = StyleSheet.create({
  calendarDetailView: {
    marginTop: 24,
    marginLeft: 8,
  },
  calendarDetailHeaderView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dividerView: {
    width: 1,
    height: 12,
    borderWidth: 1,
    borderColor: '#D2D2D2',
    marginLeft: 12,
    marginRight: 12,
  },
  selectedDateText: {
    fontFamily: 'Pretendard-Medium',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'left',
    color: '#000000',
  },
  anniversaryDateText: {
    fontFamily: 'Pretendard-Medium',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'left',
    color: '#FC887B',
  },
});
