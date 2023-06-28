import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { format } from 'date-fns';
import DatePicker from 'react-native-date-picker';
import { DetailInputProps } from '../../../types/plan/planDetailTypes';

const InputGroup = ({
  text,
  daySelected,
  timeSelected,
  setDaySelected,
  setTimeSelected,
}: DetailInputProps) => {
  const [date, setDate] = useState<Date | ''>('');
  const [time, setTime] = useState<Date | ''>('');

  const [dateOpen, setDateOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);

  // 날짜 입력 핸들러
  const handleDateChange = (date: Date) => {
    setDateOpen(false);
    setDate(date);
    const formattedDate = format(date, 'yyyy-MM-dd');
    setDaySelected(formattedDate);
  };

  // 시간 입력 핸들러
  const handleTimeChange = (time: Date) => {
    setTimeOpen(false);
    setTime(time);
    const formattedTime = format(time, 'HH:mm');
    setTimeSelected(formattedTime);
  };

  const dateTextStyle = {
    ...styles.dayText,
    color: daySelected ? '#000000' : '#909090',
  };

  const timeTextStyle = {
    ...styles.dayText,
    color: timeSelected ? '#000000' : '#909090',
  };

  return (
    <View>
      {/* 날짜 입력, 캘린더 UI 가져올 예정 (임시 구현) */}
      <View style={styles.inputView}>
        <Text style={styles.inputText}>{text}일</Text>
        <TouchableOpacity
          style={styles.inputBox}
          activeOpacity={1.0}
          onPress={() => setDateOpen(true)}
        >
          <Text style={dateTextStyle}>
            {daySelected ? daySelected : 'YYYY-MM-DD'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 시간 입력 */}
      <View style={styles.inputView}>
        <Text style={styles.inputText}>{text}시간</Text>
        <TouchableOpacity
          style={styles.inputBox}
          activeOpacity={1.0}
          onPress={() => setTimeOpen(true)}
        >
          <Text style={timeTextStyle}>
            {timeSelected ? timeSelected : '00:00'}
          </Text>
        </TouchableOpacity>
      </View>

      <DatePicker
        modal
        open={dateOpen}
        mode="date"
        date={date || new Date()}
        locale="ko"
        onConfirm={(date) => handleDateChange(date)}
        onCancel={() => {
          setDateOpen(false);
        }}
      />

      <DatePicker
        modal
        open={timeOpen}
        mode="time"
        minuteInterval={5}
        is24hourSource="locale"
        date={time || new Date()}
        onConfirm={(time) => handleTimeChange(time)}
        onCancel={() => setTimeOpen(false)}
      />
    </View>
  );
};

export default InputGroup;

const styles = StyleSheet.create({
  inputView: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    color: '#000000',
  },
  inputBox: {
    width: 155,
    height: 32,
    backgroundColor: '#EDF0F3',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  infoInputBox: {
    width: 330,
    height: 100,
    backgroundColor: '#EDF0F3',
    borderRadius: 8,
    marginTop: 15,
    padding: 10,
    paddingBottom: 65,
  },
  dayText: {
    fontFamily: 'Pretendard-Regular',
  },
});
