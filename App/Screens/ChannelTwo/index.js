import { StyleSheet, TouchableOpacity, Text, SafeAreaView, ScrollView, View } from 'react-native'
import React from 'react'
import StatusBarView from '../../Components/StatusBar'
import ProfileHeader from '../../Components/Header/ProfileHeader'
import BrandImage from '../../Components/BrandImage'
import Searchview from '../../Components/Searchview'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Users from './Components/Users'
const data = [1, 2, 3, 4, 5, 6,]
const ChannelTwo = ({ navigation }) => {
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
                    alignItems: 'center',
                    flexDirection: 'row',


                }}>
                    <Feather name="arrow-left" size={24} color="#686868" />
                    <Text style={{ color: '#686868', marginLeft: 10 }}>Add Group Praticipants</Text>
                </View>
                <View style={{
                    width: "100%", paddingVertical: 10,
                    paddingHorizontal: 10,
                    borderBottomColor: '#EBEBEB',
                    borderBottomWidth: 1,
                    flexWrap: 'wrap'



                }}>
                    <View style={{
                        backgroundColor: '#EBEBEB',

                        paddingHorizontal: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 5

                    }}>
                        <AntDesign name="user" size={12} color="black" />
                        <Text style={{ color: "#686868",marginHorizontal:5 }}>First name  name</Text>
                        <Entypo name="cross" size={14} color="black" />
                    </View>
                    <View style={{
                        backgroundColor: '#EBEBEB',

                        paddingHorizontal: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 5

                    }}>
                        <AntDesign name="user" size={12} color="black" />
                        <Text style={{ color: "#686868",marginHorizontal:5 }}>First name  name</Text>
                        <Entypo name="cross" size={14} color="black" />
                    </View>
                    
                </View>
                {/* ==============Back=========== */}

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
                    alignSelf: 'center'
                }}
                    onPress={() => {
                        navigation.navigate('ChannelThree')
                    }}
                >
                    <Text>Next</Text>
                </TouchableOpacity> 
            </ScrollView>

        </SafeAreaView>
    )
}

export default ChannelTwo

const styles = StyleSheet.create({})