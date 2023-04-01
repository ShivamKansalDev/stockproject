



// import { StyleSheet,  FlatList, View } from 'react-native'
// import React, { useState, useEffect } from 'react'
// // import IndexItem from '../IndexItem'
// // import BseAndNse from './BseAndNse'
// I
// // import { getTopLoser } from '../../../../Action/ListedCompanyList'
// import { connect, useDispatch, useSelector } from 'react-redux'


// // import NoDataViewFlatList from '../../../../Components/NoDataViewFlatList'

// import moment from 'moment';
// // import DataLoder from '../../../../Components/Lodder/DataLoder'


//  import {getBestPerformingIPO} from '../../Action/Unlisted'


// const BestPerformingIPO = ({ getBestPerformingIPO }) => {

//   const dispatch = useDispatch()
//   const { BestPerformingIPO } = useSelector(state => state.BestPerformingIPO)

//   const [loder, setloder] = useState(true)
//   const [bseAndNse, setbseAndNsee] = useState('BSE')

//   // 
// console.log(BestPerformingIPO,'BestPerformingIPO');


//   const bse = () => {
    
//     getTopLoser(setloder, 'bse')
//     setbseAndNsee('BSE')
//   }
//   const nse = () => {
   
//     getTopLoser(setloder, 'nse')
//     setbseAndNsee('NSE')
//   }
//   useEffect(() => {
//     // const bse/bse_sensex/week/10
//     getTopLoser(setloder, 'bse', 'bse_sensex', 'week')
//   }, [])


// useEffect(() => {
//   getBestPerformingIPO(setloder,'bse')
// }, [])

 

  
 
//   return (
//     <>
//       <View style={{ height: 20 }}></View>

//       <>
//         {loder ? <DataLoder /> : (
//           <>
//             <View style={styles.container}>

//               <View style={{ width: '70%', height: '100%' }}>
               

//               </View>
//               <View style={{ width: '30%', height: '100%', alignItems: 'flex-end' }}>
//                 {/* <BseAndNse bseAndNse={bseAndNse}
//                   bse={bse}
//                   nse={nse} /> */}
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

//             {/* <FlatList
//               contentContainerStyle={{ paddingBottom: 230 }}
//               showsVerticalScrollIndicator={false}
//               data={TopLoser}
//               keyExtractor={(item, i) => i.toString()}
//               renderItem={({ item }) => {
                
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
//             /> */}
//           </>

//         )}
        


//       </>

//     </>
//   )
// }

// export default connect(null, { getBestPerformingIPO })(BestPerformingIPO)

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

const getBestPerformingIPO = () => {
  return (
    <View>
      <Text>getBestPerformingIPO</Text>
    </View>
  )
}

export default getBestPerformingIPO

const styles = StyleSheet.create({})