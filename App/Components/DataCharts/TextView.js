import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const TextView = ({value, x, y}) => {
  return (
    <Text
      style={{
        transform: [{translateX: x}, {translateY: y}],
        fontSize: 15,
        fontWeight: '900',
      }}>
      {value}
    </Text>
  );
};

export default TextView;

const styles = StyleSheet.create({});
