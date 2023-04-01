import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';

import { TextInput, HelperText, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { updateUserDisplayName } from '../../../../Action/AuthHelper';
import { warinng, danger } from '../../../../Components/Helper';

const NameInput = ({setreload}) => {
  const navigation = useNavigation()
  const [errMessagefn, seterrorMessage] = useState('')
  const [name, setname] = useState('')
  const checname = (value) => {

    const trimmedName = value.trim();
    let rjx = /^[a-zA-Z\s]+$/;
    // Check if the name is not an empty string
    if (!trimmedName) {
      seterrorMessage('The name is not an empty')
    }
    else if (!rjx.test(trimmedName)) {
      seterrorMessage('please write name in valid format')
    } else {
      setname(value)
      seterrorMessage('')
    }

  }
  const updatename = () => {
    if (name == '') {
      danger('Name is require')
    } else {
      updateUserDisplayName(name,setreload)
    }
  }
  return (
    <>
      <TextInput
        style={styles.inputStyle}

        label="Name"

        keyboardType="default"

        theme={{ colors: { text: "red", accent: "red", primary: "#0f9764", placeholder: "black", background: "transparent" } }} underlineColor="#d1d1d3" underlineColorAndroid="#f5f5f5"
        activeUnderlineColor="#ff3259"
        onChangeText={text => checname(text)}
        mode='outlined'

      />
      {errMessagefn ? (<HelperText style={{ marginLeft: 10 }} type="error" >
        {errMessagefn}
      </HelperText>) : (null)}
      <TouchableOpacity
        onPress={() => {
          updatename()
        }}
        style={styles.googleButton}>
        <Text><AntDesign name="google" size={28} color="white" /></Text>
        <Text style={{
          marginLeft: 10, color: 'white', fontWeight: 'bold',
          fontSize: 16
        }}>Continue </Text>
      </TouchableOpacity>

    </>
  )
}

export default NameInput

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