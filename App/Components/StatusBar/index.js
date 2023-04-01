import { StyleSheet, Text,StatusBar, View } from 'react-native'
import React from 'react'

const StatusBarView = () => {
  return (
    <>
    <StatusBar
    animated={true}
    backgroundColor="white"
    barStyle="dark-content"
    />
    </>
  )
}

export default StatusBarView

const styles = StyleSheet.create({})