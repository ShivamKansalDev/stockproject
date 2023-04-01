


import { StyleSheet, TouchableOpacity, FlatList, Image, Text, View } from 'react-native';
import React, { useEffect, useState, useRef } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import IndexItem from './IndexItem'

import NoDataViewFlatList from '../../../../Components/NoDataViewFlatList'
import DataLoder from '../../../../Components/Lodder/DataLoder'

import { getFiiDiiActivity } from '../../../../Action/ListedCompanyList'

import BottomSheetView from '../BottomSheetView'
import LeftDropDownButton from '../LeftDropDownButton';
import { FII_DII_ALL_GROUP_NAME, FII_DII_ALL_GROUP_IS_SELETED } from '../../../../ActionType/ListedCompanyList/FiiDiiActivity';




const FIIDIIActivity = ({ getFiiDiiActivity }) => {
    const dispatch = useDispatch()
    const { FiiDiiActivity } = useSelector(state => state.FiiDiiActivity)
    const { FiiDiiActivityType } = useSelector(state => state.FiiDiiActivityType)

    const [loder, setloder] = useState(true)

    const nn = FiiDiiActivityType.filter(item => item.isChecked)

    useEffect(() => {
        getFiiDiiActivity(setloder)
    }, [])

    useEffect(() => {
        dispatch({
            type: FII_DII_ALL_GROUP_NAME
        })
    }, [])

    const bottomSheetRef = useRef(null)
    const getDataType = (id) => {
        dispatch({
            type: FII_DII_ALL_GROUP_IS_SELETED,
            payload: {
                id: id
            }
        })
        bottomSheetRef.current.close()
    }

    return (
        <>
            {loder ? <DataLoder /> : (
                <>
                    <View style={{ height: 20 }}></View>
                    <View style={{
                        width: "100%",
                        paddingRight: 10,
                        paddingLeft: 10,
                        flexDirection: 'row',
                        paddingBottom: 10
                    }}>

                        <View style={{ width: '70%', height: '100%' }}>
                            <LeftDropDownButton
                                onPress={() => {
                                    bottomSheetRef.current.snapToIndex(2)
                                }}
                                value={nn[0]?.name}
                            />
                        </View>
                        <View style={{ width: '30%', height: '100%', alignItems: 'flex-end' }}>

                        </View>



                    </View>
                    {nn[0]?.value === 'debt' ? (<FlatList
                        contentContainerStyle={{ paddingBottom: 230 }}
                        showsVerticalScrollIndicator={false}
                        data={FiiDiiActivity}
                        keyExtractor={(item, i) => i.toString()}
                        renderItem={({ item }) => {

                            return (
                                <IndexItem
                                    //  onPress={getDometIndexCompanyNameLawer2}
                                    //  title={item?.lname.length >18?`${item?.lname.substring(0, 18)}...`:item?.lname}

                                    price={Math.abs(item?.DebtNetInvestment)}
                                    color={item?.DebtNetInvestment > 0 ? 'green' : 'red'}
                                    volume={item?.DebtGrossPurchase}
                                    volume1={item?.DebtGrossSales}
                                    //  senSExType={item?.Exchange}
                                    percent={`${item?.DebtCumulativeNetInvestment}%`}
                                    date={item?.FIIDate}
                                />
                            )
                        }}


                        ListEmptyComponent={() => {
                            return <NoDataViewFlatList />;
                        }}
                    />) : (<FlatList
                        contentContainerStyle={{ paddingBottom: 230 }}
                        showsVerticalScrollIndicator={false}
                        data={FiiDiiActivity}
                        keyExtractor={(item, i) => i.toString()}
                        renderItem={({ item }) => {

                            return (
                                <IndexItem
                                    //  onPress={getDometIndexCompanyNameLawer2}
                                    //  title={item?.lname.length >18?`${item?.lname.substring(0, 18)}...`:item?.lname}

                                    price={Math.abs(item?.EquityNetInvestment)}
                                    color={item?.EquityNetInvestment > 0 ? 'green' : 'red'}
                                    volume={item?.EquityGrossPurchase}
                                    volume1={item?.EquityGrossSales}
                                    //  senSExType={item?.Exchange}
                                    percent={`${item?.EquityCumulativeNetInvestment}%`}
                                    date={item?.FIIDate}
                                />
                            )
                        }}


                        ListEmptyComponent={() => {
                            return <NoDataViewFlatList />;
                        }}
                    />)}

                    <BottomSheetView
                        data={FiiDiiActivityType}
                        onPress={getDataType}
                        bottomSheetRef={bottomSheetRef}
                    />
                </>

            )}
        </>


    )
}

export default connect(null, { getFiiDiiActivity })(FIIDIIActivity)

const styles = StyleSheet.create({})