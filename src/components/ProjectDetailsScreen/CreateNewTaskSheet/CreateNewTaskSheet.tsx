import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import BottomSheet, {
  BottomSheetFooter,
  BottomSheetProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

import {AppText, CustomBottomSheetInput} from '@components/ui';
import {useProjectStore} from '@app/store';
import {BASE_COLORS} from '@config/Constants';

interface CreateNewTaskSheetProps extends Omit<BottomSheetProps, 'children'> {
  projectId: string;
}

export const CreateNewTaskSheet = forwardRef<
  BottomSheet,
  CreateNewTaskSheetProps
>(({projectId, ...props}, ref) => {
  const [name, setName] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const createTask = useProjectStore(state => state.createTask);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['45%'], []);

  useImperativeHandle(ref, () => bottomSheetRef.current!, []);

  const addProjectHandler = () => {
    setLoading(true);

    Keyboard.dismiss();

    setTimeout(() => {
      createTask({
        id: Date.now().toString(),
        name,
        rate: Number(rate),
        accumulatedTime: 0,
        projectId: projectId,
        status: 'active',
      });

      setLoading(false);

      bottomSheetRef.current?.close();

      setName('');
      setRate('');
    }, 1000);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      keyboardBlurBehavior="restore"
      keyboardBehavior="fillParent"
      android_keyboardInputMode="adjustResize"
      index={-1}
      footerComponent={props => {
        return (
          <BottomSheetFooter
            {...props}
            bottomInset={12}
            style={{paddingHorizontal: 12}}>
            <TouchableOpacity
              onPress={addProjectHandler}
              style={{
                backgroundColor: BASE_COLORS.main.primary,
                padding: 12,
                borderRadius: 100,
                width: '100%',
                alignItems: 'center',
              }}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <AppText style={styles.addButtonText}>Добавить</AppText>
              )}
            </TouchableOpacity>
          </BottomSheetFooter>
        );
      }}
      {...props}>
      <BottomSheetView style={styles.contentContainer}>
        <CustomBottomSheetInput
          label="Название"
          value={name}
          onChangeText={setName}
        />
        <CustomBottomSheetInput
          label="Ставка"
          value={rate}
          onChangeText={setRate}
          inputMode="numeric"
        />
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
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
