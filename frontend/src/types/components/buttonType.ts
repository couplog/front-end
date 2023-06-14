export interface ButtonProps {
  text: string;
  disabled: boolean;
  onPress: () => void;
  font: 'bold' | 'regular' | 'medium';
}
