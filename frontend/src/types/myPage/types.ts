import { Dispatch, SetStateAction } from 'react';

export interface MyPageModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  type: string;
  navigation: any;
}

export interface ContentProps {
  title: string;
  onPress: () => void;
  top: number;
  user?: boolean;
}
