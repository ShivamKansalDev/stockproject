import { TabContext, TabPanel } from '@mui/lab'
import { Box, createTheme, ThemeProvider, Tab, Tabs } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import BalanceSheet from './BalanceSheet';
import CashFlow from './CashFlow';
import PLSheet from './PLSheet';
import QuartResults from './QuartResults';

function Financials(co_code: string, displayType: string, NSEListed: boolean, load: boolean, onNavigate: (secondaryTab) => void) {
    const [searchParams] = useSearchParams();
    const [financialsTab, setFinancialsTab] = React.useState<string>("quarterlyresults");

    const handleFinancialsTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setFinancialsTab(newValue);
        onNavigate(newValue);
    };

    useEffect(()=>{
        let tab = searchParams.get( 'secondaryTab' );
        tab && setFinancialsTab(tab);
    },[]);

    const theme = createTheme({
        components: {
            MuiTabs: {
                styleOverrides: {
                    indicator: {
                        height: 0,
                    },
                },
            },
        },
    });

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={financialsTab}>
                        <Box sx={{
                            bgcolor: "#F9F9F9", borderRadius: "8px", height: '44px', '& button.Mui-selected': {
                                color: '#FFFFFF',
                                background: '#0F9764',
                                borderRadius: '8px 8px 0px 0px'
                            },
                            '& button.MuiButtonBase-root.MuiTab-root': {
                                paddingY: '8px',
                                minHeight: '44px'
                            }
                        }}>
                            <Tabs
                                value={financialsTab}
                                variant="fullWidth"
                                scrollButtons="auto"
                                textColor="inherit"
                                indicatorColor="primary"
                                TabIndicatorProps={{ style: { display: "none" } }}
                                onChange={handleFinancialsTabChange}
                                aria-label="financial-sub-tabs">
                                <Tab sx={{ textTransform: "capitalize", fontSize: "14px", fontWeight: 700, fontFamily: 'Oxygen' }} label="Quarterly Results" value="quarterlyresults" />
                                <Tab sx={{ textTransform: "capitalize", fontSize: "14px", fontWeight: 700, fontFamily: 'Oxygen' }} label="Profit & Loss" value="profitnloss" />
                                <Tab sx={{ textTransform: "capitalize", fontSize: "14px", fontWeight: 700, fontFamily: 'Oxygen' }} label="Balance Sheet" value="balancesheet" />
                                <Tab sx={{ textTransform: "capitalize", fontSize: "14px", fontWeight: 700, fontFamily: 'Oxygen' }} label="Cash Flow" value="cashflow" />
                            </Tabs>
                        </Box>
                        <TabPanel sx={{ padding: 0 }} value="quarterlyresults">
                            {co_code && displayType && QuartResults(co_code, displayType, (load === true && financialsTab === "quarterlyresults"))}
                        </TabPanel>
                        <TabPanel sx={{ padding: 0 }} value="profitnloss"  >
                            {co_code && displayType && PLSheet(co_code, displayType, (load === true && financialsTab === "profitnloss"))}
                        </TabPanel>
                        <TabPanel sx={{ padding: 0 }} value="balancesheet" >
                            {co_code && displayType && BalanceSheet(co_code, displayType, (load === true && financialsTab === "balancesheet"))}
                        </TabPanel>
                        <TabPanel sx={{ padding: 0 }} value="cashflow" >
                            {co_code && displayType && CashFlow(co_code, displayType, (load === true && financialsTab === "cashflow"))}
                        </TabPanel>
                    </TabContext>
                </Box>
            </ThemeProvider>
        </React.Fragment >
    )
}

export default Financials