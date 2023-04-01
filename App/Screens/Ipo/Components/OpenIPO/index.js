


import { StyleSheet, FlatList, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import IndexItem from '../IndexItem'
import BseAndNse from '../BseAndNse'
import { getOpenIpo } from '../../../../Action/Unlisted'
import { connect, useSelector } from 'react-redux'
import DataLoder from '../../../../Components/Lodder/DataLoder'

import NoDataViewFlatList from '../../../../Components/NoDataViewFlatList'
import moment from 'moment';
const OpenIPO = ({ getOpenIpo }) => {
    const [loder, setloder] = useState(true)
    const [bseAndNse, setbseAndNsee] = useState('NSE')


    const { OpenIPO } = useSelector(state => state.OpenIPO)



    const bse = () => {

        getOpenIpo(setloder, 'bse')
        setbseAndNsee('BSE')
    }
    const nse = () => {

        getOpenIpo(setloder, 'nse')
        setbseAndNsee('NSE')
    }
    useEffect(() => {
        getOpenIpo(setloder, 'nse')
    }, [])




    return (
        <>

            <View style={{ height: 20 }}>

            </View>

            {loder ? <DataLoder /> : (
                <>
                    <View style={styles.container}>

                        <View style={{ width: '70%', height: '100%' }}>


                        </View>
                        <View style={{ width: '30%', height: '100%', alignItems: 'flex-end' }}>
                            <BseAndNse bseAndNse={bseAndNse}
                                bse={bse}
                                nse={nse} />
                        </View>
                    </View>
                    <View style={styles.container}>


                    </View>

                    <FlatList

                        showsVerticalScrollIndicator={false}
                        data={OpenIPO}
                        keyExtractor={(item, i) => i.toString()}
                        renderItem={({ item }) => {

                            return (
                                <IndexItem
                                    data={item}
                                    title={item?.lname.length > 18 ? `${item?.lname.substring(0, 18)}...` : item?.lname}

                                    price={item?.ISSUEPRI2}
                                    color={item?.IssueSize > 0 ? "green" : "red"}
                                    volume={item.ISSUEPRICE ? item.ISSUEPRICE : item.ISSUEPRICE}
                                    volume1={moment(item?.OPENDATE).format('Do MMM, h:mm')}
                                    senSExType={`${bseAndNse}:`}

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

export default connect(null, { getOpenIpo })(OpenIPO)

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingRight: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        paddingBottom: 10
    }
})