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

import {BASE_COLORS} from '@config/Constants';
import {AppText, CustomBottomSheetInput} from '@components/ui';
import {Project, useProjectStore} from '@app/store';

interface CreateNewProjectSheetProps
  extends Omit<BottomSheetProps, 'children'> {}

export const CreateNewProjectSheet = forwardRef<
  BottomSheet,
  CreateNewProjectSheetProps
>((props, ref) => {
  const [name, setName] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const addProject = useProjectStore(state => state.addProject);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['60%'], []);

  useImperativeHandle(ref, () => bottomSheetRef.current!, []);

  const addProjectHandler = () => {
    setLoading(true);

    Keyboard.dismiss();

    setTimeout(() => {
      addProject({
        id: Date.now(),
        name,
        description,
        rate: Number(rate),
        tasks: [],
      });

      setLoading(false);

      bottomSheetRef.current?.close();

      setName('');
      setRate('');
      setDescription('');
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
          label="Описание"
          value={description}
          onChangeText={setDescription}
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
