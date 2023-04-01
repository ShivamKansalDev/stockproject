import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { getCompanyDetails, getPriceVolume, getScore, getEvent } from '../../../../Action/CompanyDetails';
import { getChecklist } from '../../../../Action/CheckList';

const IndexItem = ({
    color,
    title,
    price,
    volume,
    volume1,
    senSExType,
    percent,
    date,
    data = {}
}) => {
    // console.log(volume1);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.User)
    const authToken = userDetails?.authToken;

    const getCompanyDetail = item => {
        // if (item?.CO_CODE) {
        //     return;
        // }
        console.log("@#@#@&*&*&*& LISTED ITEM: ", item)
        const startDate1 = moment(moment().subtract(10, 'days')).format(
            'DD-MMM-YYYY',
        );
        const endDate1 = moment(new Date()).format('DD-MMM-YYYY');
        const co_code = (item?.CO_CODE) ? item?.CO_CODE : item.co_code
        // const co_code = item.co_code
        dispatch(getCompanyDetails(co_code, authToken));

        dispatch(getPriceVolume('NSE', co_code, startDate1, endDate1, authToken));

        dispatch(getScore(co_code, authToken));
        dispatch(getEvent(co_code, authToken));
        dispatch(getChecklist(authToken));
        navigation.navigate('ListedNavigator', {
            screen: 'CompanyDetails',
            params: { co_code: co_code },
            initial: false
        });
    }

    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    console.log("#$#$## ITEM: ", data)
                    getCompanyDetail(data)
                }}
                style={[styles.container, { borderWidth: 0, borderColor: 'red' }]}>
                <View style={{ ...styles.containerInner, borderLeftColor: color }}>
                    <View style={styles.innerLeft}>
                        <Text style={{ color: 'black', fontSize: 14 }}>{title}</Text>
                        <Text style={{ color: '#1B1C28', fontSize: 10 }}>
                            {senSExType} {date}
                        </Text>
                    </View>
                    <View style={styles.innerMiddle}>
                        <Text style={{ color: '#1B1C28', fontWeight: 'bold', fontSize: 12 }}>
                            {volume}
                        </Text>
                        <Text style={{ color: '#1B1C28', fontWeight: '500', fontSize: 10 }}>
                            {volume1}
                        </Text>
                    </View>
                    <View style={styles.innerRight}>
                        <View
                            style={{
                                width: '100%',
                                justifyContent: 'center',
                                height: '100%',
                                alignItems: 'flex-end',
                                paddingRight: 10,
                            }}>
                            <Text style={{ color: color, fontSize: 10 }}>{price}</Text>
                            <Text style={{ color: color, fontSize: 10 }}>{percent}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.lower}></View>
            </TouchableOpacity>
        </>
    );
};

export default IndexItem;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    containerInner: {
        width: '100%',
        flexDirection: 'row',
        height: 30,

        borderLeftWidth: 2.5,
    },
    innerLeft: {
        width: '45%',
        height: '100%',
        paddingLeft: 5,
        justifyContent: 'center',
    },
    innerMiddle: {
        width: '30%',
        height: '100%',
        justifyContent: 'center',
    },
    innerRight: {
        width: '25%',
        height: '100%',
        flexDirection: 'row',
    },
    lower: {
        height: 5,
        width: '100%',
        borderBottomColor: '#D9D9D9',
        borderBottomWidth: 1,
    },
});
