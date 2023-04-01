



import { StyleSheet, Text, FlatList, TouchableOpacity, View } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import IndexItem from '../IndexItem'
import BseAndNse from '../BseAndNse'

import { getExchangeHolidays } from '../../../../Action/ListedCompanyList'
import { connect, useSelector, useDispatch } from 'react-redux'


import NoDataViewFlatList from '../../../../Components/NoDataViewFlatList'

import moment from 'moment';
import DataLoder from '../../../../Components/Lodder/DataLoder'








const ExchangeHolidays = ({ getExchangeHolidays }) => {



    const { ExchangeHolidays } = useSelector(state => state.ExchangeHolidays) //
    const [loder, setloder] = useState(true)
    const [bseAndNse, setbseAndNsee] = useState('BSE')
    // console.log(ExchangeHolidays,'ExchangeHolidays')

    //===========


    const bse = () => {
        getExchangeHolidays(setloder, 'bse')
        setbseAndNsee('BSE')
    }
    const nse = () => {

        getExchangeHolidays(setloder, 'nse')
        setbseAndNsee('NSE')
    }
    useEffect(() => {
        getExchangeHolidays(setloder, 'bse')
    }, [])



    //=======

    return (
        <>
            <View style={{ height: 20 }}></View>

            <>
                {loder ? <DataLoder /> : (
                    <>
                        {/* <View style={styles.container}>
              <View style={{ width: '70%', height: '100%' }}>
              </View>
              <View style={{ width: '30%', height: '100%', alignItems: 'flex-end' }}>
                <BseAndNse bseAndNse={bseAndNse}
                  bse={bse}
                  nse={nse} />
              </View>
            </View> */}
                        <View style={styles.container}>
                        </View>
                        <FlatList
                            contentContainerStyle={{ paddingBottom: 230 }}
                            showsVerticalScrollIndicator={false}
                            data={ExchangeHolidays}
                            keyExtractor={(item, i) => i.toString()}
                            renderItem={({ item }) => {
                                // console.log(item?.Close_price)
                                return (
                                    <View style={{
                                        width: "100%", marginBottom: 10,
                                        paddingHorizontal: 10,
                                        height: 30


                                    }}>
                                        <View style={{
                                            width: "100%", height: "100%", flexDirection: "row",


                                            borderLeftColor: '#12626C',
                                            borderLeftWidth: 2
                                        }}>
                                            <View style={{
                                                width: "80%", height: '100%',
                                                paddingHorizontal: 5,
                                                alignItems: 'center',
                                                flexDirection: 'row'
                                            }}>
                                                <Text>{moment(item?.HolidayDate).format('DD-MM-YY')}</Text>
                                                <Text style={{ marginLeft: 15 }}>{item?.Purpose}</Text>
                                            </View>
                                            <View style={{
                                                width: "30%", height: '100%',
                                                justifyContent: 'center',
                                            }}>
                                                <Text style={{}}> {item?.day}</Text>
                                            </View>


                                        </View>
                                    </View>
                                )
                            }}
                            ListEmptyComponent={() => {
                                return <NoDataViewFlatList />;
                            }}
                        />
                    </>

                )}

            </>
        </>
    )
}

export default connect(null, { getExchangeHolidays })(ExchangeHolidays)

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