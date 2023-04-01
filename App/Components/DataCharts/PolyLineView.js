import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Polyline} from 'react-native-svg';

const PolyLineView = ({polyLinePoints}) => {
  return (
    <>
      <Polyline
        points={polyLinePoints}
        fill="none"
        stroke="black"
        strokeWidth=".5"
      />
    </>
  );
};

export default PolyLineView;

const styles = StyleSheet.create({});
