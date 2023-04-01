import React, { useEffect, useCallback, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import {
    VictoryChart,
    VictoryBar,
    VictoryAxis,
    VictoryLabel,
} from 'victory-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ProfileHeader from '../../Components/Header/ProfileHeader';
import BrandImage from '../../Components/BrandImage';
import CompanyBanner from './CompanyBanner';
import {
    fontSizeH4,
    getMarginBottom,
    getMarginLeft,
    getMarginTop,
    getMarginVertical,
    getWidthnHeight,
} from '../../Components/width';
import { ButtonSelection, DataSelection } from '../../Components/Buttons';
import { companyUrl } from '../../Url';
import jsonFile from '../../../getToken.json';
import {
    RestructureStandAloneData,
    RestructureConsolidatedData,
} from './RestructureData';
import {
    equityPaidUp,
    capitalEmployed,
    totalDebt,
    netSales,
    ebta,
    ebt,
    pat,
    eps,
    sgrth1,
    sgrth4,
    opm,
    patmrgn,
    intrcvrg,
} from './types';

const UnlistedSearch = ({ navigation }) => {
    const { UnlistedDetails } = useSelector(state => state.UnlistedDetails);
    const [unlistedData, setUnlistedData] = useState([]);
    const [standalone, setStandAlone] = useState([]);
    const [toggleStandAlone, setToggleStandAlone] = useState(true);
    const [consolidated, setConsolidated] = useState([]);
    const [tabData, setTabData] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedTab, setSelectedTab] = useState({});
    const [nestedButton, setNestedButton] = useState(equityPaidUp);
    const [chartData, setChartData] = useState([]);
    const [responseData, setResponseData] = useState([]);
    const [selectedLabel, setSelectedLabel] = useState(null);
    const userDetails = useSelector(state => state.User);

    const authToken = userDetails?.authToken;

    useEffect(() => {
        // console.log('***&&&^^^^ UNLISTED SEARCH SCREEN ', UnlistedDetails);
        getCompanyDetails();
    }, [getCompanyDetails]);

    useEffect(() => {
        if (toggleStandAlone && responseData.length > 0) {
            createStandAloneData();
        } else if (!toggleStandAlone && responseData.length > 0) {
            createConsolidatedData();
        }
    }, [toggleStandAlone, responseData]);

    function createStandAloneData() {
        const standaloneData = responseData.filter(item => item.type == 0);
        RestructureStandAloneData(standaloneData, modifyStandaloneData => {
            setStandAlone(modifyStandaloneData);
            const createTab = modifyStandaloneData.map((item, index) => {
                const keyArray = Object.keys(item);
                return {
                    id: index + 1,
                    title: item[keyArray[2]],
                    data: item[keyArray[0]],
                };
            });
            createTab.unshift({ id: 0, title: 'Basic Details', data: {} });
            console.log('\n\n\n&&&$$$### STANDALONE: ', JSON.stringify(createTab));
            setTabData(createTab);
            balanceCommonFunction(createTab);
            profitLossCommonFunction(createTab);
            ratiosCommonFunction(createTab);
        });
    }

    function balanceCommonFunction(createTab) {
        if (nestedButton === equityPaidUp) {
            balanceEquity(createTab);
        } else if (nestedButton === capitalEmployed) {
            balanceCapital(createTab);
        } else if (nestedButton === totalDebt) {
            balanceTotalDebt(createTab);
        }
    }

    function profitLossCommonFunction(createTab) {
        if (nestedButton === netSales) {
            profitLossNetSales(createTab);
        } else if (nestedButton === ebta) {
            profitLossEbtda(createTab);
        } else if (nestedButton === ebt) {
            profitLossEbt(createTab);
        } else if (nestedButton === pat) {
            profitLossPat(createTab);
        } else if (nestedButton === eps) {
            profitLossEps(createTab);
        }
    }

    function ratiosCommonFunction(createTab) {
        if (nestedButton === sgrth1) {
            ratiosSgrth1(createTab);
        } else if (nestedButton === sgrth4) {
            ratiosSgrth4(createTab);
        } else if (nestedButton === opm) {
            ratiosOpm(createTab);
        } else if (nestedButton === patmrgn) {
            ratiosPatmrgn(createTab);
        } else if (nestedButton === intrcvrg) {
            ratiosIntrcv(createTab);
        }
    }

    function createConsolidatedData() {
        const consolidatedData = responseData.filter(item => item.type == 1);
        RestructureConsolidatedData(consolidatedData, modifyConsolidatedData => {
            setConsolidated(modifyConsolidatedData);
            const createTab = modifyConsolidatedData.map((item, index) => {
                const keyArray = Object.keys(item);
                return {
                    id: index + 1,
                    title: item[keyArray[2]],
                    data: item[keyArray[0]],
                };
            });
            createTab.unshift({ id: 0, title: 'Basic Details', data: {} });
            console.log('\n\n\n&&&$$$### CONSOLIDATED: ', createTab);
            setTabData(createTab);
            balanceCommonFunction(createTab);
            profitLossCommonFunction(createTab);
            ratiosCommonFunction(createTab);
        });
    }

    const getCompanyDetails = useCallback(() => {
        const parsedData = JSON.parse(UnlistedDetails);
        axios
            .get(
                `${companyUrl}/unlistedcompanies/financials/reports/${parsedData[0].CIN}`,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                },
            )
            .then(response => {
                const data = response.data;
                setResponseData(data);
            })
            .catch(error => {
                console.log('##@@$$^^^^&&&&& ERROR: ', error);
            });
    }, []);

    function basicTitle(title) {
        return (
            <Text
                style={[
                    {
                        fontSize: fontSizeH4().fontSize + 2,
                        color: '#000000',
                        textAlign: 'justify',
                    },
                    getMarginTop(2),
                ]}>
                {title}
            </Text>
        );
    }

    function renderChart() {
        let formatData = [];
        formatData = chartData.map(item => {
            const key = Object.keys(item)[0];
            // console.log('$^$^$^$^$^$ MAP: ', key);
            return {
                x: String(key),
                y: Number(item[key]),
            };
        });
        console.log('@@@@@@@@ FORMAT: ', formatData);
        return (
            <View style={{ paddingLeft: getMarginLeft(6).marginLeft }}>
                <VictoryChart
                    height={getWidthnHeight(80).width}
                    width={getWidthnHeight(95).width}
                    domainPadding={{ x: getWidthnHeight(17).width, y: [0, 20] }}
                    scale={{ x: 'time' }}>
                    <VictoryBar
                        style={{
                            data: {
                                fill: '#0F9764',
                                overflowX: 'visible',
                                width: getWidthnHeight(8).width,
                            },
                        }}
                        labelComponent={
                            <VictoryLabel
                                textAnchor="middle"
                                style={{
                                    fontSize: fontSizeH4().fontSize + 5,
                                }}
                                x={getWidthnHeight(40).width}
                                y={getWidthnHeight(40).width}
                                text={
                                    selectedLabel
                                        ? `${selectedLabel?.datum?.y} (${selectedLabel?.datum?.x})`
                                        : ''
                                }
                            />
                        }
                        data={formatData}
                        events={[
                            {
                                target: 'data',
                                eventHandlers: {
                                    onPressIn: () => {
                                        return [
                                            {
                                                target: 'data',
                                                mutation: dataProps => {
                                                    console.log(
                                                        'item selected is',
                                                        JSON.stringify(dataProps),
                                                    );
                                                    setSelectedLabel(dataProps);
                                                    return { style: { fill: '#39B5E06F' } };
                                                },
                                            },
                                        ];
                                    },
                                    onPressOut: () => {
                                        return [
                                            {
                                                target: 'data',
                                                mutation: dataProps => {
                                                    // console.log('item selected is', dataProps);
                                                    setSelectedLabel(null);
                                                    return null;
                                                },
                                            },
                                        ];
                                    },
                                },
                            },
                        ]}
                    />
                    <VictoryAxis
                        style={{
                            tickLabels: { fontSize: fontSizeH4().fontSize + 1 },
                        }}
                    />
                    <VictoryAxis
                        dependentAxis
                        style={{
                            tickLabels: { fontSize: fontSizeH4().fontSize - 2 },
                        }}
                    />
                </VictoryChart>
            </View>
        );
    }

    function balanceEquity(rcvData) {
        let data = {};
        rcvData.forEach(item => {
            // console.log('#### EQUITY LOOP: ', item);
            if (!!item?.data?.equity_share_capital) {
                data = item?.data?.equity_share_capital;
                return;
            }
        });
        const keyArray = Object.keys(data);
        const chartValues = keyArray.map(subItem => ({
            [`${subItem}`]: data[`${subItem}`],
        }));
        chartValues.splice(chartValues.length - 1, 1);
        console.log('#### EQUITY PRESSED: ', chartValues);
        setChartData(chartValues);
        setNestedButton(equityPaidUp);
    }

    function balanceCapital(rcvData) {
        let data = null;
        rcvData.forEach(item => {
            // console.log('#### EQUITY LOOP: ', item);
            if (!!item?.data?.capital_employed) {
                data = item?.data?.capital_employed;
                return;
            }
        });
        const keyArray = Object.keys(data);
        const chartValues = keyArray.map(subItem => ({
            [`${subItem}`]: data[`${subItem}`],
        }));
        chartValues.splice(chartValues.length - 1, 1);
        console.log('#### CAPITAL PRESSED: ', chartValues);
        setChartData(chartValues);
        setNestedButton(capitalEmployed);
    }

    function balanceTotalDebt(rcvData) {
        let data = null;
        rcvData.forEach(item => {
            // console.log('#### EQUITY LOOP: ', item);
            if (!!item?.data?.total_debt) {
                data = item?.data?.total_debt;
                return;
            }
        });
        const keyArray = Object.keys(data);
        const chartValues = keyArray.map(subItem => ({
            [`${subItem}`]: data[`${subItem}`],
        }));
        chartValues.splice(chartValues.length - 1, 1);
        console.log('#### DEBT PRESSED: ', chartValues);
        setChartData(chartValues);
        setNestedButton(totalDebt);
    }

    function profitLossNetSales(rcvData) {
        let data = null;
        rcvData.forEach(item => {
            // console.log('#### EQUITY LOOP: ', item);
            if (!!item?.data?.revenue_from_operation) {
                data = item?.data?.revenue_from_operation;
                return;
            }
        });
        const keyArray = Object.keys(data);
        const chartValues = keyArray.map(subItem => ({
            [`${subItem}`]: data[`${subItem}`],
        }));
        chartValues.splice(chartValues.length - 1, 1);
        console.log('#### EQUITY PRESSED: ', chartValues);
        setChartData(chartValues);
        setNestedButton(netSales);
    }

    function profitLossEbtda(rcvData) {
        let data = null;
        rcvData.forEach(item => {
            // console.log('#### EQUITY LOOP: ', item);
            if (!!item?.data?.ebitda) {
                data = item?.data?.ebitda;
                return;
            }
        });
        const keyArray = Object.keys(data);
        const chartValues = keyArray.map(subItem => ({
            [`${subItem}`]: data[`${subItem}`],
        }));
        chartValues.splice(chartValues.length - 1, 1);
        console.log('#### EQUITY PRESSED: ', chartValues);
        setChartData(chartValues);
        setNestedButton(ebta);
    }

    function profitLossEbt(rcvData) {
        let data = null;
        rcvData.forEach(item => {
            // console.log('#### EQUITY LOOP: ', item);
            if (!!item?.data?.operating_profit) {
                data = item?.data?.operating_profit;
                return;
            }
        });
        const keyArray = Object.keys(data);
        const chartValues = keyArray.map(subItem => ({
            [`${subItem}`]: data[`${subItem}`],
        }));
        chartValues.splice(chartValues.length - 1, 1);
        console.log('#### EQUITY PRESSED: ', chartValues);
        setChartData(chartValues);
        setNestedButton(ebt);
    }

    function profitLossPat(rcvData) {
        let data = null;
        rcvData.forEach(item => {
            // console.log('#### EQUITY LOOP: ', item);
            if (!!item?.data?.pat) {
                data = item?.data?.pat;
                return;
            }
        });
        const keyArray = Object.keys(data);
        const chartValues = keyArray.map(subItem => ({
            [`${subItem}`]: data[`${subItem}`],
        }));
        chartValues.splice(chartValues.length - 1, 1);
        console.log('#### EQUITY PRESSED: ', chartValues);
        setChartData(chartValues);
        setNestedButton(pat);
    }

    function profitLossEps(rcvData) {
        let data = null;
        rcvData.forEach(item => {
            // console.log('#### EQUITY LOOP: ', item);
            if (!!item?.data?.eps) {
                data = item?.data?.eps;
                return;
            }
        });
        const keyArray = Object.keys(data);
        const chartValues = keyArray.map(subItem => ({
            [`${subItem}`]: data[`${subItem}`],
        }));
        chartValues.splice(chartValues.length - 1, 1);
        console.log('#### EQUITY PRESSED: ', chartValues);
        setChartData(chartValues);
        setNestedButton(eps);
    }

    function ratiosSgrth1(rcvData) {
        let data = null;
        rcvData.forEach(item => {
            // console.log('#### EQUITY LOOP: ', item);
            if (!!item?.data?.growth_percentage_1) {
                data = item?.data?.growth_percentage_1;
                return;
            }
        });
        const keyArray = Object.keys(data);
        const chartValues = keyArray.map(subItem => ({
            [`${subItem}`]: data[`${subItem}`],
        }));
        chartValues.splice(chartValues.length - 1, 1);
        console.log('#### EQUITY PRESSED: ', chartValues);
        setChartData(chartValues);
        setNestedButton(sgrth1);
    }

    function ratiosSgrth4(rcvData) {
        let data = null;
        rcvData.forEach(item => {
            // console.log('#### EQUITY LOOP: ', item);
            if (!!item?.data?.growth_percentage_4) {
                data = item?.data?.growth_percentage_4;
                return;
            }
        });
        const keyArray = Object.keys(data);
        const chartValues = keyArray.map(subItem => ({
            [`${subItem}`]: data[`${subItem}`],
        }));
        chartValues.splice(chartValues.length - 1, 1);
        console.log('#### EQUITY PRESSED: ', chartValues);
        setChartData(chartValues);
        setNestedButton(sgrth4);
    }

    function ratiosOpm(rcvData) {
        let data = null;
        rcvData.forEach(item => {
            // console.log('#### EQUITY LOOP: ', item);
            if (!!item?.data?.opm_percentage) {
                data = item?.data?.opm_percentage;
                return;
            }
        });
        const keyArray = Object.keys(data);
        const chartValues = keyArray.map(subItem => ({
            [`${subItem}`]: data[`${subItem}`],
        }));
        chartValues.splice(chartValues.length - 1, 1);
        console.log('#### EQUITY PRESSED: ', chartValues);
        setChartData(chartValues);
        setNestedButton(opm);
    }

    function ratiosPatmrgn(rcvData) {
        let data = null;
        rcvData.forEach(item => {
            // console.log('#### EQUITY LOOP: ', item);
            if (!!item?.data?.pat_margin) {
                data = item?.data?.pat_margin;
                return;
            }
        });
        const keyArray = Object.keys(data);
        const chartValues = keyArray.map(subItem => ({
            [`${subItem}`]: data[`${subItem}`],
        }));
        chartValues.splice(chartValues.length - 1, 1);
        console.log('#### EQUITY PRESSED: ', chartValues);
        setChartData(chartValues);
        setNestedButton(patmrgn);
    }

    function ratiosIntrcv(rcvData) {
        let data = null;
        rcvData.forEach(item => {
            // console.log('#### EQUITY LOOP: ', item);
            if (!!item?.data?.interest_coverage_ratio) {
                data = item?.data?.interest_coverage_ratio;
                return;
            }
        });
        const keyArray = Object.keys(data);
        const chartValues = keyArray.map(subItem => ({
            [`${subItem}`]: data[`${subItem}`],
        }));
        chartValues.splice(chartValues.length - 1, 1);
        console.log('#### EQUITY PRESSED: ', chartValues);
        setChartData(chartValues);
        setNestedButton(intrcvrg);
    }

    let companyShort = JSON.parse(UnlistedDetails);
    companyShort = companyShort[0];
    // console.log('#$#$#$# PARSED DATA: ', companyShort);
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
            <ProfileHeader />
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    borderWidth: 0,
                    borderColor: 'red',
                }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                        <BrandImage />
                        <CompanyBanner CompanyDetails={UnlistedDetails} />
                        <ButtonSelection />
                        <View
                            style={[
                                {
                                    backgroundColor: '#EBEBEB',
                                    borderRadius: getWidthnHeight(3).width,
                                },
                                getWidthnHeight(95, 7),
                                getMarginTop(2),
                            ]}>
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={tabData}
                                keyExtractor={item => `${item.id}`}
                                renderItem={({ item, index }) => {
                                    if (selectedIndex === index) {
                                        return (
                                            <View
                                                style={{
                                                    paddingHorizontal: getWidthnHeight(3).width,
                                                    borderBottomColor: '#0F9764',
                                                    borderBottomWidth: getWidthnHeight(1).width,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                <Text style={{ fontSize: fontSizeH4().fontSize + 2 }}>
                                                    {item.title}
                                                </Text>
                                            </View>
                                        );
                                    } else {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    if (index > 0) {
                                                        setSelectedTab(item.data);
                                                        if (!!item?.data?.equity_share_capital) {
                                                            const keyArray = Object.keys(
                                                                item.data.equity_share_capital,
                                                            );
                                                            const chartValues = keyArray.map(subItem => ({
                                                                [`${subItem}`]:
                                                                    item.data.equity_share_capital[`${subItem}`],
                                                            }));
                                                            chartValues.splice(chartValues.length - 1, 1);
                                                            setChartData(chartValues);
                                                            setNestedButton(equityPaidUp);
                                                            console.log('&*&*&*&* CLICKED: ', chartValues);
                                                        }
                                                    }
                                                    if (!!item?.data?.revenue_from_operation) {
                                                        const keyArray = Object.keys(
                                                            item.data.revenue_from_operation,
                                                        );
                                                        const chartValues = keyArray.map(subItem => ({
                                                            [`${subItem}`]:
                                                                item.data.revenue_from_operation[`${subItem}`],
                                                        }));
                                                        chartValues.splice(chartValues.length - 1, 1);
                                                        setChartData(chartValues);
                                                        setNestedButton(netSales);
                                                    }
                                                    if (!!item?.data?.growth_percentage_1) {
                                                        const keyArray = Object.keys(
                                                            item.data.growth_percentage_1,
                                                        );
                                                        const chartValues = keyArray.map(subItem => ({
                                                            [`${subItem}`]:
                                                                item.data.growth_percentage_1[`${subItem}`],
                                                        }));
                                                        chartValues.splice(chartValues.length - 1, 1);
                                                        setChartData(chartValues);
                                                        setNestedButton(sgrth1);
                                                    }
                                                    setSelectedIndex(index);
                                                }}
                                                style={{
                                                    paddingHorizontal: getWidthnHeight(3).width,
                                                    borderBottomColor: '#0F976400',
                                                    borderBottomWidth: getWidthnHeight(1).width,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                <Text style={{ fontSize: fontSizeH4().fontSize + 2 }}>
                                                    {item.title}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    }
                                }}
                            />
                        </View>
                        <View
                            style={[
                                {
                                    backgroundColor: '#EBEBEB',
                                    alignItems: 'center',
                                    borderRadius: getWidthnHeight(3).width,
                                    paddingBottom: getMarginBottom(2).marginBottom,
                                },
                                getWidthnHeight(95),
                                getMarginTop(2),
                            ]}>
                            <View
                                style={[
                                    { alignItems: 'flex-start' },
                                    getWidthnHeight(90),
                                    getMarginTop(2),
                                ]}>
                                <Text
                                    style={{
                                        color: '#0F9764',
                                        fontSize: fontSizeH4().fontSize + 4,
                                        fontWeight: 'bold',
                                    }}>
                                    {tabData[selectedIndex]?.title}
                                </Text>
                            </View>
                            {selectedIndex !== 0 && (
                                <View
                                    style={[{ transform: [{ scale: 0.8 }] }, getMarginVertical(2)]}>
                                    <DataSelection
                                        standAlone={toggleStandAlone}
                                        setStandAlone={setToggleStandAlone}
                                    />
                                </View>
                            )}

                            {selectedIndex > 0 && renderChart()}
                            {/* {toggleStandAlone ? (
              <FlatList
                horizontal
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                // getItemLayout={this.getItemLayout.bind(this)}
                // onMomentumScrollEnd={this.setSelectedIndex.bind(this)}
                pagingEnabled
                data={standalone}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                  let buttonKeys = [];
                  if (!!item?.balanceSheet) {
                    buttonKeys = Object.keys(item.balanceSheet);
                    console.log('@#$%^&* FLATLIST: ', buttonKeys);
                  }
                  return (
                    <View style={[{alignItems: 'center'}, getWidthnHeight(95)]}>
                      <View
                        style={[
                          {alignItems: 'flex-start'},
                          getWidthnHeight(90),
                        ]}>
                        <Text
                          style={{
                            color: '#0F9764',
                            fontSize: fontSizeH4().fontSize + 4,
                            fontWeight: 'bold',
                          }}>
                          {item.name}
                        </Text>
                        <View style={[{}, getWidthnHeight(90)]}>
                          {!!item?.balanceSheet &&
                            buttonKeys.map(subItem => {
                              return (
                                <View
                                  style={[
                                    {backgroundColor: 'white'},
                                    getWidthnHeight(45, 5),
                                    getMarginTop(1),
                                  ]}>
                                  <Text>
                                    {item.balanceSheet[subItem]['title']}
                                  </Text>
                                </View>
                              );
                            })}
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            ) : (
              <FlatList
                horizontal
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                // getItemLayout={this.getItemLayout.bind(this)}
                // onMomentumScrollEnd={this.setSelectedIndex.bind(this)}
                pagingEnabled
                data={consolidated}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                  // console.log('@#$%^&* FLATLIST: ', item);
                  return (
                    <View style={[{alignItems: 'center'}, getWidthnHeight(95)]}>
                      <View
                        style={[
                          {alignItems: 'flex-start'},
                          getWidthnHeight(90),
                        ]}>
                        <Text>{item.name}</Text>
                      </View>
                    </View>
                  );
                }}
              />
            )} */}
                            <View style={[getWidthnHeight(90), getMarginTop(2)]}>
                                {selectedIndex === 0 && (
                                    <>
                                        <Text
                                            style={{
                                                fontSize: fontSizeH4().fontSize + 2,
                                                color: '#000000',
                                                textAlign: 'justify',
                                            }}>{`${companyShort?.companyName} was incorporated on ${companyShort?.dateOfRegistration} as a ${companyShort?.companyClass}  ${companyShort?.listedUnlisted} company with the MCA. The Corporate Identification Number of ${companyShort?.companyName} is ${companyShort?.CIN}.  It is classified as ${companyShort?.companyCategory} , ${companyShort?.companySubCategory} and  is engaged in the business of ${companyShort?.principalBusinessActivity} at ${companyShort?.registeredState} under the ${companyShort?.registrarOfCompanies}.`}</Text>
                                        {companyShort &&
                                            companyShort.type &&
                                            companyShort.type != 4 &&
                                            basicTitle(
                                                `It is currently an ${companyShort?.companyStatus} company.`,
                                            )}
                                        {basicTitle(
                                            `Name of the company => ${companyShort?.companyName}`,
                                        )}
                                        {basicTitle(
                                            `Class of company => ${companyShort?.companyClass}`,
                                        )}
                                        {basicTitle(
                                            `Status of company => ${companyShort?.companyStatus}`,
                                        )}
                                        {basicTitle(`CIN => ${companyShort?.CIN}`)}
                                        {basicTitle(
                                            `Registration date => ${companyShort?.dateOfRegistration}`,
                                        )}
                                        {basicTitle(`RoC => ${companyShort?.registrarOfCompanies}`)}
                                        {basicTitle(
                                            `Primary activity => ${companyShort?.descriptionOfMainActivity}`,
                                        )}
                                        {basicTitle(
                                            `Paid-up capital => ${companyShort?.paidUpCapital}`,
                                        )}
                                        {basicTitle(
                                            `Authorized capital => ${companyShort?.authorizedCapital}`,
                                        )}
                                        {basicTitle(`Partners => ${companyShort?.partners}`)}
                                        {basicTitle(
                                            `Office address => ${companyShort?.registeredOfficeAddress}`,
                                        )}
                                        {basicTitle(`Email => ${companyShort?.email}`)}
                                    </>
                                )}
                                {selectedIndex === 1 && (
                                    <View style={{ alignItems: 'center' }}>
                                        <View
                                            style={[
                                                {
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-evenly',
                                                },
                                                getWidthnHeight(90),
                                            ]}>
                                            <TouchableOpacity
                                                disabled={nestedButton === equityPaidUp}
                                                onPress={() => {
                                                    balanceEquity(tabData);
                                                }}
                                                style={[
                                                    {
                                                        backgroundColor:
                                                            nestedButton === equityPaidUp
                                                                ? '#0F9764'
                                                                : '#FFFFFF',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        borderRadius: getWidthnHeight(2).width,
                                                    },
                                                    getWidthnHeight(35, 5),
                                                ]}>
                                                <Text
                                                    style={{
                                                        color:
                                                            nestedButton === equityPaidUp
                                                                ? '#FFFFFF'
                                                                : '#0F9764',
                                                        fontSize: fontSizeH4().fontSize + 1,
                                                    }}>
                                                    {equityPaidUp}
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                disabled={nestedButton === capitalEmployed}
                                                onPress={() => {
                                                    balanceCapital(tabData);
                                                }}
                                                style={[
                                                    {
                                                        backgroundColor:
                                                            nestedButton === capitalEmployed
                                                                ? '#0F9764'
                                                                : '#FFFFFF',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        borderRadius: getWidthnHeight(2).width,
                                                    },
                                                    getWidthnHeight(35, 5),
                                                ]}>
                                                <Text
                                                    style={{
                                                        color:
                                                            nestedButton === capitalEmployed
                                                                ? '#FFFFFF'
                                                                : '#0F9764',
                                                        fontSize: fontSizeH4().fontSize + 1,
                                                    }}>
                                                    {capitalEmployed}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity
                                            disabled={nestedButton === totalDebt}
                                            onPress={() => {
                                                balanceTotalDebt(tabData);
                                            }}
                                            style={[
                                                {
                                                    backgroundColor:
                                                        nestedButton === totalDebt ? '#0F9764' : '#FFFFFF',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: getWidthnHeight(2).width,
                                                },
                                                getWidthnHeight(35, 5),
                                                getMarginTop(2),
                                            ]}>
                                            <Text
                                                style={{
                                                    color:
                                                        nestedButton === totalDebt ? '#FFFFFF' : '#0F9764',
                                                    fontSize: fontSizeH4().fontSize + 1,
                                                }}>
                                                {totalDebt}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                {selectedIndex === 2 && (
                                    <View style={{ alignItems: 'center' }}>
                                        <View
                                            style={[
                                                {
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-evenly',
                                                },
                                                getWidthnHeight(90),
                                            ]}>
                                            <TouchableOpacity
                                                disabled={nestedButton === netSales}
                                                onPress={() => {
                                                    profitLossNetSales(tabData);
                                                }}
                                                style={[
                                                    {
                                                        backgroundColor:
                                                            nestedButton === netSales ? '#0F9764' : '#FFFFFF',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        borderRadius: getWidthnHeight(2).width,
                                                    },
                                                    getWidthnHeight(35, 5),
                                                ]}>
                                                <Text
                                                    style={{
                                                        color:
                                                            nestedButton === netSales ? '#FFFFFF' : '#0F9764',
                                                        fontSize: fontSizeH4().fontSize + 1,
                                                    }}>
                                                    {netSales}
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                disabled={nestedButton === ebta}
                                                onPress={() => {
                                                    profitLossEbtda(tabData);
                                                }}
                                                style={[
                                                    {
                                                        backgroundColor:
                                                            nestedButton === ebta ? '#0F9764' : '#FFFFFF',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        borderRadius: getWidthnHeight(2).width,
                                                    },
                                                    getWidthnHeight(35, 5),
                                                ]}>
                                                <Text
                                                    style={{
                                                        color:
                                                            nestedButton === ebta ? '#FFFFFF' : '#0F9764',
                                                        fontSize: fontSizeH4().fontSize + 1,
                                                    }}>
                                                    {ebta}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View
                                            style={[
                                                {
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-evenly',
                                                },
                                                getWidthnHeight(90),
                                                getMarginTop(2),
                                            ]}>
                                            <TouchableOpacity
                                                disabled={nestedButton === ebt}
                                                onPress={() => {
                                                    profitLossEbt(tabData);
                                                }}
                                                style={[
                                                    {
                                                        backgroundColor:
                                                            nestedButton === ebt ? '#0F9764' : '#FFFFFF',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        borderRadius: getWidthnHeight(2).width,
                                                    },
                                                    getWidthnHeight(35, 5),
                                                ]}>
                                                <Text
                                                    style={{
                                                        color: nestedButton === ebt ? '#FFFFFF' : '#0F9764',
                                                        fontSize: fontSizeH4().fontSize + 1,
                                                    }}>
                                                    {ebt}
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                disabled={nestedButton === pat}
                                                onPress={() => {
                                                    profitLossPat(tabData);
                                                }}
                                                style={[
                                                    {
                                                        backgroundColor:
                                                            nestedButton === pat ? '#0F9764' : '#FFFFFF',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        borderRadius: getWidthnHeight(2).width,
                                                    },
                                                    getWidthnHeight(35, 5),
                                                ]}>
                                                <Text
                                                    style={{
                                                        color: nestedButton === pat ? '#FFFFFF' : '#0F9764',
                                                        fontSize: fontSizeH4().fontSize + 1,
                                                    }}>
                                                    {pat}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity
                                            disabled={nestedButton === eps}
                                            onPress={() => {
                                                profitLossEps(tabData);
                                            }}
                                            style={[
                                                {
                                                    backgroundColor:
                                                        nestedButton === eps ? '#0F9764' : '#FFFFFF',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: getWidthnHeight(2).width,
                                                },
                                                getWidthnHeight(35, 5),
                                                getMarginTop(2),
                                            ]}>
                                            <Text
                                                style={{
                                                    color: nestedButton === eps ? '#FFFFFF' : '#0F9764',
                                                    fontSize: fontSizeH4().fontSize + 1,
                                                }}>
                                                {eps}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                {selectedIndex === 3 && (
                                    <View style={{ alignItems: 'center' }}>
                                        <View
                                            style={[
                                                {
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-evenly',
                                                },
                                                getWidthnHeight(90),
                                            ]}>
                                            <TouchableOpacity
                                                disabled={nestedButton === sgrth1}
                                                onPress={() => ratiosSgrth1(tabData)}
                                                style={[
                                                    {
                                                        backgroundColor:
                                                            nestedButton === sgrth1 ? '#0F9764' : '#FFFFFF',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        borderRadius: getWidthnHeight(2).width,
                                                    },
                                                    getWidthnHeight(35, 5),
                                                ]}>
                                                <Text
                                                    style={{
                                                        color:
                                                            nestedButton === sgrth1 ? '#FFFFFF' : '#0F9764',
                                                        fontSize: fontSizeH4().fontSize + 1,
                                                    }}>
                                                    {sgrth1}
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                disabled={nestedButton === sgrth4}
                                                onPress={() => {
                                                    ratiosSgrth4(tabData);
                                                }}
                                                style={[
                                                    {
                                                        backgroundColor:
                                                            nestedButton === sgrth4 ? '#0F9764' : '#FFFFFF',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        borderRadius: getWidthnHeight(2).width,
                                                    },
                                                    getWidthnHeight(35, 5),
                                                ]}>
                                                <Text
                                                    style={{
                                                        color:
                                                            nestedButton === sgrth4 ? '#FFFFFF' : '#0F9764',
                                                        fontSize: fontSizeH4().fontSize + 1,
                                                    }}>
                                                    {sgrth4}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View
                                            style={[
                                                {
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-evenly',
                                                },
                                                getWidthnHeight(90),
                                                getMarginTop(2),
                                            ]}>
                                            <TouchableOpacity
                                                disabled={nestedButton === opm}
                                                onPress={() => ratiosOpm(tabData)}
                                                style={[
                                                    {
                                                        backgroundColor:
                                                            nestedButton === opm ? '#0F9764' : '#FFFFFF',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        borderRadius: getWidthnHeight(2).width,
                                                    },
                                                    getWidthnHeight(35, 5),
                                                ]}>
                                                <Text
                                                    style={{
                                                        color: nestedButton === opm ? '#FFFFFF' : '#0F9764',
                                                        fontSize: fontSizeH4().fontSize + 1,
                                                    }}>
                                                    {opm}
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                disabled={nestedButton === patmrgn}
                                                onPress={() => ratiosPatmrgn(tabData)}
                                                style={[
                                                    {
                                                        backgroundColor:
                                                            nestedButton === patmrgn ? '#0F9764' : '#FFFFFF',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        borderRadius: getWidthnHeight(2).width,
                                                    },
                                                    getWidthnHeight(35, 5),
                                                ]}>
                                                <Text
                                                    style={{
                                                        color:
                                                            nestedButton === patmrgn ? '#FFFFFF' : '#0F9764',
                                                        fontSize: fontSizeH4().fontSize + 1,
                                                    }}>
                                                    {patmrgn}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity
                                            disabled={nestedButton === intrcvrg}
                                            onPress={() => ratiosIntrcv(tabData)}
                                            style={[
                                                {
                                                    backgroundColor:
                                                        nestedButton === intrcvrg ? '#0F9764' : '#FFFFFF',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: getWidthnHeight(2).width,
                                                },
                                                getWidthnHeight(35, 5),
                                                getMarginTop(2),
                                            ]}>
                                            <Text
                                                style={{
                                                    color:
                                                        nestedButton === intrcvrg ? '#FFFFFF' : '#0F9764',
                                                    fontSize: fontSizeH4().fontSize + 1,
                                                }}>
                                                {intrcvrg}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        </View>
                    </ScrollView>
                </View>
                {/* <View
                    style={[
                        { borderColor: 'blue', borderWidth: 0 },
                        getWidthnHeight(100, 8.5),
                    ]}
                /> */}
            </View>
        </SafeAreaView>
    );
};

export default UnlistedSearch;
