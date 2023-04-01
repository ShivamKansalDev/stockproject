



// import { StyleSheet, Text, TouchableOpacity, FlatList, View } from 'react-native'
// import React, { useState, useRef, useEffect } from 'react'
// import IndexItem from '../IndexItem'
// import BseAndNse from '../BseAndNse'

// import { getTopLoser } from '../../../../Action/ListedCompanyList'
// import { connect, useDispatch, useSelector } from 'react-redux'


// import NoDataViewFlatList from '../../../../Components/NoDataViewFlatList'

// import moment from 'moment';
// import DataLoder from '../../../../Components/Lodder/DataLoder'

// import BottomSheetView from '../BottomSheetView'
// import BottomSheetView1 from '../BottomSheetView1'
// import {
//   TOP_LOSER_ALL_DAY_TYPE, TOP_LOSER_ALL_GROUP_NAME,
//   TOP_LOSER_ALL_DAY_IS_SELETED, TOP_LOSER_ALL_GROUP_IS_SELETED
// } from '../../../../ActionType/ListedCompanyList/TopLoser'
// import LeftDropDownButton from '../LeftDropDownButton'
// import GroupTaggleButton from '../GroupTaggleButton'




// const OutPerformer = ({ getTopLoser }) => {

//   const dispatch = useDispatch()
//   const { TopLoserDayTypeSeleted } = useSelector(state => state.TopLoserDayType)

//   const { GroupMasterForDomesticIndex } = useSelector(state => state.GroupMasterForDomesticIndex)
//   const { TopLoserGroupTypeSeleted } = useSelector(state => state.TopLoserGroupType)
//   const { TopLoser } = useSelector(state => state.TopLoser)
//   const [loder, setloder] = useState(true)


//   const [bseAndNse, setbseAndNsee] = useState('BSE')

//   // 


//   const nn = TopLoserDayTypeSeleted.filter(item => item.isChecked)
//   const nn1 = TopLoserGroupTypeSeleted.filter(item => item.isChecked)

//   const bse = () => {
//     const group = nn1[0].Group
//     // const exchange=nn1[0].exchange
//     const type = nn[0].value
//     console.log(group, 'group', type);
//     getTopLoser(setloder, 'bse', group, type, nn1)
//     setbseAndNsee('BSE')
//   }
//   const nse = () => {
//     const group = nn1[0].Group
//     const exchange = nn1[0].exchange
//     const type = nn[0].value
//     // console.log(group,'group');
//     getTopLoser(setloder, 'nse', group, type)
//     setbseAndNsee('NSE')
//   }
//   useEffect(() => {
//     // const bse/bse_sensex/week/10
//     getTopLoser(setloder, 'bse', 'bse_sensex', 'week')
//   }, [])


//   const bottomSheetRef = useRef(null)
//   const bottomSheetRef1 = useRef(null)
//   useEffect(() => {
//     dispatch({
//       type: TOP_LOSER_ALL_DAY_TYPE
//     })

//   }, [])
//   useEffect(() => {
//     dispatch({
//       type: TOP_LOSER_ALL_GROUP_NAME,
//       data: GroupMasterForDomesticIndex
//     })
//   }, [])

//   const getDataType = (id) => {
//     dispatch({
//       type: TOP_LOSER_ALL_DAY_IS_SELETED,
//       payload: {
//         id: id
//       }
//     })
//     bottomSheetRef.current.close()
//   }
//   const getDataType1 = (id) => {
//     dispatch({
//       type: TOP_LOSER_ALL_GROUP_IS_SELETED,
//       payload: {
//         id: id
//       }
//     })
//     bottomSheetRef1.current.close()
//   }
//   return (
//     <>
//       <View style={{ height: 20 }}></View>

//       <>
//         {loder ? <DataLoder /> : (
//           <>
//             <View style={styles.container}>

//               <View style={{ width: '70%', height: '100%' }}>
//                 <LeftDropDownButton
//                   onPress={() => {
//                     bottomSheetRef.current.snapToIndex(2)
//                   }}
//                   value={nn[0]?.name}
//                 />


//               </View>
//               <View style={{ width: '30%', height: '100%', alignItems: 'flex-end' }}>
//                 <BseAndNse bseAndNse={bseAndNse}
//                   bse={bse}
//                   nse={nse} />
//               </View>
//             </View>
//             <View style={styles.container}>
//               <GroupTaggleButton
//                 onPress={() => {
//                   bottomSheetRef1.current.snapToIndex(2)
//                 }}
//                 value={nn1[0]?.Group}
//               />

//             </View>

//             <FlatList
//               contentContainerStyle={{ paddingBottom: 230 }}
//               showsVerticalScrollIndicator={false}
//               data={TopLoser}
//               keyExtractor={(item, i) => i.toString()}
//               renderItem={({ item }) => {
//                 //  console.log(item?.close_price)
//                 return (
//                   <IndexItem

//                     title={item?.co_name.length > 18 ? `${item?.co_name.substring(0, 18)}...` : item?.co_name}
//                     price={Math.abs(Number(item?.netchg.toFixed(2)))}
//                     color={item?.perchg > 0 ? "green" : "red"}
//                     volume={item.close_price ? item.close_price : item.Close_price}
//                     volume1={item?.vol_traded}
//                     senSExType={`${item?.stk_exchng}:`}

//                     percent={item?.perchg > 0 ? `+${(Number(item?.perchg.toFixed(2)))}%` : `${(Number(item?.perchg.toFixed(2)))}%`}
//                     date={item?.Upd_Time ? moment(item?.Upd_Time).format('Do MMM, h:mm') : moment(item?.Upd_Time).format('Do MMM, h:mm')}
//                   />
//                 )
//               }}


//               ListEmptyComponent={() => {
//                 return <NoDataViewFlatList />;
//               }}
//             />
//           </>

//         )}
//         <BottomSheetView
//           data={TopLoserDayTypeSeleted}
//           onPress={getDataType}
//           bottomSheetRef={bottomSheetRef}
//         />
//         <BottomSheetView1
//           data={TopLoserGroupTypeSeleted}
//           onPress={getDataType1}
//           bottomSheetRef1={bottomSheetRef1}
//         />


//       </>

//     </>
//   )
// }

// export default connect(null, { getTopLoser })(OutPerformer)

// const styles = StyleSheet.create({
//   seletexBox: {
//     width: 100, height: 40, backgroundColor: '#EBEBEB',
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.32,
//     shadowRadius: 5.46,
//     elevation: 9,
//     borderRadius: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 7
//   },
//   container: {
//     width: "100%",
//     paddingRight: 10,
//     paddingLeft: 10,
//     flexDirection: 'row',
//     paddingBottom: 10
//   }
// })
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const OutPerformer = () => {
  return (
    <View>
      <Text>OutPerformer</Text>
    </View>
  )
}

export default OutPerformer

const styles = StyleSheet.create({})