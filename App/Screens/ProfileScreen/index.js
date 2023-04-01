import {
    StyleSheet,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    View,
    FlatList,
    TouchableWithoutFeedback,
    Keyboard,
    ImageBackground,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Video from 'react-native-video';
import { useIsFocused, useRoute } from '@react-navigation/native';
import ProfileHeader from '../../Components/Header/ProfileHeader';
import { Button, Avatar, ActivityIndicator } from 'react-native-paper';
import { } from 'react-native-gesture-handler';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import axios from 'axios';
import {
    fontSizeH4,
    getMarginLeft,
    getMarginTop,
    getWidthnHeight,
    getMarginRight,
    getMarginHorizontal,
    getMarginVertical,
    getMarginBottom,
} from '../../Components/width';
import moment from 'moment';
import { PostSection } from '../../Components/PostSection';
import BottomSheet from '../../Components/PostSection/BottomSheet';
import { useSelector } from 'react-redux';
import FollowBottomSheet from '../../Components/PostSection/FollowBottomSheet';
import { userUrl } from '../../Url';

const baseURL = 'https://socialnetwork-service-vhteukeytq-as.a.run.app/api';
const aboutLink = 'https://user-service-vhteukeytq-as.a.run.app/api';

const ProfileScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [selectHome, setSelectHome] = useState(true);
    const [aboutUser, setAboutUser] = useState(null);
    const [scrollNow, setScrollNow] = useState(false);
    const [userLikeList, setUserLikeList] = useState([]);
    const [bottomSheetIndex, setBottomSheetIndex] = useState(-1);
    const [followSheetIndex, setFollowSheetIndex] = useState(-1);
    const [followersData, setFollowersData] = useState({ "followers": 0, "followings": 0 });
    const [following, setFollowing] = useState(false);
    const [followData, setFollowData] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [photo, setPhoto] = useState(null);
    const userDetails = useSelector(state => state.User);
    const authToken = userDetails?.authToken;
    const focused = useIsFocused();
    const params = useRoute().params;

    console.log("!@!!@!@! PARAMS: ", authToken)

    const bottomSheetRef = useRef(null);
    const followSheetRef = useRef(null);

    function showLoader() {
        Keyboard.dismiss();
        setLoading(true);
    }

    function hideLoader() {
        setLoading(false);
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
            showLoader();
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
                hideLoader();
                console.log("#@#@#@#@ PIC UPLOADED: ", response.data);
                getCurrentUser();
            }).catch((error) => {
                hideLoader();
                console.log("#@#@&*(&^&%^%^ PIC ERROR: ", JSON.stringify(error.response, null, 4))
            })
        }
    }

    const aboutUserFunction = useCallback(() => {
        axios
            .get(`${aboutLink}/users/${params?.user?._id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then(response => {
                const data = response.data;
                // console.log('^&^&^&^&^ ABOUT USER: ', data);
                setAboutUser(data);
            })
            .catch(error => {
                console.log('#$%^&GHUHJH%^&* ERROR: ', error, params);
            });
    }, []);

    function isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
        const paddingToBottom = getWidthnHeight(10).width;
        // console.log("@#@#@# CLOSE TO BOTTOM: ", layoutMeasurement.height, contentOffset.y, contentSize.height, paddingToBottom)
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom
    }

    function clearLikeList() {
        setUserLikeList([]);
    }

    function clearFollowData() {
        setFollowData([]);
    }

    useEffect(() => {
        if (params?.user?._id !== userDetails?.User?._id) {
            aboutUserFunction();
        }
        getFollowers();
        amIFollowing();
    }, []);

    useEffect(() => {
        getFollowers();
    }, [following])

    const getFollowers = useCallback(() => {
        //showLoader();
        axios.get(`${baseURL}/followCountAll/User/${params?.user?._id}`, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        }).then((response) => {
            //hideLoader();
            console.log("#$#$$#$#$# GET FOLLOWERS RESPONSE: ", response.data);
            setFollowersData(response.data)
        }).catch((error) => {
            //hideLoader();
            console.log("@#@#@#@#@ GET FOLLOWERS ERROR: ", JSON.stringify(error, null, 4))
        })
    }, []);

    const amIFollowing = useCallback(() => {
        showLoader();
        axios.get(`${baseURL}/amifollowing/User/${params?.user?._id}`, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        }).then((response) => {
            hideLoader();
            console.log("#$#$$#$#$# AM I FOLLOWING RESPONSE: ", response.data);
            if (response.data.length > 0) {
                setFollowing(true)
            } else {
                setFollowing(false)
            }
        }).catch((error) => {
            hideLoader();
            console.log("@#@#@#@#@ AM I FOLLOWING ERROR: ", JSON.stringify(error, null, 4))
        })
    }, []);

    const toggleFollowState = (action = 'follow', id, followType = 'User') => {
        showLoader();
        axios.post(`${baseURL}/${action}`, {
            "following_id": id,
            "following_type": followType
        }, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        }).then((response) => {
            hideLoader();
            console.log("#$#$$#$#$# TOGGLE FOLLOW RESPONSE: ", response.data);
            amIFollowing();
        }).catch((error) => {
            hideLoader();
            console.log("@#@#@#@#@ TOGGLE FOLLOW ERROR: ", JSON.stringify(error, null, 4))
        })
    };

    const getFollowData = (action = 'followers') => {
        showLoader();
        axios.get(`${baseURL}/${action}/User/${params?.user?._id}`, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        }).then((response) => {
            hideLoader();
            // console.log("#$#$$#$#$# GET FOLLOW RESPONSE: ", response.data);
            setFollowData(response.data);
        }).catch((error) => {
            hideLoader();
            console.log("@#@#@#@#@ GET FOLLOW ERROR: ", JSON.stringify(error, null, 4))
        })
    };

    useEffect(() => {
        if (followData.length > 0) {
            followSheetRef.current.snapToIndex(0);
        }
    }, [followData]);

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar backgroundColor="transparent" barStyle="dark-content" />
                <View style={{ flex: 1 }}>
                    <View
                        style={[
                            {
                                shadowColor: '#000000',
                                shadowRadius: 4,
                                shadowOpacity: 0.8,
                                elevation: 6,
                                shadowOffset: { width: 0, height: 10 },
                            },
                        ]}>
                        <ProfileHeader />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{ flex: 1, alignItems: 'center', borderColor: 'red', borderWidth: 0 }}>
                            <ScrollView
                                scrollEnabled={userLikeList.length > 0 ? false : true}
                                onScroll={({ nativeEvent }) => {
                                    if (isCloseToBottom(nativeEvent)) {
                                        setScrollNow(true)
                                    } else {
                                        setScrollNow(false)
                                    }
                                }}
                                nestedScrollEnabled
                                showsVerticalScrollIndicator={false}
                                keyboardShouldPersistTaps="handled"
                                style={{ backgroundColor: 'white' }}>
                                {/* ===========Post Upper Section===== */}
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <ImageBackground
                                        source={{
                                            uri: (userDetails?.User?._id === params?.user?._id) ? userDetails?.User?.coverpic : aboutUser?.coverpic
                                        }}
                                        style={[
                                            {
                                                backgroundColor: '#513252',
                                                flexDirection: 'row',
                                                alignItems: 'flex-end',
                                                justifyContent: 'space-between',
                                                paddingHorizontal: getWidthnHeight(3).width,
                                            },
                                            getWidthnHeight(95, 13),
                                        ]}>
                                        <View
                                            style={[
                                                {
                                                    backgroundColor: '#FFFFFF',
                                                    shadowColor: '#000000',
                                                    shadowRadius: 4,
                                                    shadowOpacity: 0.6,
                                                    elevation: 4,
                                                    shadowOffset: { width: 0, height: 10 },
                                                    top: getMarginTop(6).marginTop,
                                                },
                                            ]}>
                                            <Avatar.Image
                                                size={getWidthnHeight(20).width}
                                                source={{
                                                    uri: (userDetails?.User?._id === params?.user?._id) ? userDetails?.User?.profilepic : aboutUser?.profilepic
                                                }}
                                                style={[{ marginHorizontal: getMarginVertical(1).marginVertical }, getMarginVertical(1)]}
                                            />
                                        </View>
                                        {(userDetails?.User?._id === params?.user?._id) && (
                                            <TouchableOpacity
                                                style={{ backgroundColor: '#FFFFFF', borderRadius: getWidthnHeight(10).width }}
                                                onPress={() => launchImageGallery('coverpic')}>
                                                <FontAwesome name='camera' color={'#FF5858'} size={getWidthnHeight(6).width}
                                                    style={{ padding: getWidthnHeight(2).width }}
                                                />
                                            </TouchableOpacity>
                                        )}
                                    </ImageBackground>
                                    <View style={[{
                                        alignItems: (userDetails?.User?._id === params?.user?._id) ? 'flex-start' : 'flex-end', borderColor: 'red', borderWidth: 0
                                    }, getMarginTop(1),
                                    getMarginBottom((userDetails?.User?._id !== params?.user?._id) ? 2.5 : 1.5), getWidthnHeight(90)]}>
                                        {(userDetails?.User?._id === params?.user?._id) && (
                                            <TouchableOpacity
                                                style={[{ backgroundColor: '#e8e8e8', borderRadius: getWidthnHeight(10).width }, getMarginLeft(13)]}
                                                onPress={() => launchImageGallery('profilepic')}>
                                                <FontAwesome name='camera' color={'#FF5858'} size={getWidthnHeight(6).width}
                                                    style={{ padding: getWidthnHeight(2).width }}
                                                />
                                            </TouchableOpacity>
                                        )}
                                        {(userDetails?.User?._id !== params?.user?._id) && (
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 0, borderColor: 'red', alignItems: 'flex-end' }}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        if (following) {
                                                            toggleFollowState('unfollow', params?.user?._id)
                                                        } else {
                                                            toggleFollowState('follow', params?.user?._id)
                                                        }
                                                    }}
                                                    style={[{
                                                        backgroundColor: (following) ? '#FFFFFF' : '#0F9764',
                                                        borderRadius: getWidthnHeight(5).width,
                                                        // paddingHorizontal: getWidthnHeight(5).width,
                                                        borderColor: '#0F9764', borderWidth: (following) ? getWidthnHeight(0.5).width : 0,
                                                        alignItems: 'center'
                                                    }]}>
                                                    <Text style={{
                                                        color: (following) ? '#0F9764' : '#FFFFFF',
                                                        paddingVertical: getWidthnHeight(2).width,
                                                        paddingHorizontal: getWidthnHeight(5).width,
                                                        fontWeight: 'bold'
                                                    }}>
                                                        {(following) ? 'Following' : 'Follow'}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    </View>
                                    <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, getWidthnHeight(60)]}>
                                        <TouchableOpacity onPress={() => getFollowData()}
                                            style={{
                                                borderWidth: 0, borderColor: 'red', padding: getWidthnHeight(2).width
                                            }}
                                        >
                                            <Text style={{ fontSize: fontSizeH4().fontSize + 2 }}>{followersData.followers} Followers</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => getFollowData('followings')}
                                            style={{
                                                borderWidth: 0, borderColor: 'red', padding: getWidthnHeight(2).width
                                            }}
                                        >
                                            <Text style={[{ fontSize: fontSizeH4().fontSize + 2 }]}>{followersData.followings} Following(s)</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View
                                        style={[
                                            {
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'flex-start',
                                                paddingHorizontal: getWidthnHeight(3).width,
                                            },
                                            getWidthnHeight(95),
                                        ]}>
                                        <TouchableOpacity
                                            disabled={selectHome === true ? true : false}
                                            onPress={() => setSelectHome(true)}
                                            style={{
                                                borderBottomWidth: getWidthnHeight(1).width,
                                                borderBottomColor: selectHome
                                                    ? '#0F9764'
                                                    : 'transparent',
                                                padding: getWidthnHeight(3).width,
                                            }}>
                                            <Text
                                                style={{
                                                    color: 'black',
                                                    fontSize: fontSizeH4().fontSize + 5,
                                                }}>
                                                Home
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            disabled={selectHome === true ? false : true}
                                            onPress={() => {
                                                setSelectHome(false);
                                                if (!aboutUser) {
                                                    aboutUserFunction();
                                                }
                                            }}
                                            style={{
                                                borderBottomWidth: getWidthnHeight(1).width,
                                                borderBottomColor: selectHome
                                                    ? 'transparent'
                                                    : '#0F9764',
                                                padding: getWidthnHeight(3).width,
                                            }}>
                                            <Text
                                                style={{
                                                    color: 'black',
                                                    fontSize: fontSizeH4().fontSize + 5,
                                                }}>
                                                About
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* ===========Post  Section===== */}
                                    {selectHome && (
                                        <PostSection
                                            loading={loading}
                                            setLoading={setLoading}
                                            showLoader={showLoader}
                                            hideLoader={hideLoader}
                                            currentUser={!!params?.user ? params.user : null}
                                            scrollNow={scrollNow}
                                            openBottomSheet={(likeList) => {
                                                setUserLikeList(likeList)
                                                bottomSheetRef.current.snapToIndex(0);
                                            }}
                                            bottomSheetIndex={bottomSheetIndex}
                                        />
                                    )}
                                    {/* <View style={[getWidthnHeight(undefined, 10)]}></View> */}
                                </View>
                            </ScrollView>
                        </View>
                        <>
                            <BottomSheet bottomSheetRef={bottomSheetRef} data={userLikeList} clearData={clearLikeList} setBottomSheetIndex={setBottomSheetIndex} />
                            <FollowBottomSheet bottomSheetRef={followSheetRef} data={followData} clearData={clearFollowData} setBottomSheetIndex={setFollowSheetIndex} />
                        </>
                        {/* <View style={{ flex: 1 }} /> */}
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
                                    style={[getMarginTop(-10)]}
                                />
                            )}
                        </View>
                    </View>
                </View>
            </SafeAreaView >
        </>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
