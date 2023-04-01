import moment from "moment";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { DataSelection } from "../../../../../Components/Buttons";

import { getWidthnHeight, fontSizeH4, getMarginVertical, getMarginTop, getMarginBottom, getMarginRight, getMarginHorizontal } from "../../../../../Components/width";
import BANKC from '../Financials/QRColumnsInfo/BANKC.json';
import BANKS from '../Financials/QRColumnsInfo/BANKS.json';
import FINC from '../Financials/QRColumnsInfo/FINC.json';
import FINS from '../Financials/QRColumnsInfo/FINS.json';
import INSC from '../Financials/QRColumnsInfo/INSC.json';
import INSS from '../Financials/QRColumnsInfo/INSS.json';
import MANC from '../Financials/QRColumnsInfo/MANC.json';
import MANS from '../Financials/QRColumnsInfo/MANS.json';

export default function QuaterlyResults({
    currentCompanyDetails = [],
    quaterlyResultsData = [],
    getQuaterlyResultsData = () => { },
}) {
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedHeading, setSelectedHeading] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [dataType, setDataType] = useState('S');
    const [selectedJSON, setSelectedJSON] = useState([]);
    const [quaterlyResults, setQuaterlyResults] = useState([]);
    const [header, setHeader] = useState([]);
    const categories = [
        {
            id: '0',
            label: 'Quaterly Results'
        }
    ];

    useEffect(() => {
        if (quaterlyResultsData.length > 0) {
            const headerRow = quaterlyResultsData[0];
            const headerRowData = [];
            let subHeadings = Object.entries(headerRow).map(([key, value]) => {
                if (key[0] === 'Y') {
                    headerRowData.push(`${key.split('Y')[1]}`)
                }
            });
            setHeader(headerRowData);
            console.log("@#@#@@!@ HEADER ROW: ", headerRowData)
        } else {
            getQuaterlyResultsData('S');
        }
    }, [quaterlyResultsData, getQuaterlyResultsData])

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
        if (selectedJSON.length > 0 && quaterlyResultsData.length > 0) {
            let headingIndex = [];
            selectedJSON.forEach((item, index) => {
                if (!item?.rowId) {
                    headingIndex.push(index)
                }
            })
            const createData = headingIndex.map((value, index) => {
                if (index < headingIndex.length - 1) {
                    return {
                        heading: selectedJSON[value]['displayName'],
                        data: selectedJSON.slice(value + 1, headingIndex[index + 1])
                    }
                } else {
                    return {
                        heading: selectedJSON[value]['displayName'],
                        data: selectedJSON.slice(value + 1)
                    }
                }
            })
            let createDataCategories = [];
            createDataCategories = createData.map((item, index) => {
                return { heading: item.heading, categories: item.data.filter((subItem) => subItem.hierarchy.length === 2) };
            })
            const addSubCategories = createDataCategories.map((item) => {
                console.log("@@@###!!! HEADINGS: ", item.heading)
                return {
                    ...item,
                    categories: item.categories.map((subItem) => {
                        const displayName = subItem.displayName;
                        let createSumData = [];
                        let mainDataIndex = -1;
                        let rowData = {};
                        if (subItem.rowId.includes('SUM') === true) {
                            let nums = subItem.rowId.substr(4);
                            nums = nums.slice(0, nums.length - 1);
                            let numsArray = nums.split(',').map(Number);
                            const copyFinData = quaterlyResultsData.map((finData) => finData)
                            createSumData = numsArray.map((num) => {
                                return copyFinData.find((data1) => data1.rowno === num);
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
                        } else {
                            mainDataIndex = quaterlyResultsData.findIndex((mainItem) => {
                                // console.log("@@@####!!!! FINANCIALS: ", mainItem.rowno, '=== ', Number(subItem.rowId), ' = ', mainItem.rowno === Number(subItem.rowId))
                                return (mainItem.rowno === Number(subItem.rowId))
                            })
                            // console.log("!@!@@!MAIN@#*&*&*@#@: ", mainDataIndex)
                        }

                        return {
                            ...subItem,
                            data: subItem.rowId.includes('SUM') ? rowData : (mainDataIndex > -1) ? quaterlyResultsData[mainDataIndex] : {},
                            subCategory: selectedJSON.map((jsonItem) => {
                                return {
                                    ...jsonItem,
                                    data: quaterlyResultsData.find((finItem) => Number(jsonItem.rowId) === finItem.rowno)
                                }
                            }).filter((nestedItem, nestedIndex) => {
                                return (nestedItem.hierarchy.length === 3 && item.heading.toLowerCase() === nestedItem.hierarchy[0].toLowerCase() && displayName === nestedItem.hierarchy[1])
                            })
                        }
                    })
                }
            })
            // console.log("!!!!!!!!*******####### ADD SUBCATEGORIES: \n\n\n", JSON.stringify(addSubCategories, null, 4), addSubCategories.length);
            setQuaterlyResults(addSubCategories)
        }

    }, [selectedJSON, quaterlyResultsData]);

    return (
        <View style={[getMarginTop(2)]}>
            {categories.map((item, index) => {
                if (selectedCategory === Number(index)) {
                    return (
                        <View key={`QRCategories-${index}`} style={[{
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
                                            getQuaterlyResultsData('S');
                                        } else {
                                            if (dataType === 'C') {
                                                return;
                                            }
                                            setDataType('C');
                                            getQuaterlyResultsData('C');
                                        }
                                    }}
                                />
                            </View>
                            {(quaterlyResults.length > 0) ? (
                                <View style={[{ borderWidth: 0, borderColor: 'red' }, getWidthnHeight(92)]}>
                                    <FlatList
                                        keyExtractor={(item) => `QRHeading-${item.heading}-${index}`}
                                        data={quaterlyResults}
                                        renderItem={({ item, index }) => {
                                            // console.log("@#@#@#@# KEY: ", `QRHeading-${item.heading}-${index}`)
                                            return (
                                                <View style={[{ borderColor: 'red', borderWidth: 0, paddingHorizontal: getWidthnHeight(2).width }]}>
                                                    <Pressable
                                                        style={{
                                                            borderRadius: getWidthnHeight(2).width,
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            paddingHorizontal: getWidthnHeight(0).width,
                                                            paddingVertical: getWidthnHeight(2).width,
                                                            marginBottom: getWidthnHeight(3).width,
                                                            width: '100%',
                                                            borderColor: 'red',
                                                            borderWidth: 0
                                                        }}
                                                        onPress={() => {
                                                            if (selectedHeading === index) {
                                                                setSelectedHeading(null);
                                                            } else {
                                                                setSelectedHeading(index)
                                                            }
                                                        }
                                                        }
                                                    >
                                                        <Text style={{ color: '#000000', fontSize: fontSizeH4().fontSize + 2, fontWeight: 'bold' }}>{item.heading}</Text>
                                                        <MaterialIcons name={`keyboard-arrow-${selectedHeading === Number(index) ? 'up' : 'down'}`} color={'#000000'} size={getWidthnHeight(6).width} />
                                                    </Pressable>
                                                    <View style={[{ flexDirection: 'row', borderColor: 'cyan', borderWidth: 0, width: '100%', justifyContent: 'space-between' }]}>
                                                        <View style={[{ borderColor: 'red', borderWidth: 0, width: '49%' }]}>
                                                            {selectedHeading === Number(index) && (
                                                                <ScrollView horizontal contentContainerStyle={{ flexDirection: 'column' }}>
                                                                    <Text style={{ fontSize: fontSizeH4().fontSize + 0, paddingVertical: getWidthnHeight(2).width, textDecorationLine: 'underline' }}>Particulars</Text>
                                                                    {item.categories.map((subItem, subIndex) => (
                                                                        <View key={`QRSubItem-${subItem.displayName}-${index}-${subIndex}`} style={{
                                                                            padding: getWidthnHeight(2).width,
                                                                            borderColor: 'green', borderWidth: 0
                                                                        }}>
                                                                            {(subItem.subCategory.length > 0) ? (
                                                                                <Pressable onPress={() => {
                                                                                    if (selectedSubCategory === subIndex) {
                                                                                        setSelectedSubCategory(null)
                                                                                    } else {
                                                                                        setSelectedSubCategory(subIndex)
                                                                                    }
                                                                                }} style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, getMarginBottom((selectedSubCategory === subIndex) ? 1 : 0)]}>
                                                                                    <Text style={{ fontWeight: subItem.type.toUpperCase() === 'BOLD' ? 'bold' : 'normal', fontSize: fontSizeH4().fontSize + 2 }}>{subItem.displayName}</Text>
                                                                                    <Octicons name={`${selectedSubCategory === Number(index) ? 'dash' : 'plus'}`} color={'#0F9764'} size={getWidthnHeight(5).width} />
                                                                                </Pressable>
                                                                            )
                                                                                :
                                                                                <Text style={{ fontWeight: subItem.type.toUpperCase() === 'BOLD' ? 'bold' : 'normal', fontSize: fontSizeH4().fontSize + 2 }}>{subItem.displayName}</Text>
                                                                            }
                                                                            {subItem.subCategory.length > 0 && selectedSubCategory === subIndex && (
                                                                                <>
                                                                                    {subItem.subCategory.map((subCategory, subCatIndex) => (
                                                                                        <View key={`QRSubCat-${subIndex}-${subCategory.displayName}-${subCatIndex}`} style={{ borderColor: 'blue', borderWidth: 0, paddingHorizontal: getWidthnHeight(3).width, paddingVertical: getWidthnHeight(2).width }}>
                                                                                            <Text style={{ fontWeight: subCategory.type.toUpperCase() === 'BOLD' ? 'bold' : 'normal', fontSize: fontSizeH4().fontSize + 2 }}>{subCategory.displayName}</Text>
                                                                                        </View>
                                                                                    ))}
                                                                                </>
                                                                            )}
                                                                        </View>
                                                                    )
                                                                    )}
                                                                </ScrollView>
                                                            )}
                                                        </View>
                                                        <View style={{ width: '49%' }}>
                                                            {/* <View style={[{ borderColor: 'red', borderWidth: 1,  }]}> */}
                                                            {selectedHeading === Number(index) && (
                                                                <ScrollView horizontal contentContainerStyle={{ flexDirection: 'column' }}>
                                                                    <View style={{ flexDirection: 'row' }}>
                                                                        {(header.map((title, headerindex) => (
                                                                            <Text key={`QRHeader-${headerindex}`} style={[{ fontSize: fontSizeH4().fontSize + 0, paddingVertical: getWidthnHeight(2).width, textDecorationLine: 'underline' }, getWidthnHeight(20)]}>{moment(title, "YYYYMM").format("MMM YYYY")}</Text>
                                                                        )))}
                                                                    </View>
                                                                    {item.categories.map((subItem, subIndex) => {
                                                                        const rowData = [];
                                                                        let headings = Object.entries(subItem.data).map(([key, value]) => {
                                                                            // console.log("@#@#@ OBJECT ENTERIES: ", key)
                                                                            if (key[0] === 'Y') {
                                                                                // console.log("!@!@! TYPE OF: ", typeof value, value)
                                                                                if (!Number.isInteger(value) && typeof value == 'number') {
                                                                                    value = value.toFixed(2)
                                                                                }
                                                                                if (value === null) {
                                                                                    value = 'N/A'
                                                                                }
                                                                                rowData.push({ value: value, id: `${key}-${value}` })
                                                                            }
                                                                        });
                                                                        // __DEV__ && console.log("@#@#@#@#@# dsfsdfsdfsdfs ", `QR-${subItem.displayName}-${subIndex}`)
                                                                        return (
                                                                            <View key={`QR-${subItem.displayName}-${subIndex}`}>
                                                                                <View style={[{
                                                                                    padding: getWidthnHeight(2).width,
                                                                                    borderColor: 'red', borderWidth: 0,
                                                                                    flexDirection: 'row',
                                                                                }]}>
                                                                                    {rowData.map((rowDataItem, rowDataIndex) => {
                                                                                        // __DEV__ && console.log("######^^^^^^ dsfsdfsdfsdfs ", `QRRowData-${subIndex}${rowDataIndex + 1}`)
                                                                                        return (
                                                                                            <Text key={`QRRowData-${subIndex}${rowDataIndex + 1}`} style={[{ borderColor: 'cyan', borderWidth: 0, fontWeight: 'bold', fontSize: fontSizeH4().fontSize + 2 }, getWidthnHeight(20)]}>{rowDataItem.value}</Text>
                                                                                        )
                                                                                    })}
                                                                                </View>
                                                                                {subItem.subCategory.length > 0 && selectedSubCategory === subIndex && (
                                                                                    <>
                                                                                        {subItem.subCategory.map((subCategory, subCatIndex) => {
                                                                                            const rowDataCategory = [];
                                                                                            let headings = Object.entries(subCategory.data).map(([key, value]) => {
                                                                                                if (key[0] === 'Y') {
                                                                                                    if (!Number.isInteger(value) && typeof value == 'number') {
                                                                                                        value = value.toFixed(2)
                                                                                                    }
                                                                                                    if (value === null) {
                                                                                                        value = 'N/A'
                                                                                                    }
                                                                                                    rowDataCategory.push({ value: value, id: `${key}-${value}` })
                                                                                                }
                                                                                            });
                                                                                            return (
                                                                                                <View key={`QRSubCat2-${subCategory.displayName}-${subCatIndex}`} style={{
                                                                                                    padding: getWidthnHeight(2).width,
                                                                                                    borderColor: 'red', borderTopWidth: 0,
                                                                                                    flexDirection: 'row',
                                                                                                }}>
                                                                                                    {rowDataCategory.map((rowDataCategoryItem, rowDataCategoryIndex) => {
                                                                                                        return (
                                                                                                            <Text key={`QRRowData2-${subCatIndex}-${rowDataCategoryIndex}`} style={[{ borderColor: 'cyan', borderWidth: 0, fontWeight: 'bold', fontSize: fontSizeH4().fontSize + 2 }, getWidthnHeight(20)]}>{rowDataCategoryItem.value}</Text>
                                                                                                        )
                                                                                                    })}
                                                                                                </View>
                                                                                            )
                                                                                        })}
                                                                                    </>
                                                                                )}
                                                                            </View>
                                                                        )
                                                                    }
                                                                    )}
                                                                </ScrollView>
                                                            )}
                                                            {/* </View> */}
                                                        </View>
                                                    </View>
                                                </View>
                                            );
                                        }}
                                    />
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
                        key={`QRCategories-${index}`}
                        activeOpacity={0.7}
                        onPress={() => {
                            setSelectedCategory(Number(index))
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
        </View>
    );
}