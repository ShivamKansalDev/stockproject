


import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect,useState, } from 'react'
import { connect, useSelector } from 'react-redux'
import { getInternationalIndex } from '../../../../Action/ListedCompanyList'
import IndexItem from '../IndexItem'
import NoDataViewFlatList from '../../../../Components/NoDataViewFlatList'

import moment from 'moment';
import DataLoder from '../../../../Components/Lodder/DataLoder'
const InternationalIndex = ({ getInternationalIndex }) => {
  const { InternationalIndex } = useSelector(state => state.InternationalIndex)
  const [loder, setloder] = useState(true)
  //  console.log(InternationalIndex,'InternationalIndex')
  useEffect(() => {
    getInternationalIndex(setloder)


  }, [])

  return (
    <>
      <View style={{ height: 20 }}></View>
      {loder?<DataLoder/>:(
      
      <FlatList
        contentContainerStyle={{ paddingBottom: 230 }}
        showsVerticalScrollIndicator={false}
        data={InternationalIndex}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => {
          
          return (
            <IndexItem  title={item?.indexname.length >18?`${item?.indexname.substring(0, 18)}...`:item?.indexname}
            price={Math.abs(Number(item?.Chg.toFixed(2)))}
            color={item?.PChg>0?"green":"red"}
            // volume={Math.abs(Number(item?.close.toFixed(2)))}
            volume={item?.close.toFixed(2)}
            // volume1={Math.abs(Number(item?.PrevClose.toFixed(2)))}
            volume1={item?.PrevClose.toFixed(2)}
            senSExType={item?.Country}
           
            percent={item?.PChg>0?`+${(Number(item?.PChg.toFixed(2)))}%`:`${(Number(item?.PChg.toFixed(2)))}%`}
            date={moment(item?.date).format('Do MMM')}
               />
          )
        }}


        ListEmptyComponent={() => {
          return <NoDataViewFlatList />;
        }}
      />
      )}
    </>
  )
}

export default connect(null, { getInternationalIndex })(InternationalIndex)

const styles = StyleSheet.create({})