import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

interface CheckBox {
  label: string;
  checked: boolean;
  onPress: () => void;
}
const Checkbox = ({ checked, onPress, label }: CheckBox) => {
  return (
    <TouchableOpacity
      activeOpacity={1.0}
      onPress={onPress}
      style={styles.buttonContainer}
    >
      <View style={styles.checkboxContainer}>
        {checked && <View style={styles.onCheck} />}
      </View>
      <Text style={styles.titleText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  checkboxContainer: {
    width: 20,
    height: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#EDF0F3',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onCheck: {
    width: '75%',
    height: '75%',
    borderRadius: 12,
    backgroundColor: '#000000',
  },
  titleText: {
    color: '#000000',
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    marginLeft: 10,
  },
});
