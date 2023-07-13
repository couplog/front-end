import { Dispatch, SetStateAction } from 'react';
import { ScheduleDetailType } from '../atom/scheduleDetailType';

export interface DayType {
  [key: string]: {
    marked: boolean;
    dots: DotsType[];
  };
}

interface DotsType {
  key: string;
  color: string;
}

export interface Props {
  date?: DateType;
  state?: string;
  marking?: MarkingType;
  setSelected: Dispatch<SetStateAction<string>>;
  selected: string;
  detail: boolean | undefined;
}

export interface DateType {
  dateString: string;
  day: number;
  timestamp: number;
  year: number;
}

export interface MarkingType {
  dots?: MarkingDotsType[];
  marked?: boolean;
}

interface MarkingDotsType {
  key?: string;
  color: string;
}

export interface PlanPropsType {
  year?: string;
  month?: string;
  day?: string;
}

export interface CalendarDetailBoxType {
  scheduleDetail?: ScheduleDetailType;
  boxColor?: '#FFDD95' | '#D0E6A5' | '#FC887B';
  noSchedule?: boolean;
}

export interface CheckMyPlanDetailType extends PlanPropsType {
  myMemberId: number | null;
  setMyScheduleDetail: Dispatch<SetStateAction<never[]>>;
}

export interface CheckPartnerPlanDetailType extends PlanPropsType {
  partnerMemberId: number | null;
  setPartnerScheduleDetail: Dispatch<SetStateAction<never[]>>;
}

export interface CheckCouplePlanDetailType extends PlanPropsType {
  coupleId: number | null;
  setCoupleScheduleDetail: Dispatch<SetStateAction<never[]>>;
}
