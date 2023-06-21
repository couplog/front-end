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
  const currentMonth = getFormattedDate(new Date());

  // 처음 만난 날 설정 함수
  const handleDate = (date: Date) => {
    setOpen(false);
    setDate(date);
    const formattedDate = getFormattedDate(date);
    setFormattedDate(formattedDate);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.marginContainer}>
        <Calendar
          renderHeader={() => (
            <TouchableNativeFeedback onPress={() => setOpen(true)}>
              <View>
                <Text>{currentMonth}</Text>
              </View>
            </TouchableNativeFeedback>
          )}
          current={formattedDate}
          key={formattedDate}
          onDayPress={(day) => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              // selectedColor: 'orange',
            },
          }}
          hideArrows
          theme={{
            calendarBackground: '#166088',

            selectedDayBackgroundColor: '#C0D6DF',
            selectedDayTextColor: '#166088',
            selectedDotColor: '#166088',

            dayTextColor: '#DBE9EE',
            textDisabledColor: '#729DAF',
            dotColor: '#DBE9EE',

            monthTextColor: '#DBE9EE',
            textMonthFontWeight: 'bold',

            arrowColor: '#DBE9EE',
          }}
        />
        <TouchableOpacity onPress={() => setOpen(true)}>
          <DatePicker
            modal
            open={open}
            mode="date"
            date={date || new Date()}
            locale="ko"
            onConfirm={(date) => handleDate(date)}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <Text>{formattedDate}</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CheckCalendar;

const styles = StyleSheet.create({
  marginContainer: {
    flex: 1,
    marginLeft: 25,
    marginRight: 25,
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
