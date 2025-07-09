import {forwardRef, useImperativeHandle, useMemo, useRef} from 'react';
import {Keyboard, StyleSheet, TouchableOpacity} from 'react-native';
import BottomSheet, {
  BottomSheetFooter,
  BottomSheetProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

import {BASE_COLORS} from '@config/Constants';
import {AppText, CustomBottomSheetInput} from '@components/ui';

interface CreateNewProjectSheetProps
  extends Omit<BottomSheetProps, 'children'> {}

export const CreateNewProjectSheet = forwardRef<
  BottomSheet,
  CreateNewProjectSheetProps
>((props, ref) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['60%'], []);

  useImperativeHandle(ref, () => bottomSheetRef.current!, []);

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
              onPress={() => {
                Keyboard.dismiss();
                setTimeout(() => bottomSheetRef.current?.close(), 1000);
              }}
              style={{
                backgroundColor: BASE_COLORS.main.primary,
                padding: 12,
                borderRadius: 100,
                width: '100%',
                alignItems: 'center',
              }}>
              <AppText style={styles.addButtonText}>Добавить</AppText>
            </TouchableOpacity>
          </BottomSheetFooter>
        );
      }}
      {...props}>
      <BottomSheetView style={styles.contentContainer}>
        <CustomBottomSheetInput label="Название" />
        <CustomBottomSheetInput label="Описание" />
        <CustomBottomSheetInput label="Ставка" />
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
