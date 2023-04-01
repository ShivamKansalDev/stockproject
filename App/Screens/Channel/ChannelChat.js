import React, { useEffect, useState, useRef } from "react";
import {
    View, Text, SafeAreaView, Pressable, TouchableOpacity, BackHandler,
    ActivityIndicator, Keyboard, FlatList, Image, StyleSheet, Alert
} from 'react-native';
import { useIsFocused, useNavigationState } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { PermissionsAndroid, Platform } from "react-native";
import RNFS from "react-native-fs";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import Toast from 'react-native-root-toast';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput } from 'react-native-paper';
import { useSelector } from "react-redux";

import { getWidthnHeight, fontSizeH4, getMarginTop } from "../../Components/width";


import ProfileHeader from '../../Components/Header/ProfileHeader';
import StatusBarView from '../../Components/StatusBar'
import BrandImage from '../../Components/BrandImage'
import { Qrcode } from "../../Components/ChannelModal/Qrcode";
import axios from "axios";
import { communicationUrl } from "../../Url";
import moment from "moment";

export const ChannelChat = ({ navigation, route }) => {
    const channelDetails = useSelector(state => state.ChannelDetails)
    const userDetails = useSelector(state => state.User);
    const [showQR, setShowQR] = useState(false);
    const [message, setMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState([]);
    const [messageList, setMessageList] = useState([]);
    const [loading, setLoading] = useState(false)
    const [productQRref, setProductQRref] = useState();
    const isFocused = useIsFocused();

    const authToken = userDetails?.authToken;

    const scrollRef = useRef(null);

    function showLoader() {
        setLoading(true)
    }

    function hideLoader() {
        setLoading(false);
    }

    // console.log("@#@#@ USER DETAILS: ", authToken)

    async function selectAttachment(mediaType = 'photo', limit = 0) {
        let options = {
            mediaType: mediaType,
            selectionLimit: limit,
            // includeBase64: true,
        };
        const result = await launchImageLibrary(options);
        if (result?.didCancel) {
            return;
        } else {
            console.log('#@#@#@##@#@#@# RESULT : ', result);
            const addName = result.assets.map(item => ({
                ...item,
                name: item.fileName,
            }));
            setSelectedImage(addName);
        }
    }

    async function hasAndroidPermission() {
        const permission = Platform.Version >= 33 ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

        const hasPermission = await PermissionsAndroid.check(permission);
        if (hasPermission) {
            return true;
        }

        const status = await PermissionsAndroid.request(permission);
        return status === 'granted';
    }

    async function savePicture(uri) {
        try {
            if (Platform.OS === "android" && !(await hasAndroidPermission())) {
                return;
            }

            CameraRoll.save(uri, { type: 'photo' });
            let toast = Toast.show('Image saved to Pictures');
        } catch (error) {
            console.error(error)
            let toast = Toast.show('Error saving file');
        }
    };

    const saveQrToDevice = async (uri) => {

        if (Platform.OS === "android" &&
            !(await hasAndroidPermission())) {
            return;
        }

        if (productQRref) {

            productQRref.toDataURL((data) => {

                let filePath = RNFS.CachesDirectoryPath + `/${channelDetails?.name}_${moment().valueOf()}.png`;
                RNFS.writeFile(filePath, data, 'base64')
                    .then((success) => {
                        return CameraRoll.save(filePath, 'photo')
                    })
                    .then(() => {
                        let toast = Toast.show('QR code saved to gallery');
                    }).catch((error) => {
                        let toast = Toast.show('Error saving file');
                    });
            });
        }
    }

    useEffect(() => {
        if (isFocused) {
            // console.log("!@!@!@!@! NAVIGATION STATE: ", navigation.getState().routes)
            getLatestMessages();
        }
    }, [isFocused])

    const getLatestMessages = () => {
        showLoader();
        const channelId = channelDetails?._id;
        console.log("@#@#@ LINK: ", `${communicationUrl}/channel/${channelId}/messages?count=50&dt=${moment().valueOf()}`)
        axios.get(`${communicationUrl}/channel/${channelId}/messages?count=50&dt=${moment().valueOf()}`, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        }).then((response) => {
            hideLoader();
            let data = response.data;
            setMessageList(data);
            // console.log("#@#@# LATEST MESSAGE: ", data)
        }).catch((error) => {
            hideLoader();
            console.log("@#@#@#@# MESSAGES ERROR: ", JSON.stringify(error.response, null, 4))
        })
    }

    useEffect(() => {
        const subscribe = BackHandler.addEventListener('hardwareBackPress', () => {
            //ToastAndroid.show('Not Allowed', ToastAndroid.SHORT)
            let routes = navigation.getState().routes;
            routes = routes.filter((item) => item.name !== 'AddRemoveUsers')
            if (route.name === "ChannelChat") {
                navigation.reset({
                    index: 0,
                    routes: routes
                })
            } else {
                return false;
            }
        })

        return () => {
            subscribe.remove()
        }
    }, []);

    function startTimer(seconds = 3000) {
        setTimeout(() => {
            hideLoader();
            getLatestMessages();
        }, seconds)
    }

    function sendMessage() {
        showLoader();
        const channelId = channelDetails?._id;
        axios.post(`${communicationUrl}/channel/message`, {
            "message": message,
            "channel": channelId,
        }, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        }).then((response) => {
            // hideLoader();
            const data = response.data;
            // data = data.sort((a, b) => {
            //     return moment(a.createdAt).valueOf() > moment(b.createdAt).valueOf()
            // })
            // Keyboard.dismiss();
            console.log("##@@# MESSAGE SENT RESPONSE: ", data);
            setMessage('');
            startTimer();
        }).catch((error) => {
            hideLoader();
            console.log("@#@#@#@# MESSAGE SENT ERROR: ", JSON.stringify(error, null, 4))
        })
    }

    function sendMedia() {
        showLoader();
        const channelId = channelDetails?._id;
        const formData = new FormData();
        formData.append('files', selectedImage[0]);
        formData.append('channel', channelId);
        // console.log("##@@# FORM DATA: ", JSON.stringify(formData, null, 4));
        axios.post(`${communicationUrl}/channel/${channelId}/media`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${authToken}`
                }
            }).then((response) => {
                // hideLoader();
                const data = response.data;
                // data = data.sort((a, b) => {
                //     return moment(a.createdAt).valueOf() > moment(b.createdAt).valueOf()
                // })
                // Keyboard.dismiss();
                console.log("##@@# MEDIA SENT RESPONSE: ", data);
                setSelectedImage([]);
                startTimer();
            }).catch((error) => {
                hideLoader();
                console.log("@#@#@#@# MEDIA SENT ERROR: ", JSON.stringify(error, null, 4))
            })
    }

    function removeUser(id) {
        const filterList = selectionList.filter((item) => item._id !== id);
        setSelectionList(filterList);
    }

    async function launchImageGallery() {
        let options = {
            mediaType: 'photo',
            selectionLimit: 0,
            // includeBase64: true,
        };
        const result = await launchImageLibrary(options);
        if (result?.didCancel) {
            return;
        } else {
            Alert.alert("Update Group Image", "Are you sure you want to set this image as your group image ?", [
                {
                    text: 'Yes',
                    onPress: () => {
                        const addName = result.assets.map(item => ({
                            ...item,
                            name: item.fileName,
                        }));
                        setGroupImage(addName)
                    }
                },
                {
                    text: 'Cancel'
                }
            ])
            // setSelectedImage(addName[0])
        }
    }

    function setGroupImage(image) {

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBarView />
            <ProfileHeader />
            <BrandImage />
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, alignItems: 'flex-start', padding: getWidthnHeight(2).width }}>
                    <View style={[{
                        borderBottomColor: '#C4C4C4', borderBottomWidth: 1, paddingBottom: getWidthnHeight(2).width,
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
                    }, getWidthnHeight(95)]}>
                        <Pressable
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                            onPress={() => {

                            }}
                        >
                            <View style={[{
                                backgroundColor: '#ffffff',
                                width: getWidthnHeight(12).width,
                                height: getWidthnHeight(12).width,
                                borderRadius: getWidthnHeight(6).width,
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                borderWidth: (!!channelDetails?.media_link) ? 0 : 1,
                                borderColor: '#C4C4C4'
                            }]}>
                                {channelDetails?.media_link ? (
                                    <Image resizeMode="cover" source={{ uri: channelDetails.media_link }} style={{ width: '100%', height: '100%' }} />
                                ) : (
                                    <View>
                                        <Text style={{ fontSize: fontSizeH4().fontSize + 6 }}>{channelDetails.name.substring(0, 1)}</Text>
                                    </View>
                                )}
                            </View>
                            <View style={[{ borderColor: 'red', borderWidth: 0, paddingHorizontal: getWidthnHeight(2).width, }]}>
                                <Text style={{ fontSize: fontSizeH4().fontSize + 2, color: '#000000' }}>{channelDetails?.name}</Text>
                            </View>
                        </Pressable>
                        {userDetails.User._id === channelDetails.createdBy && (
                            <TouchableOpacity
                                style={{
                                    width: getWidthnHeight(13).width, height: getWidthnHeight(13).width,
                                    borderRadius: getWidthnHeight(6.5).width, backgroundColor: '#0F9764',
                                    alignItems: 'center', justifyContent: 'center'
                                }}
                                onPress={() => {
                                    setShowQR(true)
                                    console.log("#$#$$$@$@#$@%*^^*&");
                                }}
                            >
                                <AntDesign name="link" size={getWidthnHeight(8).width} color='#FFFFFF' />
                            </TouchableOpacity>
                        )}
                    </View>
                    {/* <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> */}
                    <View style={{ flex: 1 }}>
                        <View style={[{ flex: 1, borderColor: 'red', borderWidth: 0, paddingTop: getWidthnHeight(1).width }, getWidthnHeight(95)]}>
                            <FlatList
                                // ref={scrollRef}
                                inverted
                                keyboardShouldPersistTaps="handled"
                                keyExtractor={(item) => `${item._id}`}
                                data={messageList}
                                renderItem={({ item }) => {
                                    // console.log("$#$ MEDIA: ", item)
                                    return (
                                        <View style={{
                                            marginVertical: getWidthnHeight(2).width,
                                            alignItems: 'flex-start'
                                        }}>
                                            <View style={{ backgroundColor: '#dbdbdb', borderRadius: getWidthnHeight(2).width }}>
                                                {(item?.media.length > 0) && (
                                                    <View style={{ padding: getWidthnHeight(2).width }}>
                                                        <Image source={{ uri: item.media[0]['link'] }}
                                                            resizeMode="contain"
                                                            style={{
                                                                width: getWidthnHeight(70).width,
                                                                height: getWidthnHeight(70).width,
                                                            }}
                                                        />
                                                    </View>
                                                )}
                                                {(!!item?.message) && (
                                                    <Text style={{
                                                        padding: getWidthnHeight(3).width, borderWidth: 0, borderColor: 'red',
                                                        fontSize: fontSizeH4().fontSize + 2
                                                    }}>{item.message}</Text>
                                                )}
                                                {(!item?.message && item?.media?.length === 0) && (
                                                    <Text style={{
                                                        padding: getWidthnHeight(3).width, borderWidth: 0, borderColor: 'red',
                                                        fontSize: fontSizeH4().fontSize + 2
                                                    }}>    </Text>
                                                )}
                                            </View>
                                            <Text style={{ fontSize: fontSizeH4().fontSize - 2, color: '#7c7a7a' }}>{moment(item.createdAt).format("hh:mm A")}</Text>
                                        </View>
                                    );
                                }}
                            />
                        </View>
                        <View
                            style={[
                                {
                                    backgroundColor: loading
                                        ? 'rgba(0, 0, 0, 0.6)'
                                        : 'transparent',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                },
                                StyleSheet.absoluteFill,
                            ]}
                            pointerEvents={loading ? 'auto' : 'none'}>
                            {loading && (
                                <ActivityIndicator
                                    color="#FFFFFF"
                                    size={'large'}
                                    style={[{
                                        transform: [{ scale: 1.5 }]
                                    }, getMarginTop(-10)]}
                                />
                            )}
                        </View>
                    </View>
                    {/* </TouchableWithoutFeedback> */}
                    {userDetails.User._id === channelDetails.createdBy && (
                        <View
                            style={[{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly' }, getWidthnHeight(100)]}>
                            <View
                                style={[{
                                    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 2, borderColor: '#0f97658a',
                                    borderRadius: getWidthnHeight(2).width
                                }, getWidthnHeight(80)]}
                            >
                                <TextInput
                                    style={[{
                                        fontSize: fontSizeH4().fontSize + 4, color: 'black', backgroundColor: 'white',
                                        borderColor: 'red', borderWidth: 0, flex: 1
                                    }, getWidthnHeight(undefined, 6.5)]}
                                    multiline={true}
                                    textColor="#000000"
                                    cursorColor={'#00000090'}
                                    placeholder='Enter a group name'
                                    placeholderTextColor={'#C4C4C4'}
                                    value={message}
                                    onChangeText={(text) => setMessage(text)}
                                />
                                <TouchableOpacity
                                    onPress={() => selectAttachment()}
                                    style={{
                                        backgroundColor: '#0F9764',
                                        width: getWidthnHeight(12).width,
                                        height: getWidthnHeight(12).width,
                                        borderRadius: getWidthnHeight(6).width,
                                        alignItems: 'center', justifyContent: 'center'
                                    }}>
                                    {(selectedImage.length === 0) ? (
                                        <Entypo name="attachment" size={getWidthnHeight(6).width} color='#FFFFFF' />
                                    ) : (
                                        <View style={{
                                            backgroundColor: 'red',
                                            width: getWidthnHeight(7).width,
                                            height: getWidthnHeight(7).width,
                                            borderRadius: getWidthnHeight(3.5).width,
                                            alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <Text style={{ fontSize: fontSizeH4().fontSize + 2, color: '#FFFFFF' }}>{selectedImage.length}</Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            </View>
                            {(!!message || selectedImage.length > 0) ? (
                                <TouchableOpacity
                                    onPress={() => {
                                        if (!!message) {
                                            sendMessage()
                                        }
                                        if (selectedImage.length > 0) {
                                            sendMedia();
                                        }
                                    }}
                                >
                                    <MaterialCommunityIcons name={"send-circle"} size={getWidthnHeight(15).width} color='#0F9764' />
                                </TouchableOpacity>
                            ) : (
                                <MaterialCommunityIcons name={"send-circle"} size={getWidthnHeight(15).width} color='#0F9764' />
                            )}
                        </View>
                    )}
                </View>
            </View>
            {(showQR) && (
                <Qrcode
                    visible={showQR}
                    onDismiss={() => {
                        setShowQR(false)
                    }}
                    containerStyle={[{ backgroundColor: '#FFFFFF', borderRadius: getWidthnHeight(3).width }, getWidthnHeight(95)]}
                    saveQrToDevice={saveQrToDevice}
                    setProductQRref={setProductQRref}
                />
            )}
        </SafeAreaView>
    );
}