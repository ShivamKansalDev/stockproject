import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';

const {height, width} = Dimensions.get('screen');
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const DataLoder = () => {
  const item = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      {item.map((item, index) => {
        return (
          <SkeletonPlaceholder key={index}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
                paddingLeft: 20,
                paddingRight: 20,
              }}>
              <View
                style={{
                  width: width - 40,

                  height: 40,
                  borderRadius: 8,
                }}
              />
            </View>
          </SkeletonPlaceholder>
        );
      })}
    </>
  );
};
export default DataLoder;

const styles = StyleSheet.create({});
