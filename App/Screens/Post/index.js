import {
    StyleSheet,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    View,
    TextInput,
    Alert,
    Keyboard,
    ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { useRoute, useIsFocused } from '@react-navigation/native';
import ProfileHeader from '../../Components/Header/ProfileHeader';
import { Button, Avatar } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import axios from 'axios';

import tabButtonImage from '../../Components/imageLink/tabButtonImage';
import TabButton from '../../Components/tabButton/TabButton';
import { Modal } from '../../Components/Modal/Modal';
import {
    fontSizeH4,
    getMarginLeft,
    getMarginTop,
    getMarginVertical,
    getWidthnHeight,
} from '../../Components/width';
import ProfileScreen from '../ProfileScreen';

const mb1 = 1048576;
const mb5 = mb1 * 5;

const Stack = createNativeStackNavigator();
const url = 'https://socialnetwork-service-vhteukeytq-as.a.run.app/api';

export const PostNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Post' screenOptions={{ headerShow: false }}>
            <Stack.Screen
                name="Post"
                component={Post}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
};

const Post = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [selectArticle, setSelectArticle] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectPhoto, setSelectPhoto] = useState(false);
    const [selectVideo, setSelectVideo] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [videos, setVideos] = useState([]);
    const [oldMedia, setOldMedia] = useState([]);
    const [totalImageSize, setTotalImageSize] = useState(0);
    const [totalVideoSize, setTotalVideoSize] = useState(0);
    const [loading, setLoading] = useState(false);
    const userDetails = useSelector(state => state.User)
    const authToken = userDetails?.authToken;
    const focused = useIsFocused();
    const { params } = useRoute();
    const formRef = useRef();

    function showLoader() {
        setLoading(true);
    }

    function hideLoader() {
        setLoading(false);
    }

    useEffect(() => {
        if (params?.oldData) {
            const oldData = JSON.parse(params.oldData);
            console.log('@#@#@# OLD DATA: ', oldData);
            if (!!oldData?.title) {
                setSelectArticle(true);
                setTitle(oldData.title);
            }
            if (!!oldData?.description) {
                setText(oldData.description);
            }
            if (oldData.media.length > 0) {
                setOldMedia(oldData.media);
                let oldPhotos = [];
                let oldVideos = [];
                oldData?.media.forEach(item => {
                    if (item.type.includes('image')) {
                        oldPhotos.push({
                            ...item,
                            fileName: item._id,
                            uri: item.link,
                            name: item.link,
                            fileSize: 0,
                        });
                    } else {
                        oldVideos.push({
                            ...item,
                            fileName: item._id,
                            uri: item.link,
                            name: item.link,
                            fileSize: 0,
                        });
                    }
                });
                if (oldPhotos.length > 0) {
                    setPhotos(oldPhotos);
                }
                if (oldVideos.length > 0) {
                    setVideos(oldVideos);
                }
                console.log('PHOTOS: ', oldPhotos);
            }
        } else if (params?.type) {
            // console.log("^&^&^^^^&&&& PARAMS: ", params)
            if (params.type === 'photo') {
                setSelectPhoto(true);
                setShowModal(true);
            } else if (params.type === 'video') {
                setSelectVideo(true);
                setShowModal(true);
            } if (params.type === 'article') {
                setSelectArticle(true);
            }
        }
    }, []);

    const createPost = () => {
        const formData = new FormData();
        if (selectArticle) {
            if (!!title) {
                formData.append('title', title);
            } else {
                Alert.alert('Alert', 'Please enter title to continue.');
                return;
            }
        }
        showLoader();
        if (!!text) {
            formData.append('description', text);
        }
        if (photos.length > 0) {
            photos.forEach((item, index) => {
                formData.append(`files`, item);
            });
        }
        if (videos.length > 0) {
            videos.forEach(item => {
                formData.append('files', item);
            });
        }
        // return;
        axios
            .post(`${url}/posts`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then(response => {
                hideLoader();
                console.log('^^^^^^^ FORM DATA: ', JSON.stringify(formData, null, 4));
                console.log('#$#$#$#$#$#$ RESPONSE: ', response.data);
                navigation.setParams({ oldData: null });
                navigation.navigate('Community');
            })
            .catch(error => {
                hideLoader();
                console.log(
                    '$$$$$$ ERROR: \n\n\n',
                    JSON.stringify(error, null, 4),
                    '\n\n\n ERROR RESPOSNE: ',
                    JSON.stringify(error.response, null, 4),
                );
            });
    };

    function editPost(oldData) {
        showLoader();
        const formData = new FormData();
        if (selectArticle) {
            if (!!title) {
                formData.append('title', title);
            } else {
                Alert.alert('Alert', 'Please enter title to continue.');
                return;
            }
        }
        if (!!text) {
            formData.append('description', text);
        }
        if (photos.length > 0) {
            const removeOldPhotos = photos.filter(item => !!item?.link === false);
            removeOldPhotos.forEach((item, index) => {
                formData.append(`files`, item);
            });
        }
        if (videos.length > 0) {
            const removeOldVideos = videos.filter(item => !!item?.link === false);
            removeOldVideos.forEach(item => {
                formData.append('files', item);
            });
        }
        formData.append('media', oldMedia);
        console.log('##$#$#$ EDIT POST URL: ', `${url}/posts/${oldData.id}`);
        fetch(`${url}/posts/${oldData.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${authToken}`,
            },
            body: formData,
        })
            .then(response => response.json())
            .then(json => {
                hideLoader();
                console.log('$$$ FORM RESPONSE: ', json);
                if (json?.data?.code === 200) {
                    navigation.setParams({ oldData: null });
                    navigation.navigate('Community');
                } else {

                }
            })
            .catch(error => {
                hideLoader();
                if (error?.message) {
                    const response = JSON.stringify(error, null, 4);
                    console.log('$$$FORM ERROR: ', response);
                    alert(error.message);
                    return;
                }
                console.log('@@@FORM ERROR: ', JSON.stringify(error, null, 4));
            });
    }

    useEffect(() => {
        let totalFileSize = 0;
        photos.forEach(item => (totalFileSize += item.fileSize));
        if (totalFileSize > mb5) {
            Alert.alert(
                'File size exceeded',
                'Please ensure to keep max IMAGE file size less than 5 MB',
            );
        }
        setTotalImageSize(totalFileSize);
    }, [photos]);

    useEffect(() => {
        let totalFileSize = 0;
        videos.forEach(item => (totalFileSize += item.fileSize));
        if (totalFileSize > mb5) {
            Alert.alert(
                'File size exceeded',
                'Please ensure to keep max VIDEO file size less than 5 MB',
            );
        }
        setTotalVideoSize(totalFileSize);
    }, [videos]);

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
            if (mediaType === 'photo') {
                if (photos.length > 0) {
                    const getData = photos.map(item => ({ ...item, name: item.fileName }));
                    const rcvData = result.assets.map(item => ({
                        ...item,
                        name: item.fileName,
                    }));
                    let updateData = [...getData, ...rcvData];
                    // let updateData = getData.filter(item => {
                    //   return rcvData.find(subItem => subItem.fileName !== item.fileName);
                    // });
                    console.log('#@#@#@##@#@#@# UPDATE DATA: ', updateData);
                    setPhotos(updateData);
                } else {
                    const addName = result.assets.map(item => ({
                        ...item,
                        name: item.fileName,
                    }));
                    setPhotos(addName);
                }
            } else {
                if (videos.length > 0) {
                    const getData = videos.map(item => ({ ...item, name: item.fileName }));
                    const rcvData = result.assets.map(item => ({
                        ...item,
                        name: item.fileName,
                    }));
                    let updateData = [...getData, ...rcvData];
                    // let updateData = getData.filter(item => {
                    //   return rcvData.find(subItem => subItem.fileName !== item.fileName);
                    // });
                    console.log('#@#@#@##@#@#@# UPDATE VIDEO DATA: ', updateData);
                    setVideos(updateData);
                } else {
                    const addName = result.assets.map(item => ({
                        ...item,
                        name: item.fileName,
                    }));
                    setVideos(addName);
                }
            }
        }
    }

    async function openCamera(mediaType = 'photo') {
        let options = {};
        if (mediaType === 'photo') {
            options = {
                mediaType,
                quality: 0.4,
            };
        } else {
            options = {
                mediaType,
                videoQuality: 'low',
            };
        }
        const result = await launchCamera(options);
        if (result?.didCancel) {
            return;
        } else {
            console.log('^^^^^^^^ ', result.assets);
            if (mediaType === 'photo') {
                const getPhotos = photos.map(item => ({ ...item, name: item.fileName }));
                const addName = result.assets.map(item => ({
                    ...item,
                    name: item.fileName,
                }));
                getPhotos.push(addName[0]);
                setPhotos(getPhotos);
            } else {
                const getVideos = videos.map(item => ({ ...item, name: item.fileName }));
                const addName = result.assets.map(item => ({
                    ...item,
                    name: item.fileName,
                }));
                getVideos.push(addName[0]);
                setVideos(getVideos);
            }
        }
    }

    function removeAttachment(mediaType = 'photo', fileName) {
        let updateData = [];
        let updateOldMedia = [];
        if (mediaType === 'photo') {
            updateData = photos.filter(item => item.fileName !== fileName);
            if (oldMedia.length > 0) {
                updateOldMedia = oldMedia.filter(item => item._id !== fileName);
                setOldMedia(updateOldMedia);
            }
            setPhotos(updateData);
        } else {
            updateData = videos.filter(item => item.fileName !== fileName);
            if (oldMedia.length > 0) {
                updateOldMedia = oldMedia.filter(item => item.fileName !== fileName);
                setOldMedia(updateOldMedia);
            }
            setVideos(updateData);
        }
    }

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar backgroundColor="transparent" barStyle="dark-content" />
                <View style={{ flex: 1, borderColor: 'red', borderWidth: 0 }}>
                    <ProfileHeader />
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{ backgroundColor: 'white', flex: 1 }}>
                            {/* ===========Post Upper Section===== */}
                            <View
                                style={[
                                    styles.postupper,
                                    {
                                        borderColor: 'red',
                                        borderWidth: 0,
                                        flex: 1,
                                    },
                                ]}>
                                <View
                                    style={[
                                        styles.cardUpper,
                                        { alignItems: 'center' },
                                        getWidthnHeight(100, 8),
                                    ]}>
                                    <View
                                        style={[
                                            styles.cardUpperLeft,
                                            { padding: getWidthnHeight(4).width },
                                        ]}>
                                        <Avatar.Image
                                            size={getWidthnHeight(10).width}
                                            source={{ uri: userDetails?.User?.profilepic }}
                                        />
                                    </View>
                                    <View
                                        style={[
                                            styles.cardUpperRight,
                                            { paddingRight: getWidthnHeight(2).width },
                                        ]}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (totalImageSize > mb5 || totalVideoSize > mb5) {
                                                    Alert.alert(
                                                        'File size exceeded',
                                                        'Please ensure to keep max file size less than 5 MB',
                                                    );
                                                } else {
                                                    if (!!params?.oldData) {
                                                        const oldData = JSON.parse(params.oldData);
                                                        editPost(oldData);
                                                    } else {
                                                        createPost();
                                                    }
                                                }
                                            }}
                                            style={[
                                                [
                                                    styles.postButton,
                                                    { paddingHorizontal: getWidthnHeight(5).width },
                                                ],
                                                getWidthnHeight(undefined, 5),
                                            ]}>
                                            <Text
                                                style={[
                                                    {
                                                        color: 'white',
                                                        fontWeight: 'bold',
                                                        fontSize: fontSizeH4().fontSize + 2,
                                                    },
                                                ]}>
                                                {!!params?.oldData ? 'Edit Post' : 'Post'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {selectArticle && (
                                    <View
                                        style={[
                                            {
                                                backgroundColor: 'white',
                                                borderRadius: getWidthnHeight(3).width,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                paddingHorizontal: getWidthnHeight(4).width,
                                                paddingVertical: getWidthnHeight(1).width,
                                            },
                                            getWidthnHeight(92),
                                            getMarginVertical(1),
                                        ]}>
                                        <TextInput
                                            value={title}
                                            placeholder={`Title`}
                                            placeholderTextColor={'#C4C4C4'}
                                            onChangeText={input => setTitle(input)}
                                            style={[
                                                {
                                                    width: '100%',
                                                    borderColor: 'red',
                                                    borderWidth: 0,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'black',
                                                    textAlignVertical: 'top',
                                                    fontSize: fontSizeH4().fontSize + 4,
                                                },
                                            ]}
                                        />
                                    </View>
                                )}
                                <View
                                    style={[
                                        {
                                            flex: 1,
                                            borderColor: 'blue',
                                            borderWidth: 0,
                                            borderRadius: getWidthnHeight(3).width,
                                            backgroundColor: 'white',
                                            padding: getWidthnHeight(4).width,
                                        },
                                        getWidthnHeight(92),
                                        getMarginVertical(1),
                                    ]}>
                                    <TextInput
                                        value={text}
                                        placeholder={`What's Happening ?`}
                                        placeholderTextColor={'#C4C4C4'}
                                        onChangeText={input => setText(input)}
                                        multiline={true}
                                        style={{
                                            flex: 1,
                                            borderColor: 'red',
                                            borderWidth: 0,
                                            alignItems: 'flex-start',
                                            justifyContent: 'flex-start',
                                            color: 'black',
                                            textAlignVertical: 'top',
                                            fontSize: fontSizeH4().fontSize + 4,
                                        }}
                                    />
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    {/* <Text
                    style={{
                      color: '#0F9764',
                      fontSize: fontSizeH4().fontSize + 5,
                      fontWeight: '900',
                    }}>
                    #Add HashTags
                  </Text> */}

                                    <View
                                        style={[
                                            styles.postLower,
                                            getMarginTop(1),
                                            getWidthnHeight(100),
                                        ]}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setSelectPhoto(true);
                                                setShowModal(true);
                                                Keyboard.dismiss();
                                            }}
                                            style={[styles.dataTypeBox, getWidthnHeight(30)]}>
                                            <FontAwesome
                                                name="photo"
                                                size={getWidthnHeight(5).width}
                                                color={
                                                    selectPhoto || photos.length > 0
                                                        ? '#0F9764'
                                                        : '#686868'
                                                }
                                            />
                                            <Text
                                                style={{
                                                    marginLeft: 5,
                                                    color:
                                                        selectPhoto || photos.length > 0
                                                            ? '#0F9764'
                                                            : '#686868',
                                                    fontSize: fontSizeH4().fontSize + 2,
                                                }}>
                                                Photo
                                            </Text>
                                            {photos.length > 0 && (
                                                <View
                                                    style={[
                                                        {
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            width: getWidthnHeight(5).width,
                                                            height: getWidthnHeight(5).width,
                                                            borderRadius: getWidthnHeight(2.5).width,
                                                            backgroundColor: 'red',
                                                        },
                                                        getMarginLeft(1),
                                                    ]}>
                                                    <Text style={[{ color: 'white' }]}>
                                                        {photos.length}
                                                    </Text>
                                                </View>
                                            )}
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setSelectVideo(true);
                                                setShowModal(true);
                                                Keyboard.dismiss();
                                            }}
                                            style={[styles.dataTypeBox, getWidthnHeight(30)]}>
                                            <Feather
                                                name="video"
                                                size={getWidthnHeight(6).width}
                                                color={
                                                    selectVideo || videos.length > 0
                                                        ? '#0F9764'
                                                        : '#686868'
                                                }
                                            />
                                            <Text
                                                style={{
                                                    marginLeft: 5,
                                                    color:
                                                        selectVideo || videos.length > 0
                                                            ? '#0F9764'
                                                            : '#686868',
                                                    fontSize: fontSizeH4().fontSize + 2,
                                                }}>
                                                Video
                                            </Text>
                                            {videos.length > 0 && (
                                                <View
                                                    style={[
                                                        {
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            width: getWidthnHeight(5).width,
                                                            height: getWidthnHeight(5).width,
                                                            borderRadius: getWidthnHeight(2.5).width,
                                                            backgroundColor: 'red',
                                                        },
                                                        getMarginLeft(1),
                                                    ]}>
                                                    <Text style={[{ color: 'white' }]}>
                                                        {videos.length}
                                                    </Text>
                                                </View>
                                            )}
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            activeOpacity={0.6}
                                            onPress={() => setSelectArticle(!selectArticle)}
                                            style={[styles.dataTypeBox, {
                                                paddingHorizontal: getWidthnHeight(6).width,
                                                borderWidth: 0,
                                                borderColor: 'red'
                                            }]}>
                                            {/* <Feather name="video" size={22} color="#686868" /> */}
                                            <Entypo
                                                name="text-document"
                                                size={getWidthnHeight(5).width}
                                                color={selectArticle ? '#0F9764' : '#686868'}
                                            />
                                            <Text
                                                style={{
                                                    marginLeft: 5,
                                                    color: selectArticle ? '#0F9764' : '#686868',
                                                    fontSize: fontSizeH4().fontSize + 2,
                                                }}>
                                                Write Article
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <Modal
                                visible={showModal}
                                onDismiss={() => {
                                    setShowModal(false);
                                    setSelectPhoto(false);
                                    setSelectVideo(false);
                                }}
                                containerStyle={[
                                    {
                                        alignItems: 'center',
                                        backgroundColor: 'white',
                                        borderRadius: getWidthnHeight(3).width,
                                    },
                                    getWidthnHeight(80, 40),
                                ]}
                                photos={selectPhoto}
                                images={photos}
                                videos={videos}
                                addFiles={mediaType => selectAttachment(mediaType)}
                                removeFile={(mediaType, fileName) =>
                                    removeAttachment(mediaType, fileName)
                                }
                                openCamera={mediaType => openCamera(mediaType)}
                            />
                        </View>
                        <View
                            style={[
                                {
                                    backgroundColor: loading
                                        ? 'rgba(0, 0, 0, 0.6)'
                                        : 'transparent',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                },
                                StyleSheet.absoluteFill,
                            ]}
                            pointerEvents={loading ? 'auto' : 'none'}>
                            {loading && (
                                <ActivityIndicator
                                    color="#FFFFFF"
                                    size={'large'}
                                    style={[{ transform: [{ scale: 1.5 }] }, getMarginTop(-10)]}
                                />
                            )}
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};

export default Post;

const styles = StyleSheet.create({
    postupper: {
        borderTopColor: '#e5e6e9',
        alignItems: 'center',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderBottomColor: '#e5e6e9',
        backgroundColor: '#f9f9f9',
        //paddingHorizontal: 10,
    },
    cardUpper: {
        borderColor: 'black',
        borderWidth: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    postLower: {
        flexDirection: 'row',
        borderColor: 'red',
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingBottom: getMarginTop(1).marginTop,
    },
    postButton: {
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0F9764',
        marginRight: 10,
    },
    cardUpperLeft: {
        height: '50%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardUpperRight: {
        height: '50%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    shareDiv: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
    },
    dataTypeBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'green',
        borderWidth: 0,
    },
});
