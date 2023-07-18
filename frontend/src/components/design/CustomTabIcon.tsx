import { Platform, StyleSheet, View } from 'react-native';
import React from 'react';
import { BottomTabCustomIconProps } from '../../types/routes/bottomTabTyps';

const CustomTabIcon = ({ focused, icon }: BottomTabCustomIconProps) => {
  return (
    <View
      style={
        focused
          ? styles.activeTabIcon
          : [styles.activeTabIcon, { borderTopColor: 'transparent' }]
      }
    >
      <View style={{ top: 10 }}>{icon}</View>
    </View>
  );
};

export default CustomTabIcon;

const bottom = Platform.OS === 'android' ? 44 : 15;

const styles = StyleSheet.create({
  activeTabIcon: {
    borderTopWidth: 3,
    borderTopColor: '#FF6564',
    width: 72,
    marginBottom: bottom,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
});
