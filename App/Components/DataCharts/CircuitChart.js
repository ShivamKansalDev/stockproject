import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Svg, {Polyline} from 'react-native-svg';

import {
  VictoryBar,
  VictoryPie,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  VictoryAxis,
} from 'victory-native';
import {graphicColor} from '../../utils/ChartData';
import {polyFour, polySix, polyThird, polyFive} from '../../utils/PolyLine';

import PolyLineView from './PolyLineView';
import TextView from './TextView';

const CircuitChart = ({data, total, color}) => {
  return (
    <View style={{width: '100%', height: '100%'}}>
      <Svg viewBox="0 0 150 150">
        <TextView value="Voice" x={315} y={127} />
        <TextView value="Data" x={55} y={143} />
        <TextView value="Service" x={55} y={7} />

        <PolyLineView polyLinePoints={polyThird} />
        <PolyLineView polyLinePoints={polySix} />
        <PolyLineView polyLinePoints={polyFive} />
        {/* <Polyline
          points="100,44 100,20 120,20"
          fill="none"
          stroke="red"
          strokeWidth="1"
        /> */}
        {/* <Polyline
          points="100,70 120,70 130,75"
          fill="none"
          stroke="black"
          strokeWidth="1"
        /> */}
        <VictoryPie
          data={data}
          width={150}
          height={150}
          colorScale={color}
          innerRadius={40}
          style={{labels: {display: 'none'}}}
        />

        <VictoryLabel
          textAnchor="middle"
          style={{fontSize: 8, fontWeight: 'bold'}}
          x={75}
          y={75}
          text={`${total}`}
        />
      </Svg>
    </View>
  );
};

export default CircuitChart;

const styles = StyleSheet.create({});
