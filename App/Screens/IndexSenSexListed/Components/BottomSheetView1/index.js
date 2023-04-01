import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native';
import React, { useMemo, useRef, useEffect, useState, useCallback } from 'react';

import BottomSheet, {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetScrollView,


} from '@gorhom/bottom-sheet';


import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const BottomSheetView1 = ({
  data,
  onPress,
  bottomSheetRef1,

}) => {
 

  const snapPoints = useMemo(() => ['10%', '20%', '85%'], []);
  //selector data


 
    // console.log(SeletedG,"value");

  // renders
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={1}
        appearsOnIndex={2}
      />
    ),
    []
  )


  // callbacks
  const handleSheetChanges = useCallback((index) => {
    // console.log('handleSheetChanges', index);
  }, []);
 

  return (
    <>

      <BottomSheet
        ref={bottomSheetRef1}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        onChange={handleSheetChanges}
        enabledInnerScrolling={true}
        enabledContentGestureInteraction={false}
        
        animateOnMount
        animatedPosition={true}
      >
        
  
         
         <BottomSheetFlatList
            
         
            data={data}
            
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              // console.log(index)
              return (
               <View style={styles.flatItem}>
                  <View style={styles.flatItemLeft}>
                   

                    <Text style={{ color: 'black', marginLeft: 8 }}>{item.Group}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                       onPress(index);
                     
                     
                    }}
                    style={styles.flatItemRight}>
                    {item.isChecked ? (
                      <Ionicons name="checkmark-circle-outline" size={24} color="#098C26" />) : (
                      <FontAwesome name="circle-thin" size={24} color="#686868" />
                    )}
                  </TouchableOpacity>
                </View>
              );
            }}
           
          /> 
       
      </BottomSheet>


    </>
  );
};

export default BottomSheetView1;

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
    width: "100%", paddingHorizontal: 10,
    paddingVertical: 10,

    flexDirection: "row",
    justifyContent: 'space-between'
  },
  flatItem: { width: '100%', height: 40, marginVertical: 1, flexDirection: "row", marginVertical: 5 },
  flatItemLeft: {
    width: '90%', height: "100%", flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10
  },
  flatItemRight: {
    width: '10%', height: "100%", justifyContent: "center",
    paddingRight: 10
  }
});
