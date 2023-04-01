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
    VictoryPie
} from 'victory-native';
const ShareHolder = () => {
  return (
    <View>
     <VictoryPie
          style={{ labels: { fill: "red" } }}
          innerRadius={100}
          
         
         
          data={[
            { x: 1, y: 5 },
            { x: 2, y: 4 },
            { x: 3, y: 2 },
            { x: 4, y: 3 },
            { x: 5, y: 1 }
          ]}
        />
    </View>
  )
}

export default ShareHolder

const styles = StyleSheet.create({})