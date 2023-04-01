import React, { useEffect, useState, useRef, useCallback } from 'react'
import { StyleSheet, TouchableOpacity, FlatList, Image, Text, View } from 'react-native';
import { connect, useSelector, useDispatch } from 'react-redux'
import { useIsFocused } from '@react-navigation/native';

import { get52weekLow } from '../../../../Action/ListedCompanyList'
import IndexItem from '../IndexItem'
import NoDataViewFlatList from '../../../../Components/NoDataViewFlatList'
import BottomSheetView1 from '../BottomSheetView1'
import moment from 'moment';
import DataLoder from '../../../../Components/Lodder/DataLoder'
import BseAndNse from '../BseAndNse'
import { WEEK_LOW_52_ALL_GROUP_NAME, WEEK_LOW_52_ALL_GROUP_IS_SELETED } from '../../../../ActionType/ListedCompanyList/WeekLow52';
import GroupTaggleButton from '../GroupTaggleButton'
import { getGroupMsterForDomesticIndex } from '../../../../Action/GroupMasterForDomesticIndex'


const LowWeek52 = ({ }) => {
    const { WeekLow52 } = useSelector(state => state.WeekLow52)
    const dispatch = useDispatch()
    const { SeletedG52L } = useSelector(state => state.WeekLow52GroupType) //SeletedDayGn
    const { GroupMasterForDomesticIndex } = useSelector(state => state.GroupMasterForDomesticIndex);
    const [loder, setloder] = useState(true)
    const [bseAndNse, setbseAndNsee] = useState('BSE');
    const userDetails = useSelector((state) => state.User)
    const isFocused = useIsFocused();

    const authToken = userDetails?.authToken;

    useEffect(() => {
        if (isFocused) {
            dispatch(get52weekLow(setloder, 'bse', 'A', 10));
            dispatch({
                type: WEEK_LOW_52_ALL_GROUP_NAME,
                data: GroupMasterForDomesticIndex
            })
        } else {
            setbseAndNsee('BSE');
        }
    }, [isFocused])

    const nn1 = SeletedG52L.filter(item => item.isChecked)

    useEffect(() => {
        if (bseAndNse === 'BSE') {
            dispatch(getGroupMsterForDomesticIndex(authToken, 'bse', 'lowWeek52'));
        } else {
            dispatch(getGroupMsterForDomesticIndex(authToken, 'nse', 'lowWeek52'));
        }
    }, [bseAndNse])

    useEffect(() => {
        if ((GroupMasterForDomesticIndex.length > 0)) {
            // console.log("@@!@!@ GROUP MASTER: ", GroupMasterForDomesticIndex[0]);
            // const exchange = GroupMasterForDomesticIndex[0]['exchange'];
            dispatch({
                type: WEEK_LOW_52_ALL_GROUP_NAME,
                data: GroupMasterForDomesticIndex
            })
        }
    }, [GroupMasterForDomesticIndex])

    useEffect(() => {
        if (SeletedG52L.length > 0 && !loder) {
            // console.log("^^^^^^^ CURRENT SELECTION: ", currentSelection.exchange.toLowerCase(), currentSelection.Group, type)
            switchExchange();
        }
    }, [SeletedG52L, switchExchange, loder]);

    const switchExchange = useCallback(() => {
        const currentSelection = nn1[0];
        dispatch(get52weekLow(setloder, currentSelection.exchange.toLowerCase(), currentSelection.Group, 10))
    }, [nn1]);

    const bottomSheetRef1 = useRef(null)

    const getDataType1 = (id) => {
        bottomSheetRef1.current.close();
        const groupName = SeletedG52L[id]['Group'];
        const previousGroupName = nn1[0]['Group']
        if (groupName === previousGroupName) {
            return;
        }
        dispatch({
            type: WEEK_LOW_52_ALL_GROUP_IS_SELETED,
            payload: {
                id: id
            }
        })
        dispatch(get52weekLow(setloder, bseAndNse.toLowerCase(), groupName, 10))
    }
    //=======


    return (
        <>
            <View style={{ height: 20 }}></View>
            {loder ? <DataLoder /> : (
                <><View style={styles.container}>

                    <View style={{ width: '70%', height: '100%' }}>
                        {/* <TouchableOpacity
            onPress={() => {
             // bottomSheetRef.current.snapToIndex(2)
            }}
            style={{...styles.seletexBox,width:100}}>
            <Text style={{ color: '#0D0D0D' }}>{nn[0]?.name}</Text>
            <View style={{
              width: 20, height: 20, backgroundColor: "#0F976480", borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Octicons name="check" size={12} color="#0F9764" />
            </View>
          </TouchableOpacity> */}
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
                        data={WeekLow52}
                        keyExtractor={(item, i) => i.toString()}
                        renderItem={({ item }) => {

                            return (
                                <IndexItem
                                    data={item}
                                    title={item?.Co_Name.length > 18 ? `${item?.Co_Name.substring(0, 18)}...` : item?.Co_Name}
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
                </>)}
            <BottomSheetView1
                data={SeletedG52L}
                onPress={getDataType1}
                bottomSheetRef1={bottomSheetRef1}
            />
        </>
    )
}

export default connect(null, {})(LowWeek52)

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