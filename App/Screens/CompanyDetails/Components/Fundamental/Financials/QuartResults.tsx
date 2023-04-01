import React, { useEffect, useState } from 'react'
import { getQuarterlyResults } from '../../../../services/CompanyService';
import { Box, Dialog, DialogContent, IconButton, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import {
    GridToolbarContainer,
    GridToolbarFilterButton,
} from '@mui/x-data-grid-pro';
import { ProcessRawData, ProcessRawDataWithColumnInfo } from '../../ProcessFundamentalsDataXGrid';

import BANKS from "./QRColumnsInfo/BANKS.json";
import BANKC from "./QRColumnsInfo/BANKC.json";
import FINS from "./QRColumnsInfo/FINS.json";
import FINC from "./QRColumnsInfo/FINC.json";
import MANS from "./QRColumnsInfo/MANS.json";
import MANC from "./QRColumnsInfo/MANC.json";
import INSS from "./QRColumnsInfo/INSS.json";
import INSC from "./QRColumnsInfo/INSC.json";

import { ColumnInfo } from '../../../../model/ColumnInfo';
import { expandFirstGroupOnLoad, groupingColDef, StyledDataGrid } from '../StyledDataGrid';
import { CopyLinkButton } from '../../../../components/Common/CopyLinkButton';

const muiToolbarXGrid = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'right',
    paddingX: '2%',
    height: "80px"
};

const Headers: string[] = [
    "Net Sales",
    "Total Income",
    "Total Expenditure",
    "PBIDT",
    "PBT",
    "PAT",
    "EPS"
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

function QuartResults(co_code: string, displayType: string, load: boolean) {
    const [alignment, setAlignment] = React.useState<'S' | 'C'>('S');

    const [data, setData] = useState<any | null>(null);

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
                        {"* Prices are in lakh (₹)"}
                    </Typography>
                    <div>
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
                            width: (data && data.columns && data.columns.length > 0) ? `${150 * (data.columns.length - 1) + 220}px` : '300px',
                            maxWidth: "90%",
                            height: { xg: "68%", md: "68%", xs: "66%" }
                        }
                    }}
                    open={open}
                    onClose={handleClose}
                    fullWidth
                >
                    <DialogContent dividers
                        style={{
                            width: (data && data.columns && data.columns.length > 0) ? `${150 * (data.columns.length - 1) + 110}px` : '300px',
                            //height: "300px" 
                        }}
                    >
                        <StyledDataGrid
                            initialState={{ pinnedColumns: { left: ['__tree_data_group__'] } }}
                            autoHeight={true}
                            treeData
                            getTreeDataPath={(row) => row.hierarchy}
                            groupingColDef={groupingColDef}
                            rows={data.rows}
                            columns={data.columns}
                            density={"compact"}
                            components={{
                                Footer: EmptyFooterXGrid,
                                Toolbar: CustomToolbarXGridPopUp,
                            }}
                            // disableColumnMenu
                            disableSelectionOnClick
                            columnVisibilityModel={{
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
                    const response = await getQuarterlyResults(co_code, alignment);
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
                        setData(gridData);
                    }
                    else {
                        gridData = ProcessRawData(response);
                        setData(gridData);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        fetchData();
    }, [alignment, co_code, load]);

    return (
        <React.Fragment>
            <Box
                sx={{
                    backgroundColor: "#F5F5F5",
                    borderRadius: '0px 8px 8px 8px',
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
                        color: "#686868",
                        fontWeight: "400"
                    },
                    '& .MuiDataGrid-row .MuiDataGrid-cell': {
                        color: "#0D0D0D",
                        fontWeight: 700
                    }
                }}
            >
                {
                    <div style={{
                        width: '100%'
                    }}>
                        {data &&
                            <StyledDataGrid
                                initialState={{ pinnedColumns: { left: ['__tree_data_group__'] } }}
                                autoHeight={true}
                                treeData
                                getTreeDataPath={(row) => row.hierarchy}
                                groupingColDef={groupingColDef}
                                isGroupExpandedByDefault={(row) => expandFirstGroupOnLoad(row)}
                                sx={{ borderRadius: "0px 8px 8px 8px" }}
                                rows={data.rows}
                                columns={data.columns}
                                density={"compact"}
                                components={{
                                    Footer: EmptyFooterXGrid,
                                    Toolbar: CustomToolbarXGrid,
                                }}
                                columnVisibilityModel={{
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
                        }

                    </div>
                }
            </Box>
        </React.Fragment>
    )
}

export default QuartResults

