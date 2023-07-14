import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { format } from 'date-fns';
import DatePicker from 'react-native-date-picker';
import { DateInputProps } from '../../types/anniversary/types';

const DateInput = ({ daySelected, setDaySelected }: DateInputProps) => {
  const [date, setDate] = useState<Date | ''>('');
  const [dateOpen, setDateOpen] = useState(false);

  // 날짜 입력 핸들러
  const handleDateChange = (date: Date) => {
    setDateOpen(false);
    setDate(date);
    const formattedDate = format(date, 'yyyy-MM-dd');
    setDaySelected(formattedDate);
  };

  const dateTextStyle = {
    ...styles.dayText,
    color: daySelected ? '#000000' : '#909090',
  };

  return (
    <View>
      <View style={styles.inputView}>
        <Text style={styles.inputText}>기념일 날짜</Text>
        <TouchableOpacity
          style={styles.inputBox}
          activeOpacity={1.0}
          onPress={() => setDateOpen(true)}
        >
          <Text style={dateTextStyle}>
            {daySelected
              ? format(new Date(daySelected), 'yyyy. MM. dd')
              : 'YYYY-MM-DD'}
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
    </View>
  );
};

export default DateInput;

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
  dayText: {
    fontFamily: 'Pretendard-Regular',
  },
});
