import { Dispatch, SetStateAction } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

export interface MyPageModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  type: string;
  navigation: any;
  memberId: number | null;
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
