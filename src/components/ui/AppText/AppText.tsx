import {BASE_COLORS} from '@config/Constants';
import {FC} from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';

interface AppTextProps extends TextProps {}

export const AppText: FC<AppTextProps> = ({children, ...props}) => {
  return (
    <Text {...props} style={[styles.text, props.style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: BASE_COLORS.main.primary,
  },
});
