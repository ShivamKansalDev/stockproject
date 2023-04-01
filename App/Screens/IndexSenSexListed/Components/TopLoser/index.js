

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { StyleSheet, Text, TouchableOpacity, FlatList, View } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import IndexItem from '../IndexItem'
import BseAndNse from '../BseAndNse'

import { getTopLoser } from '../../../../Action/ListedCompanyList'
import { connect, useDispatch, useSelector } from 'react-redux'


import NoDataViewFlatList from '../../../../Components/NoDataViewFlatList'

import moment from 'moment';
import DataLoder from '../../../../Components/Lodder/DataLoder'

import BottomSheetView from '../BottomSheetView'
import BottomSheetView1 from '../BottomSheetView1'
import {
    TOP_LOSER_ALL_DAY_TYPE, TOP_LOSER_ALL_GROUP_NAME,
    TOP_LOSER_ALL_DAY_IS_SELETED, TOP_LOSER_ALL_GROUP_IS_SELETED
} from '../../../../ActionType/ListedCompanyList/TopLoser'
import LeftDropDownButton from '../LeftDropDownButton'
import GroupTaggleButton from '../GroupTaggleButton'
import { getGroupMsterForDomesticIndex } from '../../../../Action/GroupMasterForDomesticIndex'




const TopLoserTab = ({ }) => {

    const dispatch = useDispatch()
    const { TopLoserDayTypeSeleted = [] } = useSelector(state => state.TopLoserDayType)
    const { GroupMasterForDomesticIndex } = useSelector(state => state.GroupMasterForDomesticIndex)
    const { TopLoserGroupTypeSeleted = [] } = useSelector(state => state.TopLoserGroupType)
    const { TopLoser } = useSelector(state => state.TopLoser)
    const [bseAndNse, setbseAndNsee] = useState('BSE')
    const [loder, setloder] = useState(true)
    const userDetails = useSelector((state) => state.User)
    const isFocused = useIsFocused();

    const authToken = userDetails?.authToken;

    useEffect(() => {
        if (isFocused) {
            dispatch(getTopLoser(setloder, 'bse', 'A', 'today'));
            dispatch({
                type: TOP_LOSER_ALL_DAY_TYPE
            })
            dispatch({
                type: TOP_LOSER_ALL_GROUP_NAME,
                data: GroupMasterForDomesticIndex
            })
        } else {
            setbseAndNsee('BSE');
        }
    }, [isFocused])

    const nn = TopLoserDayTypeSeleted.filter(item => item.isChecked)
    const nn1 = TopLoserGroupTypeSeleted.filter(item => item.isChecked)

    useEffect(() => {
        if (bseAndNse === 'BSE') {
            dispatch(getGroupMsterForDomesticIndex(authToken, 'bse', 'toploser'));
        } else {
            dispatch(getGroupMsterForDomesticIndex(authToken, 'nse', 'toploser'));
        }
    }, [bseAndNse])

    useEffect(() => {
        if ((GroupMasterForDomesticIndex.length > 0)) {
            // console.log("@@!@!@ GROUP MASTER: ", GroupMasterForDomesticIndex[0]);
            // const exchange = GroupMasterForDomesticIndex[0]['exchange'];
            dispatch({
                type: TOP_LOSER_ALL_GROUP_NAME,
                data: GroupMasterForDomesticIndex
            })
        }
    }, [GroupMasterForDomesticIndex])

    useEffect(() => {
        if (TopLoserGroupTypeSeleted.length > 0 && TopLoserDayTypeSeleted.length > 0 && !loder) {
            // console.log("^^^^^^^ CURRENT SELECTION: ", currentSelection.exchange.toLowerCase(), currentSelection.Group, type)
            switchExchange();
        }
    }, [TopLoserGroupTypeSeleted, switchExchange, TopLoserDayTypeSeleted, loder]);

    const switchExchange = useCallback(() => {
        const currentSelection = nn1[0];
        const type = nn[0].value;
        dispatch(getTopLoser(setloder, currentSelection.exchange.toLowerCase(), currentSelection.Group, type))
    }, [nn, nn1]);

    const bottomSheetRef = useRef(null)
    const bottomSheetRef1 = useRef(null)

    const getDataType = (id) => {
        bottomSheetRef.current.close();
        const currentSelection = TopLoserDayTypeSeleted.find((item) => item.id === id);
        // console.log("@!@!*(*( GET DATA TYPE: ", bseAndNse.toLowerCase(), nn1[0].Group, currentSelection.value)
        if (id === nn[0]['id']) {
            return
        }
        dispatch({
            type: TOP_LOSER_ALL_DAY_IS_SELETED,
            payload: {
                id: id
            }
        })
        dispatch(getTopLoser(setloder, bseAndNse.toLowerCase(), nn1[0].Group, currentSelection.value))
    }
    const getDataType1 = (id) => {
        bottomSheetRef1.current.close()
        // console.log("@#@#@## NN! GROUP: ", id, TopLoserGroupTypeSeleted[id]['Group'])
        const groupName = TopLoserGroupTypeSeleted[id]['Group'];
        const previousGroupName = nn1[0]['Group']
        if (groupName === previousGroupName) {
            return;
        }
        dispatch({
            type: TOP_LOSER_ALL_GROUP_IS_SELETED,
            payload: {
                id: id
            }
        })
        dispatch(getTopLoser(setloder, bseAndNse.toLowerCase(), groupName, nn[0]['value']))
    }
    return (
        <>
            <View style={{ height: 20 }}></View>

            <>
                {loder ? <DataLoder /> : (
                    <>
                        <View style={styles.container}>

                            <View style={{ width: '70%', height: '100%' }}>
                                <LeftDropDownButton
                                    onPress={() => {
                                        bottomSheetRef.current.snapToIndex(2)
                                    }}
                                    value={nn[0]?.name}
                                />


                            </View>
                            <View style={{ width: '30%', height: '100%', alignItems: 'flex-end' }}>
                                <BseAndNse bseAndNse={bseAndNse}
                                    bse={() => setbseAndNsee('BSE')}
                                    nse={() => setbseAndNsee('NSE')} />
                            </View>
                        </View>
                        <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
                            <GroupTaggleButton
                                onPress={() => {
                                    bottomSheetRef1.current.snapToIndex(2)
                                }}
                                value={nn1[0]?.Group}
                            />

                        </View>

                        <FlatList
                            contentContainerStyle={{ paddingBottom: 230 }}
                            showsVerticalScrollIndicator={false}
                            data={TopLoser}
                            keyExtractor={(item, i) => i.toString()}
                            renderItem={({ item }) => {
                                //  console.log(item?.close_price)
                                return (
                                    <IndexItem
                                        data={item}
                                        title={item?.co_name.length > 18 ? `${item?.co_name.substring(0, 18)}...` : item?.co_name}
                                        price={Math.abs(Number(item?.netchg.toFixed(2)))}
                                        color={item?.perchg > 0 ? "green" : "red"}
                                        volume={item.close_price ? item.close_price : item.Close_price}
                                        volume1={item?.vol_traded}
                                        senSExType={`${item?.stk_exchng}:`}

                                        percent={item?.perchg > 0 ? `+${(Number(item?.perchg.toFixed(2)))}%` : `${(Number(item?.perchg.toFixed(2)))}%`}
                                        date={item?.Upd_Time ? moment(item?.Upd_Time).format('Do MMM, h:mm') : moment(item?.Upd_Time).format('Do MMM, h:mm')}
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
                    data={TopLoserDayTypeSeleted}
                    onPress={getDataType}
                    bottomSheetRef={bottomSheetRef}
                />
                <BottomSheetView1
                    data={TopLoserGroupTypeSeleted}
                    onPress={getDataType1}
                    bottomSheetRef1={bottomSheetRef1}
                />


            </>

        </>
    )
}

export default TopLoserTab;

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
    },
    container: {
        width: "100%",
        paddingRight: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        paddingBottom: 10
    }
})