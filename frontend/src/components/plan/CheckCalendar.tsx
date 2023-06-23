import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import DatePicker from 'react-native-date-picker';
import { getFormattedDate } from '../../utils/formattedDate';

const CheckCalendar = () => {
  const [selected, setSelected] = useState('');
  const [current, setCurrent] = useState('2020-01-01');
  const [date, setDate] = useState<Date | ''>('');
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [arr, setArr] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const today = getFormattedDate(new Date());

  // 처음 만난 날 설정 함수
  const handleDate = (date: Date) => {
    setOpen(false);
    setDate(date);
    const formattedDate = getFormattedDate(date);
    setFormattedDate(formattedDate);
  };

  const handleMonth = (month: string) => {
    if (Number(month) > 9) {
      return month;
    }
    return month[1];
  };

  const handleDay = (day: string) => {
    if (Number(day) > 9) {
      return day;
    }
    return day[1];
  };
  const running = { key: 'running', color: 'blue' };
  const cycling = { key: 'cycling', color: 'green' };
  const walking = { key: 'walking', color: 'orange' };

  const marked = {
    '2023-06-01': {
      dots: [running, walking],
    },
    '2023-06-02': {
      dots: [running, walking, cycling],
    },
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.marginContainer}>
        <Calendar
          // renderHeader={() => (
          //   <TouchableNativeFeedback onPress={() => setOpen(true)}>
          //     <View>
          //       <Text>{currentMonth}</Text>
          //     </View>
          //   </TouchableNativeFeedback>
          // )}
          current={formattedDate}
          key={formattedDate}
          onDayPress={(day) => {
            setSelected(day.dateString);
            console.log(selected);
          }}
          markingType="custom"
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: 'orange',
            },
          }}
          hideArrows
          style={{
            paddingLeft: 0,
            paddingRight: 0,
          }}
          theme={{
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            dayTextColor: 'red',
            todayTextColor: 'red',
          }}
          dayComponent={({ date, state, marking, theme }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  if (date?.dateString) {
                    setSelected(date?.dateString);
                  }
                  console.log(selected);
                }}
              >
                <View
                  style={{
                    marginVertical: -2.5,
                    justifyContent: 'center',
                    width: 44,
                    height: 44,
                    borderWidth: 1,
                    borderColor:
                      date?.dateString === selected ||
                      date?.dateString === today
                        ? '#667C92'
                        : '#EDF0F3',
                    borderRadius: 8,
                    backgroundColor:
                      state === 'disabled' ? '#FFFFFF' : '#EDF0F3',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'Pretendard-Regular',
                      fontSize: 18,
                      textAlign: 'center',
                      color: state === 'disabled' ? '#EDF0F3' : '#000000',
                    }}
                  >
                    {date?.day}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <TouchableOpacity onPress={() => setOpen(true)}>
          <DatePicker
            modal
            open={open}
            mode="date"
            locale="en"
            date={date || new Date()}
            onConfirm={(date) => handleDate(date)}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <Text>{formattedDate}</Text>
        </TouchableOpacity>
        {/* 캘린더 왼쪽라인과 일치하지 않음 */}
        <Text
          style={{
            marginTop: 24,
            fontFamily: 'Pretendard-Medium',
            fontWeight: '500',
            fontSize: 16,
            textAlign: 'left',
            color: '#000000',
          }}
        >
          {handleMonth(selected.substring(5, 7) || today.substring(5, 7))}월
          {handleDay(selected.substring(8, 10) || today.substring(8, 10))}일
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CheckCalendar;

const styles = StyleSheet.create({
  marginContainer: {
    flex: 1,
    // marginLeft: 21,
    // marginRight: 21,
    paddingTop: 20,
  },
  rootContainer: {
    flex: 1,
  },
  logoView: {
    width: 200,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#E7E7E7',
    marginTop: 80,
  },
  logo: {
    fontFamily: 'Pretendard-Bold',
    color: '#909090',
    fontSize: 30,
  },
  errorText: {
    fontSize: 12,
    lineHeight: 15,
    color: '#E53C3C',
    marginTop: 15,
    fontFamily: 'Pretendard-Regular',
  },
  inputView: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    marginTop: 64,
  },
  label: {
    color: '#000000',
    fontFamily: 'Pretendard-Regular',
    marginTop: 32,
    marginBottom: 5,
  },
  inputBox: {
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#EDF0F3',
    height: 45,
    borderRadius: 8,
    paddingLeft: 12,
  },
  passwordView: {
    position: 'relative',
  },
  eyeIconView: {
    position: 'absolute',
    right: 15,
    top: 12,
  },
  checkboxView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  signupText: {
    color: '#909090',
    textDecorationLine: 'underline',
    fontFamily: 'Pretendard-Regular',
    marginBottom: 25,
  },
  buttonView: {
    width: '100%',
    marginBottom: 50,
  },
});
