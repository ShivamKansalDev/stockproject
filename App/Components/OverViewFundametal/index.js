import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const OverViewFundametal = ({ buttonType, setButtonType }) => {
    return (
        <View style={{
            width: "100%", paddingHorizontal: 10, paddingVertical: 12,
        }}>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => {
                        setButtonType('overview')
                    }}
                    style={{ ...styles.button, backgroundColor: buttonType == 'overview' ? '#0F9764' : "#EEEEEF" }}>
                    <Text style={{ color: buttonType == 'overview' ? "white" : '#0F9764',  fontWeight: buttonType == 'overview'  ? 'bold' : null, }}>Overview</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setButtonType('fundamental')
                    }} style={{ ...styles.button, backgroundColor: buttonType == 'fundamental' ? '#0F9764' : "#EEEEEF" }}>
                    <Text style={{ color: buttonType == 'fundamental' ? "white" : '#0F9764', fontWeight: buttonType == 'fundamental'  ? 'bold' : null, }}>Fundamental</Text>


                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setButtonType('technicals')
                    }} style={{ ...styles.button, backgroundColor: buttonType == 'technicals' ? '#0F9764' : "#EEEEEF" }}>
                    <Text style={{ color: buttonType == 'technicals' ? "white" : '#0F9764', fontWeight: buttonType == 'technicals'  ? 'bold' : null, }}>Technicals</Text>
                </TouchableOpacity>


            </View>
        </View>
    )
}

export default OverViewFundametal

const styles = StyleSheet.create({
    button: {
        width: "33.33%", height: "100%", backgroundColor: "#0F9764",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    container: {
        width: '100%', height: 35, backgroundColor: '#EEEEEF',
        flexDirection: 'row',


        borderRadius: 10
    }

})