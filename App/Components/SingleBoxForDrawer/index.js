import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const SingleBoxForDrawer = ({ title, leftIcon }) => {
    return (
        <>
            <View style={{ width: "100%", height: "100%", flexDirection: 'row',
            
            paddingHorizontal:10 }}>

                <View style={{
                    width: "50%", height: '100%',
                    alignItems:"center",
                    flexDirection:'row'
                }}>
                   
                    <Text style={{marginLeft:6,fontWeight:'bold', color:'#686868'}}>{leftIcon}</Text>
                    <Text style={{color:'#686868', marginLeft:5}}>{title}</Text>
                </View>
                <View style={{
                    width: "50%", height: '100%', justifyContent: 'center',

                    alignItems: "flex-end"
                }}>
                    <SimpleLineIcons name="arrow-right" size={15} color="#686868" />
                </View>
            </View>
        </>
    )
}

export default SingleBoxForDrawer

const styles = StyleSheet.create({})