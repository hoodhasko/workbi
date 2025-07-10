import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ProjectsStackParamList} from '@navigation/types';
import {SCREEN_NAMES} from '@config/Constants';
// import {
//   ArchiveStationList,
//   ModuleScreen,
//   StationDataScreen,
//   StationListScreen,
//   StationsScreen,
// } from '@screens/StationStack';
// import {AppHeader, BackButton, MenuButton} from '@components/navigation';
import {ProjectsScreen, ProjectDetailsScreen} from '@screens/index';

const Stack = createNativeStackNavigator<ProjectsStackParamList>();

export const ProjectsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerStyle: {backgroundColor: '#F2F1F1'},
        headerShadowVisible: false,
      }}
      // screenOptions={{
      //   headerLeft({canGoBack}) {
      //     if (Boolean(canGoBack)) {
      //       return <BackButton />;
      //     }

      //     return <MenuButton />;
      //   },
      //   header: ({options, route, back}) => (
      //     <AppHeader
      //       headerLeft={options.headerLeft?.({canGoBack: Boolean(back)})}
      //       route={route}
      //     />
      //   ),
      // }}
      initialRouteName={SCREEN_NAMES.ProjectsScreen}>
      <Stack.Screen
        name={SCREEN_NAMES.ProjectsScreen}
        component={ProjectsScreen}
        options={{
          title: 'Проекты',
        }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.ProjectDetailsScreen}
        component={ProjectDetailsScreen}
        options={{
          title: '',
        }}
      />
    </Stack.Navigator>
  );
};
