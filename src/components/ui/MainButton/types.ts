import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export type ButtonSizeType = 'large' | 'medium' | 'small';
export type ButtonType = 'primary' | 'secondary';
export type ButtonStyle = 'basic' | 'text';

export type ButtonTypeStyleProps = {
  text?: StyleProp<TextStyle>;
  button?: StyleProp<ViewStyle>;
  pressedButton?: StyleProp<ViewStyle>;
  pressedButtonText?: StyleProp<TextStyle>;
};

export type ButtonStyleProps = {
  [key in ButtonStyle]: {
    [key in ButtonType]: ButtonTypeStyleProps;
  };
};
