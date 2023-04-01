import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
    VictoryBar,
    VictoryTheme,
    VictoryAxis,
    VictoryChart,
    Background,
    VictoryGroup,
    VictoryLine,
    VictoryLabel
} from 'victory-native';

import { useSelector, connect } from 'react-redux';
export const data = [
    { id: 0, name: 'Score', isActive: false, value: 'Score' },
    { id: 1, name: 'Splits', isActive: false, value: 'Splits' },
    { id: 2, name: 'Rights', isActive: false, value: 'Rights' },

];
const dataOne = [
    { quarter: 1, earnings: 100 },
    { quarter: 2, earnings: 200 },
    { quarter: 3, earnings: 300 },
    { quarter: 4, earnings: 400 },
    { quarter: 5, earnings: 500 },
    { quarter: 6, earnings: 500 },
    { quarter: 7, earnings: 300 },
]
const Volume = () => {
    const { volume1 } = useSelector(state => state.PriceVolume)
    const { volume2 } = useSelector(state => state.PriceVolume)
    const { name } = useSelector(state => state.PriceVolume)
    const { val } = useSelector(state => state.PriceVolume)
    // console.log(volume1,volume2,name);
    return (
        <View style={{paddingHorizontal:10}}>
            <VictoryChart width={300} height={420}>
                <VictoryAxis


                    style={{
                        axis: { stroke: '#686868' },
                        ticks: { stroke: 'red' },
                        tickLabels: {
                            fontSize: 15,
                            padding: 5,
                            width: 0,
                            height: 0,
                        },
                    }}
                    tickValues={val}
                    tickFormat={name}
                />
                <VictoryGroup horizontal

                    offset={18}
                    style={{ data: { width: 16 } }}
                    colorScale={["#12626C", "#0F9764"]}
                >
                     <VictoryBar
                        animate={{ duration: 100 }}
                        data={volume2}
                        x="x"
                        y="y"
                        labels={({ datum }) => `${datum._y}`}
                        labelComponent={
                            <VictoryLabel textAnchor="end" dx={1} style={[{ fill: 'white' }]} />
                        }
                    />
                    <VictoryBar
                        animate={{ duration: 100 }}
                        data={volume1}
                        x="x"
                        y="y"
                        labels={({ datum }) => `${datum._y}`}
                        labelComponent={
                            <VictoryLabel textAnchor="end" dx={1} style={[{ fill: 'white' }]} />
                        }
                    />
                   

                </VictoryGroup>

            </VictoryChart>
        </View>
    )
}

export default Volume

const styles = StyleSheet.create({})