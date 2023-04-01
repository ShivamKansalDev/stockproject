import React, { useState, useRef, useEffect, useCallback } from 'react'
import { StyleSheet, Text, FlatList, TouchableOpacity, View } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { connect, useSelector, useDispatch } from 'react-redux'

import IndexItem from '../IndexItem'
import BseAndNse from '../BseAndNse'

import { getTopGainer } from '../../../../Action/ListedCompanyList'


import NoDataViewFlatList from '../../../../Components/NoDataViewFlatList'

import moment from 'moment';
import DataLoder from '../../../../Components/Lodder/DataLoder'
import BottomSheetView from '../BottomSheetView'
import BottomSheetView1 from '../BottomSheetView1'
import {
    TOP_GAINER_ALL_GROUP_NAME,
    TOP_GAINER_ALL_DAY_IS_SELETED,
    TOP_GAINER_ALL_GROUP_IS_SELETED,
    TOP_GAINER_ALL_DAY_TYPE
} from '../../../../ActionType/ListedCompanyList/TopGainer'
import LeftDropDownButton from '../LeftDropDownButton'
import GroupTaggleButton from '../GroupTaggleButton'
import { getGroupMsterForDomesticIndex } from '../../../../Action/GroupMasterForDomesticIndex'





const TopGainer = ({ }) => {
    const dispatch = useDispatch();
    const { TopGainer } = useSelector(state => state.TopGainer)
    const { SeletedDayGn = [] } = useSelector(state => state.TopGainerDayType) //SeletedDayGn
    const { SeletedG = [] } = useSelector(state => state.TopGainerGroupType)
    const { GroupMasterForDomesticIndex } = useSelector(state => state.GroupMasterForDomesticIndex)
    const userDetails = useSelector((state) => state.User);
    const [loder, setloder] = useState(true)
    const [bseAndNse, setbseAndNsee] = useState('BSE')
    const isFocused = useIsFocused();
    const authToken = userDetails?.authToken;

    useEffect(() => {
        if (isFocused) {
            dispatch(getTopGainer(setloder, 'bse', 'A', 'today'));
            dispatch({
                type: TOP_GAINER_ALL_DAY_TYPE
            })
            dispatch({
                type: TOP_GAINER_ALL_GROUP_NAME,
                data: GroupMasterForDomesticIndex
            })
        } else {
            setbseAndNsee('BSE');
        }
    }, [isFocused])

    //===========
    const nn = SeletedDayGn.filter(item => item.isChecked)
    const nn1 = SeletedG.filter(item => item.isChecked)
    //  console.log(nn1,'nn1')

    useEffect(() => {
        if (bseAndNse === 'BSE') {
            dispatch(getGroupMsterForDomesticIndex(authToken, 'bse', 'topgainer'));
        } else {
            dispatch(getGroupMsterForDomesticIndex(authToken, 'nse', 'topgainer'));
        }
    }, [bseAndNse])

    useEffect(() => {
        if ((GroupMasterForDomesticIndex.length > 0)) {
            // console.log("@@!@!@ GROUP MASTER: ", GroupMasterForDomesticIndex[0]);
            // const exchange = GroupMasterForDomesticIndex[0]['exchange'];
            dispatch({
                type: TOP_GAINER_ALL_GROUP_NAME,
                data: GroupMasterForDomesticIndex
            })
        }
    }, [GroupMasterForDomesticIndex]);

    useEffect(() => {
        if (SeletedG.length > 0 && SeletedDayGn.length > 0 && !loder) {
            // console.log("^^^^^^^ CURRENT SELECTION: ", currentSelection.exchange.toLowerCase(), currentSelection.Group, type)
            switchExchange();
        }
    }, [SeletedG, switchExchange, SeletedDayGn, loder]);

    const switchExchange = useCallback(() => {
        const currentSelection = nn1[0];
        const type = nn[0].value;
        dispatch(getTopGainer(setloder, currentSelection.exchange.toLowerCase(), currentSelection.Group, type))
    }, [nn, nn1]);

    const bottomSheetRef = useRef(null)
    const bottomSheetRef1 = useRef(null)

    const getDataType = (id) => {
        bottomSheetRef.current.close()
        const currentSelection = SeletedDayGn.find((item) => item.id === id);
        // console.log("@!@!*(*( GET DATA TYPE: ", bseAndNse.toLowerCase(), nn1[0].Group, currentSelection.value)
        if (id === nn[0]['id']) {
            return
        }
        dispatch({
            type: TOP_GAINER_ALL_DAY_IS_SELETED,
            payload: {
                id: id
            }
        })
        dispatch(getTopGainer(setloder, bseAndNse.toLowerCase(), nn1[0].Group, currentSelection.value))
    }

    const getDataType1 = (id) => {
        bottomSheetRef1.current.close();
        const groupName = SeletedG[id]['Group'];
        const previousGroupName = nn1[0]['Group']
        if (groupName === previousGroupName) {
            return;
        }
        dispatch({
            type: TOP_GAINER_ALL_GROUP_IS_SELETED,
            payload: {
                id: id
            }
        })
        dispatch(getTopGainer(setloder, bseAndNse.toLowerCase(), groupName, nn[0]['value']))
    }

    //=======

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
                            data={TopGainer}
                            keyExtractor={(item, i) => i.toString()}
                            renderItem={({ item }) => {
                                //  console.log(item?.volume1)
                                return (
                                    <IndexItem
                                        data={item}
                                        title={item?.co_name.length > 18 ? `${item?.co_name.substring(0, 18)}...` : item?.co_name}
                                        price={Math.abs(Number(item?.netchg.toFixed(2)))}
                                        color={item?.perchg > 0 ? "green" : "red"}
                                        volume={item?.Close_price}
                                        volume1={item?.vol_traded}
                                        senSExType={item?.Stk_Exchange}

                                        percent={item?.perchg > 0 ? `+${(Number(item?.perchg.toFixed(2)))}%` : `${(Number(item?.perchg.toFixed(2)))}%`}
                                        date={moment(item?.Upd_Time).format('Do MMM, h:mm')}
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
                    data={SeletedDayGn}
                    onPress={getDataType}
                    bottomSheetRef={bottomSheetRef}
                />
                <BottomSheetView1
                    data={SeletedG}
                    onPress={getDataType1}
                    bottomSheetRef1={bottomSheetRef1}
                />
            </>
        </>
    )
}

export default connect(null, {})(TopGainer)

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