import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native';
import React, { useMemo, useRef, useEffect, useState, useCallback } from 'react';

import BottomSheet, {
    BottomSheetModal,
    BottomSheetBackdrop,
    BottomSheetFlatList,
    BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
// import {
//     ALL_LIST,
//     IS_SELECTED,
//     FILTER_LIST,
// } from '../../ActionType/BottoSheetDataList';
// import { listed_individual_score_card } from '../../Utils/listedCheck';

const BottomSheetView3 = ({
    bottomSheetRef,
    counntData = [],
    data = [],
    onPress,
    onPress1,
}) => {

    const snapPoints = useMemo(() => ['10%', '50%', '60%'], []);
    //selector data
    const { CheckList1 } = useSelector(state => state.CheckList);
    // const counntData = BottoSheetDataListAll.filter(item => item.isChecked)
    console.log(CheckList1, 'CheckList1');
    const [valid, setValid] = useState(true);
    // renders
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

    // console.log("@!@!@ ", JSON.stringify(counntData, null, 4))

    return (
        <>
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                onChange={handleSheetChanges}
                enablePanDownToClose={true}>
                <View style={styles.titilview}>
                    <Text style={{ color: counntData.length == 10 ? 'black' : 'red' }}>
                        More Data Points {counntData.length} of 24
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            onPress1();
                            // dispatch({
                            //   type: FILTER_LIST
                            // })
                            // bottomSheetRef.current.close()
                        }}
                        style={{
                            width: 60,
                            height: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                            opacity: counntData.length == 10 ? 0.9 : 0.3,
                            borderRadius: 10,
                            backgroundColor: '#0F9764',
                        }}
                        disabled={counntData.length == 10 ? false : true}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Add</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    <BottomSheetScrollView>
                        {data.length > 0 &&
                            data.map((item, i) => {
                                return (
                                    <View key={i} style={styles.flatItem}>
                                        <View style={styles.flatItemLeft}>
                                            <Text style={{ color: 'black', marginLeft: 8 }}>
                                                {item?.label}{' '}
                                            </Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                // console.log(item.value)
                                                onPress(item?.value);
                                            }}
                                            style={styles.flatItemRight}>
                                            {CheckList1.includes(item?.value) ? (
                                                <Ionicons
                                                    name="checkmark-circle-outline"
                                                    size={24}
                                                    color="#098C26"
                                                />
                                            ) : (
                                                <FontAwesome
                                                    name="circle-thin"
                                                    size={24}
                                                    color="#686868"
                                                />
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                );
                            })}
                    </BottomSheetScrollView>
                    {/* <BottomSheetFlatList
            
            contentContainerStyle={{flex:1}}
            data={data1}
            
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, i}) => {
              return (
               
              );
            }}
           
          /> */}
                </View>
            </BottomSheet>
        </>
    );
};

export default BottomSheetView3;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    titilview: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,

        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    flatItem: {
        width: '100%',
        height: 30,
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
