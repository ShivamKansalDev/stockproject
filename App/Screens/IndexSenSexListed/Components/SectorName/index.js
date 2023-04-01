

import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect,useState,useRef } from 'react'
import { connect, useSelector } from 'react-redux'
import { getSector } from '../../../../Action/ListedCompanyList'

import NoDataViewFlatList from '../../../../Components/NoDataViewFlatList'


import DataLoder from '../../../../Components/Lodder/DataLoder'
import BottomSheetView from './BottomSheetView'
import { getSectorNameLawerTwo } from '../../../../Action/ListedCompanyList/LayerTwo'




const SectorName = ({ getSector,getSectorNameLawerTwo }) => {
  const { Sector } = useSelector(state => state.Sector)
  const [loder, setloder] = useState(true)
  const [loder1, setloder1] = useState(true)
  //  console.log(Sector,'Sector')
  useEffect(() => {
    getSector(setloder)


  }, [])
const bottomSheetRef=useRef()
  return (
    <>
      <View style={{ height: 20 }}></View>
      {loder?<DataLoder/>:(
      
      <FlatList
        contentContainerStyle={{ paddingBottom: 230 }}
        showsVerticalScrollIndicator={false}
        data={Sector}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => {
          
          return (
            <TouchableOpacity onPress={()=>{
              setloder1(true)
              getSectorNameLawerTwo(setloder1,item.sect_code)
              bottomSheetRef.current.snapToIndex(2)
            }}>
            <Text  style={{color:"black", marginLeft:20, marginVertical:10,
            textDecorationLine: 'underline'}}>{item.sect_name}</Text>
            </TouchableOpacity>
          )
        }}


        ListEmptyComponent={() => {
          return <NoDataViewFlatList />;
        }}
      />
      )}
      <BottomSheetView  
      bottomSheetRef={bottomSheetRef}
      loder1={loder1}
      />
    </>
  )
}

export default connect(null, { getSector,
  getSectorNameLawerTwo })(SectorName)

const styles = StyleSheet.create({})