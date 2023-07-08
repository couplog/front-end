import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { format } from 'date-fns';
import DatePicker from 'react-native-date-picker';
import { DetailInputProps } from '../../../types/plan/planDetailTypes';
import CheckCalendar from '../CheckCalendar';

const InputGroup = ({
  text,
  timeSelected,
  daySelected,
  setDaySelected,
  setTimeSelected,
}: DetailInputProps) => {
  const [time, setTime] = useState<Date | ''>('');

  const [timeOpen, setTimeOpen] = useState(false);

  // 시간 입력 핸들러
  const handleTimeChange = (time: Date) => {
    setTimeOpen(false);
    setTime(time);
    const formattedTime = format(time, 'HH:mm');
    setTimeSelected(formattedTime);
  };

  const timeTextStyle = {
    ...styles.dayText,
    color: timeSelected ? '#000000' : '#909090',
  };

  return (
    <>
      <View style={styles.inputView}>
        <Text style={styles.inputText}>{text}일</Text>
        <TouchableOpacity style={styles.inputBox} activeOpacity={1.0}>
          <Text style={styles.dayText}>
            {daySelected
              ? format(new Date(daySelected), 'yyyy. MM. dd')
              : format(new Date(), 'yyyy. MM. dd')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 캘린더 UI */}
      <View style={styles.calenderView}>
        <CheckCalendar setDaySelected={setDaySelected} detail />
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
        open={timeOpen}
        mode="time"
        minuteInterval={5}
        is24hourSource="locale"
        date={time || new Date()}
        onConfirm={(time) => handleTimeChange(time)}
        onCancel={() => setTimeOpen(false)}
      />
    </>
  );
};

export default InputGroup;

const styles = StyleSheet.create({
  inputView: {
    marginTop: 30,
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
  dayText: {
    fontFamily: 'Pretendard-Regular',
    color: '#000000',
  },
  calenderView: {
    borderWidth: 1,
    borderColor: '#EDF0F3',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
});
