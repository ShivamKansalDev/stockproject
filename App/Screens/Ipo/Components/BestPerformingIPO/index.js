import { StyleSheet, FlatList, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import IndexItem from '../IndexItem';
import BseAndNse from '../BseAndNse';
import { getBestPerformingIPO } from '../../../../Action/Unlisted';
import { connect, useSelector } from 'react-redux';
import DataLoder from '../../../../Components/Lodder/DataLoder';

import NoDataViewFlatList from '../../../../Components/NoDataViewFlatList';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getListedSearchDetails } from '../../../../Action/ListedSearch';
import { getUnlistedSearchDetails } from '../../../../Action/UnlistedSearch';
import { getCompanyDetails, getPriceVolume, getScore, getEvent } from '../../../../Action/CompanyDetails';
import { getChecklist } from '../../../../Action/CheckList';
const BestPerformingIPO = ({
    getBestPerformingIPO,
    getListedSearchDetails,
    navigation,
    getUnlistedSearchDetails
}) => {
    const [loder, setloder] = useState(true);
    const [bseAndNse, setbseAndNsee] = useState('BSE');
    const dispatch = useDispatch();
    const { BestPerformingIPO } = useSelector(state => state.BestPerformingIPO);
    const userDetails = useSelector((state) => state.User)
    const authToken = userDetails?.authToken;
    // console.log(loder,'BestPerformingIPO')

    const bse = () => {
        getBestPerformingIPO(setloder, 'bse');
        setbseAndNsee('BSE');
    };
    const nse = () => {
        getBestPerformingIPO(setloder, 'nse');
        setbseAndNsee('NSE');
    };
    useEffect(() => {
        getBestPerformingIPO(setloder, 'bse');
    }, []);

    const getCompanyDetail = item => {
        console.log("@#@#@&*&*&*& LISTED ITEM: ", item)
        const startDate1 = moment(moment().subtract(10, 'days')).format(
            'DD-MMM-YYYY',
        );
        const endDate1 = moment(new Date()).format('DD-MMM-YYYY');
        dispatch(getCompanyDetails(item.co_code, authToken));

        dispatch(getPriceVolume('NSE', item.co_code, startDate1, endDate1, authToken));

        dispatch(getScore(item.co_code, authToken));
        dispatch(getEvent(item.co_code, authToken));
        dispatch(getChecklist(authToken));
        navigation.navigate('CompanyDetails', { co_code: item.co_code });
    };

    return (
        <>
            <View style={{ height: 20 }}></View>

            {loder ? (
                <DataLoder />
            ) : (
                <>
                    <View style={styles.container}>
                        <View style={{ width: '70%', height: '100%' }}></View>
                        <View
                            style={{ width: '30%', height: '100%', alignItems: 'flex-end' }}>
                            <BseAndNse bseAndNse={bseAndNse} bse={bse} nse={nse} />
                        </View>
                    </View>
                    <View style={styles.container}></View>

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={BestPerformingIPO}
                        keyExtractor={(item, i) => i.toString()}
                        renderItem={({ item }) => {
                            // console.log('@#@#@@# COMPANY: ', item);
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        if (item?.co_code) {
                                            console.log("@#@#@#@#@#@#@# UNLISTED DETAILS: ", item);
                                            getCompanyDetail(item)
                                            // getListedSearchDetails(item.co_code, navigation, authToken);
                                            // getUnlistedSearchDetails(item._id, navigation, authToken);
                                        } else {
                                            alert('Absent');
                                        }
                                    }}>
                                    <IndexItem
                                        data={item}
                                        title={
                                            item?.CO_NAME.length > 18
                                                ? `${item?.CO_NAME.substring(0, 18)}...`
                                                : item?.CO_NAME
                                        }
                                        price={Math.abs(Number(item?.listprice.toFixed(2)))}
                                        color={item?.pricediff > 0 ? 'green' : 'red'}
                                        volume={item.OfferPrice ? item.OfferPrice : item.OfferPrice}
                                        volume1={item?.LISTVOL}
                                        senSExType={`${bseAndNse}:`}
                                        percent={
                                            item?.pricediff > 0
                                                ? `+${Number(item?.pricediff.toFixed(2))}%`
                                                : `${Number(item?.pricediff.toFixed(2))}%`
                                        }
                                        date={
                                            item?.LISTDATE
                                                ? moment(item?.LISTDATE).format('Do MMM, h:mm')
                                                : moment(item?.LISTDATE).format('Do MMM, h:mm')
                                        }
                                    />
                                </TouchableOpacity>
                            );
                        }}
                        ListEmptyComponent={() => {
                            return <NoDataViewFlatList />;
                        }}
                    />
                </>
            )}
        </>
    );
};

export default connect(null, { getBestPerformingIPO, getListedSearchDetails, getUnlistedSearchDetails })(
    BestPerformingIPO,
);

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingRight: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        paddingBottom: 10,
    },
});
