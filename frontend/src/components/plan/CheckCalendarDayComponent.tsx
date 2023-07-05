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
}: Props) => {
  const today = getFormattedDate(new Date());

  return (
    <TouchableOpacity
      onPress={() => {
        if (date?.dateString) {
          setSelected(date?.dateString);
        }
      }}
    >
      <View
        style={{
          ...styles.calendarDayView,
          borderColor:
            date?.dateString === selected ||
            (date?.dateString === today && !selected)
              ? '#667C92'
              : '#EDF0F3',
          backgroundColor: state === 'disabled' ? '#FFFFFF' : '#EDF0F3',
          borderWidth:
            date?.dateString === today ||
            !marking?.dots?.length ||
            date?.dateString === selected
              ? 2
              : 0,
        }}
      >
        <Text
          style={{
            ...styles.calendarDayText,
            color: state === 'disabled' ? '#EDF0F3' : '#000000',
          }}
        >
          {date?.day}
        </Text>
        <>
          {marking?.dots?.length === 1 && marking?.dots[0]?.color === 'red' && (
            <MultipleCalendarBox color="#FC887B" />
          )}
          {marking?.dots?.length === 1 &&
            marking?.dots[0]?.color === 'yellow' && (
              <MultipleCalendarBox color="#FFDD95" />
            )}
          {marking?.dots?.length === 1 &&
            marking?.dots[0]?.color === 'green' && (
              <MultipleCalendarBox color="#D0E6A5" />
            )}
          {marking?.dots?.length === 2 &&
            marking?.dots[0]?.color === 'red' &&
            marking?.dots[1]?.color === 'yellow' && (
              <>
                <MultipleCalendarBox color="#FC887B" />
                <MultipleCalendarBox color="#FFDD95" />
              </>
            )}
          {marking?.dots?.length === 2 &&
            marking?.dots[0]?.color === 'red' &&
            marking?.dots[1]?.color === 'green' && (
              <>
                <MultipleCalendarBox color="#FC887B" />
                <MultipleCalendarBox color="#D0E6A5" />
              </>
            )}
          {marking?.dots?.length === 2 &&
            marking?.dots[0]?.color === 'yellow' &&
            marking?.dots[1]?.color === 'green' && (
              <>
                <MultipleCalendarBox color="#FFDD95" />
                <MultipleCalendarBox color="#D0E6A5" />
              </>
            )}
          {marking?.dots?.length === 3 && (
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
