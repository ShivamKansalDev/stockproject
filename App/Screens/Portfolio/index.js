

import { StyleSheet, SafeAreaView, Image, TouchableOpacity, Text, View } from 'react-native'
import React from 'react'
import ProfileHeader from '../../Components/Header/ProfileHeader'
import StatusBarView from '../../Components/StatusBar'
import ProfileBackView from './Components/ProfileBackView'

const Portfolio = ({navigation}) => {
    const goBack=()=>{
        navigation.goBack()
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBarView />
            <ProfileHeader />
            <ProfileBackView  onPress={goBack}/>
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
                    <TouchableOpacity
                    onPress={()=>{
                        navigation.navigate('PortfolioNext')
                    }} style={{
                        width: 200,
                        borderRadius: 25, height: 35,
                        justifyContent: "center",
                        alignItems: 'center',
                        borderWidth: 1, borderColor: "#0F9764"
                    }}>
                        <Text style={{ color: '#0F9764', fontSize: 14, fontWeight: "500" }}>Connect to your broker</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Portfolio

const styles = StyleSheet.create({})