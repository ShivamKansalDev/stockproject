import { StyleSheet, TouchableOpacity, Text, SafeAreaView, ScrollView, View } from 'react-native'
import React from 'react'
import StatusBarView from '../../Components/StatusBar'
import ProfileHeader from '../../Components/Header/ProfileHeader'
import BrandImage from '../../Components/BrandImage'
import Searchview from '../../Components/Searchview'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Users from './Components/Users'
const data = [1, 2, 3, 4, 5, 6,]
const ChannelOne = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

            <ProfileHeader />
            <StatusBarView />
            <ScrollView showsVerticalScrollIndicator={false}

                keyboardShouldPersistTaps="handled"
                style={{ backgroundColor: 'white', }} >
                <BrandImage />
                {/* ==============Back=========== */}
                <View style={{
                    width: "100%", height: 70,
                    paddingHorizontal: 10,
                    borderBottomColor: '#EBEBEB',
                    borderBottomWidth: 1,
                   alignItems:'center',
                    flexDirection:'row',
                   

                }}>
                    <Feather name="arrow-left" size={24} color="#686868" />
                    <Text style={{ color: '#686868',marginLeft:10 }}>Add Group Praticipants</Text>
                </View>
                {/* ==============Back=========== */}
                <View style={{
                    width: "100%", flexDirection: 'row',

                    paddingVertical: 15,
                    paddingHorizontal: 10
                }}>

                    <View style={{ width: '90%', height: 45 }}>
                        <Searchview />
                    </View>
                    <View style={{
                        width: '10%', height: 45,
                        justifyContent: 'center', alignItems: 'flex-end'
                    }}>
                        <MaterialCommunityIcons name="dots-horizontal" size={24} color="black" />
                    </View>
                </View>
                {data.map((item, i) => {
                    return (
                        <Users key={i} />
                    )
                })}
                <TouchableOpacity style={{
                    width: '70%', height: 50,
                    backgroundColor: '#0F9764',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',marginTop:10
                }}
                    onPress={() => {
                        navigation.navigate('ChannelTwo')
                    }}
                >
                    <Text>Next</Text>
                </TouchableOpacity>
            </ScrollView>

        </SafeAreaView>
    )
}

export default ChannelOne

const styles = StyleSheet.create({})