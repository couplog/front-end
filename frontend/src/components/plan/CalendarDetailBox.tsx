import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { useState } from 'react';
import { CalendarDetailBoxType } from '../../types/calendar/calendarType';

const CalendarDetailBox = ({
  scheduleDetail,
  boxColor,
  noSchedule,
  swipeStates,
  idx,
}: CalendarDetailBoxType) => {
  const [openDetail, setOpenDetail] = useState(false);
  const colorViewStyle = {
    ...styles.colorView,
    backgroundColor: boxColor,
    borderColor: boxColor,
  };
  const detailTextContainerViewStyle: StyleProp<ViewStyle> = {
    ...styles.detailTextContainerView,
    flexDirection: openDetail ? 'column' : 'row',
    paddingTop: openDetail ? 15 : 0,
    alignItems: openDetail ? 'stretch' : 'center',
  };
  const detailScrollStyle = [
    styles.containerView,
    {
      borderTopRightRadius: swipeStates[idx] ? 0 : 8, // swipe 상태에 따라 조건부 스타일 적용
      borderBottomRightRadius: swipeStates[idx] ? 0 : 8, // swipe 상태에 따라 조건부 스타일 적용
    },
  ];
  const detailHeaderViewStyle = {
    ...styles.detailHeaderView,
    flex: openDetail ? 0 : 1,
  };

  return (
    <View style={detailScrollStyle}>
      {noSchedule ? (
        <View style={styles.noScheduleBoxView}>
          <Text style={styles.noScheduleText}>일정이 없습니다.</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {boxColor !== '#D0E6A5' ? (
            <TouchableOpacity
              onPress={() => setOpenDetail((prev) => !prev)}
              activeOpacity={1.0}
            >
              <View style={styles.detailBoxView}>
                <View style={colorViewStyle} />
                <View style={detailTextContainerViewStyle}>
                  <View style={detailHeaderViewStyle}>
                    <Text style={styles.detailHeaderText}>
                      {scheduleDetail?.title}
                    </Text>
                    <Text style={styles.placeText}>
                      {scheduleDetail?.location}
                    </Text>
                  </View>
                  {openDetail && (
                    <>
                      <View style={styles.detailTimeView}>
                        <Text
                          style={{
                            ...styles.detailTimeText,
                            marginRight: 4,
                          }}
                        >
                          {scheduleDetail?.startDateTime.substring(0, 10)}
                        </Text>
                        <Text style={styles.detailTimeText}>
                          {scheduleDetail?.startDateTime.substring(11, 16)}
                        </Text>
                        <Text
                          style={{
                            ...styles.detailTimeText,
                            marginLeft: 4,
                            marginRight: 4,
                          }}
                        >
                          -
                        </Text>
                        <Text
                          style={{
                            ...styles.detailTimeText,
                            marginRight: 4,
                          }}
                        >
                          {scheduleDetail?.endDateTime.substring(0, 10)}
                        </Text>
                        <Text style={styles.detailTimeText}>
                          {scheduleDetail?.endDateTime.substring(11, 16)}
                        </Text>
                      </View>
                      <View style={styles.detailContentView}>
                        <Text style={styles.detailContentText}>
                          {scheduleDetail?.content}
                        </Text>
                      </View>
                    </>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setOpenDetail((prev) => !prev)}
              activeOpacity={1.0}
            >
              <View style={styles.detailBoxView}>
                <View style={colorViewStyle} />
                <View style={detailTextContainerViewStyle}>
                  <View style={detailHeaderViewStyle}>
                    <Text style={styles.detailHeaderText}>
                      {scheduleDetail?.title}
                    </Text>
                    <Text style={styles.placeText}>
                      {scheduleDetail?.location}
                    </Text>
                  </View>
                  {openDetail && (
                    <>
                      <View style={styles.detailTimeView}>
                        <Text
                          style={{
                            ...styles.detailTimeText,
                            marginRight: 4,
                          }}
                        >
                          {scheduleDetail?.startDateTime.substring(0, 10)}
                        </Text>
                        <Text style={styles.detailTimeText}>
                          {scheduleDetail?.startDateTime.substring(11, 16)}
                        </Text>
                        <Text
                          style={{
                            ...styles.detailTimeText,
                            marginLeft: 4,
                            marginRight: 4,
                          }}
                        >
                          -
                        </Text>
                        <Text
                          style={{
                            ...styles.detailTimeText,
                            marginRight: 4,
                          }}
                        >
                          {scheduleDetail?.endDateTime.substring(0, 10)}
                        </Text>
                        <Text style={styles.detailTimeText}>
                          {scheduleDetail?.endDateTime.substring(11, 16)}
                        </Text>
                      </View>
                      <View style={styles.detailContentView}>
                        <Text style={styles.detailContentText}>
                          {scheduleDetail?.content}
                        </Text>
                      </View>
                    </>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          )}
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
    minHeight: 44,
    alignItems: 'center',
    marginTop: 12,
    borderColor: '#EDF0F3',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  noScheduleBoxView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorView: {
    width: 13,
    height: '100%',
    minHeight: 44,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  detailBoxView: {
    display: 'flex',
    flexDirection: 'row',
    borderLeftWidth: 0,
  },
  detailTextContainerView: {
    width: '100%',
    flex: 1,
    display: 'flex',
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
  swipeText: {
    fontFamily: 'Pretendard-Medium',
    fontWeight: '400',
    fontSize: 12,
    color: '#FFFFFF',
  },
  swipeRightView: {
    flex: 1,
    width: 53,
    backgroundColor: '#FE3D2F',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  detailTimeView: {
    flexDirection: 'row',
    marginTop: 4,
  },
  detailTimeText: {
    fontFamily: 'Pretendard-Medium',
    fontWeight: '400',
    fontSize: 12,
    color: '#909090',
  },
  detailContentView: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 15,
  },
  detailContentText: {
    fontFamily: 'Pretendard-Medium',
    fontWeight: '400',
    fontSize: 14,
    color: '#000000',
  },
  detailHeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
