import { StyleSheet, View } from 'react-native';
import React from 'react';

const MultipleCalendarBox = ({ color }: { color?: string }) => {
  const calendarBoxStyle = {
    flex: 1,
    backgroundColor: color,
  };

  return (
    <View style={styles.container}>
      <View style={calendarBoxStyle} />
    </View>
  );
};

export default MultipleCalendarBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
