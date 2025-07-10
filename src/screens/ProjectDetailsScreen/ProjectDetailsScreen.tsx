import {FC} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppText, Layout} from '@components/ui';
import {ProjectsStackParamList} from '@navigation/types';
import {
  ProjectDetailsHeader,
  ProjectTasksList,
} from '@components/ProjectDetailsScreen';
import {selectProjectById, useProjectStore} from '@app/store';

interface ProjectDetailsScreenProps
  extends NativeStackScreenProps<
    ProjectsStackParamList,
    'ProjectDetailsScreen'
  > {}

export const ProjectDetailsScreen: FC<ProjectDetailsScreenProps> = ({
  route,
}) => {
  const {id, title} = route.params;

  const project = useProjectStore(state => selectProjectById(state, id));
  const tasks = useProjectStore(state => state.tasks);
  const createTask = useProjectStore(state => state.createTask);

  console.log('TASKS', tasks);

  if (!project) return null;

  return (
    <Layout style={styles.layout}>
      <ProjectDetailsHeader projectName={title} />

      <View style={{paddingHorizontal: 12, marginTop: 20}}>
        <ProjectTasksList
          tasks={tasks.filter(t => t.projectId === id)}
          projectRate={project.rate}
        />
      </View>

      <TouchableOpacity
        onPress={() =>
          createTask({
            projectId: id,
            name: 'New Task 4',
            status: 'todo',
            accumulatedTime: 0,
            id: Date.now().toString(),
          })
        }>
        <AppText>Добавить задачу</AppText>
      </TouchableOpacity>
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: {
    padding: 0,
  },
});
