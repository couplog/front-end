import { Dispatch, SetStateAction } from 'react';

export interface HeaderProps {
  onPress: () => void;
  create?: boolean;
  isDisabled?: boolean;
}

export interface TitleInputProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}

export interface DateInputProps {
  daySelected: string;
  setDaySelected: Dispatch<SetStateAction<string>>;
}

export interface RepeatProps {
  repeatStart: string;
  setRepeatStart: Dispatch<SetStateAction<string>>;
  repeatCode: string;
  setRepeatCode: Dispatch<SetStateAction<string>>;
  startVisible: boolean;
  setStartVisible: Dispatch<SetStateAction<boolean>>;
}

export interface ContentInputProps {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}

export interface AnniversaryProps {
  title: string;
  content: string;
  repeatRule: string;
  date: string;
}
