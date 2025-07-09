import {FC} from 'react';
import {StyleSheet, View} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {Layout} from '@components/ui';
import {PROJECTS_DATA} from '@config/Constants';
import {ProjectsStackParamList} from '@navigation/types';
import {
  ProjectDetailsHeader,
  ProjectTasksList,
} from '@components/ProjectDetailsScreen';

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
