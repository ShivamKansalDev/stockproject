import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';

const {height, width} = Dimensions.get('screen');
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const ThreeColumLoder = ({}) => {
 
  return (
    <>
      
        
          <SkeletonPlaceholder>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent:"space-between",
                
                width:width-20,
               marginBottom:20,
                alignSelf:'center',
                
                
              }}>
              <View
                style={{
                  width: '32%',

                  height: 70,
                  borderRadius: 8,
                 
                }}
              />
              <View
                style={{
                    width: '32%',

                  height: 70,
                  borderRadius: 8,
                }}
              />
              <View
                style={{
                    width: '32%',

                  height: 70,
                  borderRadius: 8,
                }}
              />
            </View>
          </SkeletonPlaceholder>
      
     
    </>
  );
};
export default ThreeColumLoder;

const styles = StyleSheet.create({});
