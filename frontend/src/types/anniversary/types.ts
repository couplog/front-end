import { Dispatch, SetStateAction } from 'react';

export interface HeaderProps {
  onPress: () => void;
  create?: boolean;
  edit?: boolean;
  isDisabled?: boolean;
  handleMain: () => void;
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
  edit?: boolean;
}

export interface ContentInputProps {
  content: string | null;
  setContent:
    | Dispatch<SetStateAction<string>>
    | Dispatch<SetStateAction<string | null>>;
}

export interface AnniversaryProps {
  title: string;
  content: string;
  repeatRule?: string;
  date: string;
}

export interface SwipeButtonProps {
  onEdit: () => void;
  onDelete: () => void;
}
