import {FC} from 'react';
import {StyleSheet, View} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {Layout} from '@components/ui';
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

  if (!project) return null;

  return (
    <Layout style={styles.layout}>
      <ProjectDetailsHeader projectName={title} />

      <View style={{paddingHorizontal: 12, marginTop: 20}}>
        <ProjectTasksList tasks={project.tasks} projectRate={project.rate} />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: {
    padding: 0,
  },
});
