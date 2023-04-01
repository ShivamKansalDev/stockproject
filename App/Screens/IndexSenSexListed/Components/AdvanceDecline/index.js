



import React, { useState, useRef, useEffect, useCallback } from 'react'
import { StyleSheet, Text, FlatList, TouchableOpacity, View } from 'react-native'
import IndexItem from '../IndexItem'
import BseAndNse from '../BseAndNse'

import { getAdvanceDecline } from '../../../../Action/ListedCompanyList'
import { connect, useSelector, useDispatch } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import moment from 'moment';

import NoDataViewFlatList from '../../../../Components/NoDataViewFlatList'

import DataLoder from '../../../../Components/Lodder/DataLoder'

import BottomSheetView from '../BottomSheetView'
import BottomSheetView1 from '../BottomSheetView1'

import LeftDropDownButton from '../LeftDropDownButton'
import GroupTaggleButton from '../GroupTaggleButton'
import {
    ADVANCE_DECLINE_ALL_LIST_GROUP, ADVANCE_DECLINE_IS_SELETED_TYPE,
    ADVANCE_DECLINE_IS_SELETED_GROUP, ADVANCE_DECLINE_ALL_LIST_TYPE
} from '../../../../ActionType/ListedCompanyList/AdvanceDecline'
import { getGroupMsterForDomesticIndex } from '../../../../Action/GroupMasterForDomesticIndex'

const AdvanceDecline = ({ }) => {
    const dispatch = useDispatch()

    const { AdvanceDecline } = useSelector(state => state.AdvanceDecline)
    const { SeletedAv = [] } = useSelector(state => state.AdvanceDeclineGroupType) //SeletedDayGn
    const { SeletedAvType = [] } = useSelector(state => state.AdvanceDeclineType)
    const { GroupMasterForDomesticIndex } = useSelector(state => state.GroupMasterForDomesticIndex)
    const [loder, setloder] = useState(true)
    const [bseAndNse, setbseAndNsee] = useState('BSE')
    const userDetails = useSelector((state) => state.User);

    const isFocused = useIsFocused();
    const authToken = userDetails?.authToken;

    useEffect(() => {
        if (isFocused) {
            dispatch(getAdvanceDecline(setloder, 'bse', 'A', 'A'));
            dispatch({
                type: ADVANCE_DECLINE_ALL_LIST_TYPE
            })
            dispatch({
                type: ADVANCE_DECLINE_ALL_LIST_GROUP,
                data: GroupMasterForDomesticIndex
            })
        } else {
            setbseAndNsee('BSE');
        }
    }, [isFocused])

    //===========
    const nn = SeletedAvType.filter(item => item.isChecked)
    const nn1 = SeletedAv.filter(item => item.isChecked)

    useEffect(() => {
        if (bseAndNse === 'BSE') {
            dispatch(getGroupMsterForDomesticIndex(authToken, 'bse', 'advanceDecline'));
        } else {
            dispatch(getGroupMsterForDomesticIndex(authToken, 'nse', 'advanceDecline'));
        }
    }, [bseAndNse])

    useEffect(() => {
        if ((GroupMasterForDomesticIndex.length > 0)) {
            // console.log("@@!@!@ GROUP MASTER: ", GroupMasterForDomesticIndex[0]);
            // const exchange = GroupMasterForDomesticIndex[0]['exchange'];
            dispatch({
                type: ADVANCE_DECLINE_ALL_LIST_GROUP,
                data: GroupMasterForDomesticIndex
            })
        }
    }, [GroupMasterForDomesticIndex]);

    useEffect(() => {
        if (SeletedAv.length > 0 && SeletedAvType.length > 0 && !loder) {
            // console.log("^^^^^^^ CURRENT SELECTION: ", currentSelection.exchange.toLowerCase(), currentSelection.Group, type)
            switchExchange();
        }
    }, [SeletedAv, switchExchange, SeletedAvType, loder]);

    const switchExchange = useCallback(() => {
        const currentSelection = nn1[0];
        const type = nn[0].value;
        dispatch(getAdvanceDecline(setloder, currentSelection.exchange.toLowerCase(), currentSelection.Group, type))
    }, [nn, nn1]);

    const bottomSheetRef = useRef(null)
    const bottomSheetRef1 = useRef(null)

    const getDataType = (id) => {
        bottomSheetRef.current.close();
        const currentSelection = SeletedAvType.find((item) => item.id === id);
        // console.log("@!@!*(*( GET DATA TYPE: ", bseAndNse.toLowerCase(), nn1[0].Group, currentSelection.value)
        if (id === nn[0]['id']) {
            return
        }
        dispatch({
            type: ADVANCE_DECLINE_IS_SELETED_TYPE,
            payload: {
                id: id
            }
        })
        dispatch(getAdvanceDecline(setloder, bseAndNse.toLowerCase(), nn1[0].Group, currentSelection.value))

    }
    const getDataGroup = (id) => {
        bottomSheetRef1.current.close();
        const groupName = SeletedAv[id]['Group'];
        const previousGroupName = nn1[0]['Group']
        if (groupName === previousGroupName) {
            return;
        }
        dispatch({
            type: ADVANCE_DECLINE_IS_SELETED_GROUP,
            payload: {
                id: id
            }
        })
        dispatch(getAdvanceDecline(setloder, bseAndNse.toLowerCase(), groupName, nn[0]['value']))
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
                            data={AdvanceDecline}
                            keyExtractor={(item, i) => i.toString()}
                            renderItem={({ item }) => {
                                // console.log(item?.Close_price)
                                return (
                                    <IndexItem
                                        data={item}
                                        title={item?.co_name.length > 18 ? `${item?.co_name.substring(0, 18)}...` : item?.co_name}
                                        price={Math.abs(Number(item?.netchg.toFixed(2)))}
                                        color={item?.netchg > 0 ? "green" : "red"}
                                        volume={item?.ClosePrice}
                                        volume1={item?.PrevClose}
                                        senSExType={item?.Stk_Exchange}

                                        percent={item?.perchg > 0 ? `+${(Number(item?.perchg.toFixed(2)))}%` : `${(Number(item?.perchg.toFixed(2)))}%`}
                                        date={moment(item?.upd_time).format('Do MMM, h:mm')}
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
                    data={SeletedAvType}
                    onPress={getDataType}
                    bottomSheetRef={bottomSheetRef}
                />
                <BottomSheetView1
                    data={SeletedAv}
                    onPress={getDataGroup}
                    bottomSheetRef1={bottomSheetRef1}
                />
            </>
        </>
    )
}

export default connect(null, {})(AdvanceDecline)

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