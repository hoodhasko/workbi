import {FC} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from '@react-native-vector-icons/octicons';

import {AppText} from '@components/ui';
import {BASE_COLORS} from '@config/Constants';

interface ProjectDetailsHeaderProps {
  projectName: string;
}

export const ProjectDetailsHeader: FC<ProjectDetailsHeaderProps> = ({
  projectName,
}) => {
  return (
    <View style={styles.header}>
      <AppText style={styles.headerText}>{projectName}</AppText>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="pencil" size={18} color={BASE_COLORS.main.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Icon name="trash" size={18} color={BASE_COLORS.main.error} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: BASE_COLORS.main.white,
    paddingHorizontal: 12,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  actionsContainer: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  actionButton: {
    alignSelf: 'flex-start',
    padding: 6,
    borderRadius: 6,
  },
});
