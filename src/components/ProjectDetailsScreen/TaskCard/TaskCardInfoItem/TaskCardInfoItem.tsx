import {FC} from 'react';
import {StyleSheet, View} from 'react-native';

import {AppText} from '@components/ui';
import {BASE_COLORS} from '@config/Constants';

interface TaskCardInfoItemProps {
  label: string;
  value: string;
}

export const TaskCardInfoItem: FC<TaskCardInfoItemProps> = ({label, value}) => {
  return (
    <View style={styles.container}>
      <AppText style={styles.label}>{label}: </AppText>
      <AppText style={styles.value}>{value}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: BASE_COLORS.ui.lightText,
  },
  value: {
    fontWeight: '500',
    color: BASE_COLORS.main.secondary,
  },
});
