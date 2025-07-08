import {FC} from 'react';
import {
  ScrollView,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';

import {AppText, Layout} from '@components/ui';
import {BASE_COLORS, PROJECTS_DATA} from '@config/Constants';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProjectsStackParamList, TabStackParamList} from '@navigation/types';

interface ProjectDetailsScreenProps
  extends NativeStackScreenProps<
    ProjectsStackParamList,
    'ProjectDetailsScreen'
  > {}

export const ProjectDetailsScreen: FC<ProjectDetailsScreenProps> = ({
  route,
}) => {
  const {id, title} = route.params;

  const project = PROJECTS_DATA.find(project => project.id === id);

  if (!project) return null;

  return (
    <Layout style={styles.layout}>
      <View style={styles.header}>
        <AppText style={styles.headerText}>{title}</AppText>

        <View style={{marginTop: 12, flexDirection: 'row', gap: 8}}>
          <TouchableOpacity
            style={{
              backgroundColor: BASE_COLORS.main.secondary,
              alignSelf: 'flex-start',
              padding: 4,
              borderRadius: 100,
            }}>
            <AppText style={{color: BASE_COLORS.main.white, fontSize: 10}}>
              Редактировать
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: BASE_COLORS.main.error,
              alignSelf: 'flex-start',
              padding: 4,
              borderRadius: 100,
            }}>
            <AppText style={{color: BASE_COLORS.main.white, fontSize: 10}}>
              Архивировать
            </AppText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{paddingHorizontal: 12, marginTop: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <AppText
            style={{
              color: BASE_COLORS.main.secondary,
              fontWeight: '500',
              fontSize: 16,
            }}>
            Задачи
          </AppText>

          <AppText>Все задачи ↓</AppText>
        </View>

        <ScrollView contentContainerStyle={styles.container}>
          {project.tasks.map(task => {
            return (
              <View
                key={task.id}
                style={{
                  backgroundColor: BASE_COLORS.main.white,
                  padding: 8,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: BASE_COLORS.ui.borders,
                }}>
                <AppText
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: BASE_COLORS.main.primary,
                  }}>
                  {task.name}
                </AppText>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: {
    padding: 0,
  },
  header: {
    backgroundColor: BASE_COLORS.main.white,
    paddingHorizontal: 12,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  container: {
    paddingTop: 8,
    gap: 8,
  },
});
