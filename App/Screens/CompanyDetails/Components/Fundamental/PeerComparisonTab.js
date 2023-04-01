import moment from "moment";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, FlatList } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import { getWidthnHeight, fontSizeH4, getMarginVertical } from "../../../../Components/width";

export default function PeerComparisonTab({ peerCompData = [], getPeerCompData }) {
    // const [title, setTitle] = useState([]);
    const [dropdownValue, setDropdownValue] = useState('S')

    // useEffect(() => {
    //     if (peerCompData.length > 0) {
    //         const headingsObj = peerCompData.find((item) => item.RID === 1);
    //         let headings = Object.keys(headingsObj).filter((subItem) => subItem[0] === 'Y');
    //         headings = headings.map((item, index) => ({ label: item, id: `${index}` }))
    //         // console.log("^^^^^^^ HEADINGS: ", headings);
    //         setTitle(headings);
    //     }
    // }, [peerCompData]);

    const dropDownData = [
        {
            label: 'Standalone', value: 'S',
        },
        {
            label: 'Consolidated', value: 'C'
        }
    ]

    const title = [
        {
            id: '0',
            label: 'Market Capital',
            width: getWidthnHeight(30).width
        },
        {
            id: '1',
            label: 'Sales',
            width: getWidthnHeight(30).width
        },
        {
            id: '2',
            label: 'Net Profit',
            width: getWidthnHeight(30).width
        },
        {
            id: '3',
            label: 'PAT',
            width: getWidthnHeight(30).width
        },
        {
            id: '4',
            label: 'ROCE',
            width: getWidthnHeight(20).width
        },
        {
            id: '5',
            label: 'DE Ratio',
            width: getWidthnHeight(20).width
        },
        {
            id: '6',
            label: 'PAT Change(%)',
            width: getWidthnHeight(30).width
        },
        {
            id: '7',
            label: 'ROE',
            width: getWidthnHeight(20).width
        },
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
                        getPeerCompData(item.value)
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
                                <Text numberOfLines={1} style={[{ fontSize: fontSizeH4().fontSize + 2, fontWeight: 'bold', borderColor: 'red', borderWidth: 0, color: '#0F9764' }]}>Company Name</Text>
                            </View>
                            <FlatList
                                data={peerCompData}
                                keyExtractor={(item) => `${item.co_code}`}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={[{
                                            borderWidth: 0, borderColor: 'red',
                                            //paddingHorizontal: getWidthnHeight(2).width,
                                            paddingVertical: getWidthnHeight(3).width,
                                            width: '100%'
                                        }]}>
                                            <Text numberOfLines={1} style={{ fontSize: fontSizeH4().fontSize + 2 }}>{item.CompanyName.trim()}</Text>
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
                        <View style={{ alignItems: 'center', borderWidth: 0, borderColor: 'blue' }}>
                            <View style={{
                                flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',
                                borderWidth: 0, borderColor: 'red',
                                // width: '100%',
                                paddingHorizontal: getWidthnHeight(2).width,
                                paddingVertical: getWidthnHeight(3).width,
                            }}>
                                {title.map((item) => {
                                    return (
                                        <Text key={item.label} numberOfLines={1} style={[{
                                            paddingHorizontal: getWidthnHeight(1).width, width: item.width,
                                            fontSize: fontSizeH4().fontSize + 2, fontWeight: 'bold', borderColor: 'red',
                                            borderWidth: 0, color: '#0F9764', textAlign: 'left'
                                        }]}>{item.label}</Text>
                                    )
                                })}
                            </View>
                            <View style={{ alignItems: 'flex-start', width: '100%' }}>
                                <FlatList
                                    data={peerCompData}
                                    keyExtractor={(item) => `${item.ISIN}`}
                                    renderItem={({ item }) => {
                                        const createData = [
                                            {
                                                id: '0',
                                                value: item['MarketCap'],
                                                width: getWidthnHeight(30).width
                                            },
                                            {
                                                id: '1',
                                                value: item['Sales'],
                                                width: getWidthnHeight(30).width
                                            },
                                            {
                                                id: '2',
                                                value: item['NetProfit'],
                                                width: getWidthnHeight(30).width
                                            },
                                            {
                                                id: '3',
                                                value: item['ratio_PAT'],
                                                width: getWidthnHeight(30).width
                                            },
                                            {
                                                id: '4',
                                                value: item['ratio_ROCE'],
                                                width: getWidthnHeight(20).width
                                            },
                                            {
                                                id: '5',
                                                value: item['ratio_DE_Ratio'],
                                                width: getWidthnHeight(20).width
                                            },
                                            {
                                                id: '6',
                                                value: item['ratio_PAT_PerChange'],
                                                width: getWidthnHeight(30).width
                                            },
                                            {
                                                id: '7',
                                                value: item['ratio_ROE'],
                                                width: getWidthnHeight(20).width
                                            },
                                        ];
                                        console.log("@@@!!!@@@ FLATLIST YEAR VALUES: ", createData)

                                        return (
                                            <View style={[{
                                                flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',
                                                borderWidth: 0, borderColor: 'red',
                                                paddingHorizontal: getWidthnHeight(2).width,
                                                paddingVertical: getWidthnHeight(3).width,
                                                width: '100%'
                                            }]}>
                                                {createData.map((rowData) => {
                                                    console.log("@#@#&(*) BVBVB: ", typeof rowData.value, rowData.value)
                                                    let value = rowData.value;
                                                    if (typeof value === "number") {
                                                        value = value.toFixed(2);
                                                    } else if (typeof value === "string") {
                                                        value = Number(value).toFixed(2)
                                                    }
                                                    return (
                                                        <Text key={rowData.id} numberOfLines={1} style={[{
                                                            paddingHorizontal: getWidthnHeight(1).width, width: rowData.width,
                                                            fontSize: fontSizeH4().fontSize + 2, fontWeight: 'bold', borderColor: 'green',
                                                            borderWidth: 0, color: '#000000', textAlign: 'left'
                                                        }]}>{value}</Text>
                                                    )
                                                })}
                                            </View>
                                        );
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