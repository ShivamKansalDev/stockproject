import React, { useCallback, useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { View, Text, SafeAreaView, Pressable, TouchableOpacity, FlatList, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { getWidthnHeight, fontSizeH4, getMarginTop, getMarginLeft, getMarginBottom } from "../../Components/width";
import { setChannelDetails } from '../../Action/Channel'
import ProfileHeader from '../../Components/Header/ProfileHeader';
import StatusBarView from '../../Components/StatusBar'
import BrandImage from '../../Components/BrandImage'
import { Qrcode } from "../../Components/ChannelModal/Qrcode";
import { userUrl } from "../../Url";

export const AddRemoveUser = ({ navigation }) => {
    const channelDetails = useSelector(state => state.ChannelDetails)
    const userDetails = useSelector(state => state.User);
    const [userList, setUserList] = useState([]);
    const [addedUser, setAddedUser] = useState([]);
    const [showQR, setShowQR] = useState(false);
    const [title, setTitle] = useState('');
    const isFocused = useIsFocused();
    const dispatch = useDispatch();

    // console.log("@#@#@ USER DETAILS: ", userDetails.User._id)

    const communicationUrl = 'https://communication-service-asia-vhteukeytq-el.a.run.app/api';

    const authToken = userDetails.authToken;

    useEffect(() => {
        if (isFocused) {
            console.log("^^^^^^^^ CHANNEL DETAILS: ", channelDetails)
            if (channelDetails?.type === 'Remove') {
                getUserList();
            }
        }
    }, [isFocused])

    function getUserList() {
        console.log("^^^^^^^^^^ URL: ", `${communicationUrl}/channel/${channelDetails.data._id}/users?page=0&pagesize=10`)
        axios.get(`${communicationUrl}/channel/${channelDetails.data._id}/users?page=0&pagesize=10`, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        }).then((response) => {
            console.log("@#@#@#@ USER LIST RESPONSE: ", response.data);
            setAddedUser(response.data.users)
        }).catch((error) => {
            console.log("^^^^^^^^^^^^ USER LIST ERROR: ", JSON.stringify(error.response, null, 4))
        })
    }

    const searchUser = (text) => {
        axios.get(`${userUrl}/search/users?term=${text}`, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        }).then((response) => {
            console.log("@#@#@#@ SEARCH USER RESPONSE: ", response.data);
            setUserList(response.data)
        }).catch((error) => {
            console.log("!@!@!@!@! SEARCH USER ERROR: ", error)
        })
    }

    const addUser = (user) => {
        axios.post(`${communicationUrl}/channel/users`, {
            "channelId": channelDetails.data._id,
            "usersToAdd": [
                user._id
            ]
        }, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        }).then((response) => {
            console.log("!@!@!@! RESPONSE: ", response.data);
            const oldData = addedUser.map((item) => item);
            const concatList = [...oldData, user];
            const uniqueList = [...new Map(concatList.map(item => [item['_id'], item])).values()];
            setAddedUser(uniqueList);
        }).catch((error) => {
            console.log("!@!@!@! ERROR: ", JSON.stringify(error.response, null, 4))
        })
    }

    const removeUser = (userId) => {
        console.log("############## REMOVE USER: ", `${communicationUrl}/channels/${channelDetails.data._id}/users/${userId}`)
        axios.delete(`${communicationUrl}/channels/${channelDetails.data._id}/users/${userId}`,
            {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            }).then((response) => {
                console.log("!@!@!@! REMOVE USER RESPONSE: ", response.data);
                getUserList();
            }).catch((error) => {
                console.log("!@!@!@! REMOVE USER ERROR: ", JSON.stringify(error.response, null, 4))
            })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBarView />
            <ProfileHeader />
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, alignItems: 'flex-start', padding: getWidthnHeight(2).width }}>
                    <BrandImage />
                    <View style={[{ paddingHorizontal: getWidthnHeight(2).width, flexDirection: 'row', alignItems: 'center' }, getWidthnHeight(100), getMarginTop(1)]}>
                        <TouchableOpacity
                            onPress={() => {
                                dispatch(setChannelDetails(channelDetails.data))
                                navigation.navigate('ChannelChat')
                            }}
                        >
                            <Ionicons name="arrow-back" size={getWidthnHeight(8).width} color='#000000' />
                        </TouchableOpacity>
                        <Text style={{ fontSize: fontSizeH4().fontSize + 4, marginLeft: getMarginLeft(2).marginLeft }} >{`${(channelDetails.type)} Group Participants`}</Text>
                    </View>
                    {(channelDetails?.type === 'Add') ? (
                        <>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                <View style={[{ alignItems: 'center', paddingBottom: getWidthnHeight(2).width }, getMarginTop(2), getWidthnHeight(85)]}>
                                    <Dropdown
                                        style={[{
                                            backgroundColor: 'white', paddingHorizontal: getWidthnHeight(2).width,
                                            paddingVertical: getWidthnHeight(1).width, borderRadius: getWidthnHeight(2).width,
                                            borderColor: '#C4C4C4', borderWidth: 1
                                        }, getWidthnHeight(80)]}
                                        selectedTextStyle={{ color: '#0F9764', fontSize: fontSizeH4().fontSize + 2, fontWeight: 'bold' }}
                                        itemTextStyle={{ fontSize: fontSizeH4().fontSize + 2 }}
                                        inputSearchStyle={{ color: '#000000' }}
                                        search={true}
                                        placeholder='Search User'
                                        placeholderStyle={{ color: '#C4C4C4' }}
                                        searchPlaceholder="Enter name"
                                        activeColor='#3af1ae4c'
                                        data={userList}
                                        labelField="name"
                                        valueField="_id"
                                        onChange={(item) => addUser(item)}
                                        onChangeText={(text) => searchUser(text)}
                                    />
                                </View>
                                <AntDesign name="search1" size={getWidthnHeight(7).width} color="#000000" />
                            </View>
                            <View style={[{ borderColor: 'red', borderWidth: 0 }, getMarginTop(2)]}>
                                <FlatList
                                    data={addedUser}
                                    keyExtractor={(item) => `${item._id}-${item.name}`}
                                    renderItem={({ item }) => {
                                        return (
                                            <View
                                                style={[{
                                                    paddingHorizontal: getWidthnHeight(3).width, borderColor: '#C4C4C4', borderWidth: 1,
                                                    borderRadius: getWidthnHeight(10).width, paddingVertical: getWidthnHeight(1).width,
                                                    flexDirection: 'row', alignItems: 'center'
                                                }, getMarginBottom(2)]}
                                            >
                                                <FontAwesome name="user-circle" size={getWidthnHeight(12).width} color='#000000' />
                                                <Text style={[{ textAlign: 'left', fontSize: fontSizeH4().fontSize + 4, color: '#000000' }, getMarginLeft(2)]}>{item.name}</Text>
                                            </View>
                                        );
                                    }}
                                />
                            </View>
                        </>
                    )
                        :
                        (
                            <View style={[{ borderColor: 'red', borderWidth: 0 }, getMarginTop(2)]}>
                                <FlatList
                                    data={addedUser}
                                    keyExtractor={(item) => `${item._id}-${item.name}`}
                                    renderItem={({ item }) => {
                                        return (
                                            <View
                                                style={[{
                                                    paddingHorizontal: getWidthnHeight(3).width, borderColor: '#C4C4C4', borderWidth: 1,
                                                    borderRadius: getWidthnHeight(10).width, paddingVertical: getWidthnHeight(1).width,
                                                    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'
                                                }, getMarginBottom(2)]}
                                            >
                                                {(!!item?.profilepic) ? (
                                                    <Image source={{ uri: item.profilepic }} resizeMode="contain" style={{
                                                        width: getWidthnHeight(12).width, height: getWidthnHeight(12).width,
                                                    }} />
                                                )
                                                    :
                                                    <FontAwesome name="user-circle" size={getWidthnHeight(12).width} color='#000000' />
                                                }
                                                <Text style={[{ textAlign: 'left', fontSize: fontSizeH4().fontSize + 4, color: '#000000', paddingHorizontal: getWidthnHeight(3).width }]}>{item.name.trim()}</Text>
                                                <FontAwesome name="close" size={getWidthnHeight(8).width} color='#000000'
                                                    onPress={() => {
                                                        removeUser(item._id)
                                                    }} />
                                            </View>
                                        );
                                    }}
                                />
                            </View>
                        )
                    }
                </View>
            </View>
        </SafeAreaView >
    );
}