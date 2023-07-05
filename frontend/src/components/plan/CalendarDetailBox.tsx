import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScheduleDetailType } from '../../types/atom/scheduleDetailType';

interface Props {
  scheduleDetail?: ScheduleDetailType;
  boxColor?: '#FFDD95' | '#D0E6A5' | '#FC887B';
  noSchedule?: boolean;
}

const CalendarDetailBox = ({ scheduleDetail, boxColor, noSchedule }: Props) => {
  return (
    <View style={styles.containerView}>
      {noSchedule ? (
        <View style={styles.noScheduleBoxView}>
          <Text style={styles.noScheduleText}>일정이 없습니다.</Text>
        </View>
      ) : (
        <View style={styles.detailBoxView}>
          <View style={{ ...styles.colorView, backgroundColor: boxColor }} />
          <View style={styles.detailTextContainerView}>
            <Text style={styles.detailHeaderText}>{scheduleDetail?.title}</Text>
            <Text style={styles.placeText}>{scheduleDetail?.location}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default CalendarDetailBox;

const styles = StyleSheet.create({
  containerView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 12,
    marginRight: 5,
  },
  noScheduleBoxView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    height: 44,
    borderColor: '#EDF0F3',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailBoxView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    height: 44,
    borderColor: '#EDF0F3',
    borderWidth: 1,
    borderRadius: 8,
    borderLeftWidth: 0,
    alignItems: 'center',
  },
  colorView: {
    width: 13,
    height: 44,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  detailTextContainerView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12,
  },
  detailHeaderText: {
    fontFamily: 'Pretendard-Medium',
    fontWeight: '400',
    fontSize: 14,
    color: '#000000',
  },
  placeText: {
    fontFamily: 'Pretendard-Medium',
    fontWeight: '400',
    fontSize: 12,
    color: '#909090',
  },
  noScheduleText: {
    fontFamily: 'Pretendard-Medium',
    fontWeight: '500',
    fontSize: 14,
    color: '#CCCCCC',
  },
});
