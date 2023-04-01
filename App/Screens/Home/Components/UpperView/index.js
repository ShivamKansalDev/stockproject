import { StyleSheet, Text,Image, View } from 'react-native'
import React from 'react'

const UpperView = () => {
  return (
    <>
     <View style={styles.logoView}>
          <View style={styles.logoLeft}>
            <Image source={require('./../../../../Images/logo.png')} style={{ width: "70%", height: '70%', resizeMode: 'contain' }} />
          </View>
          <View style={styles.logoRight}>
            <Image source={require('./../../../../Images/logoText.png')} style={{ width: "100%", height: '100%', resizeMode: 'contain' }} />
          </View>

        </View>
        <View style={{ ...styles.textTitle, paddingVertical: 18 }}>
          <Text style={{
            textAlign: "center", fontSize: 32, color: 'black',
            fontWeight: 'bold'
          }}>Log In / SIgn Up</Text>
        </View>
        <View style={{ ...styles.textTitle, paddingVertical: 15, paddingHorizontal: 25 }}>
          <Text style={{
            textAlign: "center", fontSize: 25, color: '#2f757e',
          }}>Welcome to Stock Knocks,
            Create your free account</Text>
        </View>
    </>
  )
}

export default UpperView

const styles = StyleSheet.create({
    logoView: { flexDirection: 'row', justifyContent: 'center', paddingVertical: 20 },
  logoLeft: { height: 100, width: 100, justifyContent: 'center', alignItems: 'flex-end' },
  logoRight: { height: 100, width: 100, justifyContent: 'center', alignItems: 'center' },
  textTitle: { width: '100%', paddingVertical: 25 },
  inputStyle: {
    backgroundColor: 'white', fontSize: 18, paddingHorizontal: 0,
    borderColor: "red",
    width: '90%', alignSelf: 'center', marginTop: 20
  },
  googleButton: {
    width: '90%', height: 55, backgroundColor: '#0f9764',
    marginTop: 15,
    alignSelf: 'center',
    flexDirection: 'row', justifyContent: "center",
    alignItems: 'center',
    borderRadius: 10
  },
  googleButton: {
    width: '90%', height: 55, backgroundColor: '#0f9764',
    marginTop: 15,
    alignSelf: 'center',
    flexDirection: 'row', justifyContent: "center",
    alignItems: 'center',
    borderRadius: 10
  }
})