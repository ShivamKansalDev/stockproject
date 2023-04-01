import { StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, Image, Text, View } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { TextInput, HelperText, Card } from 'react-native-paper';
import Header from '../../Components/Header';

const ResetPassword = ({ navigation }) => {
  const [errMessagefn, seterrorMessageEmail] = useState('')
  const [email, setEmail] = useState('')
  const [show, setShow] = React.useState(true);
  const [password, setPassword] = React.useState('');
  const [errMessagePass, seterrMessagePass] = useState('')

  const checkPass = (value) => {
    if (value.length<8) {
      seterrMessagePass('Password must contain at least 8 characters')
    } else {
      setPassword(value)
      seterrMessagePass('')
    }

  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar

        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <ScrollView showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={{ backgroundColor: 'white', paddingHorizontal: 15 }} >
        <Header />
        <View style={{ ...styles.textTitle, }}>
          <Text style={{
            textAlign: "center", fontSize: 30, color: 'black',
            fontWeight: 'bold'
          }}>Reset your password</Text>
        </View>

        


       
        <TextInput

          label="Password"
          style={styles.inputStyle}

          theme={{ colors: { text: "red", accent: "red", primary: "#0f9764", placeholder: "black", background: "transparent" } }} underlineColor="#d1d1d3" underlineColorAndroid="#f5f5f5"
          activeUnderlineColor="#ff3259"
          onChangeText={text => checkPass(text)}
          mode='outlined'
          placeholder='Password'
          secureTextEntry={show}
          outlineColor='#f3f2f8'
          right={

            <TextInput.Icon
              onPress={() => setShow(!show)}
              icon={!show ? "eye" : "eye-off"} />

          }
        />

        {errMessagePass ? (<HelperText style={{ marginLeft: 10 }} type="error" >
          {errMessagePass}
        </HelperText>) : (null)}
        

       
        <TouchableOpacity
          onPress={() => {

            navigation.navigate('Setting')
          }} style={{
            ...styles.googleButton, backgroundColor: '#0f9764',
            borderWidth: 1.5, borderColor: "#0f9764"
          }}>
          
          <Text style={{
            marginLeft: 10, color: 'white', fontWeight: 'bold',
            fontSize: 18
          }}>Submit</Text>
        </TouchableOpacity>


        <View style={{ height: 100 }}></View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ResetPassword

const styles = StyleSheet.create({
  logoView: { flexDirection: 'row', justifyContent: 'center', paddingVertical: 20 },
  logoLeft: { height: 100, width: 100, justifyContent: 'center', alignItems: 'flex-end' },
  logoRight: { height: 100, width: 100, justifyContent: 'center', alignItems: 'center' },
  textTitle: { width: '100%', paddingVertical: 17 },
  inputStyle: {
    backgroundColor: 'white', fontSize: 18, paddingHorizontal: 0,
    borderColor: "red",
    width: '100%', alignSelf: 'center', marginTop: 20
  },

  googleButton: {
    width: '100%', height: 55, backgroundColor: 'white',
   
    alignSelf: 'center',
    flexDirection: 'row', justifyContent: "center",
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#f3f2f8",
    marginTop:20
  }


})