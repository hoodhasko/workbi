import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {BASE_COLORS, Project} from '@config/Constants';
import {AppText} from '@components/ui';

interface ProjectCardProps {
  project: Project;
}

interface ProjectCardInfoItemProps {
  label: string;
  value: string;
}

const ProjectCardInfoItem: FC<ProjectCardInfoItemProps> = ({label, value}) => {
  return (
    <View style={styles.infoItem}>
      <AppText style={styles.label}>{label}: </AppText>
      <AppText style={styles.value}>{value}</AppText>
    </View>
  );
};

export const ProjectCard: FC<ProjectCardProps> = ({project}) => {
  return (
    <View style={styles.card}>
      <AppText style={styles.title}>{project.name}</AppText>

      <AppText style={styles.description} numberOfLines={2}>
        {
          'Описание проекта какое-то возможно нужно или нет непонятно, но пока что оставлю для наполненности карточки '
        }
      </AppText>

      <View style={styles.infoContainer}>
        <ProjectCardInfoItem
          label="Задач"
          value={project.tasks.length.toString()}
        />
        <ProjectCardInfoItem label="Ставка" value={project.rate.toString()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BASE_COLORS.ui.borders,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#2E3234',
  },
  description: {
    color: BASE_COLORS.main.secondary,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: BASE_COLORS.ui.lightText,
  },
  value: {
    fontWeight: '500',
  },
});
