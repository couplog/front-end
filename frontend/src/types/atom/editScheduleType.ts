export interface EditScheduleProps {
  mode: string;
  detail: EditScheduleData;
}

export interface EditScheduleData {
  title: string;
  location: string;
  content: string;
  endDateTime: string;
  repeatRule?: string;
  startDateTime: string;
  scheduleId?: null | number;
  datingId?: null | number;
}
