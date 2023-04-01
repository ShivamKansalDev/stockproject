import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Svg from 'react-native-svg';

import {VictoryPie, VictoryLabel} from 'victory-native';

import {polyFirst, polyFour, polyFive, polyThird} from '../../utils/PolyLine';

import PolyLineView from './PolyLineView';
import TextView from './TextView';

const AnnualCircuit = ({data, total, color}) => {
  return (
    <View style={{width: '100%', height: '100%'}}>
      <Svg viewBox="0 0 150 150">
        <TextView value="Wireless" x={115} y={27} />

        <TextView value="Data" x={317} y={118} />
        <TextView value="Voice" x={55} y={184} />
        <TextView value="Service" x={55} y={-5} />
        <PolyLineView polyLinePoints={polyFirst} />

        <PolyLineView polyLinePoints={polyThird} />
        <PolyLineView polyLinePoints={polyFour} />
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

export default AnnualCircuit;

const styles = StyleSheet.create({});
