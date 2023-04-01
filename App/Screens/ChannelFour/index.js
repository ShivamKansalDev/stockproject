

import { StyleSheet, TouchableOpacity, TextInput, Text, Image, SafeAreaView, ScrollView, View } from 'react-native'
import React from 'react'
import StatusBarView from '../../Components/StatusBar'
import ProfileHeader from '../../Components/Header/ProfileHeader'
import BrandImage from '../../Components/BrandImage'

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const data = [1, 2, 3, 4, 5, 6,]
const ChannelFour = ({ navigation }) => {
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
                <Text style={{
                    textAlign: 'center', color: '#686868',
                    marginBottom: 10,
                    fontWeight: 'bold'
                }}>Stock Knocks Tech Team</Text>
                <Text style={{
                    textAlign: 'center', color: '#686868',
                    marginBottom: 15,
                    fontWeight: '500'
                }}>10 Participants</Text>
                {/* ============= */}
                <View style={{
                    width: "100%", 
                 
                    paddingHorizontal: 15
                }}>
                   <Text style={{color:'#12626C', fontSize:14, fontWeight:'bold'}}>Add Group Description</Text>
                   <Text style={{color:'#686868', fontSize:12, fontWeight:'bold'}}>Lorem ipsum</Text>
                   
                </View>
                <View style={{width:'100%', height:50,
               
                paddingHorizontal:15,
                alignItems:'center',
                justifyContent:'space-between', flexDirection:'row'}}>
                    <Text style={{color:'#12626C'}}>Media</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={28} color="#12626C" />
                </View>
                <View style={{width:'100%',
               
                paddingHorizontal:15,
                alignItems:'center',
                flexDirection:'row'}}>
                    <View style={{width:50, height:50, 
                    marginRight:10,
                    backgroundColor:'#D9D9D9',
                   
                borderRadius:7}}></View>
                    <View style={{width:50, height:50, backgroundColor:'#D9D9D9',
                    marginRight:10,
                borderRadius:7}}></View>
                    <View style={{width:50, height:50, 
                    marginRight:10,backgroundColor:'#D9D9D9',
                borderRadius:7}}></View>
                </View>

                <TouchableOpacity style={{
                    width: '70%', height: 50,
                    backgroundColor: '#0F9764',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center'

                    ,marginTop:10
                }}
                    onPress={() => {
                        navigation.navigate('ChannelFive')
                    }}
                >
                    <Text>Next</Text>
                </TouchableOpacity> 
            </ScrollView>

        </SafeAreaView>
    )
}

export default ChannelFour

const styles = StyleSheet.create({})