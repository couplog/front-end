import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
        <Home color="#FFFFFF" style={{ marginBottom: 35 }} />
      </View>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default BottomTabButton;

const bottom = Platform.OS === 'android' ? 5 : 27;
const top = Platform.OS === 'android' ? 40 : 15;

const styles = StyleSheet.create({
  tabButtonContainer: {
    flex: 1,
    marginTop: bottom,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonView: {
    width: 112,
    height: 112,
    borderRadius: 100,
    backgroundColor: '#FF9696',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Pretendard-Regular',
    position: 'absolute',
    top: top,
  },
});
