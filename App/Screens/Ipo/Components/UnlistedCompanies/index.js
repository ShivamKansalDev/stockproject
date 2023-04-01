import { StyleSheet, FlatList, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import DataLoder from '../../../../Components/Lodder/DataLoder'
import IndexItem from '../IndexItem'
import NoDataViewFlatList from '../../../../Components/NoDataViewFlatList'
import moment from 'moment';
import { getUnlistedCompanies } from '../../../../Action/Unlisted'

const UnlistedCompanies = ({ getUnlistedCompanies }) => {
    const [loder, setloder] = useState(true)
    const { UnlistedCompanies } = useSelector(state => state.UnlistedCompanies)
    // console.log(UnlistedCompanies);



    useEffect(() => {
        getUnlistedCompanies(setloder)
    }, [])

    return (
        <>

            <View style={{ height: 20 }}>

            </View>

            {loder ? <DataLoder /> : (
                <>



                    <FlatList

                        showsVerticalScrollIndicator={false}
                        data={UnlistedCompanies}
                        keyExtractor={(item, i) => i.toString()}
                        renderItem={({ item }) => {

                            return (
                                <IndexItem
                                    data={item}
                                    title={item?.lname.length > 18 ? `${item?.lname.substring(0, 18)}...` : item?.lname}
                                    price={item?.closdate && item.closdate !== null ? moment(item?.closdate).format('Do MMM, h:mm') : 'N/A'}
                                    color={item?.PerChange > 0 ? "green" : "red"}
                                    volume={item?.opendate && item.opendate !== null ? moment(item?.opendate).format('Do MMM, h:mm') : 'N/A'}
                                    volume1={`Open`}
                                    senSExType={``}


                                    percent={'Close'}
                                    date={item?.dpdate ? moment(item?.dpdate).format('Do MMM, h:mm') : moment(item?.dpdate).format('Do MMM, h:mm')}
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

export default connect(null, { getUnlistedCompanies })(UnlistedCompanies)

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingRight: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        paddingBottom: 10
    }
})