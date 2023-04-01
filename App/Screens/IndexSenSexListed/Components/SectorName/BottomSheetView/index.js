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
import { connect, useSelector, } from 'react-redux';
import DataLoder from '../../../../../Components/Lodder/DataLoder';
import Entypo from 'react-native-vector-icons/Entypo';
import IndexItem from '../../../Components/IndexItem';



const BottomSheetView = ({
  loder1,
  bottomSheetRef,

}) => {
  

  const snapPoints = useMemo(() => ['10%', '20%', '90%'], []);
  //selector data

  const { SectorLayerTwo } = useSelector(state => state.SectorLayerTwo)
  
  //  console.log(SectorLayerTwo,'SectorLayerTwo');

  // renders
 

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    // console.log('handleSheetChanges', index);
  }, []);
 

  return (
    <>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
       
        onChange={handleSheetChanges}
      >
        
        {loder1?<DataLoder/>:(
        <>
        <View style={styles.titilview}>
           <TouchableOpacity
           onPress={()=>{
            bottomSheetRef.current.close()
           }}
            style={{width:20, height:20, justifyContent:'center',
        alignItems:'center', backgroundColor:'red',
        borderRadius:10}}>

        <Entypo name="cross" size={20} color="white" />
        </TouchableOpacity>
        </View>
       
          
            <BottomSheetFlatList
            
            
            data={SectorLayerTwo}
            
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, i}) => {
              return (
                <IndexItem
               
                title={item?.co_name.length > 18 ? `${item?.co_name.substring(0, 18)}...` : item?.co_name}

                price={item?.Exchange_NSE }
                color={'ddd'}
                volume={item?.Exchange_BSE}
                volume1={"Exch BSE"}
                
                senSExType={item?.sect_name.length > 18 ? `${item?.sect_name.substring(0, 18)}...` : item?.sect_name}
                percent={"Exch NSE" }
                date={''}
                coCode=''
                ListEmptyComponent={() => {
                    return <NoDataViewFlatList />;
                  }}
              />
              );
            }}
           
          />  
        </>
        )}
      </BottomSheet>


    </>
  );
};

export default BottomSheetView;

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
    width: "100%",
    height:30,
    justifyContent:'center',
    alignItems:'flex-end',
    paddingRight:20
  },
  flatItem: { width: '100%', height: 60, marginVertical: 1, flexDirection: "row", marginVertical: 5 },
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
