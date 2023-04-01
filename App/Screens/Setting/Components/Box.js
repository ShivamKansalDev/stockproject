import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import SingleBox from '../../../Components/SingleBox';




const Box = ({title,upperIcon,lowerIcon,lowtitle, uptitle}) => {
  return (
    <>
       <View style={{
          width: '100%', paddingHorizontal: 20,
          alignSelf: "center",
          borderRadius: 15, marginTop:5
          
        }}>
          <Text style={{ marginLeft: 15, marginVertical: 8,
           fontWeight:'800',color:'#686868' }}>{title}</Text>
          <View style={{
            width: '100%',
          }}>
            <View style={{ height: 70, width: '100%', backgroundColor: "white", borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
            <SingleBox lefticon={upperIcon }
               uptitle={uptitle}
                title="Followers"
                />
            </View>
            <View style={{
              height: 1, width: '100%', backgroundColor: "white",
              paddingHorizontal: 20, alignSelf: 'center'
            }}>
              <View style={{
                height: 1, width: '100%', backgroundColor: "#cbcfcd",
                alignSelf: 'center'
              }}>

              </View>
            </View>
            <View style={{
              height: 70, width: '100%', backgroundColor: "white",
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15
            }}>
                <SingleBox lefticon={lowerIcon }
               uptitle={lowtitle}
                title="Followers"
                />
              
                
            </View>

          </View>
        </View>
    </>
  )
}

export default Box

const styles = StyleSheet.create({})