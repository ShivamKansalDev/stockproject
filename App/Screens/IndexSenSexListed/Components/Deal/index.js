


import { StyleSheet, Text, TouchableOpacity, FlatList, View } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import IndexItem from '../IndexItem'
import BseAndNse from '../BseAndNse'

import { getDeal } from '../../../../Action/ListedCompanyList'
import { connect, useSelector, useDispatch } from 'react-redux'


import NoDataViewFlatList from '../../../../Components/NoDataViewFlatList'

import moment from 'moment';
import DataLoder from '../../../../Components/Lodder/DataLoder'

import Octicons from 'react-native-vector-icons/Octicons';
import BottomSheetView from '../BottomSheetView'
import { DEAL_ALL_LIST, DEAL_IS_SELTED } from '../../../../ActionType/DealSeleted'
import { getDealtWO } from '../../../../Action/ListedCompanyListLawer2'




const Deal = ({ getDeal, getDealtWO }) => {
    const dispatch = useDispatch()
    const { Deal } = useSelector(state => state.Deal)

    const { seleted } = useSelector(state => state.DealSeleted)

    const [loder, setloder] = useState(true)

    const nn = seleted.filter(item => item.isChecked)
    //  console.log(nn);
    const [bseAndNse, setbseAndNsee] = useState('BSE')

    // console.log(Deal,'Deal')

    const bse = () => {

        setbseAndNsee('BSE')
        getDealtWO(setloder, 'bse', 'bluk')
    }
    const nse = () => {
        setbseAndNsee('NSE')
        getDealtWO(setloder, 'nse', 'block')
    }
    useEffect(() => {
        getDeal(setloder)
    }, [])


    const bottomSheetRef = useRef(null)
    useEffect(() => {
        dispatch({
            type: DEAL_ALL_LIST
        })

    }, [])
    const getDataType = (id) => {
        dispatch({
            type: DEAL_IS_SELTED,
            payload: {
                id: id
            }
        })
        bottomSheetRef.current.close()
    }

    return (
        <>
            <View style={{ height: 20 }}></View>

            <>
                {loder ? <DataLoder /> : (
                    <>
                        <View style={{
                            width: "100%",
                            paddingRight: 10,
                            paddingLeft: 10,
                            flexDirection: 'row',
                            paddingBottom: 10
                        }}>

                            <View style={{ width: '70%', height: '100%' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        bottomSheetRef.current.snapToIndex(2)
                                    }}
                                    style={styles.seletexBox}>
                                    <Text style={{ color: '#0D0D0D' }}>{nn[0]?.name}</Text>
                                    <View style={{
                                        width: 20, height: 20, backgroundColor: "#0F976480", borderRadius: 10,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Octicons name="check" size={12} color="#0F9764" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '30%', height: '100%', alignItems: 'flex-end' }}>
                                <BseAndNse bseAndNse={bseAndNse}
                                    bse={bse}
                                    nse={nse} />
                            </View>



                        </View>


                        <FlatList
                            contentContainerStyle={{ paddingBottom: 230 }}
                            showsVerticalScrollIndicator={false}
                            data={Deal}
                            keyExtractor={(item, i) => i.toString()}
                            renderItem={({ item }) => {

                                return (
                                    <IndexItem
                                        data={item}
                                        title={item?.clientname ?
                                            item?.clientname.length > 18 ? `${item?.clientname.substring(0, 18)}...` : `${item?.clientname}`
                                            : item?.ClientName.length > 18 ? `${item?.ClientName.substring(0, 18)}...` : `${item?.ClientName}`}
                                        price={item?.qtyshares}
                                        color={item?.avg_price > 0 ? "green" : "red"}
                                        volume={moment(item?.Date).format('Do MMM, h:mm')}
                                        volume1={item?.buysell}
                                        senSExType={item?.Exchange}
                                        percent={item?.avg_price}
                                        date={moment(item?.Date).format('Do MMM, h:mm')}
                                    />
                                )
                            }}


                            ListEmptyComponent={() => {
                                return <NoDataViewFlatList />;
                            }}
                        />
                    </>

                )}
                <BottomSheetView
                    data={seleted}
                    onPress={getDataType}
                    bottomSheetRef={bottomSheetRef}
                />
            </>
        </>
    )
}

export default connect(null, { getDeal, getDealtWO })(Deal)

const styles = StyleSheet.create({
    seletexBox: {
        width: 100, height: 40, backgroundColor: '#EBEBEB',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 7
    }
})