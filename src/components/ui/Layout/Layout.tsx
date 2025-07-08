import React, {FC} from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

import {BASE_COLORS} from '@config/Constants';

interface LayoutProps extends ViewProps {}

export const Layout: FC<LayoutProps> = props => {
  return <View {...props} style={[styles.layout, props.style]} />;
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: BASE_COLORS.ui.background,
    padding: 16,
  },
});
