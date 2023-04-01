import { StyleSheet, Text,TouchableOpacity, View } from 'react-native'
import React from 'react'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileBackView = ({onPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerInner}>
        <TouchableOpacity onPress={()=>{
          onPress()
        }}>
     <Text><MaterialCommunityIcons name="arrow-left" size={24} color="#686868" />
     </Text>
     </TouchableOpacity>
     
     <Text style={{color:'#686868', fontSize:14, marginLeft:5}}>My Portfolio
     </Text>
    </View>
    </View>
  )
}

export default ProfileBackView

const styles = StyleSheet.create({
    container:{
        width:"100%",
        paddingHorizontal:20,
        
        
    },
    containerInner:{
        width:"100%",
        height:40,
        backgroundColor:'#FAFAFA',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:5
    }
})