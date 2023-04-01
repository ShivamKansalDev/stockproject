import React, { useState, useRef, useEffect, useCallback } from 'react'
import { StyleSheet, Text, TouchableOpacity, FlatList, View } from 'react-native'
import { connect, useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'

import IndexItem from '../IndexItem'
import BseAndNse from '../BseAndNse'
import { getActiveCompanies, getTopLoser } from '../../../../Action/ListedCompanyList'
import NoDataViewFlatList from '../../../../Components/NoDataViewFlatList'
import moment from 'moment';
import DataLoder from '../../../../Components/Lodder/DataLoder'
import BottomSheetView from '../BottomSheetView'
import BottomSheetView1 from '../BottomSheetView1'
import LeftDropDownButton from '../LeftDropDownButton'
import GroupTaggleButton from '../GroupTaggleButton'
import {
    ALL_TYPE, ALL_TYPE_IS_SELECTED, ALL_GROUP,
    ALL_GROUP_IS_SELECTED
} from '../../../../ActionType/ListedCompanyList/ActiveCompanies'
import { getGroupMsterForDomesticIndex } from '../../../../Action/GroupMasterForDomesticIndex'

const ActiveCompaniesPage = ({ }) => {

    const dispatch = useDispatch()
    const { ActiveCompaniesType = [] } = useSelector(state => state.ActiveCompaniesType)
    const { GroupMasterForDomesticIndex } = useSelector(state => state.GroupMasterForDomesticIndex)
    const { ActiveCompaniesGroup = [] } = useSelector(state => state.ActiveCompaniesGroup)
    const { ActiveCompanies } = useSelector(state => state.ActiveCompanies)
    const [loder, setloder] = useState(true)
    const userDetails = useSelector((state) => state.User);
    const [bseAndNse, setbseAndNsee] = useState('BSE')

    const isFocused = useIsFocused();
    const authToken = userDetails?.authToken;

    useEffect(() => {
        if (isFocused && loder) {
            getActiveCompaniesData();
        }

    }, [isFocused, loder])

    const getActiveCompaniesData = useCallback(() => {
        dispatch(getActiveCompanies(setloder, 'bse', 'A', 'value'));
    }, []);

    useEffect(() => {
        if (isFocused) {
            dispatch({
                type: ALL_TYPE
            })
            dispatch({
                type: ALL_GROUP,
                data: GroupMasterForDomesticIndex
            })
        } else {
            setbseAndNsee('BSE');
        }
    }, [isFocused])

    const nn = ActiveCompaniesType.filter(item => item.isChecked)
    const nn1 = ActiveCompaniesGroup.filter(item => item.isChecked)

    useEffect(() => {
        if (bseAndNse === 'BSE') {
            dispatch(getGroupMsterForDomesticIndex(authToken, 'bse', 'activecompanies'));
        } else {
            dispatch(getGroupMsterForDomesticIndex(authToken, 'nse', 'activecompanies'));
        }
    }, [bseAndNse])

    useEffect(() => {
        if ((GroupMasterForDomesticIndex.length > 0)) {
            // console.log("@@!@!@ GROUP MASTER: ", GroupMasterForDomesticIndex[0]);
            // const exchange = GroupMasterForDomesticIndex[0]['exchange'];
            dispatch({
                type: ALL_GROUP,
                data: GroupMasterForDomesticIndex
            })
        }
    }, [GroupMasterForDomesticIndex]);

    useEffect(() => {
        if (ActiveCompaniesGroup.length > 0 && !loder) {
            // console.log("^^^^^^^ CURRENT SELECTION: ", currentSelection.exchange.toLowerCase(), currentSelection.Group, type)
            switchExchange();
        }
    }, [ActiveCompaniesGroup, switchExchange]);

    const switchExchange = useCallback(() => {
        const currentSelection = nn1[0];
        const type = 'value';
        dispatch(getActiveCompanies(setloder, currentSelection.exchange.toLowerCase(), currentSelection.Group, type))
    }, [nn, nn1]);

    const bottomSheetRef = useRef(null);
    const bottomSheetRef1 = useRef(null);

    const getDataType = (id) => {
        bottomSheetRef.current.close()
        const currentSelection = ActiveCompaniesType.find((item) => item.id === id);
        // console.log("@!@!*(*( GET DATA TYPE: ", bseAndNse.toLowerCase(), nn1[0].Group, currentSelection.value)
        if (id === nn[0]['id']) {
            return
        }
        dispatch({
            type: ALL_TYPE_IS_SELECTED,
            payload: {
                id: id
            }
        })
        dispatch(getActiveCompanies(setloder, bseAndNse.toLowerCase(), nn1[0].Group, 'value'))
    }

    const getDataType1 = (id) => {
        bottomSheetRef1.current.close();
        const groupName = ActiveCompaniesGroup[id]['Group'];
        const previousGroupName = nn1[0]['Group']
        if (groupName === previousGroupName) {
            return;
        }
        dispatch({
            type: ALL_GROUP_IS_SELECTED,
            payload: {
                id: id
            }
        })
        dispatch(getActiveCompanies(setloder, bseAndNse.toLowerCase(), groupName, 'value'))
    }

    return (
        <>
            <View style={{ height: 20 }}></View>

            <>
                {loder ? <DataLoder /> : (
                    <>
                        <View style={[styles.container, { justifyContent: 'center' }]}>

                            <View style={{ width: '70%', height: '100%' }}>
                                {/* <LeftDropDownButton
                                    onPress={() => {
                                        bottomSheetRef.current.snapToIndex(2)
                                    }}
                                    value={nn[0]?.name}
                                /> */}
                                <GroupTaggleButton
                                    onPress={() => {
                                        bottomSheetRef1.current.snapToIndex(2)
                                    }}
                                    value={nn1[0]?.Group}
                                />

                            </View>
                            <View style={{ width: '30%', height: '100%', alignItems: 'flex-end' }}>
                                <BseAndNse bseAndNse={bseAndNse}
                                    bse={() => setbseAndNsee('BSE')}
                                    nse={() => setbseAndNsee('NSE')} />
                            </View>
                        </View>
                        {/* <View style={styles.container}>


                        </View> */}

                        <FlatList
                            contentContainerStyle={{ paddingBottom: 230 }}
                            showsVerticalScrollIndicator={false}
                            data={ActiveCompanies}
                            keyExtractor={(item, i) => i.toString()}
                            renderItem={({ item }) => {
                                //  console.log(item?.close_price)
                                return (
                                    <IndexItem
                                        data={item}
                                        title={item?.lname.length > 18 ? `${item?.lname.substring(0, 18)}...` : item?.lname}
                                        price={Math.abs(Number(item?.PrevClose.toFixed(2)))}
                                        color={item?.perchg > 0 ? "green" : "red"}
                                        volume={item.close_price ? item.close_price : item.Close_price}
                                        volume1={item?.vol_traded}
                                        senSExType={`${item?.Stk_Exchange}:`}

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
                    data={ActiveCompaniesType}
                    onPress={getDataType}
                    bottomSheetRef={bottomSheetRef}
                />
                <BottomSheetView1
                    data={ActiveCompaniesGroup}
                    onPress={getDataType1}
                    bottomSheetRef1={bottomSheetRef1}
                />


            </>

        </>
    )
}

export default connect(null, {})(ActiveCompaniesPage)

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