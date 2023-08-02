import { Dispatch, SetStateAction } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

export interface MyPageModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  type?: string;
  navigation?: any;
  memberId: number | null;
  scheduleId?: number | null;
  handleCheckPlanDetail?: () => void;
  setFocus?: Dispatch<SetStateAction<boolean>>;
}

export interface ContentProps {
  title: string;
  onPress: () => void;
  top: number;
  user?: boolean;
}

export interface ProfileProps {
  myName: string;
  partnerName: string;
  birth: string;
  phone: string;
}

export interface MyPageHeaderProps {
  password?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  label: string;
}

export interface PasswordInputProps {
  placeholder: string;
  placeholderTextColor: string;
  eyeClick: boolean;
  secureTextEntry: boolean;
  onChangeText: Dispatch<SetStateAction<string>>;
  value: string;
  onChange?: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  handleEyeToggle: () => void;
  style: any;
  label: string;
}

export interface PlanModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  onPress: () => void;
  onPressRepeat: () => void;
}
