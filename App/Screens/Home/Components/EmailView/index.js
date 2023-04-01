import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';

import { TextInput, HelperText, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const EmailView = () => {
    const navigation=useNavigation()
    const [errMessagefn, seterrorMessageEmail] = useState('')
    const [email, setEmail] = useState('')
    const checkEmail = (value) => {
        let rjx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
        if (!rjx.test(value)) {
          seterrorMessageEmail('please write email in valid format')
        } else {
          setEmail(value)
          seterrorMessageEmail('')
        }
    
      }
  return (
    <>
     <TextInput
          style={styles.inputStyle}

          label="Email"
          
          keyboardType="email"
          
          theme={{ colors: { text: "red", accent: "red", primary: "#0f9764", placeholder: "black", background: "transparent" } }} underlineColor="#d1d1d3" underlineColorAndroid="#f5f5f5"
          activeUnderlineColor="#ff3259"
          onChangeText={text => checkEmail(text)}
          mode='outlined'
         
        />
        {errMessagefn ? (<HelperText style={{ marginLeft: 10 }} type="error" >
          {errMessagefn}
        </HelperText>) : (null)}
      <View style={styles.googleButton}>
          <Text><AntDesign name="google" size={28} color="white" /></Text>
          <Text style={{
            marginLeft: 10, color: 'white', fontWeight: 'bold',
            fontSize: 16
          }}>Continue with Google</Text>
        </View>
      
    </>
  )
}

export default EmailView

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