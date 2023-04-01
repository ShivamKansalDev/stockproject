import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
import React, {useMemo, useRef, useEffect, useState, useCallback} from 'react';

import BottomSheet, {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import {
  ALL_LIST,
  IS_SELECTED,
  FILTER_LIST,
} from '../../ActionType/BottoSheetDataList';

const BottomSheetView2 = ({
  bottomSheetRef,
  counntData,
  data,
  onPress,
  onPress1,
}) => {
  const dispatch = useDispatch();
  //   console.log(data,'data')

  const snapPoints = useMemo(() => ['10%', '50%', '80%'], []);
  //selector data

  // const { BottoSheetDataListAll } = useSelector(state => state.BottoSheetDataList)
  // const counntData = BottoSheetDataListAll.filter(item => item.isChecked)
  //  console.log(counntData.length);
  const [valid, setValid] = useState(true);
  // renders
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={1}
        appearsOnIndex={2}
      />
    ),
    [],
  );

  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}>
        {/* <View style={styles.titilview}>
          <Text style={{ color:counntData.length == 4 ? 'black':"red" }}>More Data Points {counntData.length} of 4</Text>
          <TouchableOpacity
            onPress={() => {
              onPress1()
              // dispatch({
              //   type: FILTER_LIST
              // })
              // bottomSheetRef.current.close()
            }}
            style={{
              width: 30, height: 30,
              justifyContent: "center",
              alignItems: 'center',
            
              borderRadius: 15,
              backgroundColor: "#0F9764"
            }}
            >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Filter</Text>
          </TouchableOpacity>
        </View> */}

        <BottomSheetScrollView style={{flex: 1, padding: 10}}>
          <Text>{data}</Text>
          <View style={{height: 100}}></View>
        </BottomSheetScrollView>
      </BottomSheet>
    </>
  );
};

export default BottomSheetView2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  titilview: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flatItem: {
    width: '100%',
    height: 60,
    marginVertical: 1,
    flexDirection: 'row',
    marginVertical: 5,
  },
  flatItemLeft: {
    width: '90%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  flatItemRight: {
    width: '10%',
    height: '100%',
    justifyContent: 'center',
    paddingRight: 10,
  },
});
