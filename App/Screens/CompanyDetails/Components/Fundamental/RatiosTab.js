import moment from "moment";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, FlatList } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import { getWidthnHeight, fontSizeH4, getMarginVertical } from "../../../../Components/width";

export default function RatiosTab({ ratiosData = [], getRatiosData }) {
    const [title, setTitle] = useState([]);
    const [dropdownValue, setDropdownValue] = useState('S')

    useEffect(() => {
        if (ratiosData.length > 0) {
            const headingsObj = ratiosData.find((item) => item.RID === 1);
            let headings = Object.keys(headingsObj).filter((subItem) => subItem[0] === 'Y');
            headings = headings.map((item, index) => ({ label: item, id: `${index}` }))
            // console.log("^^^^^^^ HEADINGS: ", headings);
            setTitle(headings);
        }
    }, [ratiosData]);

    const dropDownData = [
        {
            label: 'Standalone', value: 'S',
        },
        {
            label: 'Consolidated', value: 'C'
        }
    ]

    return (
        <View style={[{ backgroundColor: '#c4c4c426', borderRadius: getWidthnHeight(2).width }, getMarginVertical(2)]}>
            {/* <ScrollView> */}
            <View style={{ padding: getWidthnHeight(3).width }}>
                <Dropdown
                    style={[{
                        backgroundColor: 'white', paddingHorizontal: getWidthnHeight(2).width,
                        paddingVertical: getWidthnHeight(1).width, borderRadius: getWidthnHeight(2).width,
                    }, getWidthnHeight(40)]}
                    selectedTextStyle={{ color: '#0F9764', fontSize: fontSizeH4().fontSize + 2, fontWeight: 'bold' }}
                    itemTextStyle={{ fontSize: fontSizeH4().fontSize + 2 }}
                    activeColor='#3af1ae4c'
                    value={dropdownValue}
                    data={dropDownData}
                    labelField="label"
                    valueField="value"
                    onChange={(item) => {
                        if (item.value === dropdownValue) {
                            return;
                        }
                        setDropdownValue(item.value)
                        getRatiosData(item.value)
                    }}
                />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={[{ paddingHorizontal: getWidthnHeight(2).width }, getWidthnHeight(42)]}>
                    <ScrollView horizontal style={{

                    }}>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{
                                //paddingHorizontal: getWidthnHeight(2).width,
                                borderColor: 'red', borderWidth: 0,
                                paddingVertical: getWidthnHeight(3).width,
                                width: '100%'
                            }}>
                                <Text numberOfLines={1} style={[{ fontSize: fontSizeH4().fontSize + 2, fontWeight: 'bold', borderColor: 'red', borderWidth: 0, color: '#0F9764' }]}>Years</Text>
                            </View>
                            <FlatList
                                data={ratiosData}
                                keyExtractor={(item) => `${item.RID}`}
                                renderItem={({ item }) => {
                                    if (item.RID !== 1) {
                                        return (
                                            <View style={[{
                                                borderWidth: 0, borderColor: 'red',
                                                //paddingHorizontal: getWidthnHeight(2).width,
                                                paddingVertical: getWidthnHeight(3).width,
                                                width: '100%'
                                            }]}>
                                                <Text numberOfLines={1} style={{ fontSize: fontSizeH4().fontSize + 2 }}>{item.COLUMNNAME.trim()}</Text>
                                            </View>
                                        );
                                    }
                                }}
                            />
                        </View>
                    </ScrollView>
                </View>
                <View style={[{ paddingHorizontal: getWidthnHeight(2).width }, getWidthnHeight(52)]}>
                    <ScrollView horizontal style={{
                    }}>
                        <View style={{ alignItems: 'center', borderWidth: 0, borderColor: 'blue' }}>
                            <View style={{
                                flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',
                                borderWidth: 0, borderColor: 'red',
                                width: '100%',
                                paddingHorizontal: getWidthnHeight(3).width,
                                paddingVertical: getWidthnHeight(3).width,
                            }}>
                                {title.map((item) => {
                                    return (
                                        <Text key={item.label} numberOfLines={1} style={[{
                                            width: getWidthnHeight(20).width,
                                            fontSize: fontSizeH4().fontSize + 2, fontWeight: 'bold', borderColor: 'red', borderWidth: 0, color: '#0F9764', textAlign: 'left'
                                        }]}>{moment(item.label, "YYYYMM").format("YYYY")}</Text>
                                    )
                                })}
                            </View>
                            <View style={{ alignItems: 'flex-start', width: '100%' }}>
                                <FlatList
                                    data={ratiosData}
                                    keyExtractor={(item) => `${item.RID}-${item.COLUMNNAME}`}
                                    renderItem={({ item }) => {
                                        if (item.RID !== 1) {
                                            const createData = [];
                                            let headings = Object.entries(item).map(([key, value]) => {
                                                if (key[0] === 'Y') {
                                                    createData.push({ value: value.toFixed(2), id: `${key}-${value}` })
                                                }
                                            });
                                            console.log("@@@!!!@@@ FLATLIST YEAR VALUES: ", createData)

                                            return (
                                                <View style={[{
                                                    flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',
                                                    borderWidth: 0, borderColor: 'red',
                                                    paddingHorizontal: getWidthnHeight(3).width,
                                                    paddingVertical: getWidthnHeight(3).width,
                                                    width: '100%'
                                                }]}>
                                                    {createData.map((rowData) => (
                                                        <Text key={rowData.id} numberOfLines={1} style={[{
                                                            width: getWidthnHeight(20).width,
                                                            fontSize: fontSizeH4().fontSize + 2, fontWeight: 'bold', borderColor: 'red',
                                                            borderWidth: 0, color: '#000000', textAlign: 'left'
                                                        }]}>{rowData.value}</Text>
                                                    ))}
                                                </View>
                                            );

                                        }
                                    }}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
            {/* </ScrollView> */}
        </View>
    );
}