import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, Image, ScrollView, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from "axios";
import { TextInput } from 'react-native-paper';
import { useSelector, useDispatch } from "react-redux";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import BrandImage from "../../Components/BrandImage";
import ProfileHeader from "../../Components/Header/ProfileHeader";

import { fontSizeH3, fontSizeH4, getMarginLeft, getMarginTop, getMarginVertical, getWidthnHeight } from "../../Components/width";
import { userUrl } from "../../Url";
import { REMOVE_USER, SET_USER } from "../../ActionType/User";
import { signOut } from "../../Action/Authentication";
import moment from "moment";

export default function AccountSettings() {
    const userDetails = useSelector((state) => state.User);
    const [editImage, setEditImage] = useState(false);
    const [editProfileInfo, setEditProfileInfo] = useState(false);
    const [fullname, setFullName] = useState(userDetails?.User?.name);
    const [email, setEmail] = useState(userDetails?.User?.email);
    const [address1, setAddress1] = useState(userDetails?.User?.address1)
    const [emailError, setEmailError] = useState((userDetails?.User?.email) ? false : true);
    const [phone, setPhone] = useState(userDetails?.User?.phone?.includes('+') ? userDetails?.User?.phone?.substring(3) : userDetails?.User?.phone);
    const dispatch = useDispatch();

    const authToken = userDetails?.authToken;
    console.log("@@#@#@DFDF USER DETAILS: ", userDetails.User);

    function getUser() {
        axios.get(`${userUrl}/user/current`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        }).then(response => {
            console.log("@#@#^*&&*& CURRENT USER RESPONSE: ", response.data);
            dispatch({
                type: SET_USER,
                payload: {
                    data: response.data,
                    token: authToken
                }
            })


        }).catch(err => console.log("##$#$ CURRENT USER ERROR: ", JSON.stringify(err.response, null, 4)));
    }

    async function launchImageGallery(pic = 'profilepic') {
        let options = {
            mediaType: 'photo',
            selectionLimit: 0,
            // includeBase64: true, 
        };
        const result = await launchImageLibrary(options);
        if (result?.didCancel) {
            return;
        } else {
            // showLoader();
            console.log('#@#@#@##@#@#@# RESULT : ', result, "\n\n\n", `${userUrl}/users/${pic}`);

            const addName = result.assets.map(item => ({
                ...item,
                name: item.fileName,
            }));
            // setPhoto(addName);
            const formData = new FormData();
            formData.append("files", addName[0])
            axios.put(`${userUrl}/users/${pic}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${authToken}`
                }
            }).then((response) => {
                // hideLoader();
                console.log("#@#@#@#@ PIC UPLOADED: ", response.data);
                let data = {
                    ...response.data,
                    coverpic: response.data?.coverpic + '?' + moment().valueOf(),
                    profilepic: response.data?.profilepic + '?' + moment().valueOf()
                };
                setEditImage(false)
                setEditProfileInfo(false);
                dispatch({
                    type: SET_USER,
                    payload: {
                        data: data,
                        token: authToken
                    }
                })
            }).catch((error) => {
                // hideLoader();
                console.log("#@#@&*(&^&%^%^ PIC ERROR: ", JSON.stringify(error, null, 4))
            })
        }
    }

    function updateUser() {
        if (!!fullname && !!phone) {
            let sendData = {
                name: fullname,
                phone: `+91${phone}`,
                address1: address1
            }
            if (email && !emailError) {
                sendData = Object.assign(sendData, { email: email })
            } else if (email && emailError) {
                alert('Incorrect Email Address');
                return;
            }
            console.log("#$#$#$#$ UPDATE USER: ", sendData);
            axios.put(`${userUrl}/users`, sendData, {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            }).then((response) => {
                console.log("$$##$#$##$ UPDATE USER RESPONSE: ", response.data);
                setEditImage(false);
                setEditProfileInfo(false);
                dispatch({
                    type: SET_USER,
                    payload: {
                        data: response.data,
                        token: authToken
                    }
                })
            }).catch((error) => {
                console.log("$$##$#$##$ UPDATE USER ERROR: ", JSON.stringify(error.response, null, 4))
            })
        }
    }

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content" />
            <ProfileHeader />
            <BrandImage />
            <View style={{ flex: 1, alignItems: 'center' }}>
                <ScrollView>
                    <View style={[{
                        backgroundColor: '#e7e7e7', borderRadius: getWidthnHeight(2).width,
                        flexDirection: 'row', alignItems: 'center', paddingVertical: getWidthnHeight(3).width
                    }, getWidthnHeight(93), getMarginTop(2)]}>
                        {(!editImage) ? (
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ paddingLeft: getWidthnHeight(3).width }}>
                                    <Image
                                        source={{ uri: userDetails?.User?.profilepic }}
                                        style={[{
                                            width: getWidthnHeight(16).width, height: getWidthnHeight(16).width,
                                            borderRadius: getWidthnHeight(8).width
                                        }]}
                                        resizeMode="contain"
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{
                                        fontSize: fontSizeH4().fontSize + 2, fontWeight: 'bold', paddingVertical: getWidthnHeight(1).width,
                                        paddingHorizontal: getWidthnHeight(3).width
                                    }}>{userDetails?.User?.name}</Text>
                                    {/* <Text style={{
                                        fontSize: fontSizeH4().fontSize + 2, paddingVertical: getWidthnHeight(1).width,
                                        paddingHorizontal: getWidthnHeight(3).width
                                    }}>This is a sample text</Text> */}
                                </View>
                            </View>
                        )
                            :
                            <View style={{ width: '90%', paddingHorizontal: getWidthnHeight(3).width }}>
                                <View style={{ borderRadius: getWidthnHeight(3).width, overflow: 'hidden' }}>
                                    <ImageBackground
                                        source={{ uri: userDetails?.User?.coverpic }}
                                        resizeMode="cover"
                                        style={[{ flex: 1, borderRadius: getWidthnHeight(3).width, justifyContent: 'flex-end' }, getWidthnHeight(undefined, 13)]}
                                    >
                                        <TouchableOpacity
                                            style={[{ backgroundColor: '#ffffff', borderRadius: getWidthnHeight(10).width, alignSelf: 'flex-end' }, getMarginLeft(-10)]}
                                            onPress={() => launchImageGallery('coverpic')}>
                                            <FontAwesome name='camera' color={'#FF5858'} size={getWidthnHeight(6).width}
                                                style={{ padding: getWidthnHeight(2).width }}
                                            />
                                        </TouchableOpacity>
                                    </ImageBackground>
                                </View>
                                <View style={[{ width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }, getMarginTop(2)]}>
                                    <Image
                                        source={{ uri: userDetails?.User?.profilepic }}
                                        resizeMode="contain"
                                        style={{ width: getWidthnHeight(24).width, height: getWidthnHeight(24).width, borderRadius: getWidthnHeight(12).width }}
                                    />
                                    <TouchableOpacity
                                        style={[{ backgroundColor: '#ffffff', borderRadius: getWidthnHeight(10).width, alignSelf: 'flex-end' }, getMarginLeft(-10)]}
                                        onPress={() => launchImageGallery('profilepic')}>
                                        <FontAwesome name='camera' color={'#FF5858'} size={getWidthnHeight(6).width}
                                            style={{ padding: getWidthnHeight(2).width }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                        <View style={{ paddingRight: getWidthnHeight(3).width, alignSelf: 'flex-start' }}>
                            {(editImage) ? (
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={() => {
                                        setEditImage(false)
                                    }}
                                >
                                    <AntDesign name="closecircle" color={"#000000"} size={getWidthnHeight(7).width} />
                                </TouchableOpacity>
                            )
                                :

                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={() => {
                                        setEditImage(true)
                                    }}
                                >
                                    <FontAwesome name="edit" color={"#000000"} size={getWidthnHeight(6).width} />
                                </TouchableOpacity>
                            }
                        </View>
                    </View>

                    <View style={[{
                        backgroundColor: '#e7e7e7', borderRadius: getWidthnHeight(2).width,
                        alignItems: 'flex-start', padding: getWidthnHeight(3).width,
                    }, getWidthnHeight(93), getMarginTop(2)]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                            <Text style={{ fontSize: fontSizeH3().fontSize - 2, color: '#0F9764', fontWeight: 'bold' }}>Profile Info</Text>
                            {(editProfileInfo) ? (
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={() => {
                                        setEditProfileInfo(false)
                                    }}
                                >
                                    <AntDesign name="closecircle" color={"#000000"} size={getWidthnHeight(7).width} />
                                </TouchableOpacity>
                            )
                                :

                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={() => {
                                        setEditProfileInfo(true)
                                    }}
                                >
                                    <FontAwesome name="edit" color={"#000000"} size={getWidthnHeight(6).width} />
                                </TouchableOpacity>
                            }
                        </View>

                        {(!editProfileInfo) ? (
                            <>
                                <Text style={{ fontSize: fontSizeH4().fontSize + 2, color: '#000000', fontWeight: 'bold', paddingVertical: getWidthnHeight(2).width }}>Full Name</Text>

                                <Text style={{ fontSize: fontSizeH4().fontSize + 4, color: '#000000', fontWeight: '500', paddingVertical: getWidthnHeight(2).width }}>{userDetails?.User?.name}</Text>

                                <Text style={{ fontSize: fontSizeH4().fontSize + 2, color: '#000000', fontWeight: 'bold', paddingVertical: getWidthnHeight(2).width }}>Email</Text>

                                <Text style={{ fontSize: fontSizeH4().fontSize + 4, color: '#000000', fontWeight: '500', paddingVertical: getWidthnHeight(2).width }}>{email}</Text>

                                <Text style={{ fontSize: fontSizeH4().fontSize + 2, color: '#000000', fontWeight: 'bold', paddingVertical: getWidthnHeight(2).width }}>Mobile No.</Text>

                                <Text style={{ fontSize: fontSizeH4().fontSize + 4, color: '#000000', fontWeight: '500', paddingVertical: getWidthnHeight(2).width }}>{phone}</Text>

                                <Text style={{ fontSize: fontSizeH4().fontSize + 2, color: '#000000', fontWeight: 'bold', paddingVertical: getWidthnHeight(2).width }}>Address</Text>

                                <Text style={{ fontSize: fontSizeH4().fontSize + 4, color: '#000000', fontWeight: '500', paddingVertical: getWidthnHeight(2).width }}>{userDetails?.User?.address1}</Text>
                            </>
                        )
                            :
                            <>
                                <Text style={{ fontSize: fontSizeH4().fontSize + 2, color: '#000000', fontWeight: 'bold', paddingVertical: getWidthnHeight(2).width }}>Full Name</Text>
                                <View style={{ alignItems: 'center', width: '100%' }}>
                                    <TextInput
                                        value={fullname}
                                        placeholder="Enter your full name"
                                        placeholderTextColor={'#C4C4C4'}
                                        style={[{ backgroundColor: '#FFFFFF', width: '100%' }, getWidthnHeight(undefined, 6)]}
                                        textColor={'#000000'}
                                        onChangeText={(text) => setFullName(text)}
                                    />
                                </View>

                                <Text style={{ fontSize: fontSizeH4().fontSize + 2, color: '#000000', fontWeight: 'bold', paddingVertical: getWidthnHeight(2).width }}>Email</Text>
                                <View style={{ alignItems: 'center', width: '100%' }}>
                                    <TextInput
                                        value={email}
                                        placeholder="Enter your mail id"
                                        placeholderTextColor={'#C4C4C4'}
                                        style={[{ backgroundColor: '#FFFFFF', width: '100%', color: '#000000' }, getWidthnHeight(undefined, 6)]}
                                        textColor={'#000000'}
                                        onChangeText={(text) => {
                                            const check = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                            if (check.test(String(text).toLowerCase())) {
                                                setEmail(text);
                                                setEmailError(false)
                                            } else {
                                                setEmail(text)
                                                setEmailError(true)
                                            }
                                        }}
                                    />
                                </View>

                                <Text style={{ fontSize: fontSizeH4().fontSize + 2, color: '#000000', fontWeight: 'bold', paddingVertical: getWidthnHeight(2).width }}>Mobile No.</Text>
                                <View style={{ alignItems: 'center', width: '100%' }}>
                                    <TextInput
                                        value={phone}
                                        editable={false}
                                        keyboardType="phone-pad"
                                        placeholder="Enter your mobile number"
                                        placeholderTextColor={'#C4C4C4'}
                                        style={[{ backgroundColor: '#FFFFFF', width: '100%', color: '#000000' }, getWidthnHeight(undefined, 6)]}
                                        textColor={'#000000'}
                                        maxLength={10}
                                        onChangeText={(number) => setPhone(number)}
                                    />
                                </View>

                                <Text style={{ fontSize: fontSizeH4().fontSize + 2, color: '#000000', fontWeight: 'bold', paddingVertical: getWidthnHeight(2).width }}>Address</Text>
                                <View style={{ alignItems: 'center', width: '100%' }}>
                                    <TextInput
                                        value={address1}
                                        multiline={true}
                                        numberOfLines={4}
                                        placeholder="Enter your mobile number"
                                        placeholderTextColor={'#C4C4C4'}
                                        style={[{ backgroundColor: '#FFFFFF', width: '100%', color: '#000000' }]}
                                        textColor={'#000000'}
                                        onChangeText={(text) => setAddress1(text)}
                                    />
                                </View>
                                <View style={[{ width: '100%', alignItems: 'center' }, getMarginTop(2)]}>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: '#0F9764',
                                            paddingHorizontal: getWidthnHeight(4).width,
                                            paddingVertical: getWidthnHeight(2).width,
                                            borderRadius: getWidthnHeight(1).width
                                        }}
                                        onPress={() => updateUser()}
                                    >
                                        <Text style={{ color: '#FFFFFF', fontSize: fontSizeH4().fontSize + 2 }}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        }
                    </View>

                    <View style={[{
                        backgroundColor: '#e7e7e7', borderRadius: getWidthnHeight(2).width,
                        alignItems: 'flex-start', padding: getWidthnHeight(3).width,
                    }, getWidthnHeight(93), getMarginVertical(2)]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                            <Text style={{ fontSize: fontSizeH3().fontSize - 2, color: '#0F9764', fontWeight: 'bold' }}>About</Text>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => {
                                    console.log("ABOUT")
                                }}
                            >
                                <FontAwesome name="edit" color={"#000000"} size={getWidthnHeight(6).width} />
                            </TouchableOpacity>
                        </View>

                        {/* <Text style={{ fontSize: fontSizeH4().fontSize + 2, color: '#000000', fontWeight: 'bold', paddingVertical: getWidthnHeight(2).width }}>Full Name</Text>

                        <Text style={{ fontSize: fontSizeH4().fontSize + 4, color: '#000000', fontWeight: '500', paddingVertical: getWidthnHeight(2).width }}>{userDetails?.User?.name}</Text>

                        <Text style={{ fontSize: fontSizeH4().fontSize + 2, color: '#000000', fontWeight: 'bold', paddingVertical: getWidthnHeight(2).width }}>Email</Text>

                        <Text style={{ fontSize: fontSizeH4().fontSize + 4, color: '#000000', fontWeight: '500', paddingVertical: getWidthnHeight(2).width }}>usermail@mail.com</Text>

                        <Text style={{ fontSize: fontSizeH4().fontSize + 2, color: '#000000', fontWeight: 'bold', paddingVertical: getWidthnHeight(2).width }}>Mobile No.</Text>

                        <Text style={{ fontSize: fontSizeH4().fontSize + 4, color: '#000000', fontWeight: '500', paddingVertical: getWidthnHeight(2).width }}>{userDetails?.User?.phone}</Text>

                        <Text style={{ fontSize: fontSizeH4().fontSize + 2, color: '#000000', fontWeight: 'bold', paddingVertical: getWidthnHeight(2).width }}>Address</Text>

                        <Text style={{ fontSize: fontSizeH4().fontSize + 4, color: '#000000', fontWeight: '500', paddingVertical: getWidthnHeight(2).width }}>{userDetails?.User?.phone}</Text> */}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
} 