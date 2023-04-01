


import React, { useEffect, useState, useRef, useCallback } from 'react'
import { StyleSheet, TouchableOpacity, FlatList, Image, Text, View } from 'react-native';
import { connect, useSelector, useDispatch } from 'react-redux'
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';

import { getAllLow } from '../../../../Action/ListedCompanyList'
import IndexItem from '../IndexItem'
import NoDataViewFlatList from '../../../../Components/NoDataViewFlatList'

import DataLoder from '../../../../Components/Lodder/DataLoder'

import BseAndNse from '../BseAndNse'
import BottomSheetView from '../BottomSheetView'
import BottomSheetView1 from '../BottomSheetView1'
import LeftDropDownButton from '../LeftDropDownButton';
import GroupTaggleButton from '../GroupTaggleButton'
import {
    ALL_TIME_LOW_ALL_LIST, ALL_TIME_LOW_IS_SELETED,
    ALL_TIME_LOW_ALL_GROUP,
    ALL_TIME_LOW_IS_SELETED_GROUP
} from '../../../../ActionType/ListedCompanyList/AllLow';
import { getGroupMsterForDomesticIndex } from '../../../../Action/GroupMasterForDomesticIndex';
import { getWidthnHeight } from '../../../../Components/width';



const AllTimeLow = ({ }) => {
    const dispatch = useDispatch()
    const { AllLow } = useSelector(state => state.AllLow)
    const { AllTimeLowType = [] } = useSelector(state => state.AllTimeLow)
    const { AllTimeLowGroup = [] } = useSelector(state => state.AllTimeLowGroup)
    const { GroupMasterForDomesticIndex } = useSelector(state => state.GroupMasterForDomesticIndex)
    const [loder, setloder] = useState(true)
    const [bseAndNse, setbseAndNsee] = useState('BSE')
    const userDetails = useSelector((state) => state.User)
    const isFocused = useIsFocused();

    const authToken = userDetails?.authToken;

    useEffect(() => {
        if (isFocused) {
            dispatch(getAllLow(setloder, 'bse', 'life', 'A'));
            dispatch({
                type: ALL_TIME_LOW_ALL_LIST
            })
            dispatch({
                type: ALL_TIME_LOW_ALL_GROUP,
                data: GroupMasterForDomesticIndex
            })
        } else {
            setbseAndNsee('BSE');
        }
    }, [isFocused])

    const bottomSheetRef = useRef(null)
    const bottomSheetRef1 = useRef(null)

    const nn = AllTimeLowType.filter(item => item.isChecked)
    const nn1 = AllTimeLowGroup.filter(item => item.isChecked)

    useEffect(() => {
        if (bseAndNse === 'BSE') {
            dispatch(getGroupMsterForDomesticIndex(authToken, 'bse', 'allTimeLow'));
        } else {
            dispatch(getGroupMsterForDomesticIndex(authToken, 'nse', 'allTimeLow'));
        }
    }, [bseAndNse])

    useEffect(() => {
        if ((GroupMasterForDomesticIndex.length > 0)) {
            // console.log("@@!@!@ GROUP MASTER: ", GroupMasterForDomesticIndex[0]);
            // const exchange = GroupMasterForDomesticIndex[0]['exchange'];
            dispatch({
                type: ALL_TIME_LOW_ALL_GROUP,
                data: GroupMasterForDomesticIndex
            })
        }
    }, [GroupMasterForDomesticIndex])

    useEffect(() => {
        if (AllTimeLowGroup.length > 0 && AllTimeLowType.length > 0 && !loder) {
            // console.log("^^^^^^^ CURRENT SELECTION: ", currentSelection.exchange.toLowerCase(), currentSelection.Group, type)
            switchExchange();
        }
    }, [AllTimeLowGroup, switchExchange, AllTimeLowType, loder]);

    const switchExchange = useCallback(() => {
        const currentSelection = nn1[0];
        const type = nn[0].value;
        dispatch(getAllLow(setloder, currentSelection.exchange.toLowerCase(), type, currentSelection.Group))
    }, [nn, nn1]);

    const getDataType = (id) => {
        bottomSheetRef.current.close();
        const currentSelection = AllTimeLowType.find((item) => item.id === id);
        // console.log("@!@!*(*( GET DATA TYPE: ", bseAndNse.toLowerCase(), nn1[0].Group, currentSelection.value)
        if (id === nn[0]['id']) {
            return
        }
        dispatch({
            type: ALL_TIME_LOW_IS_SELETED,
            payload: {
                id: id
            }
        })
        dispatch(getAllLow(setloder, bseAndNse.toLowerCase(), currentSelection.value, nn1[0].Group))
    }
    const getDataGroup = (id) => {
        bottomSheetRef1.current.close();
        const groupName = AllTimeLowGroup[id]['Group'];
        const previousGroupName = nn1[0]['Group']
        if (groupName === previousGroupName) {
            return;
        }
        dispatch({
            type: ALL_TIME_LOW_IS_SELETED_GROUP,
            payload: {
                id: id
            }
        })
        dispatch(getAllLow(setloder, bseAndNse.toLowerCase(), nn[0]['value'], groupName))
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
                        data={AllLow}
                        keyExtractor={(item, i) => i.toString()}
                        renderItem={({ item }) => {

                            return (
                                <IndexItem
                                    data={item}
                                    title={item?.lname.length > 18 ? `${item?.lname.substring(0, 18)}...` : item?.lname}
                                    price={item?.Price}
                                    color={item?.pChange > 0 ? "green" : "red"}
                                    volume={item?.Price}
                                    volume1={item?.Volume}
                                    senSExType={item?.Symbol}

                                    percent={item?.pChange > 0 ? `+${(Number(item?.pChange.toFixed(2)))}%` : `${(Number(item?.pChange.toFixed(2)))}%`}
                                    date={moment(item?.Upd_Time).format('Do MMM, h:mm')}
                                />
                            )
                        }}


                        ListEmptyComponent={() => {
                            return <NoDataViewFlatList />;
                        }}
                    />
                    <BottomSheetView
                        data={AllTimeLowType}
                        onPress={getDataType}
                        bottomSheetRef={bottomSheetRef}
                    />
                    <BottomSheetView1
                        data={AllTimeLowGroup}
                        onPress={getDataGroup}
                        bottomSheetRef1={bottomSheetRef1}
                    />
                </>
            )}
        </>
    )
}

export default connect(null, {})(AllTimeLow)

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingRight: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        paddingBottom: 10
    }
})