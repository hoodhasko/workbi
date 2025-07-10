import {FC} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from '@react-native-vector-icons/octicons';

import {AppText} from '@components/ui';
import {BASE_COLORS} from '@config/Constants';
import {TaskCardInfoItem} from './TaskCardInfoItem';
import {Task, useProjectStore} from '@app/store';

interface TaskCardProps {
  task: Task;
  projectRate: number;
}

export const TaskCard: FC<TaskCardProps> = ({task, projectRate}) => {
  const startTask = useProjectStore(state => state.startTask);

  return (
    <View style={styles.card}>
      <View>
        <AppText style={styles.taskName}>{task.name}</AppText>

        <View style={styles.taskInfoContainer}>
          <TaskCardInfoItem label="Статус" value={task.status} />

          <TaskCardInfoItem
            label="Ставка"
            value={`${task.rate || projectRate} руб`}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => startTask(task.id)}
        style={styles.playButton}>
        <Icon name="play" size={24} color={BASE_COLORS.main.accent} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: BASE_COLORS.main.white,
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BASE_COLORS.ui.borders,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: BASE_COLORS.main.primary,
  },
  taskInfoContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  playButton: {
    alignSelf: 'flex-end',
    padding: 6,
    justifyContent: 'center',
  },
});
