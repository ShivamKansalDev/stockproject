
import Axios from 'axios'

import { StyleSheet, ScrollView, Dimensions, Text, View, LogBox } from 'react-native'
import React, { useState, useCallback } from 'react'
LogBox.ignoreLogs(['Require cycle: node_modules']);
import { LineChart } from 'react-native-chart-kit';
import { useSelector, connect } from 'react-redux';
import BseNseButton from './BseNseButton';
import DateComponent from './DateComponent';
import { getPriceVolume } from '../../../../../../Action/CompanyDetails';
import {
    VictoryBar,
    VictoryTheme,
    VictoryAxis,
    VictoryChart,
    Background,
    VictoryGroup,
    VictoryLine,
    VictoryBrushContainer, VictoryZoomContainer
} from 'victory-native';
import Slider from "react-native-sliders";
import moment from 'moment';


const { width } = Dimensions.get('screen')

// console.log(width);


const Price = ({ getPriceVolume }) => {


    const renderThumb = useCallback(() => <Thumb />, []);
    const renderRail = useCallback(() => <Rail />, []);
    const renderRailSelected = useCallback(() => <RailSelected />, []);
    const renderLabel = useCallback(value => <Label text={value} />, []);
    const renderNotch = useCallback(() => <Notch />, []);
    const handleValueChange = useCallback((low, high) => {
        setLow(low);
        setHigh(high);
    }, []);

    const [bseAndNse, setbseAndNse] = useState('NSE')

    const { data } = useSelector(state => state.PriceVolume)
    const { PriceVolume } = useSelector(state => state.PriceVolume)
    const { CompanyDetails } = useSelector(state => state.CompanyDetails)
    const userDetails = useSelector((state) => state.User);
    const authToken = userDetails?.authToken;
    console.log(CompanyDetails);

    const data1 = [
        { x: 1, y: 2 },
        { x: 2, y: 3 },
        { x: 3, y: 5 },
        { x: 4, y: 4 },
        { x: 5, y: 7 }
    ];
    const [zoomDomain, setZoomDomain] = useState({});

    const handleZoom = (domain) => {
        setZoomDomain(domain);
    };


    const nse = () => {
        setbseAndNse('NSE')
    }
    const bse = () => {
        setbseAndNse('BSE')
    }
    const getDate = (date) => {
        const id = PriceVolume[0].co_code
        const startDate1 = moment(moment().subtract(date, 'days')).format('DD-MMM-YYYY')
        const endDate1 = moment(new Date()).format('DD-MMM-YYYY')
        // console.log(date)
        getPriceVolume(bseAndNse, id, startDate1, endDate1, authToken)

    }

    const computeYAxisHeight = data1 => {
        const maxValue = Math.max(...data1);
        const roundedMaxValue = Math.ceil(maxValue / 10) * 10;
        return roundedMaxValue;
    };
    const chartConfig = {
        backgroundColor: 'transparent',
        backgroundGradientFrom: 'white',
        backgroundGradientTo: 'white',
        color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.8,
        yAxisInterval: 10,
        yAxisLabelInterval: 1,
        yAxisSuffix: '',
        yAxisMaxValue: computeYAxisHeight(data),
        style: {
            borderRadius: 16,
            marginTop: 20
        },
    };
    /// saika


    return (
        <>
            <View style={{ height: 850, width: '100%' }}>
                {/* =============chart=========== */}
                <LineChart
                    horizontal
                    data={{
                        labels: [],
                        datasets: [
                            {
                                data: data,
                            },
                        ],
                    }}
                    width={350}
                    height={250}
                    yAxisLabel={''}
                    chartConfig={chartConfig}
                    bezier

                />
                {/* =============chart=========== */}
                {/* =============Graph=========== */}

                <View style={{
                    width: '100%', height: 40, marginTop: 10,
                    flexDirection: 'row',


                }}>


                    <View style={{ width: '30%', height: "100%", paddingHorizontal: 10 }}>
                        <BseNseButton
                            nse={nse}
                            bseAndNse={bseAndNse}
                            bse={bse}
                        />

                    </View>
                    <View style={{
                        width: '70%', height: 40, flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 20,

                        alignItems: 'center'
                    }}>
                        <DateComponent tittle='1 W'
                            onPress={() => getDate(10)}
                        />
                        <DateComponent tittle='1M'
                            onPress={() => getDate(33)}
                        />
                        <DateComponent tittle='6 M'
                            onPress={() => getDate(183)}
                        />
                        <DateComponent tittle='1 Y'
                            onPress={() => getDate(368)}
                        />
                        {/* <DateComponent tittle='2 Y'
              onPress={
                () => getDate(733)
                // console.log(Axios.defaults.headers.common['Authorization'])
              }
            /> */}


                    </View>


                </View>
                {/* =============day range=========== */}

                <View style={{
                    width: "100%", height: 50, flexDirection: "row",
                    alignItems: 'center'
                }}>
                    <Text style={styles.textRangeTitle}>Day Range</Text>
                    {/* <Text style={styles.textRangeTitle1}>Price:{CompanyDetails[0]?.Price} </Text> */}
                </View>

                <View style={{ width: "100%", height: 70, flexDirection: 'row' }}>
                    <View style={{
                        width: 80, height: "100%",

                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={styles.valueText}>{CompanyDetails[0]?.Low_Price}</Text>
                        <Text style={styles.valueText1}>L</Text>
                    </View>
                    <View style={{
                        width: width - 200, height: "100%",

                        justifyContent: 'center'
                    }}>

                        <Text style={styles.valueText}>
                            {CompanyDetails[0]?.Price}
                        </Text>
                        <Slider
                            style={{ width: 200 }}
                            thumbTintColor='#0F9764'
                            disabled={true}
                            minimumValue={Math.round(CompanyDetails[0]?.Low_Price)}
                            maximumValue={Math.round(CompanyDetails[0]?.High_Price)}
                            value={Math.round(CompanyDetails[0]?.Price)}

                        />

                    </View>
                    <View style={{
                        width: 80, height: "100%",

                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={styles.valueText}>{CompanyDetails[0]?.High_Price}</Text>
                        <Text style={styles.valueText1}>H</Text>
                    </View>


                </View>
                {/* =============day range=========== */}

                <View style={{
                    width: "100%", height: 50, flexDirection: "row",
                    alignItems: 'center'
                }}>
                    <Text style={styles.textRangeTitle}>52 Week Range</Text>
                    {/* <Text style={styles.textRangeTitle1}>Price:{CompanyDetails[0]?.Price} </Text> */}
                </View>
                <View style={{ width: "100%", height: 70, flexDirection: 'row' }}>
                    <View style={{
                        width: 80, height: "100%",

                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={styles.valueText}>{CompanyDetails[0]?.LO_52_WK}</Text>
                        <Text>L</Text>
                    </View>
                    <View style={{
                        width: width - 200, height: "100%",

                        justifyContent: 'center'
                    }}>
                        <View style={styles.container}>
                            <Text style={styles.valueText}>
                                {CompanyDetails[0]?.Price}
                            </Text>
                            <Slider

                                style={{ width: 200 }}
                                thumbTintColor='#0F9764'

                                disabled={true}
                                minimumValue={Math.round(CompanyDetails[0]?.LO_52_WK)}
                                maximumValue={Math.round(CompanyDetails[0]?.HI_52_WK)}
                                value={Math.round(CompanyDetails[0]?.Price)}

                            />

                        </View>
                    </View>
                    <View style={{
                        width: 80, height: "100%",

                        justifyContent: 'center',
                        alignItems: 'center',


                    }}>
                        <Text style={styles.valueText}>{CompanyDetails[0]?.HI_52_WK}</Text>
                        <Text style={styles.valueText1}>H</Text>
                    </View>


                </View>
                {/* ===================== */}
                <View style={{
                    width: "100%", height: 100,
                    flexDirection: "row"
                }}>
                    <View style={{
                        width: "50%", height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={styles.textRangeTitle2}>Bid</Text>
                        <Text style={styles.textRangeTitle3}>{CompanyDetails[0]?.BBuy_Price}</Text>
                        <Text style={styles.textRangeTitle3}>{CompanyDetails[0]?.BBuy_Qty}</Text>

                        <Text style={styles.textRangeTitle2}>Bid Qty</Text>

                    </View>
                    <View style={{
                        width: "50%", height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={styles.textRangeTitle2}>Ask</Text>
                        <Text style={styles.textRangeTitle3}>{CompanyDetails[0]?.BSell_Price}</Text>
                        <Text style={styles.textRangeTitle3}>{CompanyDetails[0]?.BSell_Qty}</Text>

                        <Text style={styles.textRangeTitle2}>Ask Qty</Text>

                    </View>
                    {/* ===================== */}
                </View>
            </View>

        </>
    )
}

export default connect(null, { getPriceVolume })(Price)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textRangeTitle: {
        color: '#686868', marginLeft: 20,
        fontSize: 14,
        fontWeight: "700",

    },
    textRangeTitle1: {
        color: '#0F9764', marginLeft: 20,
        fontSize: 14,
        fontWeight: "700",

    },
    textRangeTitle2: {
        color: '#686868',
        fontSize: 14,
        fontWeight: "700",

    },
    textRangeTitle3: {
        color: '#0F9764',
        fontSize: 14,
        fontWeight: "700",

    },
    valueText: {
        color: '#0F9764',
        fontSize: 12,
        fontWeight: '700'

    },
    valueText1: {
        color: '#686868',
        fontSize: 12,
        fontWeight: '700'

    }
})