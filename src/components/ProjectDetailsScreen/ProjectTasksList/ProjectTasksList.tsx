import {FC} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {AppText} from '@components/ui';
import {BASE_COLORS, Task} from '@config/Constants';
import {TaskCard} from '../TaskCard';

interface ProjectTasksListProps {
  tasks: Task[];
  projectRate: number;
}

export const ProjectTasksList: FC<ProjectTasksListProps> = ({
  tasks,
  projectRate,
}) => {
  return (
    <>
      <View style={styles.listHeaderContainer}>
        <AppText style={styles.listName}>Задачи</AppText>

        <AppText>Все задачи ↓</AppText>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {tasks.map(task => {
          return (
            <TaskCard key={task.id} task={task} projectRate={projectRate} />
          );
        })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  listHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listName: {
    color: BASE_COLORS.main.secondary,
    fontWeight: '500',
    fontSize: 16,
  },
  container: {
    paddingTop: 8,
    gap: 8,
  },
});
