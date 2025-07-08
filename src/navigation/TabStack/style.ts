import {StyleSheet} from 'react-native';

import {TABBAR_HEIGHT} from '@config/Constants';

export const styles = StyleSheet.create({
  tabBarStyle: {
    height: TABBAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgb(34, 48, 90)',
  },
  tabBarItemStyle: {
    marginVertical: 8,
  },
});
