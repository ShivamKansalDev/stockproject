

import { StyleSheet, TouchableOpacity, TextInput, Text, Image, SafeAreaView, ScrollView, View } from 'react-native'
import React from 'react'
import StatusBarView from '../../Components/StatusBar'
import ProfileHeader from '../../Components/Header/ProfileHeader'
import BrandImage from '../../Components/BrandImage'

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const data = [1, 2, 3, 4, 5, 6,]
const ChannelFive = ({ navigation }) => {
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
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate('ChannelFour')
                    }}>
                    <Feather name="arrow-left" size={24} color="#686868" />
                    </TouchableOpacity>
                    <Text style={{ color: '#686868', marginLeft: 10, fontWeight: 'bold' }}>Group info</Text>
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
                <Text style={{
                    textAlign: 'center', color: '#686868',
                    fontSize:16,
                    marginBottom: 10,
                    fontWeight: '700'
                }}>Welcome</Text>
                <Text style={{
                    textAlign: 'center', color: '#686868',
                    marginBottom: 13,
                    fontWeight: '500'
                }}>Add contacts to create your channel</Text>
                {/* ============= */}
               

                {/* <TouchableOpacity style={{
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
                </TouchableOpacity>  */}
            </ScrollView>

        </SafeAreaView>
    )
}

export default ChannelFive

const styles = StyleSheet.create({})