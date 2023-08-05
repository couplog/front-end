export interface ScheduleDetailType {
  scheduleId: number | null;
  startDateTime: string;
  endDateTime: string;
  title: string;
  content: string;
  location: string;
  repeatRule: string;
}

export interface DateScheduleDetailType {
  datingId: number | null;
  startDateTime: string;
  endDateTime: string;
  title: string;
  content: string;
  location: string;
}
