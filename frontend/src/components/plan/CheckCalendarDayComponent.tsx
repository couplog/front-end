import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { getFormattedDate } from '../../utils/formattedDate';
import MultipleCalendarBox from './MultipleCalendarBox';
import { Props } from '../../types/calendar/calendarType';
import Heart from '../../assets/images/calendar/heart.svg';

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
    <TouchableOpacity
      onPress={handelSelectDay}
      disabled={state === 'disabled' ? true : false}
      activeOpacity={1.0}
    >
      <View style={detail ? planStyle : calendarDayStyle}>
        <Text style={calendarTextStyle}>{date?.day}</Text>
        {marking?.dots?.map((dot, index) => {
          let content = null;
          switch (dot.key) {
            case 'datingSchedule':
              content = <MultipleCalendarBox color="#FC887B" />;
              break;
            case 'mySchedule':
              content = <MultipleCalendarBox color="#FFDD95" />;
              break;
            case 'partnerSchedule':
              content = <MultipleCalendarBox color="#D0E6A5" />;
              break;
            case 'anniversary':
              content = <Heart style={styles.heartView} />;
              break;
            default:
              break;
          }
          // eslint-disable-next-line react/no-array-index-key
          return <React.Fragment key={index}>{content}</React.Fragment>;
        })}
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
  heartView: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
});
