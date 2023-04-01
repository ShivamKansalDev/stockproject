import React, { useState, useEffect, useRef, useCallback } from 'react'
import { StyleSheet, TouchableOpacity, Text, SafeAreaView, ScrollView, View, Keyboard, ActivityIndicator, FlatList, Pressable, LogBox, Image } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Menu, Divider, Portal, Provider, Button } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import StatusBarView from '../../Components/StatusBar'
import ProfileHeader from '../../Components/Header/ProfileHeader'
import BrandImage from '../../Components/BrandImage'
import Searchview from '../../Components/Searchview'
import Users from './Components/Users';
import { fontSizeH1, fontSizeH2, fontSizeH3, fontSizeH4, getMarginBottom, getMarginLeft, getMarginRight, getWidthnHeight } from '../../Components/width';
import { CreateGroup } from '../../Components/ChannelModal/CreateGroup';
import axios from 'axios';
import { userUrl } from '../../Url';
import jsonFile from '../../../getToken.json';
import { getMarginTop } from '../../Components/width';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChannelChat } from './ChannelChat';
import { AddRemoveUser } from './AddRemoveUsers';
import { AddRemoveModal } from '../../Components/ChannelModal/AddRemoveModal';
import { setChannelDetails } from '../../Action/Channel';

const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews'])

export const ChannelNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ChannelScreen'
        >
            <Stack.Screen name='ChannelScreen' component={Channel} />
            <Stack.Screen name='ChannelChat' component={ChannelChat} />
            <Stack.Screen name='AddRemoveUsers' component={AddRemoveUser} />
        </Stack.Navigator>
    );
}

const data = [1, 2, 3, 4, 5, 6,]
const Channel = ({ navigation }) => {
    const [showModal, setShowModal] = useState(false);
    const [showAddRemoveModal, setShowAddRemoveModal] = useState(false);
    const [selectType, setSelectType] = useState('Add');
    const [userList, setUserList] = useState([]);
    const [channelList, setChannelList] = useState([]);
    // const [channelList, setChannelList] = useState([
    //     { _id: '76543hjkhgfdfc', name: 'Test Channel', createdBy: '34567kjhgfdfghj' },
    //     { _id: '78766hjkhgfdfc', name: 'Test Shivam', createdBy: '34567kjhgfdfghj' }
    // ]);
    const [loading, setLoading] = useState(false);
    const [selectMenu, setSelectMenu] = useState('');
    const [searchText, setSearchText] = useState('');
    const [searchedData, setSearchedData] = useState([]);
    const [empty, setEmpty] = useState(true);
    const dispatch = useDispatch();
    const [list, setList] = useState([
        {
            value: 1,
            label: 'Add Participants'
        },
        {
            value: 2,
            label: 'Remove Participants'
        }
    ]);
    const isFocused = useIsFocused();

    const userDetails = useSelector(state => state.User);

    // const userDetails = {
    //     authToken: 'kjhgfdsfcghbjk34567890ytrsdj',
    //     User: {
    //         _id: '34567kjhgfdfghj'
    //     }
    // }

    // console.log("#$$#@#@#@#@ USER DETAILS: ", userDetails.authToken)

    const communicationUrl = 'https://communication-service-asia-vhteukeytq-el.a.run.app/api';

    // const authToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImY4NzZiNzIxNDAwYmZhZmEyOWQ0MTFmZTYwODE2YmRhZWMyM2IzODIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiU2hpdmFtIEthbnNhbCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BRWRGVHA2T3R5dEx0M2hJaHI5M2Z2Q0o3VWEyYUItZUFwQm12eDhTelBTWj1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9zdG9ja2tub2Nrcy1wcm9kIiwiYXVkIjoic3RvY2trbm9ja3MtcHJvZCIsImF1dGhfdGltZSI6MTY3ODEwMzM4MywidXNlcl9pZCI6InNHcEF3YW1ZUjJTZ0QyUWhza201NXo3c1J0dDIiLCJzdWIiOiJzR3BBd2FtWVIyU2dEMlFoc2ttNTV6N3NSdHQyIiwiaWF0IjoxNjc4MTA3MTgwLCJleHAiOjE2NzgxMTA3ODAsImVtYWlsIjoic2hpdmFtLmthbnNhbDIwMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwNDU4Nzc2NjgxMjg0NjIzODI1MiJdLCJlbWFpbCI6WyJzaGl2YW0ua2Fuc2FsMjAyQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.NDetW-eL7VILapKiOxK1w09eOrBF_fANJ0poob1zVuV8fRMitrP6FiWGsQMOxhG2-eLhP6vFcnSoIMMBlp0wxQt7sjH6QtmiDl4p1Y3d9DICltMb7V54e-HNfbl8N51y4KWpeeRAPjToIzUFb1sF_TVrcZB0Eer0MP7LZMVxPYq53-2iNtjOTR9A2YxnyopKWOPiXHZ6V9_w8japXsYR_iFJqPjt_RPYxbiE05b1U08IPjD0ynkZ9UDV_y018EPgqw1SMGeSm3GaF8RMh7Noh7xHFe2rNTB8PLuIvylOx1Ir7qKHiZvcvwIgtvN-CWrpTLiaaLONA3MVFqOJFkNCLA";

    const authToken = userDetails?.authToken;

    useEffect(() => {
        if (!isFocused) {
            setSelectMenu('');
        }
    }, [isFocused])

    useEffect(() => {
        getUserChannel();
    }, []);

    function showLoader() {
        setLoading(true)
    }

    function hideLoader() {
        setLoading(false)
    }

    const getUserChannel = () => {
        showLoader();
        axios.get(`${communicationUrl}/user/channels`, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        }).then((response) => {
            hideLoader();
            console.log("@#@#@#@ USER CHANNEL RESPONSE: ", response.data);
            setChannelList(response.data)
        }).catch((error) => {
            hideLoader();
            console.log("@#@#@@@@@@@@@@@@ USER CHANNEL ERROR: ", JSON.stringify(error, null, 4))
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

    const createChannel = (title = '', users = '', file = '') => {
        showLoader();
        const formData = new FormData();
        formData.append('name', title);
        if (users) {
            formData.append('users', users)
        }
        if (file) {
            formData.append('file', file)
        }

        // console.log("CREATE CHANNEL: ", `${communicationUrl}/user/channel`, "\n\n\n", title, users, file)
        // return;
        axios.post(`${communicationUrl}/user/channel`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${authToken}`
            }
        }).then((response) => {
            hideLoader();
            console.log("#$##$@@#@# CREATE CHANNEL RESPONSE: ", response.data);
            getUserChannel();
        }).catch((error) => {
            hideLoader();
            console.log("@##^*^^##)( CREATE CHANNEL ERROR: ", JSON.stringify(error, null, 4));
        })
    }

    function searchGroupName(groupList, searchName, callBack) {
        let filterNames = [];
        let splitArray = [];
        splitArray = searchName.toLowerCase().split('');
        console.log("^^^^^^THIS IS STRING: ", typeof searchName, searchName)
        filterNames = groupList.filter((item) => {
            if (!!item.name) {
                const groupName = item.name.toLowerCase().includes(searchName.toLowerCase())
                return groupName
            } else {
                return;
            }
        })

        if (filterNames.length < 1) {
            console.log("NO RESULTS TO DISPLAY")
            return;
        }

        const searchLength = splitArray.length;
        let data = [];
        //console.log("SPLIT SEARCH: ", splitArray, searchLength)
        for (let i = 0; i <= filterNames.length - 1; i++) {
            let groupName = null;
            let splitGroupName = null;
            groupName = filterNames[i]['name'];
            splitGroupName = groupName.toLowerCase().split('');
            //console.log("INSIDE LOOP: ", splitArray, splitGroupName)
            for (let j = 0; j < searchLength; j++) {
                //console.log("INSIDE FOR LOOP****: ", j)
                if (splitArray[j] !== splitGroupName[j]) {
                    break;
                }
                if (j === searchLength - 1 && splitArray[j] === splitGroupName[j]) {
                    data.push(filterNames[i])
                    //console.log("FOR LOOP DATA: ", data)
                    callBack(data)
                }
            }
        }
    }

    // function searchResults() {
    //     //console.log("SELF TASK: ", self_task)
    //     console.log("@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@!@ EMPTY: ", empty)
    //     let data = [];
    //     const searchName = searchText;
    //     if (searchName) {
    //         searchGroupName(channelList, searchName, (dataArray) => {
    //             if (dataArray !== [] && dataArray !== null && dataArray.length !== null && dataArray.length > 0) {
    //                 data = dataArray;
    //             }
    //         });
    //     }
    //     if (data.length === 0 && empty === false) {
    //         return (
    //             <View style={{ alignItems: 'center', marginTop: 30 }}>
    //                 <Text style={{ color: 'grey' }}>No Results found</Text>
    //             </View>
    //         );
    //     } else if (data.length > 0 && empty === false) {
    //         return (
    //             <RenderGroupList groupList={data} />
    //         );
    //     } else if (empty) {

    //         return (
    //             <RenderGroupList groupList={channelList} />
    //         )
    //     }
    // }

    // useEffect(() => {
    //     console.log("!@!@!@!@!@ SELECT MENU: ", selectMenu)
    // }, [selectMenu]);

    function RenderGroupList({ groupList }) {
        return (
            <TouchableOpacity activeOpacity={1} style={{ flex: 1, borderColor: 'red', borderWidth: 0 }}
                onPress={() => setSelectMenu('')}
            >
                <FlatList
                    data={groupList}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item, index }) => {
                        // console.log("$$$$$$$$$ : ", item._id, " === ", selectMenu, " = ", item._id === selectMenu);
                        return (
                            <View
                                style={[{
                                    paddingHorizontal: getWidthnHeight(3).width, paddingVertical: getWidthnHeight(2).width,
                                    borderColor: '#C4C4C4', borderWidth: (item.createdBy === userDetails.User._id) ? 0 : 1, borderRadius: getWidthnHeight(2).width,
                                    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                                    backgroundColor: (item.createdBy === userDetails.User._id) ? '#0F9764' : 'white', position: 'relative'
                                    // zIndex: groupList.length - index,
                                }, getMarginBottom(2), getMarginTop(index === 0 ? 2 : 1)]}>
                                <Pressable onPress={() => {
                                    // console.log(item)
                                    dispatch(setChannelDetails(item))
                                    navigation.navigate('ChannelChat', { details: item })
                                }}
                                    style={{ flexDirection: 'row', alignItems: 'center', flex: 1, }}
                                >
                                    <View style={[{
                                        backgroundColor: '#ffffff',
                                        width: getWidthnHeight(12).width,
                                        height: getWidthnHeight(12).width,
                                        borderRadius: getWidthnHeight(6).width,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden'
                                    }]}>
                                        {item?.media_link ? (
                                            <Image resizeMode="cover" source={{ uri: item.media_link }} style={{ width: '100%', height: '100%' }} />
                                        ) : (
                                            <View>
                                                <Text style={{ fontSize: fontSizeH4().fontSize + 6 }}>{item.name.substring(0, 1)}</Text>
                                            </View>
                                        )}
                                    </View>
                                    <View style={[{ borderColor: 'red', borderWidth: 0, paddingHorizontal: getWidthnHeight(2).width, }]}>
                                        <Text style={{ fontSize: fontSizeH4().fontSize + 2, color: (item.createdBy === userDetails.User._id) ? '#FFFFFF' : '#000000' }}>{item.name}</Text>
                                    </View>
                                </Pressable>
                                {(item.createdBy === userDetails.User._id) && (
                                    <View style={{
                                        borderColor: 'black', borderWidth: 0, flexDirection: 'row',
                                        justifyContent: 'center', alignItems: 'center',
                                        // zIndex: ((groupList.length + index + 1) - index)
                                    }}>
                                        <Pressable
                                            onPress={() => {
                                                setSelectMenu(item)
                                                // setShowAddRemoveModal(true)
                                            }}
                                        >
                                            <Entypo name='dots-three-vertical' size={getWidthnHeight(7).width} color={(item.createdBy === userDetails.User._id) ? '#FFFFFF' : '#000000'}
                                                style={{ borderColor: 'red', borderWidth: 0, padding: getWidthnHeight(1).width }}
                                            />
                                        </Pressable>
                                        <View style={[{
                                            position: 'absolute'
                                        }]}>
                                            {item._id === selectMenu._id && (
                                                <View
                                                    style={[{
                                                        // zIndex: ((groupList.length + index + 3) - index),
                                                        alignItems: 'flex-start', backgroundColor: '#FFFFFF',
                                                        paddingHorizontal: getWidthnHeight(2).width, shadowColor: '#000000',
                                                        shadowOpacity: 0.4, elevation: 4, shadowRadius: 7,
                                                        shadowOffset: { width: 0, height: 10 },
                                                        borderWidth: 1, borderColor: '#C4C4C4'
                                                    }, getMarginTop(0), getMarginLeft(-27)
                                                    ]}>
                                                    <Pressable
                                                        style={{
                                                            paddingVertical: getWidthnHeight(3).width, borderWidth: 0, borderColor: 'black', width: '100%'
                                                        }}
                                                        onPress={() => {
                                                            dispatch(setChannelDetails({ type: 'Add', data: selectMenu }))
                                                            navigation.navigate('AddRemoveUsers');
                                                        }}
                                                    >
                                                        <Text style={{ fontSize: fontSizeH4().fontSize + 2, }}>Add Participants</Text>
                                                    </Pressable>
                                                    <View style={{ width: '100%', height: 1, backgroundColor: '#C4C4C4' }} />
                                                    <Pressable
                                                        style={{
                                                            paddingVertical: getWidthnHeight(3).width, borderWidth: 0, borderColor: 'black', width: '100%'
                                                        }}
                                                        onPress={() => {
                                                            dispatch(setChannelDetails({ type: 'Remove', data: selectMenu }))
                                                            navigation.navigate('AddRemoveUsers');
                                                        }}
                                                    >
                                                        <Text style={{ fontSize: fontSizeH4().fontSize + 2, }}>Remove Participants</Text>
                                                    </Pressable>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                )}
                            </View>
                        );
                    }}
                />
            </TouchableOpacity >
        );
    }

    return (
        <SafeAreaView style={[{ flex: 1, backgroundColor: 'white' }]}>
            <StatusBarView />
            <ProfileHeader />
            <BrandImage />
            <View style={[{ flex: 1, alignItems: 'center', }]}>
                <View style={{ flex: 1, alignItems: 'center', borderColor: 'blue', borderWidth: 0 }}>
                    <ScrollView contentContainerStyle={{ flex: 1 }}>
                        <View style={[{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: getWidthnHeight(3).width
                        }, getWidthnHeight(100)]}>
                            <View style={[{}, getWidthnHeight(80, 6)]}>
                                <Searchview
                                    searchText={searchText}
                                    setSearchText={(text) => {
                                        setSearchText(text)
                                        if (text) {
                                            searchGroupName(channelList, text, (dataArray) => {
                                                if (dataArray !== [] && dataArray !== null && dataArray.length !== null && dataArray.length > 0) {
                                                    setSearchedData(dataArray)
                                                    console.log("@#@#@#@ SEARCHED DATA: ", dataArray)
                                                }
                                            });
                                        } else {
                                            setSearchedData([]);
                                        }
                                    }}
                                    setSelectMenu={setSelectMenu} />
                            </View>
                            <FontAwesome name="plus-square" size={getWidthnHeight(13).width} color='#0F9764'
                                onPress={() => {
                                    setShowModal(true);
                                    setSelectMenu('');
                                }} />
                        </View>
                        <View style={[{ paddingHorizontal: getWidthnHeight(5).width, borderColor: 'red', borderWidth: 0, flex: 1 }, getMarginTop(2)]}>
                            {/* {searchResults()} */}
                            {(!!searchText === true && searchedData.length > 0) && (
                                <RenderGroupList groupList={searchedData} />
                            )}
                            {(!!searchText === true && searchedData.length === 0) && (
                                <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                                    <Text style={{ color: 'grey', fontSize: fontSizeH3().fontSize }}>No Results found</Text>
                                </View>
                            )}
                            {(!searchText && searchedData.length === 0) && (
                                <RenderGroupList groupList={channelList} />
                            )}
                        </View>
                    </ScrollView>
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
                {(showModal) && (
                    <CreateGroup
                        visible={showModal}
                        containerStyle={[{ backgroundColor: '#FFFFFF', borderRadius: getWidthnHeight(3).width }, getWidthnHeight(90, 60)]}
                        onDismiss={() => {
                            Keyboard.dismiss();
                            setShowModal(false)
                        }}
                        submit={(title, users, file) => createChannel(title, users, file)}
                        searchUser={(text) => searchUser(text)}
                        userList={userList}
                    />
                )}
                {(showAddRemoveModal) && (
                    <AddRemoveModal
                        visible={showAddRemoveModal}
                        containerStyle={[{ backgroundColor: '#FFFFFF', borderRadius: getWidthnHeight(3).width }, getWidthnHeight(90)]}
                        onDismiss={() => {
                            Keyboard.dismiss();
                            setShowAddRemoveModal(false)
                        }}
                        selectMenu={selectMenu}
                        submit={() => { }}
                    />
                )}
            </View>
        </SafeAreaView>
    )
}

export default Channel

const styles = StyleSheet.create({})