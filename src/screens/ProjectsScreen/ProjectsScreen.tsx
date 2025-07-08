import {ProjectCard} from '@components/ProjectsScreen';
import {PROJECTS_DATA} from '@config/Constants';
import {ProjectsStackParamList, TabStackParamList} from '@navigation/types';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {FC} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export const ProjectsScreen: FC = () => {
  const navigation = useNavigation<NavigationProp<TabStackParamList>>();

  const goToProjectDetails = () => {
    console.log('first');
    navigation.navigate('ProjectsStack', {
      screen: 'ProjectDetailsScreen',
    });
  };

  return (
    <View style={styles.main}>
      <ScrollView contentContainerStyle={styles.container}>
        {PROJECTS_DATA.map(project => (
          <TouchableOpacity onPress={goToProjectDetails} key={project.id}>
            <ProjectCard project={project} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add project</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingBottom: 12,
    paddingHorizontal: 8,
    gap: 12,
    backgroundColor: '#F8F9FA',
  },
  container: {
    gap: 8,
    paddingTop: 12,
    flexGrow: 1,
  },
  addButton: {
    position: 'absolute',
    backgroundColor: '#2E3234',
    padding: 12,
    borderRadius: 100,
    alignItems: 'center',
    // alignSelf: 'center',
    bottom: 12,
    right: 12,
  },
  addButtonText: {
    color: 'white',
  },
});
