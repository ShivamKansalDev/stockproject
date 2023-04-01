import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';

const {height, width} = Dimensions.get('screen');
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const OneRowLoder = ({}) => {
 
  return (
    <>
          <SkeletonPlaceholder>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingRight: 10,
              }}>
              <View
                style={{
                  width: width-20 ,
                  height: 40,
                  borderRadius: 8,
                }}
              />
            </View>
          </SkeletonPlaceholder>
    </>
  );
};
export default OneRowLoder;

const styles = StyleSheet.create({});
