import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import { ScheduleDetailType } from '../../types/atom/scheduleDetailType';

interface Props {
  scheduleDetail?: ScheduleDetailType;
  boxColor?: '#FFDD95' | '#D0E6A5' | '#FC887B';
  noSchedule?: boolean;
}

const CalendarDetailBox = ({ scheduleDetail, boxColor, noSchedule }: Props) => {
  const rightSwipeActions = () => {
    return (
      <View style={{ flexDirection: 'row', height: 44 }}>
        <View style={styles.swipeLeftView}>
          <Text style={styles.swipeLeftText}>수정</Text>
        </View>
        <View style={styles.swipeRightView}>
          <Text style={styles.swipeRightText}>삭제</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.containerView}>
      {noSchedule ? (
        <View style={styles.noScheduleBoxView}>
          <Text style={styles.noScheduleText}>일정이 없습니다.</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Swipeable renderRightActions={rightSwipeActions}>
            <View style={{ ...styles.detailBoxView }}>
              <View
                style={{ ...styles.colorView, backgroundColor: boxColor }}
              />
              <View style={styles.detailTextContainerView}>
                <Text style={styles.detailHeaderText}>
                  {scheduleDetail?.title}
                </Text>
                <Text style={styles.placeText}>{scheduleDetail?.location}</Text>
              </View>
            </View>
          </Swipeable>
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
    alignItems: 'center',
    marginTop: 12,
    marginRight: 5,
    height: 44,
    borderColor: '#EDF0F3',
    borderWidth: 1,
    borderRadius: 8,
  },
  noScheduleBoxView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailBoxView: {
    display: 'flex',
    flexDirection: 'row',
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
    width: 327,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  swipeLeftView: {
    width: 53,
    backgroundColor: '#909090',
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeLeftText: {
    fontFamily: 'Pretendard-Medium',
    fontWeight: '400',
    fontSize: 12,
    color: '#FFFFFF',
  },
  swipeRightView: {
    width: 53,
    backgroundColor: '#FE3D2F',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  swipeRightText: {
    fontFamily: 'Pretendard-Medium',
    fontWeight: '400',
    fontSize: 12,
    color: '#FFFFFF',
  },
});
