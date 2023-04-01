
import {
    StyleSheet,
    Text,
   
    View,
   
  } from 'react-native';
  import React from 'react';
  import {Center} from 'native-base';
  
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  
  const IndexItem = (props) => {
    //  console.log('item',props)
    return (
      <>
        
          <View style={styles.container}>
            <View style={{...styles.containerInner,borderLeftColor:'red'}}>
              <View style={styles.innerLeft}>
                <Text style={{color: 'black', fontSize: 14}}>{"title"}</Text>
                <Text style={{color: '#1B1C28', fontSize: 10}}>NSE: 17 Oct, 10:18</Text>
              </View>
              <View style={styles.innerMiddle}>
                <Text style={{color: '#1B1C28',fontWeight:'500', fontSize: 12}}>3,176.80</Text>
                <Text style={{color: '#1B1C28',fontWeight:'400', fontSize: 10}}>Vol 84.85m</Text>
              </View>
              <View style={styles.innerRight}>
                <View
                  style={{
                    width: '85%',
                    justifyContent: 'center',
                    height: '100%',
                    alignItems:'flex-end',
                    paddingRight:10
                  }}>
                    <Text style={{color: 'red', fontSize: 14}}>578.14</Text>
                    <Text style={{color: 'red', fontSize: 14}}>-0.58%</Text>
                  </View>
                <View
                  style={{
                    width: '15%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    size={24}
                    color="black"
                  />
                </View>
              </View>
            </View>
            <View style={styles.lower}></View>
          </View>
      
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
      width: '30%',
      height: '100%',
      justifyContent: 'center',
    },
    innerRight: {
      width: '25%',
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