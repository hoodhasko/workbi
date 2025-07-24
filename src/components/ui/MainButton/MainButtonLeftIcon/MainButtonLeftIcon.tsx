import React, {FC, ReactElement, cloneElement} from 'react';
import {View} from 'react-native';

// import {CustomSvgProps} from '@assets/svg/types';
import {ButtonTypeStyleProps} from '../types';

import {styles} from './style';

interface MainButtonLeftIconProps {
  pressed: boolean;
  typeStyle: ButtonTypeStyleProps;
  icon?: ReactElement;
}

export const MainButtonLeftIcon: FC<MainButtonLeftIconProps> = ({
  icon,
  pressed,
  typeStyle,
}) => {
  if (!icon) return null;

  const getFillColor = () => {
    if (
      pressed &&
      typeStyle.pressedButtonText &&
      'color' in typeStyle.pressedButtonText
    ) {
      return typeStyle.pressedButtonText.color;
    }

    if (icon.props.fill) {
      return icon.props.fill;
    } else if (typeStyle.text && 'color' in typeStyle.text) {
      return typeStyle.text.color;
    }
  };

  return (
    <View style={styles.leftIcon}>
      {cloneElement<any>(icon, {
        ...icon.props,
        fill: getFillColor(),
      })}
    </View>
  );
};
