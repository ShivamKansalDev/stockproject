




import { StyleSheet, FlatList, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import IndexItem from '../IndexItem'
import BseAndNse from '../BseAndNse'
import { getNewListing } from '../../../../Action/Unlisted'
import { connect, useSelector } from 'react-redux'
import DataLoder from '../../../../Components/Lodder/DataLoder'

import NoDataViewFlatList from '../../../../Components/NoDataViewFlatList'
import moment from 'moment';
const NewListing = ({ getNewListing }) => {
    const [loder, setloder] = useState(true)
    const [bseAndNse, setbseAndNsee] = useState('BSE')


    const { NewListing } = useSelector(state => state.NewListing)
    // console.log(NewListing,'NewListing')



    const bse = () => {

        getNewListing(setloder, 'bse')
        setbseAndNsee('BSE')
    }
    const nse = () => {

        getNewListing(setloder, 'nse')
        setbseAndNsee('NSE')
    }
    useEffect(() => {
        getNewListing(setloder, 'bse')
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
                        data={NewListing}
                        keyExtractor={(item, i) => i.toString()}
                        renderItem={({ item }) => {

                            return (
                                <IndexItem
                                    data={item}
                                    title={item?.CO_NAME.length > 18 ? `${item?.CO_NAME.substring(0, 18)}...` : item?.CO_NAME}

                                    price={item?.LISTPRICE}
                                    color={item?.PerChange > 0 ? "green" : "red"}
                                    volume={item.OfferPrice ? item.OfferPrice : item.OfferPrice}
                                    volume1={`size${item?.IssueSize}`}
                                    senSExType={`${bseAndNse}:`}


                                    percent={item?.PerChange > 0 ? `+${(Number(item?.PerChange.toFixed(2)))}%` : `${(Number(item?.PerChange.toFixed(2)))}%`}
                                    date={item?.LISTDATE ? moment(item?.LISTDATE).format('Do MMM, h:mm') : moment(item?.LISTDATE).format('Do MMM, h:mm')}
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

export default connect(null, { getNewListing })(NewListing)

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingRight: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        paddingBottom: 10
    }
})