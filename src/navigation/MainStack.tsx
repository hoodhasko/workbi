import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AppStackParamList} from '@navigation/types';
import {TabStack} from '@navigation/TabStack';

const Stack = createNativeStackNavigator<AppStackParamList>();

export const MainStack: FC = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'TabStack'}
        component={TabStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
