import { Dispatch, SetStateAction } from 'react';

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
