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
  setDaySelected: (value: string) => void;
  setTimeSelected: (value: string) => void;
}

// 반복 시작 옵션
export interface OptionProps {
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  setOptionVisible: (visible: boolean) => void;
  setRepeatCode: (option: string) => void;
}

export interface ListProps extends EndListProps {
  code: string;
}

export interface EndListProps {
  id: number;
  text: string;
}
