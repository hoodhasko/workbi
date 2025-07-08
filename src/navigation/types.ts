import {
  CompositeScreenProps,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {SCREEN_NAMES} from '@config/Constants';

export type AppStackParamList = {
  TabStack: NavigatorScreenParams<TabStackParamList>;
};

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;
export type TabStackParamList = {
  [SCREEN_NAMES.HomeScreen]: undefined;
  ProjectsStack: NavigatorScreenParams<ProjectsStackParamList>;
  [SCREEN_NAMES.ReportsScreen]: undefined;
};

export type TabStackScreenProps<T extends keyof TabStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabStackParamList, T>,
    AppStackScreenProps<keyof AppStackParamList>
  >;

export type ProjectsStackParamList = {
  [SCREEN_NAMES.ProjectsScreen]: undefined;
  [SCREEN_NAMES.ProjectDetailsScreen]: undefined;
  [SCREEN_NAMES.TasksScreen]: undefined;
  [SCREEN_NAMES.TaskScreen]: undefined;
};

export type ProjectsStackScreenProps<T extends keyof ProjectsStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<ProjectsStackParamList, T>,
    CompositeScreenProps<
      TabStackScreenProps<keyof TabStackParamList>,
      AppStackScreenProps<keyof AppStackParamList>
    >
  >;

export type RouteProps =
  | RouteProp<AppStackParamList>
  | RouteProp<TabStackParamList>
  | RouteProp<ProjectsStackParamList>;

export type ScreenName = RouteProps['name'];

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}
