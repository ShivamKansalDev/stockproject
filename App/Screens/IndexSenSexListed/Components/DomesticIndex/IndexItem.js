
import {
  StyleSheet,
  Text,
 TouchableOpacity,
  View,
 
} from 'react-native';
import React from 'react';


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const IndexItem = ({color,title,price,volume,
  senSExType,
  percent,
  date,
  onPress,
  coCode,
  volume1
}) => {
 
  return (
    <>
      
        <TouchableOpacity
        onPress={()=>{
          onPress(coCode)
        }} style={styles.container}>
          <View style={{...styles.containerInner,borderLeftColor:color}}>
            <View style={styles.innerLeft}>
              <Text style={{color: 'black', fontSize: 14}}>{title}</Text>
              <Text style={{color: '#1B1C28', fontSize: 10}}>{senSExType} {date}</Text>
            </View>
            <View style={styles.innerMiddle}>
              <Text style={{color: '#1B1C28',fontWeight:'bold', fontSize: 12}}>{volume}</Text>
              <Text style={{color: '#1B1C28',fontWeight:'500', fontSize: 10}}> {volume1}</Text>
            </View>
            <View style={styles.innerRight}>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  height: '100%',
                  alignItems:'flex-end',
                  paddingRight:10
                }}>
                  <Text style={{color: color, fontSize: 14}}>{price}</Text>
                  <Text style={{color: color, fontSize: 14}}>{percent}%</Text>
                </View>
              {/* <View
                style={{
                  width: '15%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}>
               
              </View> */}
            </View>
          </View>
          <View style={styles.lower}></View>
        </TouchableOpacity>
    
    </>
  );
};

export default IndexItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    marginVertical:5
  },
  containerInner: {
    width: '100%',
    flexDirection: 'row',
    height: 30,
    
    borderLeftWidth: 2.5,
  },
  innerLeft: {
    width: '45%',
    height: '100%',
    paddingLeft: 5,
    justifyContent: 'center',
  },
  innerMiddle: {
    width: '35%',
    height: '100%',
    justifyContent: 'center',
  },
  innerRight: {
    width: '20%',
    height: '100%',
    flexDirection: 'row',
  },
  lower: {
    height: 5,
    width: '100%',
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
  },
});