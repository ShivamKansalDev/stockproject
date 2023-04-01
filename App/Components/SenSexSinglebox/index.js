import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const SenSexSinglebox = ({ color, rotate, title,
    percent,
    price }) => {
    // console.log(color,rotate,title,'color,rotate,title');
    return (
        <View style={styles.container}>
            <View style={styles.containerUpper}>
                <Text style={{ color: '#0F9764' }}>{title}</Text>
                <Image source={require('../../Images/flag.png')}
                    style={{ marginLeft: 7 }} />
            </View>
            <View style={styles.containerLower}>
                <Text style={{ color: '#686868' }}>{price}</Text>

                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                    <FontAwesome5
                        style={{ transform: [{ rotate: rotate }], marginRight: 5, color: color }}
                        name="arrow-down" size={12} color={color} />
                    <Text style={{ color: color }} >{percent}%</Text>
                </View>
            </View>
        </View>
    )
}

export default SenSexSinglebox

const styles = StyleSheet.create({
    container: { width: '31%', height: '100%', paddingLeft: 20 },
    containerUpper: {
        width: "100%", height: '20%', flexDirection: 'row',
        alignItems: 'center',
    },
    containerLower: {
        width: "100%", height: '80%',
    },

})