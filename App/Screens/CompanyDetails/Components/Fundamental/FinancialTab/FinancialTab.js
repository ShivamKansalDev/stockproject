import moment from "moment";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';

import { getWidthnHeight, fontSizeH4, getMarginVertical, getMarginTop, getMarginBottom, getMarginRight, getMarginHorizontal } from "../../../../../Components/width";
import BalanceSheet from "./BalanceSheet";
import CashFlowTab from "./CashFlow";
import ProfitAndLoss from "./ProfitAndLoss";
// import BANKC from '../Financials/QRColumnsInfo/BANKC.json';
// import BANKS from '../Financials/QRColumnsInfo/BANKS.json';
// import FINC from '../Financials/QRColumnsInfo/FINC.json';
// import FINS from '../Financials/QRColumnsInfo/FINS.json';
// import INSC from '../Financials/QRColumnsInfo/INSC.json';
// import INSS from '../Financials/QRColumnsInfo/INSS.json';
// import MANC from '../Financials/QRColumnsInfo/MANC.json';
// import MANS from '../Financials/QRColumnsInfo/MANS.json';
import QuaterlyResults from "./QuaterlyReport";

export default function FinancialTab({
    currentCompanyDetails = [],
    quaterlyResultsData = [],
    getQuaterlyResultsData = () => { },
    profitLossData = [],
    getProfitLossData = () => { },
    balanceSheet = [],
    getBalanceSheet = () => { },
    cashFlow = [],
    getCashFlow = () => { }
}) {
    const categories = [
        {
            id: '0',
            label: 'Quaterly Results'
        },
        // {
        //     id: '1',
        //     label: 'Profit & Loss'
        // },
        // {
        //     id: '2',
        //     label: 'Balance Sheet'
        // },
        // {
        //     id: '3',
        //     label: 'Cash Flow'
        // }
    ];

    return (
        <View style={[getMarginTop(2)]}>
            <QuaterlyResults
                quaterlyResultsData={quaterlyResultsData}
                currentCompanyDetails={currentCompanyDetails}
                getQuaterlyResultsData={getQuaterlyResultsData}
            />
            <ProfitAndLoss
                profitLossData={profitLossData}
                currentCompanyDetails={currentCompanyDetails}
                getProfitLossData={getProfitLossData}
            />
            <BalanceSheet
                balanceSheet={balanceSheet}
                currentCompanyDetails={currentCompanyDetails}
                getBalanceSheet={getBalanceSheet}
            />
            <CashFlowTab
                cashFlow={cashFlow}
                currentCompanyDetails={currentCompanyDetails}
                getCashFlow={getCashFlow}
            />
        </View>
    );
}