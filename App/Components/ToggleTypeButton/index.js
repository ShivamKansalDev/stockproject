import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ToggleTypeButton = ({ buttonType, explore, chart }) => {
    return (
        <View style={styles.container}>
            <View style={styles.containerInner}>
                <TouchableOpacity
                    onPress={() => {
                        chart()
                    }}
                    style={{ ...styles.button, backgroundColor: buttonType === 'chart' ? 'white' : '#ededed' }}>
                    <Text style={{ color: buttonType === 'chart' ? 'black' : "#12626c", fontSize: 16, fontWeight: '900' }}>Chart</Text>

                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        explore()
                    }} style={{ ...styles.button, backgroundColor: buttonType === 'explore' ? 'white' : '#ededed' }}>
                    <Text style={{ color: buttonType === 'explore' ? 'black' : "#12626c", fontSize: 16, fontWeight: '900' }}>Explore</Text>

                </TouchableOpacity>

            </View>
        </View>
    )
}

export default ToggleTypeButton

const styles = StyleSheet.create({
    container: {
        width: "100%", height: 45, paddingHorizontal: 10,
        marginVertical: 15

    },
    containerInner: {
        width: "100%", height: '100%', alignSelf: 'center', padding: 2.5,
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: "#ededed"
    },
    button: {
        width: "50%", height: '100%', borderRadius: 10,
        justifyContent: 'center', alignItems: 'center'
    }
})