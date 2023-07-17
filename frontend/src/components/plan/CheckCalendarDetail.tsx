import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { useRecoilValue } from 'recoil';
import { Swipeable } from 'react-native-gesture-handler';
import CalendarDetailBox from './CalendarDetailBox';
import { userState } from '../../state/atoms/userAtom';
import { partnerState } from '../../state/atoms/partnerAtom';
import Arrow from '../../assets/images/common/arrow.svg';
import { CheckCalendarDetailType } from '../../types/calendar/calendarType';
import SwipeButton from '../common/SwipeButton';
import { handleDeletePlan } from '../../api/plan/deletePlan';

const CheckCalendarDetail = ({
  navigation,
  selectedMonth,
  selectedDay,
  currentMonth,
  currentDay,
  myScheduleDetail,
  partnerScheduleDetail,
  coupleScheduleDetail,
  anniversaryList,
}: CheckCalendarDetailType) => {
  const userData = useRecoilValue(userState);
  const partnerData = useRecoilValue(partnerState);
  const filterData = [
    ['전체', '#EDF0F3'],
    ['데이트', '#FC887B'],
    [`${userData.name}`, '#FFDD95'],
    [`${partnerData.name}`, '#D0E6A5'],
  ];
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [swipeStates, setSwipeStates] = useState(
    myScheduleDetail.map(() => false)
  );
  const noSchedule = true;

  // 한 자릿수 월 일 때 0을 삭제해 주는 함수
  const handleMonth = (month: string) => {
    if (Number(month) > 9) {
      return month;
    }
    return month[1];
  };

  // 한 자릿수 일 일 때 0을 삭제해 주는 함수
  const handleDay = (day: string) => {
    if (Number(day) > 9) {
      return day;
    }
    return day[1];
  };

  // swipe 상태 변경
  const handleSwipe = (index: number, isOpen: boolean) => {
    setSwipeStates((prevState) => {
      const newState = [...prevState];
      newState[index] = isOpen;
      return newState;
    });
  };

  // 일정 추가 페이지로 넘어가기
  const handleAddPlan = (detail: object) => {
    navigation.navigate('PlanRoute', { detail });
  };

  // ios에서는 백그라운드 눌러도 alert 창이 안 닫힘
  // alert 글자 색상 수정하는 부분 구현 못함
  const handleDeleteAlert = (scheduleId: number | null) => {
    const memberId = userData.memberId;
    Alert.alert(
      '일정 삭제',
      '반복 일정을 모두 삭제할까요?',
      [
        {
          text: '반복 일정 전체 삭제',
          onPress: () => {
            // 새로고침하는 기능 추가해야함
            scheduleId && handleDeletePlan(memberId, scheduleId, true);
          },
          style: 'destructive',
        },
        {
          text: '해당 일정만 삭제',
          onPress: () => {
            // 새로고침하는 기능 추가해야함
            scheduleId && handleDeletePlan(memberId, scheduleId, false);
          },
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <View style={styles.calendarDetailView}>
      <View style={styles.calendarDetailHeaderView}>
        <Text
          style={{
            ...styles.selectedDateText,
          }}
        >
          {selectedMonth || handleMonth(currentMonth)}월
          {selectedDay || handleDay(currentDay)}일
        </Text>
        {anniversaryList.length > 0 && <View style={styles.dividerView} />}
        {anniversaryList.map((arr) => {
          return (
            <Text
              style={{
                ...styles.anniversaryDateText,
              }}
            >
              {arr.title}
            </Text>
          );
        })}
      </View>
      <View style={styles.dropdownContainerView}>
        <SelectDropdown
          defaultButtonText={filterData[0][0]}
          data={filterData}
          dropdownOverlayColor="none"
          buttonStyle={styles.dropdownButtonView}
          buttonTextStyle={styles.dropdownButtonText}
          renderDropdownIcon={(isOpened) => {
            return (
              <Arrow
                style={{
                  transform: [{ rotate: isOpened ? '180deg' : '0deg' }],
                }}
              />
            );
          }}
          dropdownStyle={styles.dropdownBelowContainerView}
          renderCustomizedRowChild={(item) => {
            return (
              <View style={styles.rowChildView}>
                <View
                  style={{
                    ...styles.circleView,
                    backgroundColor: item[1],
                  }}
                />
                <Text>{item[0]}</Text>
              </View>
            );
          }}
          rowTextStyle={styles.rowChildText}
          rowStyle={styles.rowDividerView}
          onSelect={(selectedItem, index) => {
            setSelectedFilter(index);
          }}
          buttonTextAfterSelection={(selectedItem) => {
            return selectedItem[0];
          }}
          rowTextForSelection={(item) => {
            return item[0];
          }}
        />
      </View>
      {myScheduleDetail.length === 0 && partnerScheduleDetail.length === 0 && (
        <CalendarDetailBox
          noSchedule={noSchedule}
          swipeStates={swipeStates}
          idx={0}
        />
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.rowScrollView}
      >
        {coupleScheduleDetail?.length > 0 &&
          (selectedFilter === 1 || selectedFilter === 0) &&
          coupleScheduleDetail.map((arr, idx) => {
            return (
              <Swipeable
                key={arr.datingId}
                renderRightActions={() => (
                  <SwipeButton
                    onEdit={() => handleAddPlan(arr)}
                    onDelete={() => handleDeleteAlert(arr.datingId)}
                  />
                )}
                overshootRight={false}
                onSwipeableWillOpen={() => handleSwipe(idx, true)}
                onSwipeableWillClose={() => handleSwipe(idx, false)}
              >
                <CalendarDetailBox
                  key={arr.datingId}
                  scheduleDetail={arr}
                  boxColor="#FC887B"
                  swipeStates={swipeStates}
                  idx={idx}
                />
              </Swipeable>
            );
          })}
        {myScheduleDetail?.length > 0 &&
          (selectedFilter === 2 || selectedFilter === 0) &&
          myScheduleDetail.map((arr, idx) => {
            return (
              <Swipeable
                key={arr.scheduleId}
                renderRightActions={() => (
                  <SwipeButton
                    onEdit={() => handleAddPlan(arr)}
                    onDelete={() => handleDeleteAlert(arr.scheduleId)}
                  />
                )}
                overshootRight={false}
                onSwipeableWillOpen={() => handleSwipe(idx, true)}
                onSwipeableWillClose={() => handleSwipe(idx, false)}
              >
                <CalendarDetailBox
                  key={arr.scheduleId}
                  scheduleDetail={arr}
                  boxColor="#FFDD95"
                  swipeStates={swipeStates}
                  idx={idx}
                />
              </Swipeable>
            );
          })}

        {partnerScheduleDetail?.length > 0 &&
          (selectedFilter === 3 || selectedFilter === 0) &&
          partnerScheduleDetail.map((arr, idx) => {
            return (
              <CalendarDetailBox
                key={arr.scheduleId}
                scheduleDetail={arr}
                boxColor="#D0E6A5"
                swipeStates={swipeStates}
                idx={idx}
              />
            );
          })}
      </ScrollView>
    </View>
  );
};

export default CheckCalendarDetail;

const styles = StyleSheet.create({
  calendarDetailView: {
    marginTop: 24,
    marginLeft: 5,
  },
  calendarDetailHeaderView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dividerView: {
    height: 12,
    borderWidth: 1,
    borderColor: '#D2D2D2',
    marginLeft: 12,
    marginRight: 12,
  },
  selectedDateText: {
    fontFamily: 'Pretendard-Medium',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'left',
    color: '#000000',
  },
  anniversaryDateText: {
    fontFamily: 'Pretendard-Medium',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'left',
    color: '#FC887B',
    marginRight: 20,
  },
  dropdownContainerView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 19,
    marginTop: 13,
    alignItems: 'center',
  },
  dropdownButtonView: {
    backgroundColor: '#FFFFFF',
    width: 120,
  },
  dropdownButtonText: {
    fontFamily: 'Pretendard-Medium',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'right',
    color: '#909090',
  },
  dropdownBelowContainerView: {
    height: 128,
    marginTop: -8,
    backgroundColor: '#FFFFFF',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {
      width: 6,
      height: 4,
    },
    shadowColor: '#000',
    borderColor: 'rgba(22,20,10,0.1)',
    overflow: 'visible',
    borderRadius: 8,
  },
  rowChildView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 23,
  },
  circleView: {
    height: 12,
    width: 12,
    borderRadius: 1000,
    marginRight: 12,
  },
  rowChildText: {
    fontFamily: 'Pretendard-Medium',
    fontWeight: '400',
    fontSize: 14,
    marginLeft: 23,
    textAlign: 'left',
    color: '#000000',
  },
  rowDividerView: {
    height: 32,
    borderBottomColor: '#EDF0F3',
  },
  rowScrollView: {
    height: 250,
  },
});
