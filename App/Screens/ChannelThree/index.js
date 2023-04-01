

import { StyleSheet, TouchableOpacity, TextInput, Text, Image, SafeAreaView, ScrollView, View } from 'react-native'
import React from 'react'
import StatusBarView from '../../Components/StatusBar'
import ProfileHeader from '../../Components/Header/ProfileHeader'
import BrandImage from '../../Components/BrandImage'

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

const data = [1, 2, 3, 4, 5, 6,]
const ChannelThree = ({ navigation }) => {
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
                    borderBottomWidth: 2,
                    alignItems: 'center',
                    flexDirection: 'row',


                }}>
                    <Feather name="arrow-left" size={24} color="#686868" />
                    <Text style={{ color: '#686868', marginLeft: 10, fontWeight: 'bold' }}>New Group</Text>
                </View>

                {/* ==============Back=========== */}
                <View style={{
                    width: "100%", justifyContent: 'center',
                    paddingVertical: 20,
                    alignItems: 'center'
                }}>
                    <View style={{ width: 150, height: 150 }}>
                        <Image style={{ width: "100%", height: '100%', resizeMode: 'cover' }} source={require('../../Images/profile.png')} />
                    </View>
                    <View style={{
                        width: '100%', justifyContent: 'center', alignItems: 'center',
                        marginTop: 20
                    }}>

                    </View>
                </View>
                <View style={{
                    width: "100%", height: 40,
                    flexDirection: 'row',
                    paddingHorizontal: 15
                }}>
                    <View style={{
                        width: '90%', height: "100%", borderBottomColor: '#0F9764',
                        borderBottomWidth: 1
                    }}>
                        <TextInput placeholder='Group Name' />

                    </View>
                    <View style={{
                        width: '10%', height: "100%", justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                        <Feather name="smile" size={18} color="#78787C" />
                    </View>
                </View>

                <TouchableOpacity style={{
                    width: '70%', height: 50,
                    backgroundColor: '#0F9764',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center'
                }}
                    onPress={() => {
                        navigation.navigate('ChannelFour')
                    }}
                >
                    <Text>Next</Text>
                </TouchableOpacity>
            </ScrollView>

        </SafeAreaView>
    )
}

export default ChannelThree

const styles = StyleSheet.create({})