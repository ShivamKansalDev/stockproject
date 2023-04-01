
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, ScrollView, TouchableOpacity, SafeAreaView, LogBox, View, Keyboard, FlatList, Pressable, Image } from 'react-native'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Avatar } from "react-native-paper";

import ProfileHeader from '../../Components/Header/ProfileHeader'
import StatusBarView from '../../Components/StatusBar'
import BrandImage from '../../Components/BrandImage'

import Category from './Components/Category'
import SearchView from '../../Components/Searchview'
import Users from './Components/Users'
import UserWithButton from './Components/UserWithButton'
import { socialnetwork } from '../../Url'
import { getMarginTop, getWidthnHeight, fontSizeH4 } from '../../Components/width'



const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
const Followers = () => {

    const [displyCompomnet, setDisplayComponents] = useState('Followers');
    const [loading, setLoading] = useState(false);
    const [followData, setFollowData] = useState([]);
    const [userType, setUserType] = useState('user');
    const [userData, setUserData] = useState([]);
    const [companyData, setCompanyData] = useState([]);

    const userDetails = useSelector(state => state.User);
    const authToken = userDetails?.authToken;

    function showLoader() {
        Keyboard.dismiss();
        setLoading(true);
    }

    function hideLoader() {
        setLoading(false);
    }

    useEffect(() => {
        if (followData.length === 0) {
            getFollowData();
        } else {
            filterFollowData(userType, followData)
        }
    }, [followData, userType]);

    useEffect(() => {
        setFollowData([]);
        setUserData([])
        setCompanyData([])
    }, [displyCompomnet])

    const getFollowData = (action = 'followers') => {
        showLoader();
        axios.get(`${socialnetwork}/${action.toLowerCase()}/User/${userDetails?.User?._id}`, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        }).then((response) => {
            hideLoader();
            // console.log("#$#$$#$#$# GET FOLLOW RESPONSE: ", response.data);
            if (response.data.length > 0) {
                setFollowData(response.data);
            }
        }).catch((error) => {
            hideLoader();
            console.log("@#@#@#@#@ GET FOLLOW ERROR: ", JSON.stringify(error, null, 4))
        })
    };

    function filterFollowData(type = 'user', data = []) {
        const filterData = data.filter((item) => {
            return item?.following_type.toLowerCase().includes(type)
        })
        if (type === 'user') {
            setUserData(filterData);
        } else {
            setCompanyData(filterData)
        }
    }

    function renderItem(item) {
        let _id = '';
        let name = '';
        let profilepic = '';
        if (typeof item?.following_id === 'object' || item?.following_id === null) {
            if (item?.following_type === 'UnlistedCompany') {
                _id = item?.following_id?._id;
                name = item?.following_id?.companyName;
                profilepic = item?.following_id?.profile_photo
            } else if (item?.following_type === 'User') {
                _id = item?.following_id?._id;
                name = item?.following_id?.name;
                profilepic = item?.following_id?.profilepic
            } else if (item?.following_type === 'Company') {
                name = item?.following_type;
            }
        } else {
            if (item?.following_type === 'UnlistedCompany') {
                _id = item?.follower_id?._id;
                name = item?.follower_id?.companyName;
                profilepic = item?.follower_id?.profile_photo
            } else if (item?.following_type === 'User') {
                _id = item?.follower_id?._id;
                name = item?.follower_id?.name;
                profilepic = item?.follower_id?.profilepic
            } else if (item?.following_type === 'Company') {
                name = item?.following_type;
            }
        }
        // (typeof item?.follower_id === 'object' && !Array.isArray(item?.follower_id)) ? item?.follower_id : item?.following_id;
        return (
            <View style={{ paddingVertical: getMarginTop(0.5).marginTop }}>
                <Pressable onPress={() => {
                    // navigation.navigate('PostNavigator', {
                    //     screen: 'ProfileScreen',
                    //     //initial: true,
                    //     params: {
                    //         user: {
                    //             _id: _id,
                    //             name: name
                    //         },
                    //     },
                    // });
                }} style={[{ alignItems: 'flex-start', borderColor: 'red', borderWidth: 0, backgroundColor: 'transparent' }]}>
                    <View style={[{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: 'red', borderWidth: 0, paddingHorizontal: getWidthnHeight(4).width,
                        paddingVertical: getWidthnHeight(2).width
                    }]}>
                        <Avatar.Image
                            size={getWidthnHeight(12).width}
                            source={!!profilepic ? { uri: profilepic } : require('../../Images/avatar.png')}
                        />
                        <View>
                            <Text
                                style={{
                                    color: '#0F9764',
                                    textAlign: 'justify',
                                    fontSize:
                                        fontSizeH4().fontSize + 2,
                                    paddingVertical:
                                        getWidthnHeight(1).width,
                                    fontWeight: 'bold',
                                    paddingHorizontal:
                                        getWidthnHeight(3).width,
                                }}>
                                {name}
                            </Text>
                        </View>
                    </View>
                </Pressable>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBarView />
            <ProfileHeader />
            <BrandImage />

            <Category setDisplayComponents={setDisplayComponents} getFollowData={getFollowData} />
            {/* <View style={{ width: "100%", height: 50, paddingHorizontal: 10 }}>
                <SearchView color='#0F9764' />
            </View> */}
            <View style={styles.userCompany}>
                <View style={[{
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: '#C4C4C4', borderWidth: 0.5,
                    backgroundColor: '#F9F9F9', overflow: 'hidden', borderRadius: getWidthnHeight(2).width
                }]}>
                    <TouchableOpacity
                        disabled={userType === 'user'}
                        onPress={() => {
                            setUserType('user');
                            setCompanyData([]);
                        }}
                        style={[{
                            paddingVertical: getWidthnHeight(3).width, backgroundColor: (userType === 'user') ? '#0F9764' : 'transparent',
                            paddingHorizontal: getWidthnHeight(6).width
                        }]}>
                        <Text style={{ color: (userType === 'user') ? '#FFFFFF' : "black" }}>User</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={userType === 'company'}
                        onPress={() => {
                            setUserType('company');
                            setUserData([]);
                        }}
                        style={{
                            padding: getWidthnHeight(3).width, backgroundColor: (userType !== 'user') ? '#0F9764' : 'transparent'
                        }}>
                        <Text style={{ color: (userType !== 'user') ? '#FFFFFF' : "#686868" }}>Companies</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* <ScrollView showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled={true}
                style={{}} >
                {ranDerView()}
            </ScrollView> */}
            {(userType === 'user') && (
                <View style={{ flex: 1, alignItems: (userData.length === 0) ? 'center' : 'flex-start', justifyContent: 'center' }}>
                    {(userData.length > 0) ? (
                        <FlatList
                            showsVerticalScrollIndicator={true}
                            indicatorStyle={'black'}
                            data={userData}
                            keyExtractor={(item) => item?._id}
                            renderItem={({ item }) => renderItem(item)}
                        />
                    ) : (
                        <>
                            {(displyCompomnet === 'Followers') && (<Text style={{ fontSize: fontSizeH4().fontSize + 4 }}>You have no followers</Text>)}
                            {(displyCompomnet === 'Followings') && (<Text style={{ fontSize: fontSizeH4().fontSize + 4 }}>You are not following anyone</Text>)}
                            {(displyCompomnet === 'Trending HasTag') && (<Text style={{ fontSize: fontSizeH4().fontSize + 4 }}>Not Configured</Text>)}
                        </>
                    )}
                </View>
            )}
            {(userType === 'company') && (
                <View style={{ flex: 1, alignItems: (companyData.length === 0) ? 'center' : 'flex-start', justifyContent: 'center' }}>
                    {(companyData.length > 0) ? (
                        <FlatList
                            showsVerticalScrollIndicator={true}
                            indicatorStyle={'black'}
                            data={companyData}
                            keyExtractor={(item) => item?._id}
                            renderItem={({ item }) => renderItem(item)}
                        />
                    ) : (
                        <>
                            {(displyCompomnet === 'Followers') && (<Text style={{ fontSize: fontSizeH4().fontSize + 4 }}>You have no followers</Text>)}
                            {(displyCompomnet === 'Followings') && (<Text style={{ fontSize: fontSizeH4().fontSize + 4 }}>You are not following anyone</Text>)}
                            {(displyCompomnet === 'Trending HasTag') && (<Text style={{ fontSize: fontSizeH4().fontSize + 4 }}>Not Configured</Text>)}
                        </>
                    )}
                </View>
            )}
            {/* {((userType === 'user') && (userData.length === 0)) && (
                    <Text>You have no followers</Text>
                )}
                {((userType === 'company') && (userData.length === 0)) && (
                    <Text>You have no followers</Text>
                )} */}
        </SafeAreaView>
    )
}

export default Followers

const styles = StyleSheet.create({
    userCompany: {
        width: "100%", height: 70, paddingHorizontal: 10,
        alignItems: 'flex-end',
        marginTop: 10
    },
    userCompanyInner: {
        width: 150, height: 40, borderWidth: 1,
        flexDirection: 'row',

        borderRadius: 8,
        borderColor: "#EEEEEE", backgroundColor: '#F9F9F9'
    },
    leftButton: {
        width: "50%", height: "100%",
        justifyContent: 'center', alignItems: 'center'
    },
    rightButton: {
        width: "50%", height: "100%", borderLeftWidth: 1,
        borderLeftColor: "#EEEEEE", justifyContent: 'center', alignItems: 'center'
    }

})