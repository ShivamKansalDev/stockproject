import React, { useEffect, useState } from 'react'
import { getBalanceSheet } from '../../../../services/CompanyService';
import { Box, Dialog, DialogContent, IconButton, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import {
    GridToolbarContainer,
    GridToolbarFilterButton,
} from '@mui/x-data-grid-pro';
import { ProcessRawData, ProcessRawDataWithColumnInfo } from '../../ProcessFundamentalsDataXGrid';

import BANKS from "./BSColumnsInfo/BANKS.json";
import BANKC from "./BSColumnsInfo/BANKC.json";
import FINS from "./BSColumnsInfo/FINS.json";
import FINC from "./BSColumnsInfo/FINC.json";
import MANS from "./BSColumnsInfo/MANS.json";
import MANC from "./BSColumnsInfo/MANC.json";
import INSS from "./BSColumnsInfo/INSS.json";
import INSC from "./BSColumnsInfo/INSC.json";
import { ColumnInfo } from '../../../../model/ColumnInfo';
import { StyledDataGrid, groupingColDef } from '../StyledDataGrid';
import { CopyLinkButton } from '../../../../components/Common/CopyLinkButton';

const muiToolbarXGrid = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'right',
    paddingX: '2%',
    height: "80px"
};

const Headers: string[] = [
    "SOURCES OF FUNDS :",
    "Total Shareholders Funds",
    "Total Debts",
    "Total Current Liabilities",
    "Other Liabilities",
    "Total Liabilities",
    "APPLICATION OF FUNDS :",
    "Net Block",
    "Capital Work in Progress",
    "Investments",
    "Total Current Assets",
    "Net Deferred Tax",
    "Other Assets",
    "Total Assets"
];

function LoadColumnInfo(displayType: string, dataType: 'C' | 'S'): ColumnInfo {
    var co;
    var type = (displayType + dataType).toUpperCase();
    if (type) {
        if (type == "BANKS") {
            co = BANKS as ColumnInfo;
        }
        else if (type == "BANKC") {
            co = BANKC as ColumnInfo;
        }
        else if (type == "FINS") {
            co = FINS as ColumnInfo;
        }
        else if (type == "FINC") {
            co = FINC as ColumnInfo;
        }
        else if (type == "MANS") {
            co = MANS as ColumnInfo;
        }
        else if (type == "MANC") {
            co = MANC as ColumnInfo;
        }
        else if (type == "INSS") {
            co = INSS as ColumnInfo;
        }
        else if (type == "INSC") {
            co = INSC as ColumnInfo;
        }
    }
    return co;
}

function BalanceSheet(co_code: string, displayType: string, load: boolean) {
    const [alignment, setAlignment] = React.useState<'S' | 'C'>('S');

    const [incomestatementData, setIncomeStatementData] = useState<any | null>(null);

    function EmptyFooterXGrid() {
        return (
            <React.Fragment>
            </React.Fragment>
        );
    }



    function CustomToolbarXGrid() {

        const handleChange = (
            event: React.MouseEvent<HTMLElement>,
            newAlignment: 'S' | 'C',
        ) => {
            if (!(alignment === newAlignment) && (newAlignment === 'S' || newAlignment === 'C')) {
                setAlignment(newAlignment);
            }
        };

        return (
            <React.Fragment>
                <GridToolbarContainer sx={muiToolbarXGrid}>
                    <div>
                        <ToggleButtonGroup
                            //color="primary"
                            value={alignment}
                            exclusive
                            size='small'
                            onChange={handleChange}
                            sx={{ height: "39px", maxWidth: "250px", marginRight: 2, '& button': { fontFamily: 'Oxygen' } }}
                        >
                            <ToggleButton value="S"
                                sx={{
                                    borderRadius: "20px",
                                    color: alignment === 'S' ? '#FFFFFF !important' : '#0F9764 !important',
                                    backgroundColor: alignment === 'S' ? '#0F9764 !important' : '#FFFFFF !important',
                                    paddingLeft: "15px",
                                    paddingRight: "10px",
                                    textTransform: "none"
                                }} >Standalone</ToggleButton>
                            <ToggleButton value="C"
                                sx={{
                                    borderRadius: "20px",
                                    color: alignment === 'C' ? '#FFFFFF !important' : '#0F9764 !important',
                                    backgroundColor: alignment === 'C' ? '#0F9764 !important' : '#FFFFFF !important',
                                    paddingLeft: "10px",
                                    paddingRight: "15px",
                                    textTransform: "none"
                                }} >Consolidated</ToggleButton>
                        </ToggleButtonGroup>
                        <XGridPop />
                        <CopyLinkButton locationHash='tabdetail-financials' />
                    </div>
                    <Typography sx={{ fontSize: "12px", position: "absolute", top: "65px" }}>* Prices are in lakhs (₹)</Typography>
                </GridToolbarContainer>
            </React.Fragment>
        );
    }

    function CustomToolbarXGridPopUp() {
        return (
            <React.Fragment>
                <GridToolbarContainer sx={muiToolbarXGrid}>
                    <Typography sx={{
                        fontStyle: "normal",
                        paddingX: "30px",
                        height: "80px",
                        fontWeight: 300,
                        fontFamily: 'Oxygen',
                        fontSize: '14px',
                        lineHeight: '18px',
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        minWidth: "10%",
                        paddingRight: "5%",
                        //color: "#0F9764"
                    }}>
                        {"* Prices are in lakhs (₹)"}
                    </Typography>
                    <div>
                        {/* <GridToolbarColumnsButton sx={{ marginLeft: "5px", marginRight: "5px" }} /> */}
                        <GridToolbarFilterButton sx={{ marginLeft: "0px", marginRight: "5px" }} nonce={undefined} onResize={undefined} onResizeCapture={undefined} />
                    </div>
                </GridToolbarContainer>
            </React.Fragment>
        );
    }

    function XGridPop() {
        //Dialog Control
        const [open, setOpen] = useState(false);
        const handleOpen = () => {
            setOpen(true);
        };
        const handleClose = () => {
            setOpen(false);
        };

        return (
            <>
                <IconButton
                    color="primary"
                    aria-label="x-grid-pop"
                    component="span"
                    onClick={handleOpen}
                    sx={{ marginX: "10px", color: "#0F9764" }}
                >
                    <img src="expand-window.png" style={{ height: "24px", width: "24px" }} />
                </IconButton>
                <Dialog
                    PaperProps={{
                        sx: {
                            width: (incomestatementData && incomestatementData.columns && incomestatementData.columns.length > 0) ? `${150 * (incomestatementData.columns.length - 1) + 220}px` : '300px',
                            maxWidth: "90%",
                            top: { md: "18px", xs: "45px" },
                            height: "80%"
                        }
                    }}
                    // style={{ 
                    //     zIndex: 0, 
                    //     height: "100%", 
                    //     width: "100%" }}
                    open={open}
                    onClose={handleClose}
                    // maxWidth="md"
                    fullWidth
                >
                    <DialogContent dividers
                        style={{
                            width: (incomestatementData && incomestatementData.columns && incomestatementData.columns.length > 0) ? `${150 * (incomestatementData.columns.length - 1) + 125}px` : '300px',
                            //height: "300px" 
                        }}
                    >
                        <StyledDataGrid
                            initialState={{ pinnedColumns: { left: ['__tree_data_group__'] } }}
                            autoHeight={true}
                            treeData
                            getTreeDataPath={(row) => row.hierarchy}
                            groupingColDef={groupingColDef}
                            rows={incomestatementData.rows}
                            columns={incomestatementData.columns}
                            density={"compact"}
                            components={{
                                Footer: EmptyFooterXGrid,
                                Toolbar: CustomToolbarXGridPopUp,
                            }}
                            // disableColumnMenu
                            disableSelectionOnClick
                            columnVisibilityModel={{
                                // Hide columns id, the other columns will remain visible
                                id: false,
                                name: false,
                            }}
                            getRowClassName={(params) => {
                                if (Headers.includes(params.row.name)) {
                                    return 'highlight-row-theme'
                                }
                                else {
                                    return 'MuiDataGrid-row'
                                }
                            }}
                        />
                    </DialogContent>
                </Dialog>
            </>
        );
    }

    useEffect(() => {
        async function fetchData() {
            if (load === true) {
                try {
                    const response = await getBalanceSheet(co_code, alignment);
                    var cInfo = LoadColumnInfo(displayType, alignment);
                    var gridData;
                    if (cInfo) {
                        Headers.length = 0;
                        cInfo.forEach((item) => {
                            if (item.type.toLowerCase() === "bold") {
                                Headers.push(item.displayName);
                            }
                        });
                        gridData = ProcessRawDataWithColumnInfo(response, cInfo);
                        setIncomeStatementData(gridData);
                    }
                    else {
                        gridData = ProcessRawData(response);
                        setIncomeStatementData(gridData);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        fetchData();
    }, [alignment, co_code, load]);

    // const getTreeDataPath: DataGridProProps['getTreeDataPath'] = (row) => row.hierarchy;

    // function TestPinningColumn(pinnedColumns: GridPinnedColumns, details: GridCallbackDetails) {
    //     console.log(pinnedColumns);
    // }

    return (
        <React.Fragment>
            <Box
                sx={{
                    backgroundColor: "#F5F5F5",
                    borderRadius: '12px',
                    fontFamily: 'Oxygen',
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#FFFFFF !important',
                        color: '#686868',
                        minHeight: "44px !important",
                        maxHeight: "44px !important",
                        borderTopLeftRadius: "0px",
                        borderTopRightRadius: "0px",
                        border: "1px solid #EBEBEB"
                    },
                    '& .MuiDataGrid-row[data-rowindex="0"]': {
                        marginTop: '0px !important'
                    },
                    '& .MuiDataGrid-row': {
                        cursor: 'pointer',
                        backgroundColor: "#F5F5F5",
                        color: '#1B1C28'
                    },
                    '& .MuiDataGrid-row .MuiDataGrid-cell:nth-child(1)': {
                        color: "#686868"
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontWeight: '400!important'
                    }
                }}
            >
                {
                    <div style={{
                        //// height: (incomestatementData && incomestatementData.rows && incomestatementData.rows.length > 0) ? `${36 * (incomestatementData.rows.length - 1) + 220}px` : '350px',
                        width: '100%'
                    }}>
                        {incomestatementData &&
                            <StyledDataGrid
                                initialState={{ pinnedColumns: { left: ['__tree_data_group__'] } }}
                                autoHeight={true}
                                treeData
                                rows={incomestatementData.rows}
                                columns={incomestatementData.columns}
                                // getTreeDataPath={getTreeDataPath}
                                getTreeDataPath={(row) => row.hierarchy}
                                groupingColDef={groupingColDef}
                                density={"compact"}
                                // onPinnedColumnsChange={(a,b) => TestPinningColumn(a,b)}
                                components={{
                                    Footer: EmptyFooterXGrid,
                                    Toolbar: CustomToolbarXGrid,
                                }}
                                columnVisibilityModel={{
                                    // Hide columns id, the other columns will remain visible
                                    id: false,
                                    name: false,
                                }}
                                getRowClassName={(params) => {
                                    if (Headers.includes(params.row.name)) {
                                        return 'highlight-row-theme'
                                    }
                                    else {
                                        return 'MuiDataGrid-row'
                                    }
                                }}
                            //pageSize={(incomestatementData && incomestatementData.rows && incomestatementData.rows.length > 0) ? incomestatementData.rows : 10}
                            />
                        }

                    </div>
                }
            </Box>
        </React.Fragment>
    )
}

export default BalanceSheet

