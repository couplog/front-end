import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { option } from '../../../utils/plan/repeatText';
import { ListProps, OptionProps } from '../../../types/plan/planDetailTypes';

const RepeatOption = ({
  selectedOption,
  setSelectedOption,
  setOptionVisible,
  setRepeatCode,
}: OptionProps) => {
  const handleOptionSelect = (option: string, code: string) => {
    setSelectedOption(option);
    setRepeatCode(code);
    setOptionVisible(false);
  };

  const renderItem = ({ item }: { item: ListProps }) => {
    const isSelected = item.text === selectedOption;
    const textStyles = isSelected ? { color: '#3478F6' } : {};
    const borderStyles = item.text === '매년' ? { borderBottomWidth: 0 } : {};

    return (
      <TouchableOpacity
        activeOpacity={1.0}
        onPress={() => handleOptionSelect(item.text, item.code)}
        style={[styles.optionListItem, borderStyles]}
      >
        <Text style={[styles.optionListItemText, textStyles]}>{item.text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.optionList}>
      <FlatList
        data={option}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default RepeatOption;

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
    color: '#050505',
    textAlign: 'center',
  },
});
