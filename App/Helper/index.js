import { StyleSheet, Text,TouchableOpacity, View } from 'react-native'
import React from 'react'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
   const navigation=useNavigation()
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={()=>{
        navigation.goBack()
      }}>
    <SimpleLineIcons name="arrow-left" size={20} color="black" />
    </TouchableOpacity>
  </View>
  )
}

export default Header

const styles = StyleSheet.create({
    header: {
        width: '100%', paddingVertical: 10,
        justifyContent: 'center',
      },
})