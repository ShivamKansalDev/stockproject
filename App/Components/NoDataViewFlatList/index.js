import {StyleSheet, Image, Text, View} from 'react-native';
import React from 'react';

const NoDataViewFlatList = () => {
  return (
    <View
      style={{
        width: '100%',
        height: 500,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '100%',
          height: 200,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: '100%',
            height: 100,
            resizeMode: 'contain',
          }}
          source={require('../../Images/empty.png')}
        />
        <Text style={{fontSize: 25}}>No Data Found</Text>
      </View>
    </View>
  );
};

export default NoDataViewFlatList;

const styles = StyleSheet.create({});
