import {
  Alert,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import { ScheduleDetailType } from '../../types/atom/scheduleDetailType';

interface Props {
  scheduleDetail?: ScheduleDetailType;
  boxColor?: '#FFDD95' | '#D0E6A5' | '#FC887B';
  noSchedule?: boolean;
}

const CalendarDetailBox = ({ scheduleDetail, boxColor, noSchedule }: Props) => {
  const [openDetail, setOpenDetail] = useState(false);
  const colorViewStyle = {
    width: 13,
    height: '100%',
    maxHeight: 121,
    minHeight: 44,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: boxColor,
    borderColor: boxColor,
  };

  const rightSwipeActions = () => {
    return (
      <View style={{ flexDirection: 'row', maxHeight: 121, minHeight: 44 }}>
        <View style={styles.swipeLeftView}>
          <Text style={styles.swipeText}>수정</Text>
        </View>

        <TouchableOpacity onPress={handleDeleteAlert}>
          <View style={styles.swipeRightView}>
            <Text style={styles.swipeText}>삭제</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  // ios에서는 백그라운드 눌러도 alert 창이 안 닫힘
  // alert 글자 색상 수정하는 부분 구현 못함
  const handleDeleteAlert = () => {
    Alert.alert(
      '일정 삭제',
      '반복 일정을 모두 삭제할까요?',
      [
        {
          text: '반복 일정 전체 삭제',
          onPress: () => console.log('반복 일정 전체 삭제'),
          style: 'destructive',
        },
        {
          text: '해당 일정만 삭제',
          onPress: () => console.log('해당 일정만 삭제'),
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <View
      style={{
        ...styles.containerView,
        flex: openDetail ? 0 : 1,
      }}
    >
      {noSchedule ? (
        <View style={styles.noScheduleBoxView}>
          <Text style={styles.noScheduleText}>일정이 없습니다.</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {/* 클릭 시 Swipe가 늦게 들어가는 이슈 */}
          <Swipeable renderRightActions={rightSwipeActions}>
            <TouchableOpacity onPress={() => setOpenDetail((prev) => !prev)}>
              <Animated.View
                style={{
                  ...styles.detailBoxView,
                }}
              >
                <View style={colorViewStyle} />
                <View
                  style={{
                    ...styles.detailTextContainerView,
                    flexDirection: openDetail ? 'column' : 'row',
                    paddingTop: openDetail ? 15 : 0,
                    alignItems: openDetail ? 'stretch' : 'center',
                  }}
                >
                  <View
                    style={{
                      flex: openDetail ? 0 : 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
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
              </Animated.View>
            </TouchableOpacity>
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
    maxHeight: 121,
    minHeight: 44,
    alignItems: 'center',
    marginTop: 12,
    marginRight: 5,
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
  detailTextContainerView: {
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
});