import React, { useEffect, useState } from 'react'
import { getCashFlowData } from '../../../../services/CompanyService';
import { Box, Dialog, DialogContent, Divider, IconButton, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import {
    GridToolbarContainer,
    GridToolbarFilterButton,
} from '@mui/x-data-grid-pro';
import { ProcessRawData, ProcessRawDataWithColumnInfo } from '../../ProcessFundamentalsDataXGrid';
import { ColumnInfo } from '../../../../model/ColumnInfo';
import CFSC from "./CFSColumnsInfo/CFSC.json";
import CFSS from "./CFSColumnsInfo/CFSS.json";
import { StyledDataGrid } from '../StyledDataGrid';
import { CopyLinkButton } from '../../../../components/Common/CopyLinkButton';

const muiToolbarXGrid = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'right',
    paddingX: '2%',
    height: "80px"
};

const Headers: string[] = [
    "Net Cash from Operating Activities",
    "Net Cash used in Investing Activities",
    "Net Cash used in Financing Activities",
    "Cash and Cash Equivalents at End of the year"
];

function LoadColumnInfo(dataType: 'C' | 'S'): ColumnInfo {
    var co;
    if (dataType) {
        if (dataType === 'S') {
            co = CFSS as ColumnInfo;
        }
        else if (dataType === 'C') {
            co = CFSC as ColumnInfo;
        }
    }
    return co;
}

function CashFlow(co_code: string, displayType: string, load: boolean) {
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
                <Divider orientation="horizontal" flexItem />
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
                <Divider orientation="horizontal" flexItem />
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
                            width: (incomestatementData && incomestatementData.columns && incomestatementData.columns.length > 0) ? `${100 * (incomestatementData.columns.length - 1) + 220}px` : '300px',
                            maxWidth: "90%",
                            top: { md: "18px", xs: "45px" },
                            height: "80%"
                        }
                    }}
                    open={open}
                    onClose={handleClose}
                    fullWidth
                >
                    <DialogContent dividers
                        style={{
                            width: (incomestatementData && incomestatementData.columns && incomestatementData.columns.length > 0) ? `${100 * (incomestatementData.columns.length - 1) + 170}px` : '300px',
                            //height: "300px" 
                        }}
                    >
                        <StyledDataGrid
                            initialState={{ pinnedColumns: { left: ['name'] } }}
                            rows={incomestatementData.rows}
                            columns={incomestatementData.columns}
                            density={"compact"}
                            components={{
                                Footer: EmptyFooterXGrid,
                                Toolbar: CustomToolbarXGridPopUp,
                            }}
                            autoHeight={true}
                            // disableColumnMenu
                            disableSelectionOnClick
                            columnVisibilityModel={{
                                // Hide columns id, the other columns will remain visible
                                id: false,
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
                    const response = await getCashFlowData(co_code, alignment);
                    var cInfo = LoadColumnInfo(alignment);
                    var gridData
                    if (cInfo) {
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
                        // height: (incomestatementData && incomestatementData.rows && incomestatementData.rows.length > 0) ? `${36 * (incomestatementData.rows.length - 1) + 220}px` : '350px',
                        width: '100%'
                    }}>
                        {incomestatementData &&
                            <StyledDataGrid
                                initialState={{ pinnedColumns: { left: ['name'] } }}
                                rows={incomestatementData.rows}
                                columns={incomestatementData.columns}
                                density={"compact"}
                                autoHeight={true}
                                components={{
                                    Footer: EmptyFooterXGrid,
                                    Toolbar: CustomToolbarXGrid,
                                }}
                                columnVisibilityModel={{
                                    // Hide columns id, the other columns will remain visible
                                    id: false,
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

export default CashFlow

