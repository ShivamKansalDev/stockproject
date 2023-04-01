import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  LogBox,
  StatusBar,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
LogBox.ignoreLogs(['Require cycle: node_modules/victory']);

import Chart from '../../components/DataCharts';
import AnnualCircuit from '../../components/DataCharts/AnnualCircuit';
import CircuitChart from '../../components/DataCharts/CircuitChart';

import {
  annualColor,
  annualData,
  annualTotal,
  circuitColor,
  circuitData,
  circuitTotal,
  indventory,
  indventoryColor,
  indventoryTotal,
} from '../../utils/ChartData';

import ChartBarView from './ChartBarView';

import InventoryDetails from './InventoryDetails';
import AnualCircuitSpend from './AnualCircuitSpend';
import CirCuitCount from './CirCuitCount';

import NationalOverView from './NationalOverView';
import FilterArea from './../../components/DataCharts/FilterArea';
import BottomSheetView from './BottomSheetView/index';

const Stats = () => {
  const bottomRef = useRef(null);
  const [diplayName, setDiplayName] = React.useState('');

  return (
    <>
      <SafeAreaView
        style={{
          marginTop: StatusBar.currentHeight,
          flex: 1,
        }}>
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}>
          {/* <Header /> */}
          <FilterArea bottomRef={bottomRef} setDiplayName={setDiplayName} />
          <NationalOverView />

          <InventoryDetails />
          <View style={{width: '100%', height: 280}}>
            <Chart
              data={indventory}
              total={indventoryTotal}
              color={indventoryColor}
            />
          </View>
          <AnualCircuitSpend />

          <View style={{width: '100%', height: 280}}>
            <AnnualCircuit
              data={annualData}
              total={annualTotal}
              color={annualColor}
            />
          </View>
          <CirCuitCount />
          <View style={{width: '100%', height: 250}}>
            <CircuitChart
              data={circuitData}
              total={circuitTotal}
              color={circuitColor}
            />
          </View>
          <ChartBarView />
        </ScrollView>
      </SafeAreaView>
      <BottomSheetView diplayName={diplayName} bottomRef={bottomRef} />
    </>
  );
};

export default Stats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff',
  },
});
