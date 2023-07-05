import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { useRecoilValue } from 'recoil';
import CalendarDetailBox from './CalendarDetailBox';
import { userState } from '../../state/atoms/userAtom';
import { partnerState } from '../../state/atoms/partnerAtom';
import Arrow from '../../assets/images/common/arrow.svg';
import { ScheduleDetailType } from '../../types/atom/scheduleDetailType';

interface Props {
  selectedMonth: string;
  selectedDay: string;
  currentMonth: string;
  currentDay: string;
  myScheduleDetail: ScheduleDetailType[];
  partnerScheduleDetail: ScheduleDetailType[];
}

const CheckCalendarDetail = ({
  selectedMonth,
  selectedDay,
  currentMonth,
  currentDay,
  myScheduleDetail,
  partnerScheduleDetail,
}: Props) => {
  const userData = useRecoilValue(userState);
  const partnerData = useRecoilValue(partnerState);
  const filterData = [
    ['전체', '#EDF0F3'],
    ['데이트', '#FC887B'],
    [`${userData.name}`, '#FFDD95'],
    [`${partnerData.name}`, '#D0E6A5'],
  ];
  const [selectedFilter, setSelectedFilter] = useState(0);
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
        <View style={styles.dividerView} />
        <Text
          style={{
            ...styles.anniversaryDateText,
          }}
        >
          300일
        </Text>
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
        <CalendarDetailBox noSchedule={noSchedule} />
      )}
      {myScheduleDetail.length > 0 &&
        (selectedFilter === 2 || selectedFilter === 0) &&
        myScheduleDetail.map((arr) => {
          return (
            <CalendarDetailBox
              key={arr.scheduleId}
              scheduleDetail={arr}
              boxColor="#FFDD95"
            />
          );
        })}
      {partnerScheduleDetail.length > 0 &&
        (selectedFilter === 3 || selectedFilter === 0) &&
        partnerScheduleDetail.map((arr) => {
          return (
            <CalendarDetailBox
              key={arr.scheduleId}
              scheduleDetail={arr}
              boxColor="#D0E6A5"
            />
          );
        })}
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
});
