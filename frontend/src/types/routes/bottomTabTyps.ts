import { ReactNode } from 'react';

export interface BottomTabCustomButtonProps {
  label: string;
  onPress: any;
}

export interface BottomTabCustomIconProps {
  focused: boolean;
  icon: ReactNode; // You can use the type 'ReactNode' to accept any valid React node as an icon
}
