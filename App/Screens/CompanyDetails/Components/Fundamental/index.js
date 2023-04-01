import axios from "axios";
import React, { useCallback, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { companyUrl, CloudUrl } from "../../../../Url";
import { getWidthnHeight, fontSizeH4, getMarginTop, getMarginHorizontal, getMarginLeft, getMarginVertical } from '../../../../Components/width';
import ManagementTab from "./ManagementTab";
import RatiosTab from "./RatiosTab";
import PeerComparisonTab from "./PeerComparisonTab";
import FinancialTab from "./FinancialTab/FinancialTab";
import ShareHoldingsPattern from "./ShareHoldingsPattern";

export default function Fundamental({

}) {

    const [selectedFundamentalIndex, setSelectedFundamentalIndex] = useState(0);
    const [currentCompanyDetails, setCurrentCompanyDetails] = useState([]);
    const [quaterlyResultsData, setQuaterlyResultsData] = useState([]);
    const [profitLossData, setProfitLossData] = useState([]);
    const [balanceSheet, setBalanceSheet] = useState([]);
    const [cashFlow, setCashFlow] = useState([]);
    const [ratiosData, setRatiosData] = useState([]);
    const [peerCompData, setPeerCompData] = useState([]);
    const [managementData, setManagementData] = useState([]);
    const [shareHoldingData, setShareHoldingData] = useState([]);
    const [topShareHolderData, setTopShareHolderData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { DomesticIndexLayerTwo } = useSelector(
        state => state.DomesticIndexLayerTwo,
    );
    const { CompanyDetails } = useSelector(state => state.CompanyDetails);
    const userDetails = useSelector(state => state.User);
    const authToken = userDetails?.authToken;
    // console.log("#$#$#@#@#@#@ AUTH TOKEN: ", authToken)

    function showLoader() {
        setLoading(true)
    }

    function hideLoader() {
        setLoading(false)
    }

    useEffect(() => {
        if (selectedFundamentalIndex === 0) {
            getCompanyDetails();
        } else if (selectedFundamentalIndex === 1) {
            getRatiosData();
        } else if (selectedFundamentalIndex === 2) {
            getPeerCompData();
        } else if (selectedFundamentalIndex === 3) {
            getShareHoldingPattern();
        } else if (selectedFundamentalIndex === 4) {
            getManagementData();
        }

        return () => {
            if (selectedFundamentalIndex === 0) {
                setQuaterlyResultsData([]);

                setCurrentCompanyDetails([]);
            } else if (selectedFundamentalIndex === 1) {
                setRatiosData([]);
            } else if (selectedFundamentalIndex === 2) {
                setPeerCompData([]);
            } else if (selectedFundamentalIndex === 3) {
                setTopShareHolderData([]);
            } else if (selectedFundamentalIndex === 4) {
                __DEV__ && console.log("@#@#@#@@#@#@#@ UNMOUNT MGMT")
                setManagementData([]);
            }
        }
    }, [selectedFundamentalIndex, getManagementData, getRatiosData, getPeerCompData]);

    const getCompanyDetails = useCallback(() => {
        showLoader();
        const co_code = CompanyDetails[0]['co_code'];
        axios
            .get(`${companyUrl}/listed/co_code/${co_code}`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then(response => {
                hideLoader();
                // console.log("$$$### GET CMPNY DETAILS RESPONSE: ", JSON.stringify(response.data, null, 4));
                // if (Array.isArray(response.data?.data) && response.data?.data?.length > 0) {
                setCurrentCompanyDetails(response.data);
                getQuaterlyResultsData();
                // }
            })
            .catch(error => {
                hideLoader();
                console.log("$$$### GET CMPNY DETAILS ERROR: ", JSON.stringify(error, null, 4));
            });
    }, []);

    const getQuaterlyResultsData = useCallback((inital = 'S') => {
        showLoader();
        const co_code = CompanyDetails[0]['co_code']
        axios.get(`${companyUrl}/listedfinancials/quarterlyresults/${co_code}/${inital}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        }).then((response) => {
            hideLoader();
            const data = response.data?.data;
            // __DEV__ && console.log("!@!@!@!#$#$ FINANCIALS DATA: ", response.data)
            if (Array.isArray(response.data?.data) && response.data?.data?.length > 0) {
                setQuaterlyResultsData(data);
            }
        }).catch((error) => {
            hideLoader();
            __DEV__ && console.log("@#@#!@!@%#% FINANCIALS ERROR: ", JSON.stringify(error, null, 4))
        })
    }, [authToken]);

    const getProfitLossData = (inital = 'S') => {
        showLoader();
        const co_code = CompanyDetails[0]['co_code']
        __DEV__ && console.log("PROFIT LOSS CALLED ", co_code)
        axios.get(`${companyUrl}/listedfinancials/profitandloss/${co_code}/${inital}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        }).then((response) => {
            hideLoader();
            const data = response.data?.data;
            // __DEV__ && console.log("!@!@!@!#$#$ PROFIT LOSS DATA: ", data)
            setProfitLossData(data);
        }).catch((error) => {
            hideLoader();
            __DEV__ && console.log("@#@#!@!@$$$$ PROFIT LOSS ERROR: ", error)
        })
    };

    const getBalanceSheet = (inital = 'S') => {
        showLoader();
        const co_code = CompanyDetails[0]['co_code']
        __DEV__ && console.log("BALANCE SHEET CALLED ", co_code)
        axios.get(`${companyUrl}/listedfinancials/balancesheet/${co_code}/${inital}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        }).then((response) => {
            hideLoader();
            const data = response.data?.data;
            // __DEV__ && console.log("!@!@!@!#$#$ BALANCE SHEET DATA: ", data)
            setBalanceSheet(data);
        }).catch((error) => {
            hideLoader();
            __DEV__ && console.log("@#@#!@!@$$$$ BALANCE SHEET ERROR: ", error)
        })
    };

    const getCashFlow = (inital = 'S') => {
        showLoader();
        const co_code = CompanyDetails[0]['co_code']
        __DEV__ && console.log("CASH FLOW CALLED ", co_code)
        axios.get(`${companyUrl}/listedfinancials/cashflow/${co_code}/${inital}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        }).then((response) => {
            hideLoader();
            const data = response.data?.data;
            // __DEV__ && console.log("!@!@!@!#$#$ CASH FLOW DATA: ", data)
            setCashFlow(data);
        }).catch((error) => {
            hideLoader();
            __DEV__ && console.log("@#@#!@!@$$$$ CASH FLOW ERROR: ", error)
        })
    };

    const getRatiosData = useCallback((inital = 'S') => {
        showLoader();
        const co_code = CompanyDetails[0]['co_code']
        axios.get(`${CloudUrl}/master/?path=KeyFinancialRatios/${co_code}/${inital}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        }).then((response) => {
            hideLoader();
            const data = response.data?.data;
            // __DEV__ && console.log("!@!@!@!#$#$ MGMT DATA: ", data)
            setRatiosData(data);
        }).catch((error) => {
            hideLoader();
            __DEV__ && console.log("@#@#!@!@%#% RATIOS ERROR: ", error)
        })
    }, []);

    const getPeerCompData = useCallback((inital = 'S') => {
        showLoader();
        const co_code = CompanyDetails[0]['co_code']
        axios.get(`${CloudUrl}/listedpeerdata?co_code=${co_code}&type=${inital}&count=10`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        }).then((response) => {
            hideLoader();
            const data = response.data;
            // __DEV__ && console.log("!@!@!@!#$#$ MGMT DATA: ", data)
            setPeerCompData(data);
        }).catch((error) => {
            hideLoader();
            __DEV__ && console.log("@#@#!@!@%#% PEER COMP ERROR: ", error)
        })
    }, []);

    const getManagementData = useCallback(() => {
        showLoader();
        const co_code = CompanyDetails[0]['co_code']
        axios.get(`${companyUrl}/listedfinancials/boardofdirectors/${co_code}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        }).then((response) => {
            hideLoader();
            const data = response.data?.data;
            // __DEV__ && console.log("!@!@!@!#$#$ MGMT DATA: ", data)
            setManagementData(data)
        }).catch((error) => {
            hideLoader();
            __DEV__ && console.log("@#@#!@!@%#% MGMT ERROR: ", error)
        })
    }, []);

    function getShareHoldingPattern() {
        showLoader();
        const co_code = CompanyDetails[0]['co_code']
        axios.get(`${companyUrl}/listedshareholdings/pattern/co_code/${co_code}`, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        }).then((response) => {
            hideLoader();
            let data = response.data?.data;
            // data = data.map((item, index) => ({
            //     ...item,
            //     id: `${index + 1}`
            // }))
            console.log("@!@!@!@ SHARE HOLDING RESPONSE: ", data)
            setShareHoldingData(data);
            getTopShareHolders();
        }).catch((error) => {
            hideLoader();
            console.log("@!@!@!@ SHARE HOLDING ERROR: ", JSON.stringify(error, null, 4))
        })
    }

    function getTopShareHolders() {
        showLoader();
        const co_code = CompanyDetails[0]['co_code']
        axios.get(`${companyUrl}/listedshareholdings/co_code/${co_code}`, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        }).then((response) => {
            hideLoader();
            let data = response.data?.data;
            data = data.map((item, index) => ({
                ...item,
                id: `${index + 1}`
            }))
            // console.log("@!@!@!@ SHARE HOLDER RESPONSE: ", data)
            setTopShareHolderData(data);
        }).catch((error) => {
            hideLoader();
            console.log("@!@!@!@ SHARE HOLDER ERROR: ", JSON.stringify(error, null, 4))
        })
    }

    const fundamentalTabs = [{
        id: '0',
        name: 'Financials'
    }, {
        id: '1',
        name: 'Ratios'
    },
    {
        id: '2',
        name: 'Peer Comparison'
    },
    {
        id: '3',
        name: 'ShareHoldings Pattern'
    },
    {
        id: '4',
        name: 'Management'
    }];

    return (
        <View style={[{ alignItems: 'center', flex: 1 }, getMarginTop(0.5), getMarginHorizontal(3)]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#c4c4c426', borderRadius: getWidthnHeight(2).width }}>
                <ScrollView horizontal>
                    {fundamentalTabs.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={`fundamentalTabs-${item.name}-${item.id}`}
                                disabled={selectedFundamentalIndex === index}
                                onPress={() => setSelectedFundamentalIndex(index)}
                                style={{
                                    padding: getWidthnHeight(3).width,
                                    borderBottomColor: (selectedFundamentalIndex === index) ? '#0F9764' : 'transparent',
                                    borderBottomWidth: getWidthnHeight(1).width
                                }}>
                                <Text style={{ fontSize: fontSizeH4().fontSize + 2, color: '#000000' }}>{item.name}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ flex: 1, alignItems: 'center', borderWidth: 0, borderColor: 'cyan' }}>
                    {(selectedFundamentalIndex === 0) && (
                        <FinancialTab
                            currentCompanyDetails={currentCompanyDetails}
                            quaterlyResultsData={quaterlyResultsData}
                            getQuaterlyResultsData={getQuaterlyResultsData}
                            profitLossData={profitLossData}
                            getProfitLossData={getProfitLossData}
                            balanceSheet={balanceSheet}
                            getBalanceSheet={getBalanceSheet}
                            cashFlow={cashFlow}
                            getCashFlow={getCashFlow}
                        />
                    )}
                    {(selectedFundamentalIndex === 1) && (
                        <RatiosTab ratiosData={ratiosData} getRatiosData={getRatiosData} />
                    )}
                    {(selectedFundamentalIndex === 2) && (
                        <PeerComparisonTab peerCompData={peerCompData} getPeerCompData={getPeerCompData} />
                    )}
                    {(selectedFundamentalIndex === 3) && (
                        <ShareHoldingsPattern shareHoldingData={shareHoldingData} topShareHolderData={topShareHolderData} />
                    )}
                    {(selectedFundamentalIndex === 4) && (
                        <ManagementTab managementData={managementData} />
                    )}
                </View>
                <View
                    style={[
                        {
                            backgroundColor: loading
                                ? 'rgba(0, 0, 0, 0.6)'
                                : 'transparent',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: getWidthnHeight(3).width
                        },
                        StyleSheet.absoluteFill,
                    ]}
                    pointerEvents={loading ? 'auto' : 'none'}>
                    {loading && (
                        <ActivityIndicator
                            color="#ffffff"
                            size={'large'}
                        //style={[getMarginTop(-10)]}
                        />
                    )}
                </View>
            </View>
        </View>
    );
}