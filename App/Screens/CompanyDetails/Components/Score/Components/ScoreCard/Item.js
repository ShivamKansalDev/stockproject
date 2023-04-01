import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Itemm = ({ title, value }) => {
    console.log(typeof value, value);

    return (
        <View style={{
            width: "100%", height: 50, justifyContent: "space-between",
            paddingHorizontal: 10,
            flexDirection: "row"
        }}>
            <Text>{title}</Text>
            <Text> {(Math.round(value * 100) / 100).toFixed(2)}</Text>
        </View>
    )
}

export default Itemm

const styles = StyleSheet.create({})