import React, { useMemo, useCallback } from "react";
import { View, Text, Pressable } from 'react-native';
import BottomSheet, {
    BottomSheetFlatList, BottomSheetBackdrop
} from '@gorhom/bottom-sheet';
import { Avatar } from "react-native-paper";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

import { getWidthnHeight, fontSizeH4, getMarginTop } from "../width";

export default function Bottom_Sheet({ bottomSheetRef, data = [], clearData = () => { }, setBottomSheetIndex = () => { } }) {

    const navigation = useNavigation();

    const snapPoints = useMemo(() => ['50%', '80%'], []);

    const handleSheetChanges = useCallback(index => {
        console.log('handleSheetChanges', index);
        setBottomSheetIndex(index)
        if (index < 0) {
            clearData();
        }
    }, []);

    const renderBackdrop = useCallback(
        props => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
            />
        ),
        []
    );

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
                backgroundStyle={{
                    backgroundColor: '#FFFFFF', borderRadius: getWidthnHeight(4).width, borderColor: 'red', borderWidth: 0,
                }}
            >
                <>
                    {/* <View style={{ alignItems: 'flex-end', padding: getWidthnHeight(3).width }}>
                        <AntDesign onPress={() => close()} name="closecircle" size={getWidthnHeight(10).width} color='black' />
                    </View> */}
                    <BottomSheetFlatList
                        showsVerticalScrollIndicator={true}
                        indicatorStyle={'black'}
                        data={data}
                        keyExtractor={(item) => item?.id}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ paddingVertical: getMarginTop(0.5).marginTop }}>
                                    <Pressable onPress={() => {
                                        close();
                                        navigation.navigate('PostNavigator', {
                                            screen: 'ProfileScreen',
                                            //initial: true,
                                            params: {
                                                user: { _id: item?.created_by?.id, name: item?.created_by?.name },
                                            },
                                        });
                                    }} style={[{ alignItems: 'flex-start', borderColor: 'red', borderWidth: 0, backgroundColor: 'transparent' }]}>
                                        <View style={[{
                                            flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: 'red', borderWidth: 0, paddingHorizontal: getWidthnHeight(4).width,
                                            paddingVertical: getWidthnHeight(2).width
                                        }]}>
                                            <Avatar.Image
                                                size={getWidthnHeight(12).width}
                                                source={require('../../Images/avatar.png')}
                                            />
                                            <View>
                                                <Text
                                                    style={{
                                                        color: '#0F9764',
                                                        textAlign: 'justify',
                                                        fontSize:
                                                            fontSizeH4().fontSize + 2,
                                                        paddingVertical:
                                                            getWidthnHeight(1).width,
                                                        fontWeight: 'bold',
                                                        paddingHorizontal:
                                                            getWidthnHeight(3).width,
                                                    }}>
                                                    {item?.name}
                                                </Text>
                                                <Text
                                                    style={{
                                                        color: '#000000',
                                                        textAlign: 'justify',
                                                        fontSize:
                                                            fontSizeH4().fontSize + 2,
                                                        paddingVertical:
                                                            getWidthnHeight(1).width,
                                                        paddingHorizontal:
                                                            getWidthnHeight(3).width,
                                                    }}>
                                                    Designation
                                                </Text>
                                            </View>
                                        </View>
                                    </Pressable>
                                </View>
                            );
                        }}
                    />
                </>
            </BottomSheet>
        </>
    );
}