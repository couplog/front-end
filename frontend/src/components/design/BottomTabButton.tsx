import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Home from '../../assets/images/main/Main.svg';
import { BottomTabCustomButtonProps } from '../../types/routes/bottomTabTyps';

const BottomTabButton = ({ label, onPress }: BottomTabCustomButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={1.0}
      onPress={onPress}
      style={styles.tabButtonContainer}
    >
      <View style={styles.buttonView}>
        <Home color="#FFFFFF" style={{ marginBottom: 15 }} />
      </View>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default BottomTabButton;

const styles = StyleSheet.create({
  tabButtonContainer: {
    flex: 1,
    marginBottom: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonView: {
    width: 73,
    height: 73,
    borderRadius: 50,
    backgroundColor: '#FF9696',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Pretendard-Regular',
    position: 'absolute',
    top: 10,
  },
});
