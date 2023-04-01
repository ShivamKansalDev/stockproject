import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
} from 'react-native';
// import { alertMessage } from '../../Components/AlertMessage';
// import Loder from '../../Components/Loder';
// import { Base_url } from '../../Utils/BaseUrl';

import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { danger, setAuthToken } from '../../../../Components/Helper';
import Lodder from '../../../../Components/Lodder';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);
const OtpReceive = ({ confirm }) => {
    // console.log(route);
    const navigation = useNavigation();
    const OTP = [];
    const ref_input = [];
    ref_input[0] = useRef();
    ref_input[1] = useRef();
    ref_input[2] = useRef();
    ref_input[3] = useRef();
    ref_input[4] = useRef();
    ref_input[5] = useRef();

    const [pin1, pinSet1] = useState('');
    const [pin2, pinSet2] = useState('');
    const [pin3, pinSet3] = useState('');
    const [pin4, pinSet4] = useState('');
    const [pin5, pinSet5] = useState('');
    const [pin6, pinSet6] = useState('');

    const [back1, setBack1] = useState(true);
    const [back2, setBack2] = useState(true);
    const [back3, setBack3] = useState(true);
    const [back4, setBack4] = useState(true);
    const [back5, setBack5] = useState(true);
    const [back6, setBack6] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [lodding, setLodding] = useState(false);

    const focusNext = (text, index) => {
        if (index < ref_input.length - 1 && text) {
            ref_input[index + 1].current.focus();
        }
        if (index == ref_input.length - 1) {
            ref_input[index].current.blur();
        }
        OTP[index] = text;
    };
    const focusPrev = (key, index) => {
        if (key === 'Backspace' && index !== 0) {
            ref_input[index - 1].current.focus();
        }
    };
    const setToken = async token => {
        try {
            await AsyncStorage.setItem('@user', token);
            setAuthToken(token);
        } catch (error) {
            console.log(error);
        }
    };
    const confirmCode = async code => {
        try {
            setLodding(true);

            await confirm.confirm(code);
            //  const user = await auth().signInWithCredential(code);
            //  console.log(user.additionalUserInfo);
            //  console.log(JSON.stringify(result),'otp')

            //   setLodding(false);
            pinSet1('');
            pinSet2('');
            pinSet3('');
            pinSet4('');
            pinSet5('');
            pinSet6('');

            // console.log('#### otp RESULT', JSON.stringify(result));
            // if (result) {
            //   setLodding(false);
            //   pinSet1('');
            //   pinSet2('');
            //   pinSet3('');
            //   pinSet4('');
            //   pinSet5('');
            //   pinSet6('');
            //   navigation.navigate('CommunityDrawer');
            // }
        } catch (error) {
            setLodding(false);
            danger('Invalid code.');
            setBack1(true);
            setBack2(true);
            setBack3(true);
            setBack4(true);
            setBack5(true);
            setBack6(true);
            pinSet1('');
            pinSet2('');
            pinSet3('');
            pinSet4('');
            pinSet5('');
            pinSet6('');
            console.log('Invalid code.', error);
        }
    };

    const otpRece = () => {
        let otp = `${pin1}${pin2}${pin3}${pin4}${pin5}${pin6}`;
        console.log('@#@#@#@# OTP RECEIVE', otp, confirm);
        if (otp.length == 6 && confirm) {
            confirmCode(otp);
        }
    };
    useEffect(() => { });
    return (
        <>
            <View style={styles.container}>
                {isLoading ? (
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size={80} color={'#ffab39'} />
                    </View>
                ) : (
                    <View>
                        <View style={{ ...styles.center }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: '75%',
                                }}>
                                <TextInput
                                    mode="flat"
                                    selectionColor={{}}
                                    underlineColorAndroid="transparent"
                                    textAlign="center"
                                    maxLength={1}
                                    keyboardType="numeric"
                                    value={pin1}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        textAlign: 'center',
                                        backgroundColor: back1 ? '#FFFFFF' : '#0f9764',
                                        color: 'white',
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                        borderWidth: 1,
                                        borderColor: '#EBEBEB',
                                        borderRadius: 8,
                                    }}
                                    autoFocus={true}
                                    returnKeyType="next"
                                    ref={ref_input[0]}
                                    onChangeText={text => {
                                        pinSet1(text);
                                        focusNext(text, 0);
                                        if (pin1 === '') {
                                            setBack1(false);
                                        }
                                        if (pin1 !== '') {
                                            setBack1(true);
                                        }
                                    }}
                                    onKeyPress={e => focusPrev(e.nativeEvent.key, 0)}
                                />
                                <TextInput
                                    mode="flat"
                                    selectionColor={{}}
                                    underlineColorAndroid="transparent"
                                    textAlign="center"
                                    maxLength={1}
                                    keyboardType="numeric"
                                    value={pin2}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        textAlign: 'center',
                                        backgroundColor: back2 ? '#FFFFFF' : '#0f9764',
                                        color: 'white',
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                        borderWidth: 1,
                                        borderColor: '#EBEBEB',
                                        borderRadius: 8,
                                        justifyContent: 'center',
                                    }}
                                    ref={ref_input[1]}
                                    onChangeText={text => {
                                        pinSet2(text);
                                        focusNext(text, 1);
                                        if (pin2 === '') {
                                            setBack2(false);
                                        }
                                        if (pin2 !== '') {
                                            setBack2(true);
                                        }
                                    }}
                                    onKeyPress={e => focusPrev(e.nativeEvent.key, 1)}
                                />
                                <TextInput
                                    mode="flat"
                                    selectionColor={{}}
                                    underlineColorAndroid="transparent"
                                    textAlign="center"
                                    maxLength={1}
                                    keyboardType="numeric"
                                    value={pin3}
                                    style={{
                                        textAlignVertical: 'center',
                                        width: 40,
                                        height: 40,
                                        textAlign: 'center',
                                        backgroundColor: back3 ? '#FFFFFF' : '#0f9764',
                                        color: 'white',
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                        borderWidth: 1,
                                        borderColor: '#EBEBEB',
                                        borderRadius: 8,
                                    }}
                                    ref={ref_input[2]}
                                    onChangeText={text => {
                                        pinSet3(text);
                                        focusNext(text, 2);
                                        if (pin3 === '') {
                                            setBack3(false);
                                        }
                                        if (pin3 !== '') {
                                            setBack3(true);
                                        }
                                    }}
                                    onKeyPress={e => focusPrev(e.nativeEvent.key, 2)}
                                />
                                <TextInput
                                    mode="flat"
                                    selectionColor={{}}
                                    underlineColorAndroid="transparent"
                                    textAlign="center"
                                    maxLength={1}
                                    keyboardType="numeric"
                                    value={pin4}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        textAlign: 'center',
                                        backgroundColor: back4 ? '#FFFFFF' : '#0f9764',
                                        color: 'white',
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                        borderWidth: 1,
                                        borderColor: '#EBEBEB',
                                        borderRadius: 8,
                                    }}
                                    ref={ref_input[3]}
                                    onChangeText={text => {
                                        pinSet4(text);
                                        focusNext(text, 3);
                                        if (pin4 === '') {
                                            setBack4(false);
                                        }
                                        if (pin4 !== '') {
                                            setBack4(true);
                                        }
                                    }}
                                    onKeyPress={e => focusPrev(e.nativeEvent.key, 3)}
                                />
                                <TextInput
                                    mode="flat"
                                    selectionColor={{}}
                                    underlineColorAndroid="transparent"
                                    textAlign="center"
                                    maxLength={1}
                                    keyboardType="numeric"
                                    value={pin5}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        textAlign: 'center',
                                        backgroundColor: back5 ? '#FFFFFF' : '#0f9764',
                                        color: 'white',
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                        borderWidth: 1,
                                        borderColor: '#EBEBEB',
                                        borderRadius: 8,
                                    }}
                                    ref={ref_input[4]}
                                    onChangeText={text => {
                                        pinSet5(text);
                                        focusNext(text, 4);
                                        if (pin5 === '') {
                                            setBack5(false);
                                        }
                                        if (pin5 !== '') {
                                            setBack5(true);
                                        }
                                    }}
                                    onKeyPress={e => focusPrev(e.nativeEvent.key, 4)}
                                />
                                <TextInput
                                    mode="flat"
                                    selectionColor={{}}
                                    underlineColorAndroid="transparent"
                                    textAlign="center"
                                    maxLength={1}
                                    keyboardType="numeric"
                                    value={pin6}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        textAlign: 'center',
                                        backgroundColor: back6 ? '#FFFFFF' : '#0f9764',
                                        color: 'white',
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                        borderWidth: 1,
                                        borderColor: '#EBEBEB',
                                        borderRadius: 8,
                                    }}
                                    ref={ref_input[5]}
                                    onChangeText={text => {
                                        pinSet6(text);
                                        focusNext(text, 5);
                                        if (pin6 === '') {
                                            setBack6(false);
                                        }
                                        if (pin6 !== '') {
                                            setBack6(true);
                                        }
                                    }}
                                    onBlur={otpRece}
                                    onKeyPress={e => focusPrev(e.nativeEvent.key, 5)}
                                />
                                {/* <TextInput
                  maxLength={0}
                  keyboardType="numeric"
                  ref={ref_input[4]}
                  onFocus={adddd}
                  onSubmitEditing={Keyboard.dismiss}
                /> */}
                            </View>
                        </View>
                    </View>
                )}
                {lodding && <Lodder lodding={lodding} />}
            </View>
        </>
    );
};
export default OtpReceive;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    top: {
        height: '30%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    center: {
        height: '25%',
        width: '100%',
        alignItems: 'center',
    },

    bottom: {
        height: '20%',
        width: '100%',
        alignItems: 'center',
    },
});
