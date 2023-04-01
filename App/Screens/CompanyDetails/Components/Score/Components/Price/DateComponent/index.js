import { StyleSheet,TouchableOpacity, Text, View } from 'react-native'
import React from 'react'

const DateComponent = ({tittle,onPress}) => {
  return (
 <TouchableOpacity onPress={()=>{
  onPress()
 }}>
      <Text>{tittle}</Text>
      </TouchableOpacity>
   
  )
}

export default DateComponent

const styles = StyleSheet.create({})