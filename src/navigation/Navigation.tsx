import React, {FC} from 'react';
import {StatusBar} from 'react-native';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';

import {MainStack} from '@navigation/MainStack';
import {BASE_COLORS} from '@config/Constants';

export const navigationRef = createNavigationContainerRef();

export const Navigation: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar
        barStyle="dark-content"
        // translucent
        backgroundColor={BASE_COLORS.main.white}
      />
      <MainStack />
    </NavigationContainer>
  );
};
