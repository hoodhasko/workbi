import {FC, useRef} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import BottomSheet, {TouchableWithoutFeedback} from '@gorhom/bottom-sheet';

import {CreateNewProjectSheet, ProjectCard} from '@components/ProjectsScreen';
import {Layout} from '@components/ui';
import {TabStackParamList} from '@navigation/types';
import {useProjectStore} from '@app/store';

export const ProjectsScreen: FC = () => {
  const projects = useProjectStore(state => state.projects);

  const navigation = useNavigation<NavigationProp<TabStackParamList>>();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const goToProjectDetails = (id: number, title: string) => {
    navigation.navigate('ProjectsStack', {
      screen: 'ProjectDetailsScreen',
      params: {
        id,
        title,
      },
    });
  };

  return (
    <Layout style={styles.layout}>
      <TouchableWithoutFeedback onPress={() => bottomSheetRef.current?.close()}>
        <ScrollView
          contentContainerStyle={styles.container}
          onScrollBeginDrag={() => bottomSheetRef.current?.close()}>
          {projects.map(project => (
            <TouchableOpacity
              onPress={() => goToProjectDetails(project.id, project.name)}
              key={project.id}>
              <ProjectCard project={project} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </TouchableWithoutFeedback>

      <TouchableOpacity
        onPress={() => bottomSheetRef.current?.snapToPosition('60%')}
        style={styles.addButton}>
        <Text style={styles.addButtonText}>Добавить проект</Text>
      </TouchableOpacity>

      <CreateNewProjectSheet ref={bottomSheetRef} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: {
    paddingHorizontal: 8,
    paddingVertical: 0,
  },
  container: {
    gap: 8,
    paddingVertical: 12,
    flexGrow: 1,
  },
  addButton: {
    position: 'absolute',
    backgroundColor: '#2E3234',
    padding: 12,
    borderRadius: 100,
    alignItems: 'center',
    bottom: 12,
    right: 12,
  },
  addButtonText: {
    color: 'white',
  },
  contentContainer: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    gap: 8,
  },
});
