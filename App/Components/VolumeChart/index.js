import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { BarChart, XAxis, Grid } from 'react-native-chart-kit';

const data = {
    labels: ["Test1", "Test2"],
    legend: ["L1", "L2", "L3"],
  datasets: [
    {
      data: [40, 20],
      data: [40, 20],
    },
  ],
};
import {
    VictoryBar,
    VictoryTheme,
    VictoryAxis,
    VictoryChart,
    Background,
    VictoryGroup,
    VictoryLine
} from 'victory-native';
class VolumeChart extends Component {
  render() {
    return (
        <VictoryChart width={250} height={300}>
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
            tickValues={[
                1, 2, 3, 4,
            ]}
            tickFormat={['Yes', 'No', 'Probably', 'Never']}
        />
        <VictoryGroup horizontal
            offset={10}
            style={{ data: { width: 12 } }}
            colorScale={["brown", "tomato", "gold"]}
        >
            <VictoryBar
                data={[
                    { x: 1, y: 1 },
                    { x: 2, y: 2 },
                    { x: 3, y: 3 },
                    { x: 4, y: 2 },

                ]}
            />
            <VictoryBar
                data={[
                    { x: 1, y: 2 },
                    { x: 2, y: 3 },
                    { x: 3, y: 4 },
                    { x: 4, y: 5 },

                ]}
            />

        </VictoryGroup>

    </VictoryChart>
    );
  }
}

export default VolumeChart;
