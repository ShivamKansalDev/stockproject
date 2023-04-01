import {
    StyleSheet,
    Text,
    StatusBar,
    ScrollView,
    SafeAreaView,
    View,
    Image,
  } from 'react-native';
  import React from 'react';
  
  
  import AntDesign from 'react-native-vector-icons/AntDesign';

  const Users = () => {
    return (
      <>
        
          <View
            style={{
              width: '100%',
              height: 60,
              flexDirection: 'row',
              paddingHorizontal:10
            }}>
            <View
              style={{
                width: '15%',
                height: '100%',
                justifyContent: 'center',
                
              }}>
              <View
                style={{
                  width: 45,
                  height: 45,
                
                  borderRadius: 22.5,
                }}>
                <Image
                  source={require('./../../../../Images/Ellipse.png')}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                    borderRadius: 30,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                width: '70%',
                height: '100%',
                justifyContent:'center',
                
              }}>
              
              <Text style={{color:'#686868'}}>First name Last name</Text>
              
            </View>
            <View
              style={{
                width: '15%',
                height: '100%',
              
                
              }}>
             
            </View>
          </View>
        
      </>
    );
  };
  
  export default Users;
  
  const styles = StyleSheet.create({
    // container: {
    //   fontSize: 20,
    // },
    // ppp: {width: '100%', height: '50%'},
   
    // main: {
    //   width: '90%',
    //   height: 40,
    //   backgroundColor: '#c3c3c3',
    //   alignSelf: 'center',
    //   flexDirection: 'row',
  
    //   // marginLeft: 20,
    //   // marginRight: 20,
    // },
  });