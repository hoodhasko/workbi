import React, {FC} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

import {AppText} from '@components/ui/AppText';
import {BASE_COLORS} from '@config/Constants';
import {MainInputProps} from './types';

export const MainInput: FC<MainInputProps> = ({
  label,
  showCount,
  error,
  hideClearButton,
  ...inputProps
}) => {
  return (
    <View style={{alignSelf: 'stretch'}}>
      {label && <AppText style={styles.label}>{label}</AppText>}

      <View
        style={[
          styles.inputContainer,
          Boolean(error) && styles.inputErrorContainer,
        ]}>
        <TextInput
          style={[styles.input, inputProps.multiline && styles.multilineInput]}
          cursorColor={styles.input.color}
          selectionColor={BASE_COLORS.ui.lightText}
          {...inputProps}
        />
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <AppText style={styles.errorText}>{error}</AppText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: BASE_COLORS.main.primary,
    fontWeight: '700',
    fontSize: 18,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: BASE_COLORS.ui.borders,
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputErrorContainer: {
    borderColor: BASE_COLORS.main.error,
  },
  input: {
    color: BASE_COLORS.main.primary,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.5,
    flex: 1,
    paddingVertical: 12,
    height: '100%',
    paddingHorizontal: 12,
  },
  multilineInput: {
    textAlignVertical: 'top',
  },
  icon: {
    marginRight: 12,
  },
  errorContainer: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14,
  },
  errorText: {
    color: BASE_COLORS.main.error,
  },
});
