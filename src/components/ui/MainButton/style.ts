import {StyleSheet} from 'react-native';

import {ButtonType, ButtonTypeStyleProps} from './types';
import {BASE_COLORS} from '@config/Constants';
// import {BASE_COLORS} from '@config/constants';

export const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignSelf: 'flex-start',
    paddingVertical: 16,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fw: {
    flexShrink: 1,
    alignSelf: undefined,
    width: '100%',
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export const buttonTypeStyle: {
  [key in ButtonType]: ButtonTypeStyleProps;
} = {
  primary: {
    button: {
      backgroundColor: BASE_COLORS.main.primary,
    },
    pressedButton: {
      opacity: 0.8,
    },
    text: {
      color: BASE_COLORS.main.white,
    },
    pressedButtonText: {},
  },
  secondary: {
    button: {},
    pressedButton: {},
    text: {},
    pressedButtonText: {},
  },
};
