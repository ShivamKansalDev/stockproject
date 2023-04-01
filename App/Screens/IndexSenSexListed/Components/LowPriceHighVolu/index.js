import React, { useState, useRef, useEffect, useCallback } from 'react'
import { StyleSheet, Text, FlatList, TouchableOpacity, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import IndexItem from '../IndexItem'
import BseAndNse from '../BseAndNse'


import { connect, useSelector, useDispatch } from 'react-redux'

import NoDataViewFlatList from '../../../../Components/NoDataViewFlatList'

import moment from 'moment';
import DataLoder from '../../../../Components/Lodder/DataLoder'

import BottomSheetView from '../BottomSheetView'
import BottomSheetView1 from '../BottomSheetView1'

import LeftDropDownButton from '../LeftDropDownButton'
import GroupTaggleButton from '../GroupTaggleButton'

import { getlowPriceHightValue } from '../../../../Action/ListedCompanyList'
import {
    LOW_PRICE_HIGH_VOLU_ALL_LIST_GROUP,
    LOW_PRICE_HIGH_VOLU_IS_SELETED_TYPE,
    LOW_PRICE_HIGH_VOLU_IS_SELETED_GROUP,
    LOW_PRICE_HIGH_VOLU_ALL_LIST_TYPE
} from '../../../../ActionType/ListedCompanyList/LowPriceHighVolu'
import { getGroupMsterForDomesticIndex } from '../../../../Action/GroupMasterForDomesticIndex';
import { getWidthnHeight } from '../../../../Components/width';





const LowPriceHighVolu = ({ }) => {
    const dispatch = useDispatch()
    const { LowPriceHighVolu } = useSelector(state => state.LowPriceHighVolu)
    const [loder, setloder] = useState(true)

    const { GroupMasterForDomesticIndex } = useSelector(state => state.GroupMasterForDomesticIndex)
    const { SeletedLpHvTYPE = [] } = useSelector(state => state.LowPriceHighVoluType)
    const { SeletedLpHvGroup = [] } = useSelector(state => state.LowPriceHighVoluGroup)
    const [bseAndNse, setbseAndNsee] = useState('BSE')
    const userDetails = useSelector((state) => state.User)
    const isFocused = useIsFocused();

    const authToken = userDetails?.authToken;

    useEffect(() => {
        if (isFocused) {
            dispatch(getlowPriceHightValue(setloder, 'bse', '25', 'A'));
            dispatch({
                type: LOW_PRICE_HIGH_VOLU_ALL_LIST_TYPE
            })
            dispatch({
                type: LOW_PRICE_HIGH_VOLU_ALL_LIST_GROUP,
                data: GroupMasterForDomesticIndex
            })
        } else {
            setbseAndNsee('BSE');
        }
    }, [isFocused])

    const nn = SeletedLpHvTYPE.filter(item => item.isChecked)
    const nn1 = SeletedLpHvGroup.filter(item => item.isChecked)

    useEffect(() => {
        if (bseAndNse === 'BSE') {
            dispatch(getGroupMsterForDomesticIndex(authToken, 'bse', 'lphv'));
        } else {
            dispatch(getGroupMsterForDomesticIndex(authToken, 'nse', 'lphv'));
        }
    }, [bseAndNse])

    useEffect(() => {
        if ((GroupMasterForDomesticIndex.length > 0)) {
            // console.log("@@!@!@ GROUP MASTER: ", GroupMasterForDomesticIndex[0]);
            // const exchange = GroupMasterForDomesticIndex[0]['exchange'];
            dispatch({
                type: LOW_PRICE_HIGH_VOLU_ALL_LIST_GROUP,
                data: GroupMasterForDomesticIndex
            })
        }
    }, [GroupMasterForDomesticIndex])

    useEffect(() => {
        if (SeletedLpHvGroup.length > 0 && SeletedLpHvTYPE.length > 0 && !loder) {
            // console.log("^^^^^^^ CURRENT SELECTION: ", currentSelection.exchange.toLowerCase(), currentSelection.Group, type)
            switchExchange();
        }
    }, [SeletedLpHvGroup, switchExchange, SeletedLpHvTYPE, loder]);

    const switchExchange = useCallback(() => {
        const currentSelection = nn1[0];
        const type = nn[0].value;
        dispatch(getlowPriceHightValue(setloder, currentSelection.exchange.toLowerCase(), type, currentSelection.Group))
    }, [nn, nn1]);

    const bottomSheetRef = useRef(null)
    const bottomSheetRef1 = useRef(null)

    const getDataType = (id) => {
        bottomSheetRef.current.close();
        const currentSelection = SeletedLpHvTYPE.find((item) => item.id === id);
        // console.log("@!@!*(*( GET DATA TYPE: ", bseAndNse.toLowerCase(), nn1[0].Group, currentSelection.value)
        if (id === nn[0]['id']) {
            return
        }
        dispatch({
            type: LOW_PRICE_HIGH_VOLU_IS_SELETED_TYPE,
            payload: {
                id: id
            }
        })
        dispatch(getlowPriceHightValue(setloder, bseAndNse.toLowerCase(), currentSelection.value, nn1[0].Group))
    }
    const getDataType1 = (id) => {
        bottomSheetRef1.current.close();
        const groupName = SeletedLpHvGroup[id]['Group'];
        const previousGroupName = nn1[0]['Group']
        if (groupName === previousGroupName) {
            return;
        }
        dispatch({
            type: LOW_PRICE_HIGH_VOLU_IS_SELETED_GROUP,
            payload: {
                id: id
            }
        })
        dispatch(getlowPriceHightValue(setloder, bseAndNse.toLowerCase(), nn[0]['value'], groupName))
    }

    return (
        <>
            <View style={{ height: 20 }}></View>
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
                    <View style={{ padding: getWidthnHeight(2).width }}>
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
                        data={LowPriceHighVolu}
                        keyExtractor={(item, i) => i.toString()}
                        renderItem={({ item }) => {
                            // console.log(item);

                            return (
                                <IndexItem
                                    data={item}
                                    title={item?.co_name.length > 18 ? `${item?.co_name.substring(0, 18)}...` : item?.co_name}
                                    price={Math.abs(Number(item?.PrevPrice.toFixed(2)))}
                                    color={item?.perchg > 0 ? "green" : "red"}
                                    volume={item?.currprice}
                                    // volume1={item?.volume}
                                    volume1={item?.volume > 0 ? `${(Number(item?.volume.toFixed(2)))}` : `${(Number(item?.volume.toFixed(2)))}`}
                                    senSExType={item?.symbol}

                                    // percent={item?.sc_code > 0 ? `+${(Number(item?.sc_code.toFixed(2)))}%` : `${(Number(item?.sc_code.toFixed(2)))}%`}
                                    percent={'N/A'}
                                    date={moment(item?.Tradedate).format('Do MMM, h:mm')}
                                />

                            )
                        }}


                        ListEmptyComponent={() => {
                            return <NoDataViewFlatList />;
                        }}
                    />
                    <BottomSheetView
                        data={SeletedLpHvTYPE}
                        onPress={getDataType}
                        bottomSheetRef={bottomSheetRef}
                    />
                    <BottomSheetView1
                        data={SeletedLpHvGroup}
                        onPress={getDataType1}
                        bottomSheetRef1={bottomSheetRef1}
                    />
                </>
            )}
        </>
    )
}

export default connect(null, {})(LowPriceHighVolu)

const styles = StyleSheet.create({

    container: {
        width: "100%",
        paddingRight: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        paddingBottom: 10
    }
})