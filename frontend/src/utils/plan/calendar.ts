import {
  handleGetDatePlanDetail,
  handleGetPlanDetail,
} from '../../api/plan/getPlan';
import {
  CheckCouplePlanDetailType,
  CheckMyPlanDetailType,
  CheckPartnerPlanDetailType,
} from '../../types/calendar/calendarType';

// 개인 일정 디테일 조회
export const handleCheckMyPlanDetail = async ({
  year,
  month,
  day,
  myMemberId,
  setMyScheduleDetail,
}: CheckMyPlanDetailType) => {
  try {
    const res = await handleGetPlanDetail({ year, month, day }, myMemberId);
    setMyScheduleDetail(res.data.data.schedules);
  } catch (err: any) {
    console.log(err.response.data.message);
  }
};

// 상대방 일정 디테일 조회
export const handleCheckPartnerPlanDetail = async ({
  year,
  month,
  day,
  partnerMemberId,
  setPartnerScheduleDetail,
}: CheckPartnerPlanDetailType) => {
  try {
    const res = await handleGetPlanDetail(
      { year, month, day },
      partnerMemberId
    );
    setPartnerScheduleDetail(res.data.data.schedules);
  } catch (err: any) {
    console.log(err.response.data.message);
  }
};

// 커플 일정 디테일 조회
export const handleCheckCouplePlanDetail = async ({
  year,
  month,
  day,
  coupleId,
  setCoupleScheduleDetail,
}: CheckCouplePlanDetailType) => {
  try {
    const res = await handleGetDatePlanDetail({ year, month, day }, coupleId);
    setCoupleScheduleDetail(res.data.data.schedules);
  } catch (err: any) {
    console.log(err.response.data.message);
  }
};
