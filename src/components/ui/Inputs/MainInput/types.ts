import {TextInputProps} from 'react-native';

export interface MainInputProps extends TextInputProps {
  label?: string;
  showCount?: boolean;
  error?: boolean | string;
  hideClearButton?: boolean;
}
