import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native';
import React, { useMemo, useRef, useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetFlatList,
    BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, connect, useSelector } from 'react-redux';
import IndexItem from '../IndexItem';
import NoDataViewFlatList from '../../../../../Components/NoDataViewFlatList';
import DataLoder from '../../../../../Components/Lodder/DataLoder';
import {
    getCompanyDetails,
    getPriceVolume,
    getScore,
    getFinancial,
    getEvent,
} from '../../../../../Action/CompanyDetails';
import { useNavigation } from '@react-navigation/native';
import { getChecklist } from '../../../../../Action/CheckList';

const BottemSheetView = ({
    loder1,
    bottosheetRef,
    getCompanyDetails,
    getPriceVolume,
    getScore,
    getEvent,
    getChecklist,
    getFinancial,
}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const userDetails = useSelector((state) => state.User)

    const authToken = userDetails?.authToken;

    const snapPoints = useMemo(() => ['10%', '50%', '90%'], []);
    //selector data
    const data = [1, 2, 3, 4];
    const { DomesticIndexLayerTwo } = useSelector(
        state => state.DomesticIndexLayerTwo,
    );

    const renderBackdrop = useCallback(
        props => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={1}
                appearsOnIndex={2}
            />
        ),
        [],
    );

    // callbacks
    const handleSheetChanges = useCallback(index => {
        console.log('handleSheetChanges', index);
    }, []);

    const getDometIndexCompanyNameLawer2 = id => {
        console.log("@#@#@#@#@#@# DOMESTIC INDEX ID: ", id)
        const startDate1 = moment(moment().subtract(10, 'days')).format(
            'DD-MMM-YYYY',
        );
        const endDate1 = moment(new Date()).format('DD-MMM-YYYY');
        getCompanyDetails(id, authToken);

        getPriceVolume('NSE', id, startDate1, endDate1, authToken);

        getScore(id, authToken);
        getEvent(id, authToken);
        getChecklist(authToken);
        // getFinancial(authToken);

        bottosheetRef.current.close();
        navigation.navigate('CompanyDetails', { co_code: id });
    };
    return (
        <>
            <BottomSheet
                ref={bottosheetRef}
                index={-1}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                onChange={handleSheetChanges}
                enabledInnerScrolling={true}
                enabledContentGestureInteraction={false}
                animateOnMount
                animatedPosition={true}>
                {loder1 ? (
                    <DataLoder />
                ) : (
                    <>
                        <View style={styles.titilview}>
                            <TouchableOpacity
                                onPress={() => {
                                    bottosheetRef.current.close();
                                }}
                                style={{
                                    width: 20,
                                    height: 20,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'red',
                                    borderRadius: 10,
                                }}>
                                <Entypo name="cross" size={20} color="white" />
                            </TouchableOpacity>
                        </View>

                        <BottomSheetFlatList
                            data={DomesticIndexLayerTwo}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, i }) => {
                                // console.log(item?.change);
                                return (
                                    <IndexItem
                                        onPress={() => getDometIndexCompanyNameLawer2(item.co_code)}
                                        title={
                                            item?.Comp_Name.length > 18
                                                ? `${item?.Comp_Name.substring(0, 18)}...`
                                                : item?.Comp_Name
                                        }
                                        price={Math.abs(Number(item?.Pricediff.toFixed(2)))}
                                        color={item?.change > 0 ? 'green' : 'red'}
                                        volume={Math.abs(Number(item?.price.toFixed(2)))}
                                        volume1={Math.abs(Number(item?.Trd_Qty.toFixed(2)))}
                                        senSExType={`${item?.XCHNG}:`}
                                        percent={
                                            item?.change > 0
                                                ? `+${Number(item?.change.toFixed(2))}`
                                                : `${Number(item?.change.toFixed(2))}`
                                        }
                                        date={moment(item?.Upd_Time).format('Do MMM, h:mm')}
                                        coCode={item.co_code}
                                        ListEmptyComponent={() => {
                                            return <NoDataViewFlatList />;
                                        }}
                                    />
                                );
                            }}
                        />
                    </>
                )}
            </BottomSheet>
        </>
    );
};

export default connect(null, {
    getCompanyDetails,
    getPriceVolume,
    getEvent,
    getChecklist,
    getFinancial,
    getScore,
})(BottemSheetView);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
    },
    titilview: {
        width: '100%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 20,
    },
    flatItem: {
        width: '100%',
        height: 60,
        marginVertical: 1,
        flexDirection: 'row',
        marginVertical: 5,
    },
    flatItemLeft: {
        width: '90%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },
    flatItemRight: {
        width: '10%',
        height: '100%',
        justifyContent: 'center',
        paddingRight: 10,
    },
});
