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
  import {Center} from 'native-base';
  
  import AntDesign from 'react-native-vector-icons/AntDesign';
  
//   const Users = ({vi}) => {
//     return (
//       <View
//         style={{
//           width: 100,
//           height: 40,
//           backgroundColor: vi,
//           marginLeft: 10,
//           borderRadius: 10,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//         <Text style={{fontSize: 15, color: 'white'}}>download</Text>
//       </View>
//     );
//   };
  const Users = () => {
    return (
      <>
        
          <View
            style={{
              width: '100%',
              height: 80,
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: '20%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: 'red',
                  borderRadius: 25,
                }}>
                <Image
                  source={require('../../Images/user.png')}
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
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 16, fontWeight: '500', color: 'black'}}>
                  Name Name
                </Text>
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: '#0F9764',
                    marginLeft: 5,
                  }}></View>
                <Text style={{marginLeft: 5, color: '#0F9764'}}>NameName</Text>
              </View>
              <Text style={{color:'#686868'}}>Name Name</Text>
              <Text style={{color:'#686868'}}>Name Name</Text>
            </View>
            <View
              style={{
                width: '10%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AntDesign name="delete" size={24} color="black" />
            </View>
          </View>
        
      </>
    );
  };
  
  export default Users;
  
  const styles = StyleSheet.create({
    container: {
      fontSize: 20,
    },
    ppp: {width: '100%', height: '50%'},
    anup: {},
    main: {
      width: '90%',
      height: 40,
      backgroundColor: '#c3c3c3',
      alignSelf: 'center',
      flexDirection: 'row',
  
      // marginLeft: 20,
      // marginRight: 20,
    },
  });