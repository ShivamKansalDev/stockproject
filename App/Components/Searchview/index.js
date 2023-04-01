import React, { useEffect } from 'react'
import { StyleSheet, TextInput, Text, View } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
const SearchView = ({ color = '#000000', searchText = '', setSearchText = () => { }, setSelectMenu = () => { } }) => {

    return (

        <View style={{
            width: '100%', height: '100%', borderColor: color,
            borderRadius: 8,
            flexDirection: 'row',
            borderWidth: 1.5
        }}>
            <View style={{ width: '85%', height: '100%', }}>

                <TextInput style={{ width: '100%', height: '100%', color: '#000000' }}
                    value={searchText}
                    onFocus={() => setSelectMenu('')}
                    onChangeText={(text) => {
                        setSearchText(text)
                        console.log("%$$^$$%^$%&%*( ", text)
                    }
                    } />
            </View>
            <View style={{
                width: '15%', height: '100%',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <EvilIcons name="search" size={30} color="black" />
            </View>

        </View>

    )
}

export default SearchView

const styles = StyleSheet.create({
    container: { width: "100%", height: 65, paddingVertical: 10, paddingHorizontal: 10 }
})