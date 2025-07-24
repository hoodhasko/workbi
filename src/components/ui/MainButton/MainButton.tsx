import React, {FC, ReactElement, memo} from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

import {MainButtonLeftIcon} from './MainButtonLeftIcon';
import {ButtonSizeType, ButtonStyle, ButtonType} from './types';
import {AppText} from '@components/ui/AppText';

import {buttonTypeStyle, styles} from './style';

export interface MainButtonProps extends PressableProps {
  text: string;
  type?: ButtonType;
  buttonStyle?: ButtonStyle;
  size?: ButtonSizeType;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  fw?: boolean;
  textStyle?: StyleProp<TextStyle>;
  loading?: boolean;
}

export const MainButton: FC<MainButtonProps> = memo(props => {
  const {
    type = 'primary',
    buttonStyle = 'basic',
    size = 'medium',
    text,
    leftIcon,
    rightIcon,
    style,
    fw,
    textStyle,
    loading,
    ...pressedProps
  } = props;

  const typeStyle = buttonTypeStyle[type];

  return (
    <Pressable
      {...pressedProps}
      disabled={loading || pressedProps.disabled}
      style={({pressed}) => [
        styles.button,
        typeStyle.button,
        pressed && typeStyle.pressedButton,
        (pressedProps.disabled || loading) && styles.disabledButton,
        fw && styles.fw,
        typeof style === 'function' ? style({pressed}) : style,
      ]}>
      {({pressed}) =>
        loading ? (
          <ActivityIndicator />
        ) : (
          <>
            <MainButtonLeftIcon
              icon={leftIcon}
              pressed={pressed}
              typeStyle={typeStyle}
            />

            <AppText
              style={[
                typeStyle.text,
                pressed && typeStyle.pressedButtonText,
                textStyle,
              ]}>
              {text}
            </AppText>
          </>
        )
      }
    </Pressable>
  );
});
