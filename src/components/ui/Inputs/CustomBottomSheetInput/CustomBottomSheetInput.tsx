import React, {FC, useCallback} from 'react';
import {NativeSyntheticEvent, TextInputFocusEventData} from 'react-native';
import {useBottomSheetInternal} from '@gorhom/bottom-sheet';

import {MainInputProps} from '../MainInput/types';
import {MainInput} from '../MainInput';

interface CustomBottomSheetInputProps extends MainInputProps {
  label?: string;
  showCount?: boolean;
  error?: boolean | string;
  hideClearButton?: boolean;
}

export const CustomBottomSheetInput: FC<CustomBottomSheetInputProps> = ({
  onFocus,
  onBlur,
  ...props
}) => {
  const {shouldHandleKeyboardEvents} = useBottomSheetInternal();

  const handleOnFocus = useCallback(
    (args: NativeSyntheticEvent<TextInputFocusEventData>) => {
      shouldHandleKeyboardEvents.value = true;
      if (onFocus) {
        onFocus(args);
      }
    },
    [onFocus, shouldHandleKeyboardEvents],
  );
  const handleOnBlur = useCallback(
    (args: NativeSyntheticEvent<TextInputFocusEventData>) => {
      shouldHandleKeyboardEvents.value = false;
      if (onBlur) {
        onBlur(args);
      }
    },
    [onBlur, shouldHandleKeyboardEvents],
  );

  return <MainInput onFocus={handleOnFocus} onBlur={handleOnBlur} {...props} />;
};
