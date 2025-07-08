import {FC} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {ProjectCard} from '@components/ProjectsScreen';
import {Layout} from '@components/ui';
import {TabStackParamList} from '@navigation/types';
import {PROJECTS_DATA} from '@config/Constants';

export const ProjectsScreen: FC = () => {
  const navigation = useNavigation<NavigationProp<TabStackParamList>>();

  const goToProjectDetails = (id: number, title: string) => {
    console.log('first');
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
      <ScrollView contentContainerStyle={styles.container}>
        {PROJECTS_DATA.map(project => (
          <TouchableOpacity
            onPress={() => goToProjectDetails(project.id, project.name)}
            key={project.id}>
            <ProjectCard project={project} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add project</Text>
      </TouchableOpacity>
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
});
