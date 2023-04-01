import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const SenSexSingleboxUnlisted = ({ title, title1, title2, title3 }) => {
    let color = '#0F9764'
    if (title3.includes('-')) {
        color = 'red';
    }
    return (
        <View style={styles.container}>
            <Text style={{ color: '#0F9764', fontWeight: '700', fontFamily: 'Oxygen' }}>{title}</Text>

            <Text style={{ color: "red,", fontWeight: "500" }}>{title1}</Text>
            <Text style={{ color: "#686868,", }}>{title2}</Text>
            <Text style={{ color: color, }}>{title3}</Text>
        </View>
    )
}

export default SenSexSingleboxUnlisted

const styles = StyleSheet.create({
    container: { width: '31%', height: '100%', },
    containerUpper: {
        width: "100%", height: '20%', flexDirection: 'row',
        alignItems: 'center',
    },
    containerLower: {
        width: "100%", height: '80%',
        alignItems: 'center'
    },

})