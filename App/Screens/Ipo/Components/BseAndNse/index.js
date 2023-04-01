import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const BseAndNse = ({ bseAndNse, nse, bse }) => {
    return (

        <View style={styles.containerInner}>
            <TouchableOpacity
                onPress={() => {
                    bse()
                }}
                style={{ ...styles.button, backgroundColor: bseAndNse === 'BSE' ? '#0F9764' : '#ededed' }}>
                <Text style={{ color: bseAndNse === 'BSE' ? 'white' : "#686868", fontSize: 12, fontWeight: '900' }}>BSE</Text>

            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    nse()
                }} style={{ ...styles.button1, backgroundColor: bseAndNse === 'NSE' ? '#0F9764' : '#ededed' }}>
                <Text style={{ color: bseAndNse === 'NSE' ? 'white' : "#686868", fontSize: 12, fontWeight: '400' }}>NSE</Text>

            </TouchableOpacity>

        </View>

    )
}

export default BseAndNse

const styles = StyleSheet.create({

    containerInner: {
        width: 80, height: '100%',
        flexDirection: 'row',
        borderRadius: 6,
        backgroundColor: "#ededed",
        height: 30,
       

       alignItems:"center"

    },
    button: {
        width: "50%", height: '100%',
        justifyContent: 'center', alignItems: 'center',
        borderRadius:6



    },
    button1: {
        width: "50%", height: '100%',
        justifyContent: 'center', alignItems: 'center',
        borderRadius:6
    }
})