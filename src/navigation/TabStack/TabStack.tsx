import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {TabStackParamList} from '@navigation/types';
// import {
//   AppHeader,
//   BackButton,
//   ScanNFCTabButton,
//   TabBarIcon,
//   TabBarLabel,
// } from '@components/navigation';
import {SCREEN_NAMES} from '@config/Constants';

import {styles} from './style';
import {Text, View} from 'react-native';
import {HomeScreen, ProjectsScreen, ReportsScreen} from '@screens/index';
import {ProjectsStack} from '@navigation/ProjectsStack';

const ProfileScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Text>ProfileScreen</Text>
    </View>
  );
};

const Tab = createBottomTabNavigator<TabStackParamList>();

export const TabStack = () => {
  return (
    <Tab.Navigator
      backBehavior={'history'}
      screenOptions={{
        headerShadowVisible: false,
        sceneStyle: {backgroundColor: 'white'},
      }}
      // screenOptions={({route}) => ({
      //   headerLeft: () => <BackButton />,
      //   header: ({options, route}) => (
      //     <AppHeader headerLeft={options.headerLeft?.({})} route={route} />
      //   ),
      //   tabBarStyle: styles.tabBarStyle,
      //   tabBarItemStyle: styles.tabBarItemStyle,
      //   tabBarIcon: ({focused}) => (
      //     <TabBarIcon focused={focused} routeName={route.name} />
      //   ),
      //   tabBarLabel: ({children, focused}) => (
      //     <TabBarLabel focused={focused} routeName={route.name} />
      //   ),
      // })}
      initialRouteName={'ProjectsStack'}>
      <Tab.Screen
        name={SCREEN_NAMES.HomeScreen}
        component={HomeScreen}
        options={{
          title: 'Главная',
        }}
      />
      <Tab.Screen
        name={'ProjectsStack'}
        component={ProjectsStack}
        options={{
          headerShown: false,
          title: 'Проекты',
        }}
      />
      <Tab.Screen
        name={SCREEN_NAMES.ReportsScreen}
        component={ReportsScreen}
        options={{title: 'Отчеты'}}
      />
    </Tab.Navigator>
  );
};
