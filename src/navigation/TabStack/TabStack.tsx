import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from '@react-native-vector-icons/octicons';

import {TabStackParamList} from '@navigation/types';
// import {
//   AppHeader,
//   BackButton,
//   ScanNFCTabButton,
//   TabBarIcon,
//   TabBarLabel,
// } from '@components/navigation';
import {BASE_COLORS, SCREEN_NAMES} from '@config/Constants';

import {HomeScreen, ProjectsScreen, ReportsScreen} from '@screens/index';
import {ProjectsStack} from '@navigation/ProjectsStack';
import {AppText} from '@components/ui';

const Tab = createBottomTabNavigator<TabStackParamList>();

export const TabStack = () => {
  return (
    <Tab.Navigator
      backBehavior={'history'}
      screenOptions={{
        headerShadowVisible: false,
        sceneStyle: {backgroundColor: 'white'},
        tabBarLabel: ({children, color}) => (
          <AppText style={{fontSize: 12, color}}>{children}</AppText>
        ),
        tabBarActiveTintColor: BASE_COLORS.main.primary,
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
          tabBarIcon: ({focused}) => (
            <Icon
              name="home"
              size={20}
              color={
                focused ? BASE_COLORS.main.primary : BASE_COLORS.main.primary20
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name={'ProjectsStack'}
        component={ProjectsStack}
        options={{
          headerShown: false,
          title: 'Проекты',
          tabBarIcon: ({focused}) => (
            <Icon
              name="rows"
              size={20}
              color={
                focused ? BASE_COLORS.main.primary : BASE_COLORS.main.primary20
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name={SCREEN_NAMES.ReportsScreen}
        component={ReportsScreen}
        options={{
          title: 'Отчеты',
          tabBarIcon: ({focused}) => (
            <Icon
              name="log"
              size={20}
              color={
                focused ? BASE_COLORS.main.primary : BASE_COLORS.main.primary20
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
