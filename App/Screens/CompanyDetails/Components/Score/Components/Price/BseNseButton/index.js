

import { StyleSheet, Text,TouchableOpacity, View } from 'react-native'
import React from 'react'

const BseNseButton = ({bseAndNse,nse, bse}) => {
    return (
        
            <View style={styles.containerInner}>
                <TouchableOpacity
                onPress={()=>{
                    nse()
                }}
                 style={{ ...styles.button, backgroundColor:bseAndNse==='NSE'? '#0F9764':'white' }}>
                    <Text style={{color:bseAndNse==='NSE'? 'white': "#686868", fontSize:16, fontWeight:'900'}}>NSE</Text>

                </TouchableOpacity>
                <TouchableOpacity
                 onPress={()=>{
                    bse()
                }} style={{ ...styles.button1,backgroundColor:bseAndNse==='BSE'? '#0F9764':'white' }}>
                    <Text style={{color:bseAndNse==='BSE'?  'white': "#686868", fontSize:16, fontWeight:'900'}}>BSE</Text>

                </TouchableOpacity>

            </View>
        
    )
}

export default BseNseButton

const styles = StyleSheet.create({
   
    containerInner: {
        width: 90, height: '100%',  
        flexDirection: 'row',
         borderRadius: 25,
         backgroundColor: "white"
       
    },
    button: {
        width: "50%", height: '100%', 
        justifyContent: 'center', alignItems: 'center',
        borderBottomLeftRadius:25,
        borderTopLeftRadius:25

        
        
    },
    button1: {
        width: "50%", height: '100%', 
        justifyContent: 'center', alignItems: 'center',
        borderBottomRightRadius:25,
        borderTopRightRadius:25
    }
})