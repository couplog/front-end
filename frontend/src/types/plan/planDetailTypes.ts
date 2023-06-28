import { Dispatch, SetStateAction } from 'react';

// 헤더
export interface PlanDetailProps {
  text: string;
  none?: boolean;
  disabled: boolean;
  onPress: () => void;
}

// input Groups
export interface DetailInputProps {
  text: string;
  daySelected: string;
  timeSelected: string;
  setDaySelected: Dispatch<SetStateAction<string>>;
  setTimeSelected: Dispatch<SetStateAction<string>>;
}

// 반복 시작 옵션
export interface OptionProps {
  selectedOption: string;
  setSelectedOption: Dispatch<SetStateAction<string>>;
  setOptionVisible: Dispatch<SetStateAction<boolean>>;
  setRepeatCode: Dispatch<SetStateAction<string>>;
}

export interface ListProps extends EndListProps {
  code: string;
}

export interface EndListProps {
  id: number;
  text: string;
}
