import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Analytics from 'react-native-vector-icons/MaterialCommunityIcons';
import Setting from 'react-native-vector-icons/Ionicons';

const OptionScreen = () => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['48%', '100%'], []);

  const snapToIndex = (index) => {
    bottomSheetRef.current?.snapToIndex(index);
  };
  const handleClosing = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop appearsOnIndex={1} disappearsOnIndex={-1} {...props} />,
    []
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.buttons}>
        <Button title='Snap' onPress={() => snapToIndex(0)} />
      </View>
      <BottomSheet
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        backgroundStyle={{ borderRadius: 25 }}
        backdropComponent={renderBackdrop}
        index={0}
        handleIndicatorStyle={styles.IndicatorStyle}
        handleClosing={handleClosing} 
      >
        <View style={styles.mainContainer}>
          <View style={styles.options}>
            <Analytics name="google-analytics" color="#404040" size={22} />
            <Text style={styles.optionsText}>Analytics</Text>
          </View>
          <View style={styles.options}>
            <Setting name="settings-outline" color="#404040" size={22} />
            <Text style={styles.optionsText}>Settings</Text>
          </View>
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttons: {
    marginTop: 100
  },
  IndicatorStyle: {
    backgroundColor: "#DDDDDD",
    width: 33,
    height: 3.2
  },
  mainContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  options: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  optionsText: {
    marginLeft: 15,
    color: '#404040',
    fontSize: 17,
  },
});

export default OptionScreen;
