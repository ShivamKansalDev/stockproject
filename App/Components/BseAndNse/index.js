import { StyleSheet, Text,TouchableOpacity, View } from 'react-native'
import React from 'react'

const BseAndNse = ({bseAndNse,nse, bse}) => {
    return (
        
            <View style={styles.containerInner}>
                <TouchableOpacity
                onPress={()=>{
                    bse()
                }}
                 style={{ ...styles.button, backgroundColor:bseAndNse==='BSE'? '#0F9764':'#ededed' }}>
                    <Text style={{color:bseAndNse==='BSE'? 'white': "#686868", fontSize:16, fontWeight:'900'}}>NSE</Text>

                </TouchableOpacity>
                <TouchableOpacity
                 onPress={()=>{
                    nse()
                }} style={{ ...styles.button1,backgroundColor:bseAndNse==='NSE'? '#0F9764':'#ededed' }}>
                    <Text style={{color:bseAndNse==='NSE'?  'white': "#686868", fontSize:16, fontWeight:'900'}}>BSE</Text>

                </TouchableOpacity>

            </View>
        
    )
}

export default BseAndNse

const styles = StyleSheet.create({
   
    containerInner: {
        width: 100, height: '100%',  
        flexDirection: 'row',
         borderRadius: 10,
         backgroundColor: "#ededed"
       
    },
    button: {
        width: "50%", height: '100%', 
        justifyContent: 'center', alignItems: 'center',
        borderBottomLeftRadius:10,
        borderTopLeftRadius:10

        
        
    },
    button1: {
        width: "50%", height: '100%', 
        justifyContent: 'center', alignItems: 'center',
        borderBottomRightRadius:10,
        borderTopRightRadius:10
    }
})