
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { StyleSheet, FlatList, View } from 'react-native';
import { connect, useSelector, useDispatch } from 'react-redux'
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';

import { get52weekHigh } from '../../../../Action/ListedCompanyList'
import IndexItem from '../IndexItem'
import NoDataViewFlatList from '../../../../Components/NoDataViewFlatList'
import BottomSheetView1 from '../BottomSheetView1'
import DataLoder from '../../../../Components/Lodder/DataLoder'
import BseAndNse from '../BseAndNse'

import {
    HIGH_WEEK_52_ALL_GROUP_NAME,
    HIGH_WEEK_52_ALL_GROUP_IS_SELETED
} from '../../../../ActionType/ListedCompanyList/HighWeek52';

// import LeftDropDownButton from '../LeftDropDownButton'
import GroupTaggleButton from '../GroupTaggleButton'
import { getGroupMsterForDomesticIndex } from '../../../../Action/GroupMasterForDomesticIndex'



const HighWeek52 = ({ }) => {
    const dispatch = useDispatch()
    const { WeekHigh52 } = useSelector(state => state.WeekHigh52)
    const { GroupMasterForDomesticIndex } = useSelector(state => state.GroupMasterForDomesticIndex)
    const [loder, setloder] = useState(true)
    const [bseAndNse, setbseAndNsee] = useState('BSE')
    const { SeletedG52h } = useSelector(state => state.WeekHigh52GroupType)
    const userDetails = useSelector((state) => state.User);

    const isFocused = useIsFocused();
    const authToken = userDetails?.authToken;

    useEffect(() => {
        if (isFocused) {
            dispatch(get52weekHigh(setloder, 'bse', 'A', 10));
            dispatch({
                type: HIGH_WEEK_52_ALL_GROUP_NAME,
                data: GroupMasterForDomesticIndex
            })
        } else {
            setbseAndNsee('BSE');
        }
    }, [isFocused])

    useEffect(() => {
        if (bseAndNse === 'BSE') {
            dispatch(getGroupMsterForDomesticIndex(authToken, 'bse', 'highweek52'));
        } else {
            dispatch(getGroupMsterForDomesticIndex(authToken, 'nse', 'highweek52'));
        }
    }, [bseAndNse])

    useEffect(() => {
        if ((GroupMasterForDomesticIndex.length > 0)) {
            dispatch({
                type: HIGH_WEEK_52_ALL_GROUP_NAME,
                data: GroupMasterForDomesticIndex
            })
        }
    }, [GroupMasterForDomesticIndex]);

    const nn1 = SeletedG52h.filter(item => item.isChecked)

    useEffect(() => {
        if (SeletedG52h.length > 0 && !loder) {
            // console.log("^^^^^^^ CURRENT SELECTION: ", currentSelection.exchange.toLowerCase(), currentSelection.Group, type)
            switchExchange();
        }
    }, [SeletedG52h, switchExchange, loder]);

    const switchExchange = useCallback(() => {
        const currentSelection = nn1[0];
        dispatch(get52weekHigh(setloder, currentSelection.exchange.toLowerCase(), currentSelection.Group, 10))
    }, [nn1]);


    const bottomSheetRef1 = useRef(null)

    const getDataType1 = (id) => {
        bottomSheetRef1.current.close();
        const groupName = SeletedG52h[id]['Group'];
        const previousGroupName = nn1[0]['Group']
        if (groupName === previousGroupName) {
            return;
        }
        dispatch({
            type: HIGH_WEEK_52_ALL_GROUP_IS_SELETED,
            payload: {
                id: id
            }
        })
        dispatch(get52weekHigh(setloder, bseAndNse.toLowerCase(), groupName, 10))
    }

    return (
        <>
            <View style={{ height: 20 }}></View>
            {loder ? <DataLoder /> : (
                <>
                    <View style={styles.container}>

                        <View style={{ width: '70%', height: '100%' }}>
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
                        data={WeekHigh52}
                        keyExtractor={(item, i) => i.toString()}
                        renderItem={({ item }) => {

                            return (
                                <IndexItem
                                    data={item}
                                    title={item?.lname.length > 18 ? `${item?.lname.substring(0, 18)}...` : item?.lname}
                                    price={item?.Low}
                                    color={item?.pChange > 0 ? "green" : "red"}
                                    volume={item?.Price}
                                    volume1={item?.Volume}
                                    senSExType={item?.Symbol}
                                    // percent={Math.abs(Number(item?.pChange.toFixed(2)))}
                                    percent={item?.pChange > 0 ? `+${(Number(item?.pChange.toFixed(2)))}%` : `${(Number(item?.pChange.toFixed(2)))}%`}
                                    date={moment(item?.Upd_Time).format('Do MMM, h:mm')}
                                />
                            )
                        }}


                        ListEmptyComponent={() => {
                            return <NoDataViewFlatList />;
                        }}
                    />
                    <BottomSheetView1
                        data={SeletedG52h}
                        onPress={getDataType1}
                        bottomSheetRef1={bottomSheetRef1}
                    />
                </>
            )}
        </>
    )
}

export default connect(null, {})(HighWeek52)

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