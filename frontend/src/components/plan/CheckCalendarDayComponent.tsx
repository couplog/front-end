import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { getFormattedDate } from '../../utils/formattedDate';
import MultipleCalendarBox from './MultipleCalendarBox';
import { Props } from '../../types/calendar/calendarType';

const CheckCalendarDayComponent = ({
  date,
  state,
  marking,
  setSelected,
  selected,
  detail,
}: Props) => {
  const today = getFormattedDate(new Date());

  const daySelected =
    date?.dateString === selected || (date?.dateString === today && !selected);

  const borderColor =
    !daySelected && state === 'disabled' ? '#EDF0F3' : '#667C92';

  const borderWidth =
    (date?.dateString === today && selected === today) ||
    (!marking?.dots?.length && state === 'disabled') ||
    date?.dateString === selected
      ? 2
      : 0;

  const calendarDayStyle = {
    ...styles.calendarDayView,
    borderColor,
    backgroundColor: state === 'disabled' ? '#FFFFFF' : '#EDF0F3',
    borderWidth,
  };

  const calendarTextStyle = {
    ...styles.calendarDayText,
    color: state === 'disabled' ? '#EDF0F3' : '#000000',
  };

  // 일정 생성 페이지일 경우 분기처리
  const planStyle = {
    ...styles.calendarDayView,
    borderColor: daySelected ? '#667C92' : '#EDF0F3',
    backgroundColor:
      state === 'disabled' ? '#FFFFFF' : daySelected ? '#FD9E89' : '#EDF0F3',
    borderWidth: state === 'disabled' ? 2 : 0,
  };

  // 선택 함수
  const handelSelectDay = () => {
    if (date?.dateString) {
      setSelected(date?.dateString);
    }
  };
  return (
    <TouchableOpacity onPress={handelSelectDay}>
      <View style={detail ? planStyle : calendarDayStyle}>
        <Text style={calendarTextStyle}>{date?.day}</Text>
        <>
          {marking?.dots?.length === 1 &&
            marking?.dots[0]?.key === 'datingSchedule' && (
              <MultipleCalendarBox color="#FC887B" />
            )}
          {marking?.dots?.length === 1 &&
            marking?.dots[0]?.key === 'mySchedule' && (
              <MultipleCalendarBox color="#FFDD95" />
            )}
          {marking?.dots?.length === 1 &&
            marking?.dots[0]?.key === 'partnerSchedule' && (
              <MultipleCalendarBox color="#D0E6A5" />
            )}
          {marking?.dots?.length === 1 &&
            marking?.dots[0]?.key === 'anniversary' && <Text>heart</Text>}
          {marking?.dots?.length === 2 &&
            marking?.dots[0]?.key === 'datingSchedule' &&
            marking?.dots[1]?.key === 'mySchedule' && (
              <>
                <MultipleCalendarBox color="#FC887B" />
                <MultipleCalendarBox color="#FFDD95" />
              </>
            )}
          {marking?.dots?.length === 2 &&
            marking?.dots[0]?.key === 'datingSchedule' &&
            marking?.dots[1]?.key === 'partnerSchedule' && (
              <>
                <MultipleCalendarBox color="#FC887B" />
                <MultipleCalendarBox color="#D0E6A5" />
              </>
            )}
          {marking?.dots?.length === 2 &&
            marking?.dots[0]?.key === 'datingSchedule' &&
            marking?.dots[1]?.key === 'anniversary' && (
              <>
                <MultipleCalendarBox color="#FC887B" />
                <Text>heart</Text>
              </>
            )}
          {marking?.dots?.length === 2 &&
            marking?.dots[0]?.key === 'mySchedule' &&
            marking?.dots[1]?.key === 'partnerSchedule' && (
              <>
                <MultipleCalendarBox color="#FFDD95" />
                <MultipleCalendarBox color="#D0E6A5" />
              </>
            )}
          {marking?.dots?.length === 3 &&
            marking?.dots[0]?.key === 'datingSchedule' &&
            marking?.dots[1]?.key === 'mySchedule' &&
            marking?.dots[2]?.key === 'partnerSchedule' && (
              <>
                <MultipleCalendarBox color="#FC887B" />
                <MultipleCalendarBox color="#FFDD95" />
                <MultipleCalendarBox color="#D0E6A5" />
              </>
            )}
          {marking?.dots?.length === 3 &&
            marking?.dots[0]?.key === 'datingSchedule' &&
            marking?.dots[1]?.key === 'mySchedule' &&
            marking?.dots[2]?.key === 'anniversary' && (
              <>
                <MultipleCalendarBox color="#FC887B" />
                <MultipleCalendarBox color="#FFDD95" />
              </>
            )}
          {marking?.dots?.length === 3 &&
            marking?.dots[0]?.key === 'datingSchedule' &&
            marking?.dots[1]?.key === 'partnerSchedule' &&
            marking?.dots[2]?.key === 'anniversary' && (
              <>
                <MultipleCalendarBox color="#FC887B" />
                <MultipleCalendarBox color="#D0E6A5" />
              </>
            )}
          {marking?.dots?.length === 3 &&
            marking?.dots[0]?.key === 'mySchedule' &&
            marking?.dots[1]?.key === 'partnerSchedule' &&
            marking?.dots[2]?.key === 'anniversary' && (
              <>
                <MultipleCalendarBox color="#FFDD95" />
                <MultipleCalendarBox color="#D0E6A5" />
              </>
            )}
          {marking?.dots?.length === 4 &&
            marking?.dots[0]?.key === 'datingSchedule' &&
            marking?.dots[1]?.key === 'mySchedule' &&
            marking?.dots[2]?.key === 'partnerSchedule' &&
            marking?.dots[3]?.key === 'anniversary' && (
              <>
                <MultipleCalendarBox color="#FC887B" />
                <MultipleCalendarBox color="#FFDD95" />
                <MultipleCalendarBox color="#D0E6A5" />
              </>
            )}
        </>
      </View>
    </TouchableOpacity>
  );
};

export default CheckCalendarDayComponent;

const styles = StyleSheet.create({
  calendarDayView: {
    position: 'relative',
    marginVertical: -2.5,
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: 8,
    overflow: 'hidden',
  },
  calendarDayText: {
    position: 'absolute',
    alignSelf: 'center',
    fontFamily: 'Pretendard-Regular',
    fontSize: 18,
    textAlign: 'center',
    zIndex: 50,
  },
});
