import moment from "moment";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { DataSelection } from "../../../../../Components/Buttons";

import { getWidthnHeight, fontSizeH4, getMarginVertical, getMarginTop, getMarginBottom, getMarginRight, getMarginHorizontal, getMarginLeft } from "../../../../../Components/width";
import BANKC from '../Financials/BSColumnsInfo/BANKC.json';
import BANKS from '../Financials/BSColumnsInfo/BANKS.json';
import FINC from '../Financials/BSColumnsInfo/FINC.json';
import FINS from '../Financials/BSColumnsInfo/FINS.json';
import INSC from '../Financials/BSColumnsInfo/INSC.json';
import INSS from '../Financials/BSColumnsInfo/INSS.json';
import MANC from '../Financials/BSColumnsInfo/MANC.json';
import MANS from '../Financials/BSColumnsInfo/MANS.json';

export default function BalanceSheet({
    balanceSheet = [],
    currentCompanyDetails = [],
    getBalanceSheet = () => { },
}) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedHeading, setSelectedHeading] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [selectedNestedCategory, setSelectedNestedCategory] = useState(null);
    const [dataType, setDataType] = useState('S');
    const [selectedJSON, setSelectedJSON] = useState(MANS);
    const [balanceSheetData, setBalanceSheetData] = useState([]);
    const [header, setHeader] = useState([]);
    const categories = [
        {
            id: '0',
            label: 'Balance Sheet'
        }
    ];

    useEffect(() => {
        if (balanceSheetData.length > 0) {
            setSelectedCategory(0)
        }
    }, [balanceSheetData])

    useEffect(() => {
        // console.log("@#@#@@@#@$^$^$^$^$ ", currentCompanyDetails)
        if (currentCompanyDetails.length > 0) {
            let displayType = `${currentCompanyDetails[0]['DisplayType']}${dataType}`;
            if (displayType == "BANKS") {
                setSelectedJSON(BANKS)
            }
            else if (displayType == "BANKC") {
                setSelectedJSON(BANKC)
            }
            else if (displayType == "FINS") {
                setSelectedJSON(FINS)
            }
            else if (displayType == "FINC") {
                setSelectedJSON(FINC)
            }
            else if (displayType == "MANS") {
                setSelectedJSON(MANS)
            }
            else if (displayType == "MANC") {
                setSelectedJSON(MANC)
            }
            else if (displayType == "INSS") {
                setSelectedJSON(INSS)
            }
            else if (displayType == "INSC") {
                setSelectedJSON(INSC)
            }
        }
    }, [currentCompanyDetails])

    useEffect(() => {
        if (selectedJSON.length > 0 && balanceSheet.length > 0) {
            let createData = [];
            const addData = selectedJSON.map((item) => {
                const displayName = item.displayName;
                let createSumData = [];
                let mainDataIndex = -1;
                let rowData = {};
                if (item.rowId.includes("SUM")) {
                    let nums = item.rowId.substring(4);
                    nums = nums.slice(0, nums.length - 1);
                    let numsArray = nums.split(',').map(Number);
                    console.log("@#$@@##$ NUMBER: ", numsArray)
                    const copyFinData = balanceSheet.map((finData) => finData)
                    createSumData = numsArray.map((num) => {
                        return copyFinData.find((data1) => data1.rowno === Math.abs(num));
                    })
                    if (createSumData.length > 0) {
                        // console.log("@##@#@@@@@@@ CREATE DATA SUM: ", createSumData[0])
                        try {
                            rowData = Object.assign({}, createSumData[0]);
                            rowData['COLUMNNAME'] = displayName;
                            rowData['RID'] = '';
                            rowData['rowno'] = '';
                            let headings = Object.entries(rowData).map(([key, value]) => {
                                if (key[0] === 'Y') {
                                    return key;
                                } else {
                                    return false;
                                }
                            }).filter((yLabel) => yLabel);
                            numsArray.forEach((num, index) => {
                                if (Math.sign(num) === 1 && index > 0) {
                                    headings.forEach((heading) => {
                                        if (createSumData[index][heading] === null) {
                                            rowData[heading] += 0
                                        } else {
                                            rowData[heading] += createSumData[index][heading]
                                        }
                                    })
                                } else if (Math.sign(num) === -1 && index > 0) {
                                    headings.forEach((heading) => {
                                        if (createSumData[index][heading] === null) {
                                            rowData[heading] -= 0
                                        } else {
                                            rowData[heading] -= createSumData[index][heading]
                                        }
                                    })
                                }
                            })
                            // console.log("####FGGGFL@@@@@@ ADD ROW DATA: ", rowData)
                        } catch (error) {
                            console.log("@#@$%$% TRY CATCH ERROR: ", error)
                        }
                    }
                    return {
                        ...item,
                        data: rowData
                    }
                } else {
                    return {
                        ...item,
                        data: balanceSheet.find((subItem) => Number(item.rowId) === subItem.rowno)
                    }
                }
            })

            const commonData = addData.filter((item) => {
                return balanceSheet.find((subItem) => {
                    if (item.rowId.includes('SUM')) {
                        // return subItem.COLUMNNAME.trim().toLowerCase().includes(item.displayName.trim().toLowerCase())
                        return true;
                    } else if (item.rowId) {
                        return Number(item.rowId) === subItem.rowno
                    }
                })
            })

            commonData.forEach((item, index) => {
                if (item.hierarchy.length === 1) {
                    createData.push({
                        ...item,
                    })
                }
            })
            let addSubCategory = [];
            createData.forEach((item) => {
                addSubCategory.push({
                    ...item,
                    subCategory: commonData.map((subItem, subIndex) => {
                        if (subItem.hierarchy.length === 2 && item.displayName.includes(subItem.hierarchy[0])) {
                            return {
                                ...subItem,
                                subCategory: []
                            }
                        } else {
                            return false
                        }
                    }).filter((filterItem) => filterItem)
                })
            })

            const maxLengthArray = commonData.filter((item) => item.hierarchy.length === 3);
            let centeredItem = [];
            maxLengthArray.forEach((item) => {
                centeredItem.push(`${item.hierarchy[0]}/${item.hierarchy[1]}`)
            })
            const unique = [...new Set(centeredItem)]
            // console.log("@#$%^!@#$%^&@#$%^ ", unique)
            unique.forEach((displayName) => {
                addSubCategory.forEach((item) => {
                    item.subCategory.forEach((subItem) => {
                        const extractName = displayName.split('/');
                        if (subItem.displayName === extractName[1]) {
                            subItem.subCategory = maxLengthArray.filter(mLAItem => mLAItem.hierarchy[0] === extractName[0] && mLAItem.hierarchy[1] === extractName[1]);
                        }
                    })
                })
            })
            const sortData = addSubCategory.sort((a, b) => {
                return a.seq - b.seq
            })
            console.log("!@!@!@;..,mnlkdsfsj SORT DATA: ", JSON.stringify(sortData, null, 4));
            const concatData = [...balanceSheetData, ...sortData];
            const uniqueData = [...new Map(concatData.map(item => [item['rowId'], item])).values()]
            setBalanceSheetData(uniqueData);
        }

    }, [selectedJSON, balanceSheet]);

    useEffect(() => {
        if (balanceSheet.length > 0) {
            const headerRow = balanceSheet[0];
            const headerRowData = [];
            let subHeadings = Object.entries(headerRow).map(([key, value]) => {
                if (key[0] === 'Y') {
                    headerRowData.push(`${key.split('Y')[1]}`)
                }
            });
            setHeader(headerRowData);
            console.log("@#@#@@!@ HEADER ROW: ", headerRowData)
        }
    }, [balanceSheet])


    return (
        <View style={[getMarginTop(0)]}>
            {categories.map((item, index) => {
                if (selectedCategory === Number(index)) {
                    return (
                        <View
                            key={`BalanceSheet-${index}`}
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
                                            getBalanceSheet('S');
                                        } else {
                                            if (dataType === 'C') {
                                                return;
                                            }
                                            setDataType('C');
                                            getBalanceSheet('C');
                                        }
                                    }}
                                />
                            </View>
                            {(balanceSheetData.length > 0) ? (
                                <View style={[{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 0, borderColor: 'red', paddingHorizontal: getWidthnHeight(2).width }, getWidthnHeight(92)]}>
                                    <View style={[getWidthnHeight(45)]}>
                                        <ScrollView horizontal contentContainerStyle={{ flexDirection: 'column' }}>
                                            <Text style={{ fontSize: fontSizeH4().fontSize + 3, paddingVertical: getWidthnHeight(2).width, textDecorationLine: 'underline' }}>Particulars</Text>
                                            <FlatList
                                                nestedScrollEnabled
                                                keyExtractor={(item) => `BS-${item.displayName}-${item.rowId}`}
                                                data={balanceSheetData}
                                                renderItem={({ item, index }) => {
                                                    // const rowData = [];
                                                    // let headings = Object.entries(item.data).map(([key, value]) => {
                                                    //     if (key[0] === 'Y') {
                                                    //         rowData.push({ value: value, id: `${key}-${value}` })
                                                    //     }
                                                    // });
                                                    // // console.log("@#^&%^&*^: ", rowData)
                                                    return (
                                                        <>
                                                            {(item.subCategory.length > 0) ? (
                                                                <>
                                                                    <Pressable
                                                                        onPress={() => {
                                                                            if (selectedSubCategory === index) {
                                                                                setSelectedSubCategory(null)
                                                                            } else {
                                                                                setSelectedSubCategory(index)
                                                                            }
                                                                        }}
                                                                    >
                                                                        <View style={[{ flexDirection: 'row', alignItems: 'center', borderColor: 'cyan', borderWidth: 0, width: '100%', justifyContent: 'flex-start' }]}>
                                                                            <Text style={{ fontWeight: item.type === "BOLD" ? 'bold' : 'normal', fontSize: fontSizeH4().fontSize + 2, paddingVertical: getWidthnHeight(2).width }}>{item.displayName}</Text>
                                                                            <Octicons style={{ paddingHorizontal: getWidthnHeight(2).width }} name={`${selectedSubCategory === Number(index) ? 'dash' : 'plus'}`} color={'#0F9764'} size={getWidthnHeight(5).width} />
                                                                        </View>
                                                                    </Pressable>
                                                                    {(selectedSubCategory === index && item.subCategory.length > 0) && (
                                                                        <>
                                                                            {item.subCategory.map((subItem, subIndex) => {
                                                                                return (
                                                                                    <View key={`BS-${subIndex}`}>
                                                                                        {(subItem.subCategory.length > 0) ? (
                                                                                            <>
                                                                                                <Pressable style={[{ flexDirection: 'row', alignItems: 'center' }, getMarginLeft(5)]}
                                                                                                    onPress={() => {
                                                                                                        if (selectedNestedCategory === subIndex) {
                                                                                                            setSelectedNestedCategory(null)
                                                                                                        } else {
                                                                                                            setSelectedNestedCategory(subIndex)
                                                                                                        }
                                                                                                    }}
                                                                                                >
                                                                                                    <Text style={{ fontWeight: item.type === "BOLD" ? 'bold' : 'normal', fontSize: fontSizeH4().fontSize + 2, paddingVertical: getWidthnHeight(2).width }}>{subItem.displayName}</Text>
                                                                                                    <Octicons style={{ paddingHorizontal: getWidthnHeight(2).width }} name={`${selectedNestedCategory === Number(subIndex) ? 'dash' : 'plus'}`} color={'#0F9764'} size={getWidthnHeight(5).width} />
                                                                                                </Pressable>
                                                                                                {(selectedNestedCategory === subIndex && subItem.subCategory.length > 0) && (
                                                                                                    <>
                                                                                                        {subItem.subCategory.map((subItem2, subIndex2) => {
                                                                                                            return (
                                                                                                                <View key={`BS-${subIndex}${subIndex2 + 1}`} style={[getMarginLeft(10)]}>
                                                                                                                    <Text style={{ fontWeight: item.type === "BOLD" ? 'bold' : 'normal', fontSize: fontSizeH4().fontSize + 2, paddingVertical: getWidthnHeight(2).width }}>{subItem2.displayName}</Text>
                                                                                                                </View>
                                                                                                            );
                                                                                                        })}
                                                                                                    </>
                                                                                                )}
                                                                                            </>
                                                                                        )
                                                                                            :
                                                                                            (
                                                                                                <View style={[getMarginLeft(5)]}>
                                                                                                    <Text style={{ fontWeight: item.type === "BOLD" ? 'bold' : 'normal', fontSize: fontSizeH4().fontSize + 2, paddingVertical: getWidthnHeight(2).width }}>{subItem.displayName}</Text>
                                                                                                </View>
                                                                                            )}
                                                                                    </View>
                                                                                );
                                                                            })}
                                                                        </>
                                                                    )}
                                                                </>
                                                            )
                                                                :
                                                                <Text style={{ fontWeight: item.type === "BOLD" ? 'bold' : 'normal', fontSize: fontSizeH4().fontSize + 2, paddingVertical: getWidthnHeight(2).width }}>{item.displayName}</Text>
                                                            }
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
                                                    <Text key={`BS-HeaderTitle${index}`} style={[{ fontSize: fontSizeH4().fontSize + 2, paddingVertical: getWidthnHeight(2).width, textDecorationLine: 'underline' }, getWidthnHeight(25)]}>{moment(title, "YYYYMM").format("MMM YYYY")}</Text>
                                                )))}
                                            </View>
                                            <FlatList
                                                // horizontal
                                                keyExtractor={(item) => `BS2-${item.displayName}-${item.seq}`}
                                                data={balanceSheetData}
                                                renderItem={({ item, index }) => {
                                                    const rowData = [];
                                                    let headings = Object.entries(item.data).map(([key, value]) => {
                                                        if (key[0] === 'Y') {
                                                            // console.log("@#@(*FGGF: ", typeof value, value);
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
                                                        <>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                {rowData.map((subItem, subIndex) => (
                                                                    <View key={`rowDataValue${subIndex}`} style={[{ borderWidth: 0, borderColor: 'red', }, getWidthnHeight(25)]}>
                                                                        <Text style={{ fontWeight: 'bold', padding: getWidthnHeight(2).width, fontSize: fontSizeH4().fontSize + 2 }}>{subItem.value}</Text>
                                                                    </View>
                                                                ))}
                                                            </View>

                                                            {(selectedSubCategory === index && item.subCategory.length > 0) && (
                                                                <>
                                                                    {item.subCategory.map((subItem2, subIndex2) => {
                                                                        // console.log("#$#$#(*&*^ SUBITEM: ", subItem2)
                                                                        const subRowData = [];
                                                                        let subHeadings = Object.entries(subItem2.data).map(([key, value]) => {
                                                                            if (key[0] === 'Y') {
                                                                                // console.log("&&&&&&&&&&&&^^^^^^^ ", typeof value, value);
                                                                                if (!Number.isInteger(value) && typeof value == 'number') {
                                                                                    value = value.toFixed(2)
                                                                                }
                                                                                if (value === null) {
                                                                                    value = 'N/A'
                                                                                }
                                                                                subRowData.push({ value: value, id: `${key}-${value}` })
                                                                            }
                                                                        });
                                                                        return (
                                                                            <View key={`BS-SubCat-${subItem2.displayName}-${subIndex2}`}>
                                                                                <View style={{ flexDirection: 'row' }}>
                                                                                    {subRowData.map((subItem3, subIndex3) => {
                                                                                        return (
                                                                                            <View key={`subRowDataValue-${subIndex2}${subIndex3}`} style={[{ borderWidth: 0, borderColor: 'purple', }, getWidthnHeight(25)]}>
                                                                                                <Text style={{ fontWeight: 'bold', padding: getWidthnHeight(2).width, fontSize: fontSizeH4().fontSize + 2 }}>{subItem3.value}</Text>
                                                                                            </View>
                                                                                        )
                                                                                    })}
                                                                                </View>
                                                                                {(selectedNestedCategory === subIndex2 && subItem2.subCategory.length > 0) && (
                                                                                    <>
                                                                                        {subItem2.subCategory.map((subItem4, subIndex4) => {
                                                                                            console.log("#$#$#(*&*^ SUBITEM: ", subItem2)
                                                                                            const subRowData2 = [];
                                                                                            let subHeadings2 = Object.entries(subItem4.data).map(([key, value]) => {
                                                                                                if (key[0] === 'Y') {
                                                                                                    if (!Number.isInteger(value) && typeof value == 'number') {
                                                                                                        value = value.toFixed(2)
                                                                                                    }
                                                                                                    if (value === null) {
                                                                                                        value = 'N/A'
                                                                                                    }
                                                                                                    subRowData2.push({ value: value, id: `${key}-${value}` })
                                                                                                }
                                                                                            });
                                                                                            return (
                                                                                                <View key={`subRowDataValue2-${subIndex4}`} style={{ flexDirection: 'row' }}>
                                                                                                    {subRowData2.map((subItem5, subIndex5) => {
                                                                                                        return (
                                                                                                            <View key={`BS5-${subItem5.id}-${subIndex5}`} style={[{ borderWidth: 0, borderColor: 'purple', }, getWidthnHeight(25)]}>
                                                                                                                <Text style={{ fontWeight: 'bold', padding: getWidthnHeight(2).width, fontSize: fontSizeH4().fontSize + 2 }}>{subItem5.value}</Text>
                                                                                                            </View>
                                                                                                        )
                                                                                                    })}
                                                                                                </View>
                                                                                            );
                                                                                        })}
                                                                                    </>
                                                                                )}
                                                                            </View>
                                                                        );
                                                                    })}
                                                                </>
                                                            )}
                                                        </>
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
                        key={`BalanceSheet-${index}`}
                        activeOpacity={0.7}
                        onPress={() => {
                            if (balanceSheet.length === 0) {
                                getBalanceSheet(dataType)
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