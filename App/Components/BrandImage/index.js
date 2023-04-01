import { StyleSheet, Text,Image, View } from 'react-native'
import React from 'react'

const BrandImage = () => {
  return (
    <View style={{width:"100%", height:50,paddingHorizontal:10,
    }}>
       <View style={{width:"100%", height:'100%', alignSelf:'center'}}>
      <Image source={require('../../Images/brand.png')} style={{width:'100%', height:'100%', resizeMode:"cover"}}/>
      </View>
    </View>
  )
}

export default BrandImage

const styles = StyleSheet.create({})