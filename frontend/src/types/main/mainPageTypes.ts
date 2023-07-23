// profile component
export interface ProfileComponentProps {
  meetDate: string;
  anniversary?: boolean;
}

// 기념일 박스
export interface AnniversaryComponentProps {
  id: number;
  title: string;
  date: string;
  content: string | null;
}

export interface OurAnniversaryComponentProps
  extends AnniversaryComponentProps {
  content: string | null;
  repeatRule: string;
  category: string;
}

export interface DayInfoProps {
  title: string;
  date: string;
  backgroundColor: string | undefined;
  opacity: number | undefined;
}
