import moment from "moment";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { DataSelection } from "../../../../Components/Buttons";

import { getWidthnHeight, fontSizeH4, getMarginTop, getMarginBottom, getMarginVertical, } from "../../../../Components/width";


export default function ShareHoldingsPattern({
    shareHoldingData = [],
    topShareHolderData = []
}) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedHeading, setSelectedHeading] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [selectedNestedCategory, setSelectedNestedCategory] = useState(null);
    const [dataType, setDataType] = useState('S');
    const [selectedJSON, setSelectedJSON] = useState('');
    const [cashFlowData, setCashFlowData] = useState([]);
    const [selectSubTab, setSelectSubTab] = useState('1');
    const [header, setHeader] = useState([]);
    const [data, setData] = useState([]);
    const [patternsColumnInfo, setPatternsColumnInfo] = useState([]);
    const [subDataType, setSubDataType] = useState('TS');
    const [patternsRowInfo, setPatternsRowInfo] = useState([]);
    const categories = [
        {
            id: '0',
            label: 'Cash Flow'
        }
    ];

    useEffect(() => {
        if (shareHoldingData.length > 0) {
            const headerData = shareHoldingData.map((item) => `${item.YRC}`)
            setHeader(headerData);
            const tempColumnInfo = processShareHoldingPatterns_Columns(shareHoldingData);
            console.log("$$#@$##@#@@@#@ COLUMN OPTIONS: ", tempColumnInfo);
            ProcessShareHoldingPatterns_TOTAL_SHARES(shareHoldingData, tempColumnInfo);
        }
    }, [shareHoldingData]);

    // Process Columns
    function processShareHoldingPatterns_Columns(responsePatterns = []) {
        let columnOptions = [];
        if (responsePatterns.length) {
            columnOptions.push({ field: 'id', headerName: '', width: 0 });
            columnOptions.push({ field: 'name', headerName: 'Particulars', width: getWidthnHeight(45).width });
            responsePatterns.forEach((item, index) => {
                if (item) {
                    columnOptions.push({
                        field: item.YRC,
                        headerName: moment(item.YRC, "YYYYMM").format("MMM YYYY"),
                        width: getWidthnHeight(25).width,
                        align: 'right',
                        headerAlign: 'right'
                    });
                }
            });
            columnOptions = columnOptions.map((item, index) => ({
                ...item,
                _id: `${index}`
            }))
            setPatternsColumnInfo(columnOptions);
        }
        else {
            setPatternsColumnInfo(columnOptions);
        }
        return columnOptions;
    }

    function ProcessShareHoldingPatterns_TOTAL_SHARES(responsePatterns = [], columnInfo = []) {
        // Process Rows
        var rows = [];
        var responseObject = {};

        if (responsePatterns.length == 0 || columnInfo.length == 0) {
            setPatternsRowInfo([]);
            return;
        }

        // PROMOTERS
        columnInfo.forEach((column) => {
            if (column.field == "id") {
                responseObject["id"] = 1;
            }
            else if (column.field == "name") {
                responseObject["name"] = "PROMOTERS";
            }
            else {
                var filteredRows = responsePatterns.filter((o) => { return o.YRC == column.field; });
                if (filteredRows && filteredRows.length > 0) {
                    var currentRow = filteredRows[0];
                    if (currentRow) {
                        var nVal = (currentRow.TotalPromoter_Shares).toFixed(2);
                        var nValNum = Number(nVal).toLocaleString("en-IN");
                        responseObject[column.field] = nValNum;
                    }
                }
            }
        });
        rows.push(responseObject); responseObject = {};

        // Indian
        columnInfo.forEach((column) => {
            if (column.field == "id") {
                responseObject["id"] = 2;
            }
            else if (column.field == "name") {
                responseObject["name"] = "Indian";
            }
            else {
                var filteredRows = responsePatterns.filter((o) => { return o.YRC == column.field; });
                if (filteredRows && filteredRows.length > 0) {
                    var currentRow = filteredRows[0];
                    if (currentRow) {
                        var nVal = (currentRow.NPMSUBTOT).toFixed(2);
                        var nValNum = Number(nVal).toLocaleString("en-IN");
                        responseObject[column.field] = nValNum;
                    }
                }
            }
        });
        rows.push(responseObject); responseObject = {};

        // Foreign
        columnInfo.forEach((column) => {
            if (column.field == "id") {
                responseObject["id"] = 3;
            }
            else if (column.field == "name") {
                responseObject["name"] = "Foreign";
            }
            else {
                var filteredRows = responsePatterns.filter((o) => { return o.YRC == column.field; });
                if (filteredRows && filteredRows.length > 0) {
                    var currentRow = filteredRows[0];
                    if (currentRow) {
                        var nVal = (currentRow.NPFSUBTOT).toFixed(2);
                        var nValNum = Number(nVal).toLocaleString("en-IN");
                        responseObject[column.field] = nValNum;
                    }
                }
            }
        });
        rows.push(responseObject); responseObject = {};

        // NON-PROMOTERS
        columnInfo.forEach((column) => {
            if (column.field == "id") {
                responseObject["id"] = 4;
            }
            else if (column.field == "name") {
                responseObject["name"] = "NON-PROMOTERS";
            }
            else {
                var filteredRows = responsePatterns.filter((o) => { return o.YRC == column.field; });
                if (filteredRows && filteredRows.length > 0) {
                    var currentRow = filteredRows[0];
                    if (currentRow) {
                        var nVal = (currentRow.TotalNonPromoter_Shares).toFixed(2);
                        var nValNum = Number(nVal).toLocaleString("en-IN");
                        responseObject[column.field] = nValNum;
                    }
                }
            }
        });
        rows.push(responseObject); responseObject = {};

        // DIIS
        columnInfo.forEach((column) => {
            if (column.field == "id") {
                responseObject["id"] = 7;
            }
            else if (column.field == "name") {
                responseObject["name"] = "DIIS";
            }
            else {
                var filteredRows = responsePatterns.filter((o) => { return o.YRC == column.field; });
                if (filteredRows && filteredRows.length > 0) {
                    var currentRow = filteredRows[0];
                    if (currentRow) {
                        var nVal = (currentRow.NPISUBTOT).toFixed(2);
                        var nValNum = Number(nVal).toLocaleString("en-IN");
                        responseObject[column.field] = nValNum;
                    }
                }
            }
        });
        rows.push(responseObject); responseObject = {};

        // Public
        columnInfo.forEach((column) => {
            if (column.field == "id") {
                responseObject["id"] = 8;
            }
            else if (column.field == "name") {
                responseObject["name"] = "Public";
            }
            else {
                var filteredRows = responsePatterns.filter((o) => { return o.YRC == column.field; });
                if (filteredRows && filteredRows.length > 0) {
                    var currentRow = filteredRows[0];
                    if (currentRow) {
                        var nVal = (currentRow.NPSUBTOT).toFixed(2);
                        var nValNum = Number(nVal).toLocaleString("en-IN");
                        responseObject[column.field] = nValNum;
                    }
                }
            }
        });
        rows.push(responseObject); responseObject = {};

        // TOTAL PROMOTER AND NON PROMOTER
        columnInfo.forEach((column) => {
            if (column.field == "id") {
                responseObject["id"] = 9;
            }
            else if (column.field == "name") {
                responseObject["name"] = "TOTAL PROMOTER AND NON PROMOTER";
            }
            else {
                var filteredRows = responsePatterns.filter((o) => { return o.YRC == column.field; });
                if (filteredRows && filteredRows.length > 0) {
                    var currentRow = filteredRows[0];
                    if (currentRow) {
                        var nVal = (currentRow.Total_Promoter_NonPromoter_Shares).toFixed(2);
                        var nValNum = Number(nVal).toLocaleString("en-IN");
                        responseObject[column.field] = nValNum;
                    }
                }
            }
        });
        rows.push(responseObject); responseObject = {};

        // Depository Receipts
        columnInfo.forEach((column) => {
            if (column.field == "id") {
                responseObject["id"] = 10;
            }
            else if (column.field == "name") {
                responseObject["name"] = "Depository Receipts";
            }
            else {
                var filteredRows = responsePatterns.filter((o) => { return o.YRC == column.field; });
                if (filteredRows && filteredRows.length > 0) {
                    var currentRow = filteredRows[0];
                    if (currentRow) {
                        var nVal = (currentRow.NCUSTOTH + currentRow.NCUST).toFixed(2);
                        var nValNum = Number(nVal).toLocaleString("en-IN");
                        responseObject[column.field] = nValNum;
                    }
                }
            }
        });
        rows.push(responseObject); responseObject = {};

        // ADR
        columnInfo.forEach((column) => {
            if (column.field == "id") {
                responseObject["id"] = 11;
            }
            else if (column.field == "name") {
                responseObject["name"] = "ADR";
            }
            else {
                var filteredRows = responsePatterns.filter((o) => { return o.YRC == column.field; });
                if (filteredRows && filteredRows.length > 0) {
                    var currentRow = filteredRows[0];
                    if (currentRow) {
                        var nVal = (currentRow.NADR).toFixed(2);
                        var nValNum = Number(nVal).toLocaleString("en-IN");
                        responseObject[column.field] = nValNum;
                    }
                }
            }
        });
        rows.push(responseObject); responseObject = {};

        // GDR
        columnInfo.forEach((column) => {
            if (column.field == "id") {
                responseObject["id"] = 12;
            }
            else if (column.field == "name") {
                responseObject["name"] = "GDR";
            }
            else {
                var filteredRows = responsePatterns.filter((o) => { return o.YRC == column.field; });
                if (filteredRows && filteredRows.length > 0) {
                    var currentRow = filteredRows[0];
                    if (currentRow) {
                        var nVal = (currentRow.NGDR).toFixed(2);
                        var nValNum = Number(nVal).toLocaleString("en-IN");
                        responseObject[column.field] = nValNum;
                    }
                }
            }
        });
        rows.push(responseObject); responseObject = {};

        // TOTAL SHAREHOLDING
        columnInfo.forEach((column) => {
            if (column.field == "id") {
                responseObject["id"] = 13;
            }
            else if (column.field == "name") {
                responseObject["name"] = "TOTAL SHAREHOLDING";
            }
            else {
                var filteredRows = responsePatterns.filter((o) => { return o.YRC == column.field; });
                if (filteredRows && filteredRows.length > 0) {
                    var currentRow = filteredRows[0];
                    if (currentRow) {
                        var nVal = (currentRow.NGRTOTAL).toFixed(2);
                        var nValNum = Number(nVal).toLocaleString("en-IN");
                        responseObject[column.field] = nValNum;
                    }
                }
            }
        });
        rows.push(responseObject); responseObject = {};
        console.log("@#@#@#@#@ ROWS: ", JSON.stringify(rows, null, 4))
        setPatternsRowInfo(rows);
    }

    function ProcessShareHoldingPatterns_PERCENTAGE_SHARE_HOLDING(responsePatterns = [], columnInfo = []) {
        // Process Rows
        var rows = [];
        var responseObject = {};
        // PROMOTERS
        columnInfo.forEach((column) => {
            if (column.field == "id") {
                responseObject["id"] = 1;
            }
            else if (column.field == "name") {
                responseObject["name"] = "PROMOTERS";
            }
            else {
                var filteredRows = responsePatterns.filter((o) => { return o.YRC == column.field; });
                if (filteredRows && filteredRows.length > 0) {
                    var currentRow = filteredRows[0];
                    if (currentRow) {
                        var nVal = (currentRow.TotalPromoter_PerShares).toFixed(2);
                        var nValNum = Number(nVal).toLocaleString("en-IN");
                        responseObject[column.field] = nValNum;
                    }
                }
            }
        });
        rows.push(responseObject); responseObject = {};

        // Indian
        columnInfo.forEach((column) => {
            if (column.field == "id") {
                responseObject["id"] = 2;
            }
            else if (column.field == "name") {
                responseObject["name"] = "Indian";
            }
            else {
                var filteredRows = responsePatterns.filter((o) => { return o.YRC == column.field; });
                if (filteredRows && filteredRows.length > 0) {
                    var currentRow = filteredRows[0];
                    if (currentRow) {
                        var nVal = (currentRow.PPMSUBTOT).toFixed(2);
                        var nValNum = Number(nVal).toLocaleString("en-IN");
                        responseObject[column.field] = nValNum;
                    }
                }
            }
        });
        rows.push(responseObject); responseObject = {};

        // Foreign
        columnInfo.forEach((column) => {
            if (column.field == "id") {
                responseObject["id"] = 3;
            }
            else if (column.field == "name") {
                responseObject["name"] = "Foreign";
            }
            else {
                var filteredRows = responsePatterns.filter((o) => { return o.YRC == column.field; });
                if (filteredRows && filteredRows.length > 0) {
                    var currentRow = filteredRows[0];
                    if (currentRow) {
                        var nVal = (currentRow.PPFSUBTOT).toFixed(2);
                        var nValNum = Number(nVal).toLocaleString("en-IN");
                        responseObject[column.field] = nValNum;
                    }
                }
            }
        });
        rows.push(responseObject); responseObject = {};

        // NON-PROMOTERS
        columnInfo.forEach((column) => {
            if (column.field == "id") {
                responseObject["id"] = 4;
            }
            else if (column.field == "name") {
                responseObject["name"] = "NON-PROMOTERS";
            }
            else {
                var filteredRows = responsePatterns.filter((o) => { return o.YRC == column.field; });
                if (filteredRows && filteredRows.length > 0) {
                    var currentRow = filteredRows[0];
                    if (currentRow) {
                        var nVal = (currentRow.TotalNonPromoter_PerShares).toFixed(2);
                        var nValNum = Number(nVal).toLocaleString("en-IN");
                        responseObject[column.field] = nValNum;
                    }
                }
            }
        });
        rows.push(responseObject); responseObject = {};

        // DIIS
        columnInfo.forEach((column) => {
            if (column.field == "id") {
                responseObject["id"] = 7;
            }
            else if (column.field == "name") {
                responseObject["name"] = "DIIS";
            }
            else {
                var filteredRows = responsePatterns.filter((o) => { return o.YRC == column.field; });
                if (filteredRows && filteredRows.length > 0) {
                    var currentRow = filteredRows[0];
                    if (currentRow) {
                        var nVal = (currentRow.PPISUBTOT).toFixed(2);
                        var nValNum = Number(nVal).toLocaleString("en-IN");
                        responseObject[column.field] = nValNum;
                    }
                }
            }
        });
        rows.push(responseObject); responseObject = {};

        // Public
        columnInfo.forEach((column) => {
            if (column.field == "id") {
                responseObject["id"] = 8;
            }
            else if (column.field == "name") {
                responseObject["name"] = "Public";
            }
            else {
                var filteredRows = responsePatterns.filter((o) => { return o.YRC == column.field; });
                if (filteredRows && filteredRows.length > 0) {
                    var currentRow = filteredRows[0];
                    if (currentRow) {
                        var nVal = (currentRow.PPSUBTOT).toFixed(2);
                        var nValNum = Number(nVal).toLocaleString("en-IN");
                        responseObject[column.field] = nValNum;
                    }
                }
            }
        });
        rows.push(responseObject); responseObject = {};

        // TOTAL PROMOTER AND NON PROMOTER
        columnInfo.forEach((column) => {
            if (column.field == "id") {
                responseObject["id"] = 9;
            }
            else if (column.field == "name") {
                responseObject["name"] = "TOTAL PROMOTER AND NON PROMOTER";
            }
            else {
                var filteredRows = responsePatterns.filter((o) => { return o.YRC == column.field; });
                if (filteredRows && filteredRows.length > 0) {
                    var currentRow = filteredRows[0];
                    if (currentRow) {
                        var nVal = (currentRow.Total_Promoter_NonPromoter_PerShares).toFixed(2);
                        var nValNum = Number(nVal).toLocaleString("en-IN");
                        responseObject[column.field] = nValNum;
                    }
                }
            }
        });
        rows.push(responseObject); responseObject = {};

        // Depository Receipts
        columnInfo.forEach((column) => {
            if (column.field == "id") {
                responseObject["id"] = 10;
            }
            else if (column.field == "name") {
                responseObject["name"] = "Depository Receipts";
            }
            else {
                var filteredRows = responsePatterns.filter((o) => { return o.YRC == column.field; });
                if (filteredRows && filteredRows.length > 0) {
                    var currentRow = filteredRows[0];
                    if (currentRow) {
                        var nVal = (currentRow.PCUSTOTH + currentRow.PCUST).toFixed(2);
                        var nValNum = Number(nVal).toLocaleString("en-IN");
                        responseObject[column.field] = nValNum;
                    }
                }
            }
        });
        rows.push(responseObject); responseObject = {};

        // ADR
        columnInfo.forEach((column) => {
            if (column.field == "id") {
                responseObject["id"] = 11;
            }
            else if (column.field == "name") {
                responseObject["name"] = "ADR";
            }
            else {
                var filteredRows = responsePatterns.filter((o) => { return o.YRC == column.field; });
                if (filteredRows && filteredRows.length > 0) {
                    var currentRow = filteredRows[0];
                    if (currentRow) {
                        var nVal = (currentRow.PADR).toFixed(2);
                        var nValNum = Number(nVal).toLocaleString("en-IN");
                        responseObject[column.field] = nValNum;
                    }
                }
            }
        });
        rows.push(responseObject); responseObject = {};

        // GDR
        columnInfo.forEach((column) => {
            if (column.field == "id") {
                responseObject["id"] = 12;
            }
            else if (column.field == "name") {
                responseObject["name"] = "GDR";
            }
            else {
                var filteredRows = responsePatterns.filter((o) => { return o.YRC == column.field; });
                if (filteredRows && filteredRows.length > 0) {
                    var currentRow = filteredRows[0];
                    if (currentRow) {
                        var nVal = (currentRow.PGDR).toFixed(2);
                        var nValNum = Number(nVal).toLocaleString("en-IN");
                        responseObject[column.field] = nValNum;
                    }
                }
            }
        });
        rows.push(responseObject); responseObject = {};

        // TOTAL SHAREHOLDING
        columnInfo.forEach((column) => {
            if (column.field == "id") {
                responseObject["id"] = 13;
            }
            else if (column.field == "name") {
                responseObject["name"] = "TOTAL SHAREHOLDING";
            }
            else {
                var filteredRows = responsePatterns.filter((o) => { return o.YRC == column.field; });
                if (filteredRows && filteredRows.length > 0) {
                    var currentRow = filteredRows[0];
                    if (currentRow) {
                        var nVal = (currentRow.PGRTOTAL).toFixed(2);
                        var nValNum = Number(nVal).toLocaleString("en-IN");
                        responseObject[column.field] = nValNum;
                    }
                }
            }
        });
        rows.push(responseObject); responseObject = {};

        setPatternsRowInfo(rows);
    }

    function ProcessShareHoldingPatterns_PERCENTAGE_PLEDGE_SHARES(responsePatterns = [], columnInfo = []) {
        // Process Rows
        var rows = [];
        var responseObject = {};
        // PROMOTERS
        columnInfo.forEach((column) => {
            if (column.field == "id") {
                responseObject["id"] = 1;
            }
            else if (column.field == "name") {
                responseObject["name"] = "PROMOTERS";
            }
            else {
                var filteredRows = responsePatterns.filter((o) => { return o.YRC == column.field; });
                if (filteredRows && filteredRows.length > 0) {
                    var currentRow = filteredRows[0];
                    if (currentRow) {
                        var nVal = (currentRow.TotalPromoter_PerPledgeShares).toFixed(2);
                        var nValNum = Number(nVal).toLocaleString("en-IN");
                        responseObject[column.field] = nValNum;
                    }
                }
            }
        });
        rows.push(responseObject); responseObject = {};

        // Indian
        columnInfo.forEach((column) => {
            if (column.field == "id") {
                responseObject["id"] = 2;
            }
            else if (column.field == "name") {
                responseObject["name"] = "Indian";
            }
            else {
                var filteredRows = responsePatterns.filter((o) => { return o.YRC == column.field; });
                if (filteredRows && filteredRows.length > 0) {
                    var currentRow = filteredRows[0];
                    if (currentRow) {
                        var nVal = (currentRow.GPMSUBTOT).toFixed(2);
                        var nValNum = Number(nVal).toLocaleString("en-IN");
                        responseObject[column.field] = nValNum;
                    }
                }
            }
        });
        rows.push(responseObject); responseObject = {};

        // Foreign
        columnInfo.forEach((column) => {
            if (column.field == "id") {
                responseObject["id"] = 3;
            }
            else if (column.field == "name") {
                responseObject["name"] = "Foreign";
            }
            else {
                var filteredRows = responsePatterns.filter((o) => { return o.YRC == column.field; });
                if (filteredRows && filteredRows.length > 0) {
                    var currentRow = filteredRows[0];
                    if (currentRow) {
                        var nVal = (currentRow.GPMFSUBTOT).toFixed(2);
                        var nValNum = Number(nVal).toLocaleString("en-IN");
                        responseObject[column.field] = nValNum;
                    }
                }
            }
        });
        rows.push(responseObject); responseObject = {};

        // NON-PROMOTERS
        columnInfo.forEach((column) => {
            if (column.field == "id") {
                responseObject["id"] = 4;
            }
            else if (column.field == "name") {
                responseObject["name"] = "NON-PROMOTERS";
            }
            else {
                responseObject[column.field] = "0";
            }
        });
        rows.push(responseObject); responseObject = {};

        // DIIS
        columnInfo.forEach((column) => {
            if (column.field == "id") {
                responseObject["id"] = 7;
            }
            else if (column.field == "name") {
                responseObject["name"] = "DIIS";
            }
            else {
                responseObject[column.field] = "0";
            }
        });
        rows.push(responseObject); responseObject = {};

        // Public
        columnInfo.forEach((column) => {
            if (column.field == "id") {
                responseObject["id"] = 8;
            }
            else if (column.field == "name") {
                responseObject["name"] = "Public";
            }
            else {
                responseObject[column.field] = "0";
            }
        });
        rows.push(responseObject); responseObject = {};

        // TOTAL PROMOTER AND NON PROMOTER
        columnInfo.forEach((column) => {
            if (column.field == "id") {
                responseObject["id"] = 9;
            }
            else if (column.field == "name") {
                responseObject["name"] = "TOTAL PROMOTER AND NON PROMOTER";
            }
            else {
                var filteredRows = responsePatterns.filter((o) => { return o.YRC == column.field; });
                if (filteredRows && filteredRows.length > 0) {
                    var currentRow = filteredRows[0];
                    if (currentRow) {
                        var nVal = (currentRow.Total_Promoter_NonPromoter_PerPledgeShares).toFixed(2);
                        var nValNum = Number(nVal).toLocaleString("en-IN");
                        responseObject[column.field] = nValNum;
                    }
                }
            }
        });
        rows.push(responseObject); responseObject = {};

        // Depository Receipts
        columnInfo.forEach((column) => {
            if (column.field == "id") {
                responseObject["id"] = 10;
            }
            else if (column.field == "name") {
                responseObject["name"] = "Depository Receipts";
            }
            else {
                responseObject[column.field] = "0";
            }
        });
        rows.push(responseObject); responseObject = {};

        // ADR
        columnInfo.forEach((column) => {
            if (column.field == "id") {
                responseObject["id"] = 11;
            }
            else if (column.field == "name") {
                responseObject["name"] = "ADR";
            }
            else {
                responseObject[column.field] = "0";
            }
        });
        rows.push(responseObject); responseObject = {};

        // GDR
        columnInfo.forEach((column) => {
            if (column.field == "id") {
                responseObject["id"] = 12;
            }
            else if (column.field == "name") {
                responseObject["name"] = "GDR";
            }
            else {
                responseObject[column.field] = "0";
            }
        });
        rows.push(responseObject); responseObject = {};

        // TOTAL SHAREHOLDING
        columnInfo.forEach((column) => {
            if (column.field == "id") {
                responseObject["id"] = 13;
            }
            else if (column.field == "name") {
                responseObject["name"] = "TOTAL SHAREHOLDING";
            }
            else {
                var filteredRows = responsePatterns.filter((o) => { return o.YRC == column.field; });
                if (filteredRows && filteredRows.length > 0) {
                    var currentRow = filteredRows[0];
                    if (currentRow) {
                        var nVal = (currentRow.PLPCGTOT).toFixed(2);
                        var nValNum = Number(nVal).toLocaleString("en-IN");
                        responseObject[column.field] = nValNum;
                    }
                }
            }
        });
        rows.push(responseObject); responseObject = {};

        setPatternsRowInfo(rows);
    }

    const heading = [
        {
            id: '0',
            name: 'Date'
        },
        {
            id: '1',
            name: 'No. of Shares'
        },
        {
            id: '2',
            name: 'Stake(%)'
        },
        {
            id: '3',
            name: 'Type'
        }
    ]

    console.log("@@@@##### Header: ", header)

    return (
        <View style={[{ flex: 1, backgroundColor: '#f4f4f4', borderRadius: getWidthnHeight(3).width }, getWidthnHeight(93), getMarginVertical(2)]}>
            <View style={[{ flexDirection: 'row', paddingBottom: getWidthnHeight(3).width }]}>
                <TouchableOpacity activeOpacity={0.7} style={{ borderBottomColor: (selectSubTab === '1') ? '#0F9764' : 'transparent', borderBottomWidth: getWidthnHeight(1).width }}
                    onPress={() => {
                        if (selectSubTab === '1') {
                            return;
                        }
                        setSelectSubTab('1')
                    }}
                >
                    <Text style={{ padding: getWidthnHeight(3).width, color: '#000000', fontSize: fontSizeH4().fontSize + 2 }}>Shareholding Pattern</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={{ borderBottomColor: (selectSubTab === '2') ? '#0F9764' : 'transparent', borderBottomWidth: getWidthnHeight(1).width }}
                    onPress={() => {
                        if (selectSubTab === '2') {
                            return;
                        }
                        setSelectSubTab('2')
                    }}
                >
                    <Text style={{ padding: getWidthnHeight(3).width, color: '#000000', fontSize: fontSizeH4().fontSize + 2 }}>Top Shareholders</Text>
                </TouchableOpacity>
            </View>
            <View>
                {selectSubTab === '1' && (
                    <View style={{ alignItems: 'center' }}>
                        <View style={[{ flexDirection: 'row', alignItems: 'center' }, getMarginVertical(2)]}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                disabled={(subDataType === 'TS')}
                                onPress={() => {
                                    setSubDataType('TS');
                                    ProcessShareHoldingPatterns_TOTAL_SHARES(shareHoldingData, patternsColumnInfo);
                                }}
                                style={[{
                                    alignItems: 'center', backgroundColor: subDataType === 'TS' ? '#0F9764' : '#FFFFFF', paddingVertical: getWidthnHeight(2).width,
                                    borderTopLeftRadius: getWidthnHeight(10).width, borderBottomLeftRadius: getWidthnHeight(10).width
                                }, getWidthnHeight(25)]}>
                                <Text style={{ textAlign: 'center', fontSize: fontSizeH4().fontSize + 1, color: subDataType === 'TS' ? '#FFFFFF' : '#0F9764' }}>Total</Text>
                                <Text style={{ textAlign: 'center', fontSize: fontSizeH4().fontSize + 1, color: subDataType === 'TS' ? '#FFFFFF' : '#0F9764' }}>Shares</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                disabled={(subDataType === 'SH')}
                                onPress={() => {
                                    setSubDataType('SH');
                                    ProcessShareHoldingPatterns_PERCENTAGE_SHARE_HOLDING(shareHoldingData, patternsColumnInfo);
                                }}
                                style={[{
                                    alignItems: 'center', backgroundColor: subDataType === 'SH' ? '#0F9764' : '#FFFFFF', paddingVertical: getWidthnHeight(2).width
                                }, getWidthnHeight(25)]}>
                                <Text numberOfLines={2} style={{
                                    textAlign: 'center', fontSize: fontSizeH4().fontSize + 1, color: subDataType === 'SH' ? '#FFFFFF' : '#0F9764',
                                    paddingHorizontal: getWidthnHeight(2).width
                                }}>Share Holding (%)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                disabled={(subDataType === 'PS')}
                                onPress={() => {
                                    setSubDataType('PS')
                                    ProcessShareHoldingPatterns_PERCENTAGE_PLEDGE_SHARES(shareHoldingData, patternsColumnInfo);
                                }}
                                style={[{
                                    borderTopRightRadius: getWidthnHeight(10).width, borderBottomRightRadius: getWidthnHeight(10).width,
                                    backgroundColor: subDataType === 'PS' ? '#0F9764' : '#FFFFFF', paddingVertical: getWidthnHeight(2).width
                                }, getWidthnHeight(25)]}>
                                <Text numberOfLines={2} style={{
                                    textAlign: 'center', fontSize: fontSizeH4().fontSize + 1, color: subDataType === 'PS' ? '#FFFFFF' : '#0F9764',
                                    paddingHorizontal: getWidthnHeight(2).width
                                }}>Pledge Shares (%)</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 0, borderColor: 'red', paddingHorizontal: getWidthnHeight(2).width }, getWidthnHeight(92)]}>
                            <View style={[getWidthnHeight(45)]}>
                                <ScrollView horizontal contentContainerStyle={{ flexDirection: 'column' }}>
                                    <Text style={{ fontSize: fontSizeH4().fontSize + 3, paddingVertical: getWidthnHeight(2).width }}>Particulars</Text>
                                    <FlatList
                                        nestedScrollEnabled
                                        keyExtractor={(item) => `${item.id}`}
                                        data={patternsRowInfo}
                                        renderItem={({ item }) => {
                                            return (
                                                <>
                                                    <Text style={{ fontSize: (fontSizeH4().fontSize + ((subDataType !== 'TS') ? 2 : 0)), paddingVertical: getWidthnHeight(2).width }}>{item.name}</Text>
                                                </>
                                            );
                                        }}
                                    />
                                </ScrollView>
                            </View>
                            <View style={[{ paddingHorizontal: getWidthnHeight(2).width }, getWidthnHeight(45)]}>
                                <ScrollView horizontal contentContainerStyle={{ flexDirection: 'column' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        {(header.map((title) => (
                                            <View style={[{ alignItems: 'center' }, getWidthnHeight(30)]}>
                                                <Text key={title} style={[{ fontSize: fontSizeH4().fontSize + 2, paddingVertical: getWidthnHeight(2).width }]}>{moment(title, "YYYYMM").format("MMM YYYY")}</Text>
                                            </View>
                                        )))}
                                    </View>
                                    <FlatList
                                        nestedScrollEnabled
                                        keyExtractor={(item) => `${item.id}-${item.name}`}
                                        data={patternsRowInfo}
                                        renderItem={({ item }) => {
                                            const headerRowData = [];
                                            let subHeadings = Object.entries(item).map(([key, value]) => {
                                                if (key[0] === '2') {
                                                    if (typeof value === "number" && subDataType !== 'TS') {
                                                        value = value.toFixed(2);
                                                    } else if (typeof value === "string" && subDataType !== 'TS') {
                                                        value = Number(value).toFixed(2)
                                                    }
                                                    headerRowData.push(value)
                                                }
                                            });

                                            console.log("###@#@!#@!@! ITEM: ", headerRowData);
                                            return (
                                                <>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        {headerRowData.map((value) => (
                                                            <View style={[{ borderWidth: 0, borderColor: 'red', alignItems: (subDataType !== 'TS') ? 'center' : 'flex-end' }, getWidthnHeight(30)]}>
                                                                <Text style={{ fontWeight: 'bold', padding: getWidthnHeight(2).width, fontSize: (fontSizeH4().fontSize + ((subDataType !== 'TS') ? 2 : 0)) }}>{value}</Text>
                                                            </View>
                                                        ))}
                                                    </View>
                                                </>
                                            );
                                        }}
                                    />
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                )}
                {selectSubTab === '2' && (
                    <View style={[{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 0, borderColor: 'red', paddingHorizontal: getWidthnHeight(2).width }, getWidthnHeight(92)]}>
                        <View style={[getWidthnHeight(45)]}>
                            <ScrollView horizontal contentContainerStyle={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: fontSizeH4().fontSize + 2, paddingVertical: getWidthnHeight(2).width, fontWeight: 'bold' }}>Name</Text>
                                <FlatList
                                    nestedScrollEnabled
                                    keyExtractor={(item) => item.id}
                                    data={topShareHolderData}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <>
                                                <Text style={{ fontWeight: item.type === "BOLD" ? 'bold' : 'normal', fontSize: fontSizeH4().fontSize + 2, paddingVertical: getWidthnHeight(2).width }}>{item.Name}</Text>
                                            </>
                                        );
                                    }}
                                />
                            </ScrollView>
                        </View>
                        <View style={[{ paddingHorizontal: getWidthnHeight(2).width }, getWidthnHeight(45)]}>
                            <ScrollView horizontal contentContainerStyle={{ flexDirection: 'column' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    {(heading.map((item) => (
                                        <View style={[{ alignItems: 'center' }, getWidthnHeight(30)]}>
                                            <Text style={[{ fontSize: fontSizeH4().fontSize + 2, paddingVertical: getWidthnHeight(2).width, fontWeight: 'bold' }]}>{item.name}</Text>
                                        </View>
                                    )))}
                                </View>
                                <FlatList
                                    // horizontal
                                    keyExtractor={(item) => `${item.id}-${item.co_code}`}
                                    data={topShareHolderData}
                                    renderItem={({ item, index }) => {
                                        // console.log("@#^&%^&*^: ", rowData)
                                        return (
                                            <>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={[{ borderWidth: 0, borderColor: 'red', }, getWidthnHeight(30)]}>
                                                        <Text style={{ textAlign: 'right', fontWeight: 'bold', padding: getWidthnHeight(2).width, fontSize: fontSizeH4().fontSize + 2 }}>{moment(item.date).format("DD MMM YYYY")}</Text>
                                                    </View>
                                                    <View style={[{ borderWidth: 0, borderColor: 'red', }, getWidthnHeight(30)]}>
                                                        <Text style={{ textAlign: 'right', fontWeight: 'bold', padding: getWidthnHeight(2).width, fontSize: fontSizeH4().fontSize + 2 }}>{item?.NOOFshares}</Text>
                                                    </View>
                                                    <View style={[{ borderWidth: 0, borderColor: 'red', }, getWidthnHeight(30)]}>
                                                        <Text style={{ textAlign: 'center', fontWeight: 'bold', padding: getWidthnHeight(2).width, fontSize: fontSizeH4().fontSize + 2 }}>{item?.perstake}%</Text>
                                                    </View>
                                                    <View style={[{ borderWidth: 0, borderColor: 'red', }]}>
                                                        <Text style={{ textAlign: 'right', fontWeight: 'bold', padding: getWidthnHeight(2).width, fontSize: fontSizeH4().fontSize + 2 }}>{item?.Type}</Text>
                                                    </View>
                                                </View>
                                            </>
                                        );
                                    }}
                                />
                            </ScrollView>
                        </View>
                    </View>
                )}
            </View>
        </View >
    );
}