import { StyleSheet, View } from 'react-native';
import React from 'react';

interface Props {
  color?: string;
}

const MultipleCalendarBox = ({ color }: Props) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.calendarBoxView,
          backgroundColor: color,
        }}
      />
    </View>
  );
};

export default MultipleCalendarBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  calendarBoxView: {
    flex: 1,
  },
});
