import {
  Animated,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useRecoilValue } from 'recoil';
import { Calendar } from 'react-native-calendars';
import MonthPicker from 'react-native-month-year-picker';
import { userState } from '../../state/atoms/userAtom';
import { getFormattedDate } from '../../utils/formattedDate';
import Plus from '../../assets/images/common/plus.svg';
import CheckCalendarDayComponent from './CheckCalendarDayComponent';
import { DayType, PlanPropsType } from '../../types/calendar/calendarType';
import { handleGetPlan, handleGetPlanDetail } from '../../api/plan/getPlan';
import { partnerState } from '../../state/atoms/partnerAtom';
import OptionArrow from '../../assets/images/common/optionArrow.svg';
import CheckCalendarDetail from './CheckCalendarDetail';

const CheckCalendar = ({
  detail,
  setDaySelected,
}: {
  detail?: boolean;
  setDaySelected?: Dispatch<SetStateAction<string>>;
}) => {
  const userData = useRecoilValue(userState);
  const partnerData = useRecoilValue(partnerState);
  const [selected, setSelected] = useState('');
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mySchedule, setMySchedule] = useState([]);
  const [partnerSchedule, setPartnerSchedule] = useState([]);
  const [myScheduleDetail, setMyScheduleDetail] = useState([]);
  const [partnerScheduleDetail, setPartnerScheduleDetail] = useState([]);
  const today = getFormattedDate(new Date());
  const currentYear = today.substring(0, 4);
  const currentMonth = today.substring(5, 7);
  const currentDay = today.substring(8, 10);
  const selectedYear = selected.substring(0, 4);
  const selectedMonth = selected.substring(5, 7);
  const selectedDay = selected.substring(8, 10);
  const formattedDate = getFormattedDate(date);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const coupleSchedule = [
    '2023-06-01',
    '2023-06-02',
    '2023-06-13',
    '2023-06-16',
    '2023-06-26',
    '2023-07-05',
  ];

  let newDaysObject: DayType = {};

  // 날짜 선택 및 전달
  const handleSelectedDate = (date: SetStateAction<string>) => {
    setSelected(date);
    if (setDaySelected) {
      setDaySelected(date);
    }
  };

  coupleSchedule.forEach((day) => {
    newDaysObject = {
      ...newDaysObject,
      [day]: {
        marked: true,
        dots: [{ key: 'coupleSchedule', color: 'red' }],
      },
    };
  });

  mySchedule.forEach((day) => {
    Object.keys(newDaysObject).includes(day)
      ? (newDaysObject = {
          ...newDaysObject,
          [day]: {
            marked: true,
            dots: [
              { key: 'coupleSchedule', color: 'red' },
              { key: 'partnerSchedule', color: 'yellow' },
            ],
          },
        })
      : (newDaysObject = {
          ...newDaysObject,
          [day]: {
            marked: true,
            dots: [{ key: 'partnerSchedule', color: 'yellow' }],
          },
        });
  });

  partnerSchedule.forEach((day) => {
    if (Object.keys(newDaysObject).includes(day)) {
      if (newDaysObject[day].dots.length === 2) {
        newDaysObject = {
          ...newDaysObject,
          [day]: {
            marked: true,
            dots: [
              { key: 'coupleSchedule', color: 'red' },
              { key: 'partnerSchedule', color: 'yellow' },
              { key: 'mySchedule', color: 'green' },
            ],
          },
        };
      } else if (
        newDaysObject[day].dots.length === 1 &&
        newDaysObject[day].dots[0]?.color === 'red'
      ) {
        newDaysObject = {
          ...newDaysObject,
          [day]: {
            marked: true,
            dots: [
              { key: 'coupleSchedule', color: 'red' },
              { key: 'mySchedule', color: 'green' },
            ],
          },
        };
      } else if (
        newDaysObject[day].dots.length === 1 &&
        newDaysObject[day].dots[0]?.color === 'yellow'
      ) {
        newDaysObject = {
          ...newDaysObject,
          [day]: {
            marked: true,
            dots: [
              { key: 'coupleSchedule', color: 'yellow' },
              { key: 'mySchedule', color: 'green' },
            ],
          },
        };
      }
    } else {
      newDaysObject = {
        ...newDaysObject,
        [day]: {
          marked: true,
          dots: [{ key: 'mySchedule', color: 'green' }],
        },
      };
    }
  });

  // 년도, 월 세팅하는 모달 보이게하는 함수
  const handleShowPicker = useCallback(
    (value: boolean | ((prevState: boolean) => boolean)) => setShow(value),
    []
  );

  // 숫자로 들어오는 월 이름을 영어로 바꾸는 함수
  const handleMonthName = useCallback(
    (date: Date) => {
      const index = date.getMonth();
      return month[index];
    },
    [month]
  );

  // 년도, 월을 변경할 때 사용하는 함수
  const handleChangeValue = useCallback(
    (event: any, newDate: Date) => {
      const selectedDate = newDate || date;
      const formattedDate = getFormattedDate(selectedDate);

      handleShowPicker(false);
      setDate(selectedDate);
      formattedDate.substring(0, 7) === selected.substring(0, 7) && selected
        ? setSelected(selected)
        : formattedDate.substring(0, 7) === today.substring(0, 7)
        ? setSelected(today)
        : setSelected(formattedDate);
      handleMonthName(date);
    },
    [date, handleMonthName, handleShowPicker, selected, today]
  );

  const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));

  // 플러스 버튼을 누르면 엑스버튼으로 바꿔주는 함수
  const handleAnimation = () => {
    Animated.timing(rotateAnimation, {
      toValue: 1,
      duration: 800,
      // easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      rotateAnimation.setValue(0);
    });
  };

  const interpolateRotating = rotateAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '45deg', '90deg'],
  });

  const animatedStyle = {
    transform: [
      {
        rotate: interpolateRotating,
      },
    ],
  };

  // 개인 일정 조회
  const handleCheckMyPlan = async (
    { year, month }: PlanPropsType,
    memberId: number | null
  ) => {
    try {
      const res = await handleGetPlan({ year, month }, memberId);
      setMySchedule(res.data.data.scheduleDates);
    } catch (err: any) {
      console.log(err.response.data.message);
    }
  };

  // 상대방 일정 조회
  const handleCheckPartnerPlan = async (
    { year, month }: PlanPropsType,
    memberId: number | null
  ) => {
    try {
      const res = await handleGetPlan({ year, month }, memberId);
      setPartnerSchedule(res.data.data.scheduleDates);
    } catch (err: any) {
      console.log(err.response.data.message);
    }
  };

  // 개인 일정 디테일 조회
  const handleCheckMyPlanDetail = async (
    { year, month, day }: PlanPropsType,
    memberId: number | null
  ) => {
    try {
      const res = await handleGetPlanDetail({ year, month, day }, memberId);
      setMyScheduleDetail(res.data.data.schedules);
    } catch (err: any) {
      console.log(err.response.data.message);
    }
  };

  // 상대방 일정 디테일 조회
  const handleCheckPartnerPlanDetail = async (
    { year, month, day }: PlanPropsType,
    memberId: number | null
  ) => {
    try {
      const res = await handleGetPlanDetail({ year, month, day }, memberId);
      setPartnerScheduleDetail(res.data.data.schedules);
    } catch (err: any) {
      console.log(err.response.data.message);
    }
  };

  useEffect(() => {
    const year = selectedYear || currentYear;
    const month = selectedMonth || currentMonth;
    const day = selectedDay || currentDay;
    const myMemberId = userData.memberId;
    const partnerMemberId = partnerData.memberId;

    myMemberId && handleCheckMyPlan({ year, month }, myMemberId);
    myMemberId && handleCheckMyPlanDetail({ year, month, day }, myMemberId);
    partnerMemberId && handleCheckPartnerPlan({ year, month }, partnerMemberId);
    partnerMemberId &&
      handleCheckPartnerPlanDetail({ year, month, day }, partnerMemberId);
  }, [
    currentDay,
    currentMonth,
    currentYear,
    partnerData,
    selected,
    selectedDay,
    selectedMonth,
    selectedYear,
    today,
    userData.memberId,
  ]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.marginContainer}>
        <View style={detail ? undefined : styles.calendarView}>
          {/* 플랜 생성 페이지 분기처리 */}
          {detail ? (
            <View style={styles.calendarHeaderView}>
              <TouchableOpacity
                activeOpacity={1.0}
                style={styles.textFlex}
                onPress={() => handleShowPicker(true)}
              >
                <Text style={styles.detailText}>{date.getFullYear()}</Text>
                <Text style={styles.detailText}>{handleMonthName(date)}</Text>
                <OptionArrow />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.calendarHeaderView}>
              <TouchableOpacity
                activeOpacity={1.0}
                onPress={() => handleShowPicker(true)}
              >
                <Text style={styles.yearText}>{date.getFullYear()}</Text>
                <Text style={styles.monthText}>{handleMonthName(date)}</Text>
              </TouchableOpacity>
              {/* 플러스 버튼 눌렀을 때 엑스로 변경되는 애니메이션 아직 구현 못함 */}
              <TouchableOpacity style={styles.plusButton}>
                <Animated.Text style={animatedStyle}>
                  <Plus onPress={async () => handleAnimation()} />
                </Animated.Text>
              </TouchableOpacity>
            </View>
          )}

          {/* 캘린더 주간 제목 색상 및 대문자 설정 아직 구현 못함 */}
          <Calendar
            monthFormat=""
            current={formattedDate}
            key={formattedDate}
            onDayPress={(day) => {
              setSelected(day.dateString);
            }}
            markingType="multi-dot"
            hideArrows
            style={{
              paddingLeft: 0,
              paddingRight: 0,
            }}
            markedDates={newDaysObject}
            dayComponent={({ date, state, marking }) => {
              return (
                <CheckCalendarDayComponent
                  detail={detail}
                  date={date}
                  state={state}
                  marking={marking}
                  setSelected={(date) => handleSelectedDate(date)}
                  selected={selected}
                />
              );
            }}
          />

          {detail ? null : (
            <CheckCalendarDetail
              selectedMonth={selectedMonth}
              selectedDay={selectedDay}
              currentMonth={currentMonth}
              currentDay={currentDay}
              myScheduleDetail={myScheduleDetail}
              partnerScheduleDetail={partnerScheduleDetail}
            />
          )}
        </View>

        {show && (
          <MonthPicker
            onChange={handleChangeValue}
            value={date}
            minimumDate={new Date(1990, 1)}
            maximumDate={new Date(2025, 5)}
            locale="en"
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CheckCalendar;

const styles = StyleSheet.create({
  marginContainer: {
    paddingTop: 8,
  },
  rootContainer: {
    flex: 1,
  },
  calendarView: {
    marginLeft: 21,
    marginRight: 21,
  },
  calendarHeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  yearText: {
    fontFamily: 'Pretendard-Medium',
    fontWeight: '400',
    fontSize: 14,
    color: '#000000',
  },
  monthText: {
    fontFamily: 'Pretendard-Medium',
    fontWeight: '700',
    fontSize: 32,
    color: '#000000',
    textTransform: 'uppercase',
  },
  plusButton: {
    paddingTop: 13,
  },
  selectedDateText: {
    marginTop: 24,
    fontFamily: 'Pretendard-Medium',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'left',
    color: '#000000',
  },

  // 해당 부분은 일정 생성 페이지 캘린더 UI 스타일 분기 코드
  detailText: {
    fontWeight: '500',
    fontSize: 18,
    color: '#787878',
    fontFamily: 'Pretendard-Medium',
    marginRight: 5,
    textTransform: 'uppercase',
  },
  textFlex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
