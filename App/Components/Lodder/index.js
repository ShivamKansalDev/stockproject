import {StyleSheet, Text, View, Dimensions, StatusBar} from 'react-native';
import React from 'react';
import {ProgressDialog} from 'react-native-simple-dialogs';
const {height} = Dimensions.get('screen');
const Lodder = ({lodding}) => {
  // console.log(lodding, 'lodding');
  return (
    <>
      {/* <StatusBar hidden /> */}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',

          height: height + 70,
        }}>
        <ProgressDialog
          visible={lodding}
          message="Please, wait..."
          titleStyle={{color: 'red', textAlign: 'center'}}
          messageStyle={{color: 'green', textAlign: 'center'}}
          contentStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
          dialogStyle={{
            borderRadius: 10,
            width: '70%',
            height: 70,
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          activityIndicatorColor="blue"
          activityIndicatorSize="large"
          overlayStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            flex: 1,
            // backgroundColor: '#bababa',
          }}
        />
      </View>
    </>
  );
};

export default Lodder;

const styles = StyleSheet.create({});
