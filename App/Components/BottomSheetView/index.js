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
import { useSelector, useDispatch } from 'react-redux';
import { ALL_LIST, IS_SELECTED, FILTER_LIST } from '../../ActionType/BottoSheetDataList';


const BottomSheetView1 = ({

    bottomSheetRef,
    counntData,
    data = [],
    onPress,
    onPress1

}) => {
    const dispatch = useDispatch();
    const [updateData, setUpdateData] = useState([]);

    const snapPoints = useMemo(() => ['10%', '50%', '60%'], []);
    //selector data

    // const { BottoSheetDataListAll } = useSelector(state => state.BottoSheetDataList)
    // const counntData = BottoSheetDataListAll.filter(item => item.isChecked)
    //  console.log(counntData.length);
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
        []
    )


    // callbacks
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            const removeItem = ['Companies With Financials', 'Status Wise', 'Most Viewed', 'Class Wise'];
            let filterData = [];
            filterData = data.filter((item) => {
                // console.log("!!@!@!@ ALL ITEMS: ", item.name)
                const search = removeItem.find((name) => {
                    return name.toLowerCase() === item.name.trim().toLowerCase()
                })
                if (!!search) {
                    return false
                } else {
                    return true
                }
            })
            setUpdateData(filterData)
        }
    }, [data])


    return (
        <>

            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                onChange={handleSheetChanges}
            >
                <View style={styles.titilview}>
                    <Text style={{ color: counntData.length == 4 ? 'black' : "red" }}>More Data Points {counntData.length} of 4</Text>
                    <TouchableOpacity
                        onPress={() => {
                            onPress1()
                            // dispatch({
                            //   type: FILTER_LIST
                            // })
                            // bottomSheetRef.current.close()
                        }}
                        style={{
                            width: 60, height: 30,
                            justifyContent: "center",
                            alignItems: 'center',
                            opacity: counntData.length == 4 ? 0.9 : 0.3,
                            borderRadius: 10,
                            backgroundColor: "#0F9764"
                        }}
                        disabled={counntData.length == 4 ? false : true} >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Filter</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    <BottomSheetScrollView >
                        {updateData.length > 0 && updateData.map((item, i) => {
                            return (
                                <View key={i} style={styles.flatItem}>
                                    <View style={styles.flatItemLeft}>
                                        <View style={{
                                            width: 40, height: 40, backgroundColor: "white",
                                            borderRadius: 30,
                                            justifyContent: "center",
                                            alignItems: 'center',
                                            borderWidth: 1, borderColor: '#EBEBEB'
                                        }}>
                                            <View style={{
                                                width: 30, height: 30, justifyContent: "center",
                                                alignItems: "center"
                                            }}>
                                                <Image source={item.img} style={{ width: "100%", height: "100%", resizeMode: "cover" }} />
                                            </View>
                                        </View>

                                        <Text style={{ color: 'black', marginLeft: 8 }}>{item.name}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            onPress(item.id);

                                        }}
                                        style={styles.flatItemRight}>
                                        {item.isChecked ? (
                                            <Ionicons name="checkmark-circle-outline" size={24} color="#098C26" />) : (
                                            <FontAwesome name="circle-thin" size={24} color="#686868" />
                                        )}
                                    </TouchableOpacity>
                                </View>
                            )
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

export default BottomSheetView1;

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
        width: "100%", paddingHorizontal: 10,
        paddingVertical: 10,

        flexDirection: "row",
        justifyContent: 'space-between'
    },
    flatItem: { width: '100%', height: 60, marginVertical: 1, flexDirection: "row", marginVertical: 5 },
    flatItemLeft: {
        width: '90%', height: "100%", flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10
    },
    flatItemRight: {
        width: '10%', height: "100%", justifyContent: "center",
        paddingRight: 10
    }
});
