import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SwipeButtonProps } from '../../types/anniversary/types';

const SwipeButton = ({ onEdit, onDelete }: SwipeButtonProps) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={onEdit}
        activeOpacity={1.0}
        style={styles.editButton}
      >
        <Text style={styles.buttonText}>수정</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onDelete}
        activeOpacity={1.0}
        style={styles.deleteButton}
      >
        <Text style={styles.buttonText}>삭제</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SwipeButton;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    paddingTop: 13,
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    padding: 16,
  },
  editButton: {
    backgroundColor: '#909090',
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: '#FE3D2F',
    justifyContent: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});
