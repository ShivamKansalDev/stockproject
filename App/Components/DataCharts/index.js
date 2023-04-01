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
import {
  polyFirst,
  polyFive,
  polyFour,
  polySecond,
  polyThird,
} from '../../utils/PolyLine';

import PolyLineView from './PolyLineView';
import TextView from './TextView';

const Chart = ({data, total, color}) => {
  return (
    <View style={{width: '100%', height: '100%'}}>
      <Svg viewBox="0 0 150 150">
        {/* <TextView value="One" x={140} y={27} /> */}
        <TextView value="Data Center" x={260} y={26} />
        <TextView value="Branch" x={317} y={108} />

        {/* <PolyLineView polyLinePoints={polyFirst} /> */}
        <PolyLineView polyLinePoints={polySecond} />
        <PolyLineView polyLinePoints={polyThird} />
        {/* <PolyLineView polyLinePoints={polyFour} /> */}
        {/* <PolyLineView polyLinePoints={polyFive} /> */}

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

export default Chart;

const styles = StyleSheet.create({});
