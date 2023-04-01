import moment from "moment";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { DataSelection } from "../../../../../Components/Buttons";

import { getWidthnHeight, fontSizeH4, getMarginVertical, getMarginTop, getMarginBottom, getMarginRight, getMarginHorizontal, getMarginLeft } from "../../../../../Components/width";
import CFSC from '../Financials/CFSColumnsInfo/CFSC.json';
import CFSS from '../Financials/CFSColumnsInfo/CFSS.json';

export default function CashFlowTab({
    cashFlow = [],
    currentCompanyDetails = [],
    getCashFlow = () => { },
}) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedHeading, setSelectedHeading] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [selectedNestedCategory, setSelectedNestedCategory] = useState(null);
    const [dataType, setDataType] = useState('S');
    const [selectedJSON, setSelectedJSON] = useState(CFSS);
    const [cashFlowData, setCashFlowData] = useState([]);
    const [header, setHeader] = useState([]);
    const categories = [
        {
            id: '0',
            label: 'Cash Flow'
        }
    ];

    useEffect(() => {
        if (cashFlowData.length > 0) {
            setSelectedCategory(0)
        }
    }, [cashFlowData]);

    useEffect(() => {
        // console.log("@#@#@@@#@$^$^$^$^$ ", currentCompanyDetails)
        if (currentCompanyDetails.length > 0) {
            let displayType = `${currentCompanyDetails[0]['DisplayType']}${dataType}`;
            if (displayType == "CFSC") {
                setSelectedJSON(CFSC)
            }
            else if (displayType == "CFSS") {
                setSelectedJSON(CFSS)
            }
        }
    }, [currentCompanyDetails])

    useEffect(() => {
        if (selectedJSON.length > 0 && cashFlow.length > 0) {
            let createData = [];
            const addData = selectedJSON.map((item) => {
                return {
                    ...item,
                    data: cashFlow.find((subItem) => Number(item.rowId) === subItem.rowno)
                }
            })
            const commonData = addData.filter((item) => {
                return cashFlow.find((subItem) => Number(item.rowId) === subItem.rowno)
            })
            const sortData = commonData.sort((a, b) => {
                return a.seq - b.seq
            })
            console.log("##@#@#@ SORT DATA: ", sortData)
            setCashFlowData(commonData);
        }

    }, [selectedJSON, cashFlow]);

    useEffect(() => {
        if (cashFlow.length > 0) {
            const headerRow = cashFlow[0];
            const headerRowData = [];
            let subHeadings = Object.entries(headerRow).map(([key, value]) => {
                if (key[0] === 'Y') {
                    headerRowData.push(`${key.split('Y')[1]}`)
                }
            });
            setHeader(headerRowData);
            console.log("@#@#@@!@ HEADER ROW: ", headerRowData)
        }
    }, [cashFlow])


    return (
        <View style={[getMarginTop(0)]}>
            {categories.map((item, index) => {
                if (selectedCategory === Number(index)) {
                    return (
                        <View
                            key={`CF-${index}`}
                            style={[{
                                backgroundColor: '#c4c4c474',
                                borderRadius: getWidthnHeight(2).width,
                                alignItems: 'center',
                                // justifyContent: 'space-between',
                                paddingHorizontal: getWidthnHeight(3).width,
                                paddingVertical: getWidthnHeight(2).width,
                                marginBottom: getMarginBottom(2).marginBottom
                            }, getWidthnHeight(92)]}>
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedSubCategory(null);
                                    setSelectedHeading(null);
                                    setSelectedCategory(null);
                                }}
                                activeOpacity={1}
                                style={[{
                                    borderRadius: getWidthnHeight(2).width,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    //paddingHorizontal: getWidthnHeight(3).width,
                                    paddingVertical: getWidthnHeight(2).width,
                                    marginBottom: getMarginBottom(0).marginBottom,
                                    width: '100%',
                                    borderColor: 'red',
                                    borderWidth: 0
                                }]}>
                                <Text style={{ fontSize: fontSizeH4().fontSize + 2, color: '#0F9764', fontWeight: 'bold' }} >{item.label}</Text>
                                <Octicons name="dash" color={'#0F9764'} size={getWidthnHeight(6).width} />
                            </TouchableOpacity>
                            <View style={{ transform: [{ scale: 0.7 }] }}>
                                <DataSelection
                                    standAlone={(dataType === 'S') ? true : false}
                                    setStandAlone={(status) => {
                                        if (status) {
                                            if (dataType === 'S') {
                                                return;
                                            }
                                            setDataType('S');
                                            getCashFlow('S');
                                        } else {
                                            if (dataType === 'C') {
                                                return;
                                            }
                                            setDataType('C');
                                            getCashFlow('C');
                                        }
                                    }}
                                />
                            </View>
                            {(cashFlowData.length > 0) ? (
                                <View style={[{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 0, borderColor: 'red', paddingHorizontal: getWidthnHeight(2).width }, getWidthnHeight(92)]}>
                                    <View style={[getWidthnHeight(45)]}>
                                        <ScrollView horizontal contentContainerStyle={{ flexDirection: 'column' }}>
                                            <Text style={{ fontSize: fontSizeH4().fontSize + 3, paddingVertical: getWidthnHeight(2).width, textDecorationLine: 'underline' }}>Names</Text>
                                            <FlatList
                                                nestedScrollEnabled
                                                keyExtractor={(item) => `${item.displayName}-${item.rowId}`}
                                                data={cashFlowData}
                                                renderItem={({ item, index }) => {
                                                    return (
                                                        <>
                                                            <Text style={{ fontWeight: item.type === "BOLD" ? 'bold' : 'normal', fontSize: fontSizeH4().fontSize + 2, paddingVertical: getWidthnHeight(2).width }}>{item.displayName}</Text>
                                                        </>
                                                    );
                                                }}
                                            />
                                        </ScrollView>
                                    </View>
                                    <View style={[{ paddingHorizontal: getWidthnHeight(2).width }, getWidthnHeight(45)]}>
                                        <ScrollView horizontal contentContainerStyle={{ flexDirection: 'column' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                {(header.map((title, index) => (
                                                    <Text key={`CFHeader-${index}`} style={[{ fontSize: fontSizeH4().fontSize + 2, paddingVertical: getWidthnHeight(2).width, textDecorationLine: 'underline' }, getWidthnHeight(25)]}>{moment(title, "YYYYMM").format("MMM YYYY")}</Text>
                                                )))}
                                            </View>
                                            <FlatList
                                                // horizontal
                                                keyExtractor={(item) => `CF2-${item.displayName}-${item.seq}`}
                                                data={cashFlowData}
                                                renderItem={({ item, index }) => {
                                                    const rowData = [];
                                                    let headings = Object.entries(item.data).map(([key, value]) => {
                                                        if (key[0] === 'Y') {
                                                            if (!Number.isInteger(value) && typeof value == 'number') {
                                                                value = value.toFixed(2)
                                                            }
                                                            if (value === null) {
                                                                value = 'N/A'
                                                            }
                                                            rowData.push({ value: value, id: `${key}-${value}` })
                                                        }
                                                    });
                                                    // console.log("@#^&%^&*^: ", rowData)
                                                    return (
                                                        <View style={{ flexDirection: 'row' }}>
                                                            {rowData.map((subItem) => (
                                                                <View key={`CF-${subItem.id}`} style={[{ borderWidth: 0, borderColor: 'red', }, getWidthnHeight(25)]}>
                                                                    <Text style={{ fontWeight: 'bold', padding: getWidthnHeight(2).width, fontSize: fontSizeH4().fontSize + 2 }}>{subItem.value}</Text>
                                                                </View>
                                                            ))}
                                                        </View>
                                                    );
                                                }}
                                            />
                                        </ScrollView>
                                    </View>
                                </View>
                            )
                                :
                                (
                                    <Text style={{ fontSize: fontSizeH4().fontSize + 4, color: '#000000', paddingVertical: getWidthnHeight(5).width }}>No Results Found</Text>
                                )}
                        </View>
                    );
                }
                return (
                    <TouchableOpacity
                        key={`CF-${index}`}
                        activeOpacity={0.7}
                        onPress={() => {
                            if (cashFlow.length === 0) {
                                getCashFlow(dataType)
                            } else {
                                setSelectedCategory(Number(index))
                            }
                        }}
                        style={[{
                            backgroundColor: '#c4c4c474',
                            borderRadius: getWidthnHeight(2).width,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: getWidthnHeight(3).width,
                            paddingVertical: getWidthnHeight(2).width,
                            marginBottom: getMarginBottom(2).marginBottom,
                            borderWidth: 0,
                            borderColor: 'yellow'
                        }, getWidthnHeight(92)]}>
                        <Text style={{ fontSize: fontSizeH4().fontSize + 2, color: '#000000' }} >{item.label}</Text>
                        <MaterialIcons name="keyboard-arrow-down" color={'#000000'} size={getWidthnHeight(7).width} />
                    </TouchableOpacity>
                );
            })}
        </View >
    );
}