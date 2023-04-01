import {
    StyleSheet, SafeAreaView, Image,
    FlatList, TouchableOpacity, Dimensions, Text, View
} from 'react-native'
import React from 'react'
import ProfileHeader from '../../Components/Header/ProfileHeader'
import StatusBarView from '../../Components/StatusBar'
import ProfileBackView from '../../Components/ProfileBackView'
const image = [
    { name: "Reliance Industries" },
    { name: "Reliance Industries" },
    { name: "Reliance Industries" },
    { name: "Reliance Industries " },
]
const ProfileNext = ({ navigation }) => {
    const goBack = () => {
        navigation.navigate('Profile')
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBarView />
            <ProfileHeader />
            <ProfileBackView onPress={goBack} />
            <Text style={{color:'#12626C', fontWeight:"500", marginLeft:15, marginVertical:10}}>Add Broker</Text>
            <FlatList style={{ marginHorizontal:8 }}
                        nestedScrollEnabled={true}
                        data={image}
                        numColumns={2}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item }) => {
                            return (
                                <View style={{
                                    flex: 1, margin: 8,
                                    borderRadius: 5,


                                    borderColor: "#EBEBEB",
                                    borderWidth: 1,
                                    justifyContent: 'center', alignItems: 'center', height: 150
                                }} >
                                    
                                    <Text>{item.name}</Text>
                                </View>
                            )
                        }}
                    />
                    <View style={{ height: 60 }}></View>
            <View style={{ height: 70 }}></View>
        </SafeAreaView>
    )
}

export default ProfileNext

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