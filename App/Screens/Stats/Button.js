import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Button = ({width, title, height}) => {
  return (
    <View
      style={{
        width: width,
        height: height,
        backgroundColor: '#6494ec',
        borderRadius: 10,
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}>
      <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
        {title}
      </Text>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({});
