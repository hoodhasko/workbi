import {useProjectStore} from '@app/store';
import {AppText} from '@components/ui';
import {BASE_COLORS} from '@config/Constants';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
  ScrollView,
} from 'react-native';

const SECOND_ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 5;
const secondsArray = Array.from({length: 60}, (_, i) => i);

export const TimerScreen = () => {
  const {activeTask, updateActiveTaskTime, togglePause, stopTimer} =
    useProjectStore();

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (scrollViewRef.current && seconds >= 0) {
      const y = seconds * SECOND_ITEM_HEIGHT;

      scrollViewRef.current.scrollTo({
        y,
        animated: true,
      });
    }
  }, [seconds]);

  useFocusEffect(
    useCallback(() => {
      if (activeTask && !activeTask.isPaused) {
        const elapsed = Math.floor((Date.now() - activeTask.startedAt) / 1000);

        const totalSeconds = activeTask.accumulatedTime + elapsed;

        setMinutes(Math.floor(totalSeconds / 60));
        setSeconds(totalSeconds % 60);

        timerRef.current = setInterval(() => {
          setSeconds(seconds => {
            if (seconds === 59) {
              setMinutes(minutes => minutes + 1);
            }

            console.log(seconds + 1);
            return (seconds + 1) % 60;
          });
        }, 1000);
      }

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          // TODO: мб тут все же нужно обновлять время задачи updateActiveTaskTime(activeTask.elapsedTime + seconds);
        }
      };
    }, [activeTask]),
  );

  if (!activeTask) {
    return (
      <View style={styles.container}>
        <Text style={styles.noTaskText}>Нет активной задачи</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.taskName}>{activeTask.name}</Text>

      <View style={styles.timerContainer}>
        <View style={styles.minutesContainer}>
          <AppText style={styles.minutesText}>
            {minutes.toString().padStart(2, '0')}
          </AppText>
        </View>

        <Text style={styles.separator}>:</Text>

        <View style={styles.secondsContainer}>
          <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            contentContainerStyle={styles.scrollContent}
            // snapToInterval={SECOND_ITEM_HEIGHT}
            decelerationRate="fast">
            {secondsArray.map(sec => (
              <View key={sec} style={styles.secondItem}>
                <Text
                  style={[
                    styles.secondText,
                    sec === seconds && styles.activeSecondText,
                  ]}>
                  {sec.toString().padStart(2, '0')}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.centerLine} />
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.button, styles.pauseButton]}
          onPress={togglePause}>
          <Text style={styles.buttonText}>
            {activeTask.isPaused ? 'Продолжить' : 'Пауза'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.stopButton]}
          onPress={stopTimer}>
          <Text style={styles.buttonText}>Завершить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noTaskText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#6c757d',
  },
  taskName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#212529',
    maxWidth: '90%',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
    height: SECOND_ITEM_HEIGHT * VISIBLE_ITEMS,
  },
  minutesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: SECOND_ITEM_HEIGHT,
    width: 50,
  },
  minutesText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  separator: {
    height: SECOND_ITEM_HEIGHT,
    fontSize: 36,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: '#212529',
  },
  secondsContainer: {
    height: SECOND_ITEM_HEIGHT * VISIBLE_ITEMS,
    width: 70,
    overflow: 'hidden',
    position: 'relative',
  },
  scrollContent: {
    paddingTop: SECOND_ITEM_HEIGHT * 2,
    paddingBottom: SECOND_ITEM_HEIGHT * 2,
  },
  secondItem: {
    height: SECOND_ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondText: {
    fontSize: 30,
    fontWeight: '500',
    color: BASE_COLORS.ui.lightText,
  },
  activeSecondText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: BASE_COLORS.main.primary,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 20,
    marginTop: 20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    minWidth: 140,
    alignItems: 'center',
  },
  pauseButton: {
    backgroundColor: BASE_COLORS.main.warning,
  },
  stopButton: {
    backgroundColor: BASE_COLORS.main.error,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  centerLine: {
    backgroundColor: BASE_COLORS.main.primary20,
    borderRadius: 12,
    position: 'absolute',
    top: SECOND_ITEM_HEIGHT * 2,
    left: 0,
    right: 0,
    height: SECOND_ITEM_HEIGHT,
    zIndex: -1,
  },
});
