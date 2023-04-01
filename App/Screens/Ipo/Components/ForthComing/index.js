import { StyleSheet, FlatList, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import IndexItem from '../IndexItem'
import BseAndNse from '../BseAndNse'
import { getForthComing, getOpenIpo } from '../../../../Action/Unlisted'
import { connect, useSelector } from 'react-redux'
import DataLoder from '../../../../Components/Lodder/DataLoder'

import NoDataViewFlatList from '../../../../Components/NoDataViewFlatList'
import moment from 'moment';


const ForthComing = ({ getForthComing }) => {
    const [loder, setloder] = useState(true)
    const [bseAndNse, setbseAndNsee] = useState('BSE')
    const { ForthComing } = useSelector(state => state.ForthComing)
    const { isLoding } = useSelector(state => state.ForthComing)

    useEffect(() => {
        getForthComing(setloder, 'bse')
    }, [])

    useEffect(() => {
        getForthComing(setloder, bseAndNse.toLowerCase());
    }, [bseAndNse]);

    return (
        <>

            <View style={{ height: 20 }}>

            </View>

            {isLoding ? <DataLoder /> : (
                <>
                    <View style={styles.container}>

                        <View style={{ width: '70%', height: '100%' }}>


                        </View>
                        <View style={{ width: '30%', height: '100%', alignItems: 'flex-end' }}>
                            <BseAndNse bseAndNse={bseAndNse}
                                bse={() => setbseAndNsee('BSE')}
                                nse={() => setbseAndNsee('NSE')} />
                        </View>
                    </View>
                    <View style={styles.container}>


                    </View>

                    <FlatList

                        showsVerticalScrollIndicator={false}
                        data={ForthComing}
                        keyExtractor={(item, i) => i.toString()}
                        renderItem={({ item }) => {

                            return (
                                <IndexItem
                                    data={item}
                                    title={item?.LNAME.length > 18 ? `${item?.LNAME.substring(0, 18)}...` : item?.LNAME}

                                    price={item?.ISSUEPRI2}
                                    color={item?.IssueSize > 0 ? "green" : "red"}
                                    volume={item.ISSUEPRICE ? item.ISSUEPRICE : item.ISSUEPRICE}
                                    volume1={`${item?.DaysLeft} days`}
                                    senSExType={`${bseAndNse}`}

                                    percent={moment(item?.CLOSDATE).format('Do MMM, h:mm')}
                                    date={item?.CLOSDATE ? moment(item?.CLOSDATE).format('Do MMM, h:mm') : moment(item?.CLOSDATE).format('Do MMM, h:mm')}
                                />
                            )
                        }}


                        ListEmptyComponent={() => {
                            return <NoDataViewFlatList />;
                        }}
                    />
                </>

            )}





        </>


    )
}

export default connect(null, { getForthComing })(ForthComing)

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingRight: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        paddingBottom: 10
    }
})