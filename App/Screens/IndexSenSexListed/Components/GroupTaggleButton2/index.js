import { StyleSheet, TouchableOpacity, Dimensions, Text, View } from 'react-native'
import React from 'react'
import Octicons from 'react-native-vector-icons/Octicons';

const { width } = Dimensions.get('screen')

const GroupTaggleButton2 = ({ onPress, value }) => {
    return (
        <View>
            <TouchableOpacity
                onPress={() => {
                    onPress()
                }}
                style={{ ...styles.seletexBox }}>
                <Text style={{ color: '#0D0D0D' }}>{value}</Text>
                <View style={{
                    width: 20, height: 20, backgroundColor: "#0F976480", borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Octicons name="check" size={12} color="#0F9764" />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default GroupTaggleButton2

const styles = StyleSheet.create({
    seletexBox: {
        width: '100%', height: '100%', backgroundColor: '#EBEBEB',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 7
    },
})