import React from "react";
import { View, Text, ScrollView, FlatList } from 'react-native';

import { getWidthnHeight, fontSizeH4, getMarginVertical } from "../../../../Components/width";

export default function ManagementTab({ managementData }) {
    return (
        <View style={[{ backgroundColor: '#c4c4c426', borderRadius: getWidthnHeight(2).width }, getMarginVertical(2)]}>
            {/* <ScrollView> */}
            <View style={{ flexDirection: 'row' }}>
                <View style={[{ paddingHorizontal: getWidthnHeight(2).width }, getWidthnHeight(42)]}>
                    <ScrollView horizontal style={{

                    }}>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{
                                //paddingHorizontal: getWidthnHeight(2).width,
                                paddingVertical: getWidthnHeight(3).width,
                                width: '100%'
                            }}>
                                <Text numberOfLines={1} style={[{ fontSize: fontSizeH4().fontSize + 2, fontWeight: 'bold', borderColor: 'red', borderWidth: 0, color: '#0F9764' }]}>Name of Directors/KMP</Text>
                            </View>
                            <FlatList
                                data={managementData}
                                keyExtractor={(item) => `${item.slno}`}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={[{
                                            borderWidth: 0, borderColor: 'red',
                                            //paddingHorizontal: getWidthnHeight(2).width,
                                            paddingVertical: getWidthnHeight(3).width,
                                            width: '100%'
                                        }]}>
                                            <Text numberOfLines={1} style={{ fontSize: fontSizeH4().fontSize + 2 }}>{item.dir_name}</Text>
                                        </View>
                                    );
                                }}
                            />
                        </View>
                    </ScrollView>
                </View>
                <View style={[{ paddingHorizontal: getWidthnHeight(2).width }, getWidthnHeight(52)]}>
                    <ScrollView horizontal style={{
                    }}>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{
                                flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',
                                borderWidth: 0, borderColor: 'red',
                                paddingHorizontal: getWidthnHeight(2).width,
                                paddingVertical: getWidthnHeight(3).width,
                                width: '100%',
                            }}>
                                <Text numberOfLines={1} style={[{ fontSize: fontSizeH4().fontSize + 2, fontWeight: 'bold', borderColor: 'red', borderWidth: 0, color: '#0F9764' }, getWidthnHeight(20)]}>Year</Text>
                                <Text numberOfLines={1} style={[{ fontSize: fontSizeH4().fontSize + 2, fontWeight: 'bold', color: '#0F9764' }]}>Designation</Text>
                            </View>
                            <FlatList
                                data={managementData}
                                keyExtractor={(item) => `${item.slno}-${item.dir_name}`}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={[{
                                            flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',
                                            borderWidth: 0, borderColor: 'red',
                                            paddingHorizontal: getWidthnHeight(2).width,
                                            paddingVertical: getWidthnHeight(3).width,
                                            width: '100%'
                                        }]}>
                                            <Text numberOfLines={1} style={[{ fontSize: fontSizeH4().fontSize + 2, fontWeight: 'bold', borderColor: 'red', borderWidth: 0 }, getWidthnHeight(20)]}>{item.year}</Text>
                                            <Text numberOfLines={1} style={[{ fontSize: fontSizeH4().fontSize + 2, fontWeight: 'bold' }]}>{item.dir_desg}</Text>
                                        </View>
                                    );
                                }}
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>
            {/* </ScrollView> */}
        </View>
    );
}