// profile component
export interface ProfileComponentProps {
  meetDate: string;
}

// 기념일 박스
export interface AnniversaryComponentProps {
  id: number;
  title: string;
  date: string;
  content: string | null;
}

export interface DayInfoProps {
  title: string;
  date: string;
  backgroundColor: string | undefined;
  opacity: number | undefined;
}
