import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns';
import { EndListProps, OptionProps } from '../../../types/plan/planDetailTypes';
import { endOption } from '../../../utils/plan/repeatText';

const RepeatEndOption = ({
  selectedOption,
  setSelectedOption,
  setOptionVisible,
}: OptionProps) => {
  const [date, setDate] = useState<Date | ''>('');
  const [dateOpen, setDateOpen] = useState(false);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setOptionVisible(false);
  };

  const handleDateChange = (date: Date) => {
    setDateOpen(false);
    setDate(date);

    const formattedDate = format(date, 'yyyy-MM-dd');
    setSelectedOption(formattedDate);
    setOptionVisible(false);
  };

  const renderItem = ({ item }: { item: EndListProps }) => {
    const isSelected = item.text === selectedOption;
    const textStyles = isSelected ? { color: '#3478F6' } : {};
    const borderStyles =
      item.text === '기간 설정' ? { borderBottomWidth: 0 } : {};
    if (selectedOption !== '없음' && item.text === '기간 설정') {
      textStyles.color = '#3478F6';
    }

    return (
      <TouchableOpacity
        activeOpacity={1.0}
        onPress={() => {
          item.text === '기간 설정'
            ? setDateOpen(true)
            : handleOptionSelect(item.text);
        }}
        style={[styles.optionListItem, borderStyles]}
      >
        <Text style={[styles.optionListItemText, textStyles]}>{item.text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.optionList}>
      <FlatList
        data={endOption}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

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

export default RepeatEndOption;

const styles = StyleSheet.create({
  optionList: {
    width: 155,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 2,
    shadowColor: '#929292',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: 'flex-end',
  },
  optionListItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF0F3',
  },
  optionListItemText: {
    fontFamily: 'Pretendard-Regular',
    textAlign: 'center',
  },
});
