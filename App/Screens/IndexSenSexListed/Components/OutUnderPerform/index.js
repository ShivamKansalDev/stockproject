import React, { useState, useRef, useEffect, useCallback } from 'react'
import { StyleSheet, Text, TouchableOpacity, FlatList, View } from 'react-native'
import { connect, useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';

import IndexItem from '../IndexItem'
import BseAndNse from '../BseAndNse'

import { getOutPerformer } from '../../../../Action/ListedCompanyList'

import NoDataViewFlatList from '../../../../Components/NoDataViewFlatList'

import DataLoder from '../../../../Components/Lodder/DataLoder'

import BottomSheetView from '../BottomSheetView'
import BottomSheetView1 from '../BottomSheetView1'
import BottomSheetView2 from '../BottomSheetView2'

import LeftDropDownButton from '../LeftDropDownButton'
import GroupTaggleButton2 from '../GroupTaggleButton2'
import { GROUP_ALL, TYPE_ALL, GROUP_ALL_IS_SELECTED, TYPE_IS_SELECTED, OUT_UNDER, OUT_UNDER_IS_SELECTE } from '../../../../ActionType/ListedCompanyList/OutUnderPerform'
import { getGroupMsterForDomesticIndex } from '../../../../Action/GroupMasterForDomesticIndex'

const OutUnderPerform = ({ }) => {

    const dispatch = useDispatch()
    const { OutUnderPerformType = [] } = useSelector(state => state.OutUnderPerformType)
    const { OutUnderPerform } = useSelector(state => state.OutUnderPerform)
    const { OutUnder = [] } = useSelector(state => state.OutUnder)
    const { GroupMasterForDomesticIndex } = useSelector(state => state.GroupMasterForDomesticIndex)
    const { OutUnderPerformGroup = [] } = useSelector(state => state.OutUnderPerformGroup)
    const [loder, setloder] = useState(true)
    const [bseAndNse, setbseAndNsee] = useState('BSE')
    const userDetails = useSelector((state) => state.User);
    const isFocused = useIsFocused();
    const authToken = userDetails?.authToken;

    useEffect(() => {
        if (isFocused) {
            dispatch(getOutPerformer(setloder, 'bse', 'A', 'out', '1year'));
            dispatch({
                type: TYPE_ALL
            })
            dispatch({
                type: GROUP_ALL,
                data: GroupMasterForDomesticIndex
            })
        } else {
            setbseAndNsee('BSE');
        }
    }, [isFocused])

    useEffect(() => {
        dispatch({
            type: OUT_UNDER
        })
    }, [])

    const nn = OutUnderPerformType.filter(item => item.isChecked)
    const nn1 = OutUnderPerformGroup.filter(item => item.isChecked)
    const nn2 = OutUnder.filter(item => item.isChecked)

    // console.log("@#@#@ NN2: ", nn2)

    useEffect(() => {
        if (bseAndNse === 'BSE') {
            dispatch(getGroupMsterForDomesticIndex(authToken, 'bse', 'outUnderPerform'));
        } else {
            dispatch(getGroupMsterForDomesticIndex(authToken, 'nse', 'outUnderPerform'));
        }
    }, [bseAndNse])

    useEffect(() => {
        if ((GroupMasterForDomesticIndex.length > 0)) {
            dispatch({
                type: GROUP_ALL,
                data: GroupMasterForDomesticIndex
            })
        }
    }, [GroupMasterForDomesticIndex]);

    useEffect(() => {
        if (OutUnderPerformGroup.length > 0 && OutUnderPerformType.length > 0 && OutUnder.length > 0 && !loder) {
            // console.log("^^^^^^^ CURRENT SELECTION: ", currentSelection.exchange.toLowerCase(), currentSelection.Group, type)
            switchExchange();
        }
    }, [OutUnderPerformGroup, switchExchange, OutUnderPerformType, OutUnder, loder]);

    const switchExchange = useCallback(() => {
        const currentSelection = nn1[0];
        const type = nn[0].value;
        // getOutPerformer(setloder, 'bse', 'A', 'under', '1year')
        const name = nn2[0]['name'];
        dispatch(getOutPerformer(setloder, currentSelection.exchange.toLowerCase(), currentSelection.Group, name.toLowerCase(), type))
    }, [nn, nn1]);

    const bottomSheetRef = useRef(null)
    const bottomSheetRef1 = useRef(null)
    const bottomSheetRef2 = useRef(null)

    const under = (id) => {
        bottomSheetRef2.current.close();
        const group = nn1[0]['Group'];
        const name = OutUnder[id]['name'];
        const value = nn[0]['value'];
        console.log("#$#$#$#*&*&* : ", id, nn2[0]['id'])
        if (id === nn2[0]['id']) {
            return;
        }
        dispatch({
            type: OUT_UNDER_IS_SELECTE,
            payload: {
                id: id
            }
        })
        console.log("****&&&&  ", bseAndNse.toLowerCase(), group, name.toLowerCase(), value)
        dispatch(getOutPerformer(setloder, bseAndNse.toLowerCase(), group, name.toLowerCase(), value))
    }

    const getDataType = (id) => {
        bottomSheetRef.current.close()
        const currentSelection = OutUnderPerformType.find((item) => item.id === id);
        const name = nn2[0]['name'];
        if (id === nn[0]['id']) {
            return
        }
        dispatch({
            type: TYPE_IS_SELECTED,
            payload: {
                id: id
            }
        })
        console.log("@!@!*(*(  ", bseAndNse.toLowerCase(), nn1[0].Group, name.toLowerCase(), currentSelection.value)
        dispatch(getOutPerformer(setloder, bseAndNse.toLowerCase(), nn1[0].Group, name.toLowerCase(), currentSelection.value))
    }

    const getDataGROUP = (id) => {
        bottomSheetRef1.current.close();
        const groupName = OutUnderPerformGroup[id]['Group'];
        const previousGroupName = nn1[0]['Group'];
        const name = nn2[0]['name'];
        if (groupName === previousGroupName) {
            return;
        }
        dispatch({
            type: GROUP_ALL_IS_SELECTED,
            payload: {
                id: id
            }
        })
        console.log("^^^^####  ", bseAndNse.toLowerCase(), groupName, name.toLowerCase(), nn[0]['value'])
        dispatch(getOutPerformer(setloder, bseAndNse.toLowerCase(), groupName, name.toLowerCase(), nn[0]['value']))
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
                        <View style={styles.container1}>
                            <View style={{ width: '40%', height: 40, }}>
                                <GroupTaggleButton2
                                    onPress={() => {
                                        bottomSheetRef1.current.snapToIndex(2)
                                    }}
                                    value={nn1[0]?.Group}
                                />
                            </View>
                            <View style={{ width: '40%', height: 40, }}>
                                <GroupTaggleButton2
                                    onPress={() => {
                                        bottomSheetRef2.current.snapToIndex(2)
                                    }}
                                    value={nn2[0]?.name}
                                />
                            </View>
                        </View>
                        <FlatList
                            contentContainerStyle={{ paddingBottom: 230 }}
                            showsVerticalScrollIndicator={false}
                            data={OutUnderPerform}
                            keyExtractor={(item, i) => i.toString()}
                            renderItem={({ item }) => {
                                //  console.log(item?.close_price)
                                return (
                                    <IndexItem
                                        data={item}
                                        title={item?.Lname.length > 18 ? `${item?.Lname.substring(0, 18)}...` : item?.Lname}
                                        price={Math.abs(Number(item?.Diff.toFixed(2)))}
                                        color={item?.PerChg > 0 ? "green" : "red"}
                                        volume={item.Close ? item.Close : item.Close}
                                        volume1={item?.Close1}
                                        senSExType={bseAndNse}

                                        percent={item?.PerChg > 0 ? `+${(Number(item?.PerChg.toFixed(2)))}%` : `${(Number(item?.PerChg.toFixed(2)))}%`}
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
                    data={OutUnderPerformType}
                    onPress={getDataType}
                    bottomSheetRef={bottomSheetRef}
                />
                <BottomSheetView1
                    data={OutUnderPerformGroup}
                    onPress={getDataGROUP}
                    bottomSheetRef1={bottomSheetRef1}
                />
                <BottomSheetView2
                    data={OutUnder}
                    onPress={under}
                    bottomSheetRef={bottomSheetRef2}
                />


            </>

        </>
    )
}

export default connect(null, {})(OutUnderPerform)

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
    },
    container1: {
        width: "100%",
        paddingRight: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        paddingBottom: 10,
        justifyContent: 'space-between'
    }
})