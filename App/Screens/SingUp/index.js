import { StyleSheet, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, Text, View } from 'react-native'
import React, { useState } from 'react'
  ;
import { TextInput, HelperText, Card } from 'react-native-paper';
import Header from '../../Components/Header';
import auth,{fetchSignInMethodsForEmail,firebase} from '@react-native-firebase/auth'

// import { getAuth, fetchSignInMethodsForEmail, EmailAuthProvider} from  '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import { warinng, danger, success } from '../../Components/Helper';



const SingUp = ({ navigation }) => {
  const fireAuth = firebase.auth();
  // console.log(fireAuth.fetchSignInMethodsForEmail,'ddd')
  const [errMessagefn, seterrorMessageEmail] = useState('')
  const [errMessageName, seterrMessageName] = useState('')
  const [errMessagePass, seterrMessagePass] = useState('')
  const [show, setShow] = React.useState(true);
  const [password, setPassword] = React.useState('');

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const checkEmail = (value) => {
    let rjx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!rjx.test(value)) {
      seterrorMessageEmail('please write email in valid format')
    } else {
      setEmail(value)
      seterrorMessageEmail('')
    }

  }
  const checkName = (value) => {
    let rjx = /^[a-zA-Z\s-, ]+$/;

    if (!rjx.test(value)) {
      seterrMessageName('Full Name should be only alphabet')
    } else {
      setName(value)
      seterrMessageName('')
    }

  }
  const checkPass = (value) => {


    if (value.length < 8) {
      seterrMessagePass('Password must contain at least 8 characters')
    } else {
      setPassword(value)
      seterrMessagePass('')
    }

  }
  const sing=()=>{
    fireAuth.fetchSignInMethodsForEmail(email).then((methods) => {
      console.log(methods);
      // Do something
    }).catch(err=>console.log(err,'ppp'))
    // auth().fetchSignInMethodsForEmail(auth,email).then(data=>{
    //   console.log(data,'ddd');
    // }).catch(err=>console.log(err,'ppp'))
  }
  const singup = () => {
    

    if (name == '' || email == "" || password == "") {
      danger('All feild are Required')
    } else {
      auth().createUserWithEmailAndPassword(email, password)
        .then((data) => {
         
          if (data) {
            success("Registration Successful")
          }


          // database()
          // .ref('/users/' + data.user.uid)
          // .set({
          //     name, 

          // })
          // .then((res) => console.log(res,'Data set success'))
          // Snackbar.show({
          //     text: 'account created',
          //     textColor: 'white',
          //     backgroundColor: "#1b262c"
          // })
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // console.log(errorCode)
          // console.log(errorMessage)
          if (errorCode === 'auth/email-already-in-use') {
            warinng('Email Already Register')

          } else {
          
          }
        })
    }


  }
  return (
    <SafeAreaView style={{ flex: 1, }}>
      <StatusBar

        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <ScrollView showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={{}} >
        <View style={{ paddingHorizontal: 20, }}>
          <Header />
          <View style={styles.logoView}>
            <Text style={{
              textAlign: "center", fontSize: 28, color: 'black',
              fontWeight: '600'
            }}>Finish signing up</Text>

          </View>


          <TextInput
            style={styles.inputStyle}
            label="Full Name"
            theme={{ colors: { text: "red", accent: "red", primary: "green", placeholder: "red", background: "transparent" } }} underlineColor="#d1d1d3" underlineColorAndroid="#f5f5f5"
            activeUnderlineColor="#ff3259"
            onChangeText={text => checkName(text)}
            mode='outlined'
            outlineColor='#d1cdcd'
            textColor='green'

          />
          {errMessageName ? (<HelperText style={{ marginLeft: 10 }} type="error" >
            {errMessageName}
          </HelperText>) : (null)}
          <TextInput
            style={styles.inputStyle}
            label="Email"
            theme={{ colors: { text: "red", accent: "red", primary: "#0f9764", placeholder: "black", background: "transparent" } }} underlineColor="#d1d1d3" underlineColorAndroid="#f5f5f5"
            activeUnderlineColor="#ff3259"
            onChangeText={text => checkEmail(text)}
            mode='outlined'

          />
          {errMessagefn ? (<HelperText style={{ marginLeft: 10 }} type="error" >
            {errMessagefn}
          </HelperText>) : (null)}
          <TextInput

            label="Password"
            style={styles.inputStyle}

            theme={{ colors: { text: "red", accent: "red", primary: "#0f9764", placeholder: "black", background: "transparent" } }} underlineColor="#d1d1d3" underlineColorAndroid="#f5f5f5"
            activeUnderlineColor="#ff3259"
            onChangeText={text => checkPass(text)}
            mode='outlined'
            placeholder='Password'
            secureTextEntry={show}
            right={

              <TextInput.Icon
                onPress={() => setShow(!show)}
                icon={!show ? "eye" : "eye-off"} />

            }
          />

          {errMessagePass ? (<HelperText style={{ marginLeft: 10 }} type="error" >
            {errMessagePass}
          </HelperText>) : (null)}

          <View style={{ paddingVertical: 15 }}>
            <Text>By clicking create account you are agreeing to the <Text style={{ color: '#2ca377', fontWeight: '800' }}>user</Text> <Text style={{ color: '#2ca377', fontWeight: '800' }}>agreement</Text> &
              <Text style={{ color: '#2ca377', fontWeight: '800' }}> privacy policy</Text> </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              sing()
              // navigation.navigate('SingUpSuccess')
            }} style={styles.googleButton}>
            <Text style={{
              marginLeft: 10, color: 'white', fontWeight: 'bold',
              fontSize: 18
            }}>Create Account</Text>
          </TouchableOpacity>
          <View style={{ height: 100 }}></View>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default SingUp

const styles = StyleSheet.create({
  logoView: { flexDirection: 'row', justifyContent: 'center', paddingVertical: 20 },

  textTitle: { width: '100%', paddingVertical: 25 },
  inputStyle: {
    borderRadius: 12,
    backgroundColor: 'white', fontSize: 18, paddingHorizontal: 0,
    borderColor: "transparent",
    width: '100%', alignSelf: 'center', marginTop: 20,

  },

  header: {
    width: '100%', paddingVertical: 10,
    justifyContent: 'center',
  },
  textFocus: {
    backgroundColor: 'transparent',
    borderColor: '#5d05d5',
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