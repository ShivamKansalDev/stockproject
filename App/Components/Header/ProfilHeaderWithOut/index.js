import { StyleSheet, Image,TouchableOpacity, View } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const ProfilHeaderWithOut = () => {
 
  return (
    <View style={styles.header}>
      <View style={{ ...styles.headerLeft, flexDirection: 'row' }}>
        <TouchableOpacity onPress={()=>{
          
        }}>
        <Entypo name="menu" size={24} color="black" />
        
       </TouchableOpacity>


      </View>
      <View style={styles.headerRight}>
        <EvilIcons name="search" size={30} color="black" style={{ marginRight: 15 }} />
        <FontAwesome5 name="user-circle" size={20} color="black" />
      </View>


    </View>
  )
}

export default ProfilHeaderWithOut

const styles = StyleSheet.create({
  header: { width: '100%', flexDirection: "row", height: 70, },
  headerLeft: {
    width: "50%", paddingLeft: 15, paddingVertical: 10,
    alignItems: "center",

  },
  headerRight: { width: "50%", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", paddingRight: 15 },
  title: { paddingVertical: 10, paddingLeft: 10 },
})