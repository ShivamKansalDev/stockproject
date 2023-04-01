import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import {
    getdomesticIndex,
    getDometIndexCompanyName,
} from '../../../../Action/ListedCompanyList';
import IndexItem from './IndexItem';
import NoDataViewFlatList from '../../../../Components/NoDataViewFlatList';

import moment from 'moment';
import DataLoder from '../../../../Components/Lodder/DataLoder';
import { getGroupMsterForDomesticIndex } from '../../../../Action/GroupMasterForDomesticIndex';
import { warinng } from '../../../../Components/Helper';
import { getDomesticCompanyNameLawerTwo } from '../../../../Action/ListedCompanyListLawer2';
import BottemSheetView from './BottemSheetView';

const DomesticIndex = ({ getdomesticIndex, getDomesticCompanyNameLawerTwo }) => {
    const { DomesticIndex } = useSelector(state => state.DomesticIndex);
    const { GroupMasterForDomesticIndex } = useSelector(
        state => state.GroupMasterForDomesticIndex,
    );
    const [loder, setloder] = useState(true);
    const [loder1, setloder1] = useState(true);
    const userDetails = useSelector(state => state.User)

    const authToken = userDetails?.authToken;
    //  console.log(DomesticIndex,'DomesticIndex')

    useEffect(() => {
        getdomesticIndex(setloder);
    }, []);

    //==========
    const getDometIndexCompanyNameLawer2 = id => {
        // console.log('$$$$####', id);
        const indexId = GroupMasterForDomesticIndex.find(
            item => item.Indexcode == id,
        );
        // return;
        if (indexId) {
            const exchange = indexId.exchange;
            const group = indexId.Group;

            setloder1(true);
            getDomesticCompanyNameLawerTwo(exchange, group, setloder1, bottosheetRef, authToken);
        } else {
            warinng('Not Found');
        }
    };

    //==========
    const bottosheetRef = useRef(null);
    return (
        <>
            <View style={{ height: 20 }}></View>
            {loder ? (
                <DataLoder />
            ) : (
                <>
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 230 }}
                        showsVerticalScrollIndicator={false}
                        data={DomesticIndex}
                        keyExtractor={(item, i) => i.toString()}
                        renderItem={({ item }) => {
                            return (
                                <IndexItem
                                    onPress={() => getDometIndexCompanyNameLawer2(item.co_code)}
                                    title={
                                        item?.lname.length > 18
                                            ? `${item?.lname.substring(0, 18)}...`
                                            : item?.lname
                                    }
                                    // price={Math.abs(Number(item?.PriceDiff.toFixed(2)))}
                                    price={Math.abs(item?.PriceDiff.toFixed(2))}
                                    color={item?.Change > 0 ? 'green' : 'red'}
                                    // volume={Math.abs(Number(item?.Last.toFixed(2)))}
                                    volume={item?.Last.toFixed(2)}
                                    // volume1={Math.abs(Number(item?.Open.toFixed(2)))}
                                    volume1={item?.Open.toFixed(2)}
                                    senSExType={`${item?.Exchange}:`}
                                    percent={
                                        item?.Change > 0
                                            ? `+${Number(item?.Change.toFixed(2))}`
                                            : `${Number(item?.Change.toFixed(2))}`
                                    }
                                    date={moment(item?.upd_time).format('Do MMM, h:mm')}
                                    coCode={item.co_code}
                                />
                            );
                        }}
                        ListEmptyComponent={() => {
                            return <NoDataViewFlatList />;
                        }}
                    />
                    <BottemSheetView loder1={loder1} bottosheetRef={bottosheetRef} />
                </>
            )}
        </>
    );
};

export default connect(null, {
    getdomesticIndex,

    getDomesticCompanyNameLawerTwo,
})(DomesticIndex);

const styles = StyleSheet.create({});
