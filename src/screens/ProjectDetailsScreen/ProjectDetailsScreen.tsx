import {FC, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import BottomSheet from '@gorhom/bottom-sheet';

import {Layout} from '@components/ui';
import {ProjectsStackParamList} from '@navigation/types';
import {
  CreateNewTaskSheet,
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

  const bottomSheetRef = useRef<BottomSheet>(null);

  if (!project) return null;

  return (
    <Layout style={styles.layout}>
      <ProjectDetailsHeader projectName={title} />

      <View
        style={{
          paddingHorizontal: 12,
          marginTop: 12,
          flex: 1,
        }}>
        <ProjectTasksList
          projectId={id}
          projectRate={project.rate}
          onAddTaskPress={() => bottomSheetRef.current?.snapToPosition('45%')}
        />
      </View>
      <CreateNewTaskSheet ref={bottomSheetRef} projectId={id} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: {
    padding: 0,
  },
});
