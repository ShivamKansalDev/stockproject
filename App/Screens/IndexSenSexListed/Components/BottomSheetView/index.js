import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native';
import React, { useMemo, useCallback } from 'react';

import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetFlatList,
} from '@gorhom/bottom-sheet';


import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



const BottomSheetView = ({ bottomSheetRef,
    data,
    onPress }) => {



    const snapPoints = useMemo(() => ['10%', '20%', '40%'], []);




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
        // console.log('handleSheetChanges', index);
    }, []);



    return (
        <>

            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                enablePanDownToClose={true}
                onChange={handleSheetChanges}
                enabledInnerScrolling={true}
                enabledContentGestureInteraction={false}

                animateOnMount
                animatedPosition={true}
            >



                <BottomSheetFlatList


                    data={data}

                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, i }) => {
                        return (
                            <View key={i} style={styles.flatItem}>
                                <View style={styles.flatItemLeft}>


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
                        );
                    }}

                />

            </BottomSheet>


        </>
    );
};

export default BottomSheetView;

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
    flatItem: { width: '100%', height: 40, marginVertical: 1, flexDirection: "row", marginVertical: 5, justifyContent: 'center' },
    flatItemLeft: {
        height: "100%", flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10, width: '20%'
    },
    flatItemRight: {
        width: '10%', height: "100%", justifyContent: "center",
        paddingRight: 10
    }
});
