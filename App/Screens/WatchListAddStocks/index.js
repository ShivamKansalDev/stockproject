import {
    StyleSheet, SafeAreaView, Image,
    FlatList, TouchableOpacity, Dimensions, Text, View
} from 'react-native'
import React from 'react'
import ProfileHeader from '../../Components/Header/ProfileHeader'
import StatusBarView from '../../Components/StatusBar'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import IndexItem from '../../Components/IndexItem';
import SearchView from '../../Components/Searchview';

const image = [
    { name: "Reliance Industries" },
    { name: "Reliance Industries" },
    { name: "Reliance Industries" },
    { name: "Reliance Industries " },
    { name: "Reliance Industries " },
    { name: "Reliance Industries " },
    { name: "Reliance Industries " },
    { name: "Reliance Industries " },
]


const Item = () => {
    return (
        <View style={{
            width: '100%', height: 50, paddingHorizontal: 15, flexDirection: 'row',
            borderBottomColor: '#D4D2D2', borderBottomWidth: 1
        }}>
            <View style={{
                width: '50%', height: '100%', justifyContent: 'center',
                paddingLeft: 10
            }}>
                <Text>Watchlist1</Text>
            </View>
            <View style={{
                width: '50%', height: '100%', flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end'
            }}>
                <FontAwesome5 name="edit" size={20} color="#9fa0a3" style={{ marginRight: 20 }} />
                <MaterialIcons name="delete-outline" size={24} color="#9fa0a3" />
            </View>
        </View>
    )
}
const WatchListAddStocks = ({ navigation }) => {
    const goBack = () => {
        navigation.navigate('Profile')
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBarView />
            <ProfileHeader />
            <View style={{ width: "100%", height: 50, paddingHorizontal: 15 }}>
                <View style={{
                    width: '100%', borderRadius: 5, height: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 5,
                    backgroundColor: '#FAFAFA'
                }}>
                    <Text style={{ color: '#0F9764' }}>Add Stocks</Text>

                </View>
            </View>
            <View style={{width:"100%",height:50,paddingHorizontal:20}}>
            <SearchView  color="#EBEBEB"/>
            </View>
            {/* ===========item=========== */}
           

        </SafeAreaView>
    )
}

export default WatchListAddStocks

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15,
        paddingHorizontal: 30

    },
    // listItem: {
    //     maxWidth: Dimensions.get('window').width /2,
    //     flex:0.5,
    //     backgroundColor: '#fff',
    //     marginBottom: 30,
    //     borderRadius: 4,
    // },
})