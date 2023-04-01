import { StyleSheet, Text, View, LogBox } from 'react-native'
import React from 'react'
LogBox.ignoreLogs(['Require cycle: node_modules']);
import { LineChart } from 'react-native-chart-kit';


import {
    VictoryBar,
    VictoryTheme,
    VictoryAxis,
    VictoryChart,
    VictoryLine,
    Background,
    VictoryLabel
} from 'victory-native';
import { useSelector } from 'react-redux';

const data1 = [900, 944, 955.35, 973.40, 956.15, 937.25, 967.95]
const LineChart1 = () => {
    const { BseChart } = useSelector(state => state.BseChart)
    // console.log(BseChart,'BseChart');
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
        yAxisMaxValue: computeYAxisHeight(data1),
    };

    return (
        //     <View style={{width:"100%",alignItems:"center",height:200}}>
        // <VictoryChart>
        // <VictoryAxis

        // dependentAxis
        // style={{
        //     axis: { stroke: '#686868' },
        //     ticks: { stroke: 'red' },
        //     tickLabels: {
        //         fontSize: 15,
        //         padding: 5,
        //         width: 0,
        //         height: 0,
        //     },
        // }}
        // tickValues={[
        //     1, 2, 3, 4,5,16
        // ]}
        //  tickFormat={['Yes', 'No', 'Probably', 'Never','eeee','ppp']}
        // />
        //   <VictoryLine
        //    labelComponent={<VictoryLabel renderInPortal dy={20}/>}
        //    style={{ data: { stroke: "red" } }}
        //   interpolation="natural"
        //     data={[
        //       { x: 1, y: 2 },
        //       { x: 2, y: 3 },
        //       { x: 3, y: 7 },
        //       { x: 4, y: 4 },
        //       { x: 5, y: 6 },
        //       { x: 5, y: 6 }
        //     ]}
        //   />
        // </VictoryChart>
        //     </View>
        <View style={styles.container}>
            {BseChart.length > 0 ? (<LineChart
                data={{
                    labels: [],
                    datasets: [
                        {
                            data: BseChart ? BseChart.map(item => item.ltp) : data1,
                        },
                    ],
                }}
                width={350}
                height={250}
                yAxisLabel={''}
                chartConfig={chartConfig}
                bezier
            />
            ) : null}

        </View>
    )
}

export default LineChart1

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})