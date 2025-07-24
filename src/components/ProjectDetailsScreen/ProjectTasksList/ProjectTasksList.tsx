import {FC, useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  View,
} from 'react-native';

import {AppText, MainButton} from '@components/ui';
import {BASE_COLORS} from '@config/Constants';
import {TaskCard} from '../TaskCard';
import {Task, useProjectStore} from '@app/store';

interface ProjectTasksListProps {
  projectId: string;
  projectRate: number;
  onAddTaskPress: () => void;
  scrollViewProps?: ScrollViewProps;
}
export const ProjectTasksList: FC<ProjectTasksListProps> = ({
  projectId,
  projectRate,
  onAddTaskPress,
  scrollViewProps,
}) => {
  const [showBottomButton, setShowBottomButton] = useState(false);
  const [tasks, setTasks] = useState<Array<Task>>([]);

  const getProjectTasks = useProjectStore(state => state.getProjectTasks);

  useEffect(() => {
    setTasks(getProjectTasks(projectId));
  }, [projectId, getProjectTasks]);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnimFloat = useRef(new Animated.Value(1)).current;

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollViewProps?.onScroll?.(event);

      const y = event.nativeEvent.contentOffset.y;
      const contentHeight = event.nativeEvent.contentSize.height;
      const layoutHeight = event.nativeEvent.layoutMeasurement.height;

      // Расстояние до конца списка
      const distanceToEnd = contentHeight - (y + layoutHeight);

      // Порог для переключения кнопок (например, 100px до конца)
      const threshold = 20;

      if (distanceToEnd < threshold) {
        // Показываем нижнюю кнопку с анимацией
        setShowBottomButton(true);

        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnimFloat, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
        ]).start();
      } else if (distanceToEnd >= threshold) {
        setShowBottomButton(false);

        // Скрываем нижнюю кнопку с анимацией
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnimFloat, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
        ]).start();
      }
    },
    [],
  );

  return (
    <>
      <View style={styles.listHeaderContainer}>
        <AppText style={styles.listName}>Задачи</AppText>

        <AppText>Все задачи ↓</AppText>
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        overScrollMode="never"
        {...scrollViewProps}
        onScroll={handleScroll}>
        {tasks.map(task => {
          return <TaskCard task={task} projectRate={projectRate} />;
        })}
      </ScrollView>

      <Animated.View
        pointerEvents="auto"
        style={[
          {
            position: 'absolute',
            bottom: 12,
            right: 12,
            opacity: 0.5,
          },
          {
            opacity: fadeAnimFloat,
          },
        ]}>
        <MainButton
          text="Новая задача"
          onPress={onAddTaskPress}
          style={{
            borderRadius: 9999,
          }}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.bottomButton,

          {
            pointerEvents: showBottomButton ? 'auto' : 'none',
            opacity: fadeAnim,
          },
        ]}>
        <MainButton
          pointerEvents="auto"
          text="Новая задача"
          onPress={onAddTaskPress}
          style={[
            {
              borderRadius: 0,
              height: 50,
            },
          ]}
          fw
        />
      </Animated.View>
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
    paddingTop: 4,
    paddingBottom: 12 + 50,
    gap: 8,
    flexGrow: 1,
  },
  bottomButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
