


import React, { useEffect, useState, useRef, useCallback } from 'react'
import { StyleSheet, FlatList, View } from 'react-native';
import { connect, useSelector, useDispatch } from 'react-redux'
import { useIsFocused } from '@react-navigation/native';
import { getAllHigh } from '../../../../Action/ListedCompanyList'
import IndexItem from '../IndexItem'
import NoDataViewFlatList from '../../../../Components/NoDataViewFlatList'

import BottomSheetView from '../BottomSheetView'
import BottomSheetView1 from '../BottomSheetView1'
import BseAndNse from '../BseAndNse'

import moment from 'moment';
import DataLoder from '../../../../Components/Lodder/DataLoder'
import {
    ALL_TIME_HIGH_ALL_LIST, ALL_TIME_HIGH_IS_SELETED,
    ALL_TIME_HIGH_ALL_GROUP_IS_SELETED,
    ALL_TIME_HIGH_ALL_GROUP
} from '../../../../ActionType/ListedCompanyList/AllHigh';
import LeftDropDownButton from '../LeftDropDownButton';
import GroupTaggleButton from '../GroupTaggleButton'
import { getGroupMsterForDomesticIndex } from '../../../../Action/GroupMasterForDomesticIndex'


const AllTimeHigh = ({ }) => {
    const dispatch = useDispatch()
    const { AllHigh } = useSelector(state => state.AllHigh)
    const { AllTimeHighType = [] } = useSelector(state => state.AllTimeHigh)
    const { AllTimeHighGroup = [] } = useSelector(state => state.AllTimeHighGroup)
    const { GroupMasterForDomesticIndex } = useSelector(state => state.GroupMasterForDomesticIndex)

    const [loder, setloder] = useState(true)
    const [bseAndNse, setbseAndNsee] = useState('BSE')
    const userDetails = useSelector((state) => state.User)
    const isFocused = useIsFocused();

    const authToken = userDetails?.authToken;

    const bottomSheetRef = useRef(null)
    const bottomSheetRef1 = useRef(null)

    useEffect(() => {
        if (isFocused) {
            dispatch(getAllHigh(setloder, 'bse', 'year', 'A'));
            dispatch({
                type: ALL_TIME_HIGH_ALL_LIST
            })
            dispatch({
                type: ALL_TIME_HIGH_ALL_GROUP,
                data: GroupMasterForDomesticIndex
            })
        } else {
            setbseAndNsee('BSE');
        }
    }, [isFocused])

    const nn = AllTimeHighType.filter(item => item.isChecked)
    const nn1 = AllTimeHighGroup.filter(item => item.isChecked)

    useEffect(() => {
        if (bseAndNse === 'BSE') {
            dispatch(getGroupMsterForDomesticIndex(authToken, 'bse', 'allTimeHigh'));
        } else {
            dispatch(getGroupMsterForDomesticIndex(authToken, 'nse', 'allTimeHigh'));
        }
    }, [bseAndNse])

    useEffect(() => {
        if ((GroupMasterForDomesticIndex.length > 0)) {
            // console.log("@@!@!@ GROUP MASTER: ", GroupMasterForDomesticIndex[0]);
            // const exchange = GroupMasterForDomesticIndex[0]['exchange'];
            dispatch({
                type: ALL_TIME_HIGH_ALL_GROUP,
                data: GroupMasterForDomesticIndex
            })
        }
    }, [GroupMasterForDomesticIndex])

    useEffect(() => {
        if (AllTimeHighGroup.length > 0 && AllTimeHighType.length > 0 && !loder) {
            // console.log("^^^^^^^ CURRENT SELECTION: ", currentSelection.exchange.toLowerCase(), currentSelection.Group, type)
            switchExchange();
        }
    }, [AllTimeHighGroup, switchExchange, AllTimeHighType, loder]);

    const switchExchange = useCallback(() => {
        const currentSelection = nn1[0];
        const type = nn[0].value;
        dispatch(getAllHigh(setloder, currentSelection.exchange.toLowerCase(), 'year', currentSelection.Group))
    }, [nn, nn1]);

    const getDataType = (id) => {
        bottomSheetRef.current.close();
        const currentSelection = AllTimeHighType.find((item) => item.id === id);
        // console.log("@!@!*(*( GET DATA TYPE: ", bseAndNse.toLowerCase(), nn1[0].Group, currentSelection.value)
        if (id === nn[0]['id']) {
            return
        }
        dispatch({
            type: ALL_TIME_HIGH_IS_SELETED,
            payload: {
                id: id
            }
        })
        dispatch(getAllHigh(setloder, bseAndNse.toLowerCase(), 'year', nn1[0].Group))
    }

    const getDataGroup = (id) => {
        bottomSheetRef1.current.close();
        const groupName = AllTimeHighGroup[id]['Group'];
        const previousGroupName = nn1[0]['Group']
        if (groupName === previousGroupName) {
            return;
        }
        dispatch({
            type: ALL_TIME_HIGH_ALL_GROUP_IS_SELETED,
            payload: {
                id: id
            }
        })
        console.log("^^^^^^#### ALL HIGH API: ", bseAndNse.toLowerCase(), 'year', groupName)
        dispatch(getAllHigh(setloder, bseAndNse.toLowerCase(), 'year', groupName))
    }

    return (
        <>
            <View style={{ height: 20 }}></View>
            {loder ? <DataLoder /> : (
                <>
                    <View style={styles.container}>

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
                        <GroupTaggleButton
                            onPress={() => {
                                bottomSheetRef1.current.snapToIndex(2)
                            }}
                            value={nn1[0]?.Group}
                        />

                    </View> */}

                    <FlatList
                        contentContainerStyle={{ paddingBottom: 230 }}
                        showsVerticalScrollIndicator={false}
                        data={AllHigh}
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
                                    senSExType={item.Symbol}

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
                        data={AllTimeHighType}
                        onPress={getDataType}
                        bottomSheetRef={bottomSheetRef}
                    />
                    <BottomSheetView1
                        data={AllTimeHighGroup}
                        onPress={getDataGroup}
                        bottomSheetRef1={bottomSheetRef1}
                    />
                </>
            )}
        </>
    )
}

export default connect(null, {})(AllTimeHigh)

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