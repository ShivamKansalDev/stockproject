import {
    StyleSheet,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Image,
    Text,
    View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';

import auth from '@react-native-firebase/auth';
import { TextInput, HelperText, Card } from 'react-native-paper';
import OtpReceive from './Components/OtpReceive';
import EmailView from './Components/EmailView';
import UpperView from './Components/UpperView';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { warinng, danger, setAuthToken } from '../../Components/Helper';
import Lodder from '../../Components/Lodder';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { CloudUrl, userUrl } from '../../Url';
import Axios from 'axios';
import { getToken } from '../../Action/AuthHelper';
import {
    signOut,
    onGoogleButtonPress,
    createUserWithEmailAndPassword,
    signInUserWithEmailAndPassword,
} from '../../Action/Authentication';
import NameInput from './Components/NameInput';
import { useSelector, useDispatch } from 'react-redux';
import { SET_USER } from '../../ActionType/User';
import axios from 'axios';
import moment from 'moment';

const Home = ({ navigation }) => {
    const { isAuthenticated } = useSelector(state => state.User)


    const dispatch = useDispatch()
    const [lodding, setLodding] = useState(false);
    const [errMessagefn, seterrorMessageEmail] = useState('');
    const [email, setEmail] = useState('');
    const [valid, setValid] = useState(true);
    const [confirm, setConfirm] = useState(null);
    const [nameView, setNameView] = useState(false);
    const [reload, setreload] = useState(false);


    const [code, setCode] = useState('');
    const [phone, setPhone] = useState('');
    const [isEmailView, setIsEmailView] = useState(false);

    // Handle the button press
    // const phone="9945801122"
    // const phone="123456"
    // console.log(getToken(),'ddd');

    const checkUserName = async () => {
        getToken().then(authToken => {
            console.log('object', authToken);
            axios.get(`${userUrl}/user/current`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
            })
                .then(response => {
                    console.log(response, 'user');
                    if (response.data?.error?.status == 500) {
                        setNameView(true)
                    } else {
                        let data = response.data;
                        data = {
                            ...data,
                            coverpic: data?.coverpic + '?' + moment().valueOf(),
                            profilepic: data?.profilepic + '?' + moment().valueOf()
                        }
                        dispatch({
                            type: SET_USER,
                            payload: {
                                data: data,
                                token: authToken

                            }
                        })
                        navigation.navigate('CommunityDrawer');
                        // setNameView(false)
                        // console.log(response.data,'odsafp');
                    }


                })
                .catch(err => console.log(JSON.stringify(err.response, null, 4)));
        });
    }



    async function signInWithPhoneNumber() {
        try {
            setLodding(true);
            const confirmation = await auth().signInWithPhoneNumber(`+91 ${phone}`);
            console.log('&^&^&^&^&^& CONFIRM: ', confirmation);
            if (confirmation) {
                setConfirm(confirmation);
                console.log(JSON.stringify(confirmation), 'con');
                setLodding(false);

                //  // if(UserExit){
                //     navigation.navigate('community')
                //   }else{
                //     navigation.navigate('next')
                //   }
                //   

            }
        } catch (error) {
            setLodding(false);
            danger(error);
            console.error(error);
            console.log(error, 'err');
        }
    }

    async function signInWithGoogle() {
        try {
            setLodding(true);
            let data = await onGoogleButtonPress();
            console.log('signInWithGoogle Data: ', JSON.stringify(data));
            setLodding(false);
        } catch (error) {
            setLodding(false);
            danger(error);
            console.error(error, 'err-signInWithGoogle');
        }
    }

    async function onAuthStateChanged(user) {
        if (user) {
            checkUserName()
            // Set user data if required
        } else {
            await signOut();
            console.log('User signed out.');
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return () => {
            subscriber(); // unsubscribe on unmount
        };
    }, [reload]);

    const checkPhone = value => {
        setPhone(value);
        const pattern = /^\d+$/;
        if (pattern.test(value)) {
            if (value.length == 10) {
                setValid(false);
            } else {
                setValid(true);
            }
        }
        // const val=value.trim()
        // setPhone(val);

        // if ( val.length== 10) {
        //   setValid(false);
        // } else {
        //   setValid(true);
        // }
    };
    const getdata = () => {
        // console.log(Axios.defaults.headers.common['Authorization']);

        // Axios.get(`${CloudUrl}/master/?path=Indices`)
        // .then(response => {
        //   console.log(response.data)
        //     // dispatch({
        //     //     type: Types.LOAD_TRANSACTIONS,
        //     //     payload: {
        //     //         transactions: response.data
        //     //     }
        //     // })
        // })
        // .catch(error => {
        //     console.log(error)
        // })
        // const token = await AsyncStorage.getItem('@user');
        // // const token = JSON.parse(await AsyncStorage.getItem('@token'));
        //  console.log(token,'token')
        getToken().then(authToken => {
            fetch(`${CloudUrl}/master/?path=Indices`, {
                method: 'Get',

                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
            })
                .then(res => {
                    console.log(res, 'red');
                    return res.json();
                })
                .then(result => {
                    console.log(result, 'result');
                    // if (result) {
                    //   setniftySenser(false)
                    //   dispatch({
                    //     type: NIFTY_SENSEX,
                    //     data: result.data
                    //   })
                    // }
                })
                .catch(err => console.log(err));
        });
    };

    // const signIn = async () => {
    //   try {
    //     await GoogleSignin.hasPlayServices();
    //     const userInfo = await GoogleSignin.signIn();
    //     const token = GoogleSignin.getTokens();
    //     getToken(res.accessToken);

    //     if (userInfo) {
    //       // navigation.navigate('CommunityDrawer')
    //     }
    //     console.log(JSON.stringify(userInfo));
    //   } catch (error) {
    //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //       // user cancelled the login flow
    //     } else if (error.code === statusCodes.IN_PROGRESS) {
    //       // operation (e.g. sign in) is in progress already
    //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //       // play services not available or outdated
    //     } else {
    //       // some other error happened
    //     }
    //   }
    // };
    // useEffect(() => {
    //   GoogleSignin.configure();
    // }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                style={{ backgroundColor: 'white' }}>
                <UpperView />
                {isEmailView ? (
                    <EmailView />
                ) : confirm == null ? (
                    <>
                        <TextInput
                            style={styles.inputStyle}
                            label="Enter Phone Number"
                            value={phone}
                            keyboardType="numeric"
                            maxLength={10}
                            theme={{
                                colors: {
                                    text: 'red',
                                    accent: 'red',
                                    primary: '#0f9764',
                                    placeholder: 'black',
                                    background: 'transparent',
                                },
                            }}
                            underlineColor="#d1d1d3"
                            underlineColorAndroid="#f5f5f5"
                            activeUnderlineColor="#ff3259"
                            onChangeText={text => checkPhone(text)}
                            mode="outlined"
                        />

                        <TouchableOpacity
                            style={{
                                ...styles.googleButton,
                                opacity: valid ? 0.3 : 0.9,
                            }}
                            onPress={() => {
                                signInWithPhoneNumber();
                            }}
                            disabled={valid}>
                            <Text
                                style={{
                                    marginLeft: 10,
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                }}>
                                Continue{' '}
                            </Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    nameView ? <NameInput setreload={setreload} /> :
                        <OtpReceive confirm={confirm} />
                )}
                <View
                    style={{
                        width: '100%',
                        height: 1,
                        backgroundColor: '#ebebeb',
                        marginTop: 25,
                    }}
                />
                <TouchableOpacity
                    onPress={() => {
                        // signInWithPhoneNumber('+91 8250840364')
                        // navigation.navigate('SingUp')
                        console.log('Continue with Phone');
                        signInWithGoogle();
                    }}
                    style={{
                        ...styles.googleButton2,
                        borderWidth: 1.5,
                        borderColor: '#EBEBEB',
                    }}>
                    <View
                        style={{
                            width: 30,
                            height: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Image
                            source={require('../../Images/google.png')}
                            style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                        />
                    </View>
                    <Text
                        style={{
                            marginLeft: 10,
                            color: '#686868',
                            fontWeight: 'bold',
                            fontSize: 16,
                        }}>
                        Continue with Phone
                    </Text>
                </TouchableOpacity>

                {/* <View style={styles.googleButton}>
          <Text><AntDesign name="google" size={28} color="white" /></Text>
          <Text style={{
            marginLeft: 10, color: 'white', fontWeight: 'bold',
            fontSize: 16
          }}>Continue with Google</Text>
        </View>
        <View style={{ width: '100%', height: 1, backgroundColor: "#ebebeb", marginTop: 25 }}></View>  */}

                {/* <OtpReceive /> */}

                {/*
        <TouchableOpacity
          disabled={valid}
          style={{
            width: '100%',
            height: 50,
            backgroundColor: '#99cc66',
            opacity: valid ? 0.3 : 0.9,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
          }}
        // onPress={register}
        >
          <Text style={{ color: 'white' }}>
            Submit (OTP)
          </Text>
        </TouchableOpacity> */}

                {/* {isEmailView ? (
          <TouchableOpacity
            onPress={() => {
              // signInWithPhoneNumber('+91 8250840364')
              // navigation.navigate('SingUp')
              setIsEmailView(false);
            }}
            style={{
              ...styles.googleButton,
              backgroundColor: '#deeee8',
              borderWidth: 1.5,
              borderColor: '#0f9764',
            }}>
            <Text>
              <AntDesign name="mobile1" size={24} color="#0f9764" />
            </Text>
            <Text
              style={{
                marginLeft: 10,
                color: '#0f9764',
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Continue with Phone
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              // signInWithPhoneNumber('+91 8250840364')
              // navigation.navigate('SingUp')
              // setIsEmailView(true)
              // warinng('Not Implemented')
              getdata();
            }}
            style={{
              ...styles.googleButton,
              backgroundColor: '#deeee8',
              borderWidth: 1.5,
              borderColor: '#0f9764',
            }}>
            <Text>
              <Fontisto name="email" size={24} color="#0f9764" />
            </Text>
            <Text
              style={{
                marginLeft: 10,
                color: '#0f9764',
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Continue with E-mail
            </Text>
          </TouchableOpacity>
        )} */}

                <View style={{ height: 100 }} />
            </ScrollView>
            {lodding && <Lodder lodding={lodding} />}
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    logoView: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    logoLeft: {
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    logoRight: {
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textTitle: { width: '100%', paddingVertical: 25 },
    inputStyle: {
        backgroundColor: 'white',
        fontSize: 18,
        paddingHorizontal: 0,
        borderColor: 'red',
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
    },
    googleButton: {
        width: '90%',
        height: 55,
        backgroundColor: '#0f9764',
        marginTop: 15,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    googleButton: {
        width: '90%',
        height: 55,
        backgroundColor: '#0f9764',
        marginTop: 15,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    googleButton2: {
        width: '90%',
        height: 55,
        marginTop: 15,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
});
