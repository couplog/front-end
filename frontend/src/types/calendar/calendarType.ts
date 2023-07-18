import { Dispatch, SetStateAction } from 'react';
import {
  DateScheduleDetailType,
  ScheduleDetailType,
} from '../atom/scheduleDetailType';

export interface SchedulesType {
  [key: string]: ScheduleNameType[];
}

interface ScheduleNameType {
  key: string;
  color: string;
}

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
  scheduleDetail?: ScheduleDetailType | DateScheduleDetailType;
  boxColor?: '#FFDD95' | '#D0E6A5' | '#FC887B';
  noSchedule?: boolean;
  swipeStates: boolean[];
  idx: number;
}

export interface CheckCalendarDetailType {
  navigation?: any;
  selectedYear: string;
  selectedMonth: string;
  selectedDay: string;
  currentMonth: string;
  currentDay: string;
  partnerScheduleDetail: ScheduleDetailType[];
  anniversaryList: AnniversaryListtype[];
  setFocus: Dispatch<SetStateAction<boolean>>;
}

interface AnniversaryListtype {
  id: number;
  title: string;
  content: string;
  repeatRule: 'NONE' | 'YEAR';
  category: 'OTHER' | 'BIRTH' | 'FIRST_DATE';
  date: string;
}

export interface CheckPlanType extends PlanPropsType {
  myMemberId: number | null;
  setScheduleList: Dispatch<SetStateAction<any[]>>;
}

export interface CheckMyPlanDetailType extends PlanPropsType {
  myMemberId: number | null;
  setMyScheduleDetail: Dispatch<SetStateAction<any[]>>;
}

export interface CheckPartnerPlanDetailType extends PlanPropsType {
  partnerMemberId: number | null;
  setPartnerScheduleDetail: Dispatch<SetStateAction<never[]>>;
}

export interface CheckCouplePlanDetailType extends PlanPropsType {
  coupleId: number | null;
  setCoupleScheduleDetail: Dispatch<SetStateAction<any[]>>;
}

export interface CheckAnniversaryListType extends PlanPropsType {
  coupleId: number | null;
  setAnniversaryList: Dispatch<SetStateAction<never[]>>;
}
