import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SingleBox from '../../../Components/SingleBox'
// import SingleBox from './SingleBox'

const OneBox = ({ upperIcon, title, uptitle }) => {
    return (
        <>
            <View style={{
                width: '100%', paddingHorizontal: 20,
                alignSelf: "center",
                borderRadius: 15, marginTop: 5

            }}>
                <Text style={{
                    marginLeft: 15, marginVertical: 8,
                    fontWeight: '800',
                    color:'#686868'
                    
                }}>{title}</Text>
                <View style={{
                    width: '100%',
                }}>
                    <View style={{ height: 70, width: '100%', backgroundColor: "white", borderRadius: 15, }}>
                        <SingleBox lefticon={upperIcon}
                            uptitle={uptitle}
                            title="Followers"
                        />
                    </View>
                </View>
            </View>
        </>
    )
}

export default OneBox

const styles = StyleSheet.create({})