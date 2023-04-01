import React, { useState, useEffect, useCallback, useRef } from 'react';
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
} from 'react-native';
import { useSelector } from 'react-redux';
import { TextInput } from 'react-native-paper';
import Video from 'react-native-video';
import { useIsFocused } from '@react-navigation/native';
import ProfileHeader from '../../Components/Header/ProfileHeader';
import { Button, Avatar, ActivityIndicator } from 'react-native-paper';
import { } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import axios from 'axios';
import {
    fontSizeH4,
    getMarginLeft,
    getMarginTop,
    getWidthnHeight,
    getMarginRight,
    getMarginHorizontal,
    getMarginVertical,
} from '../../Components/width';
import jsonFile from '../../../getToken.json';
import moment from 'moment';
import { PostSection } from '../../Components/PostSection';
import BottomSheet from '../../Components/PostSection/BottomSheet';

const minValue = 10;

const url = 'https://socialnetwork-service-vhteukeytq-as.a.run.app/api';

const Community = ({ navigation }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [loading, setLoading] = useState(false);
    const [scrollNow, setScrollNow] = useState(false);
    const [userLikeList, setUserLikeList] = useState([]);
    const [bottomSheetIndex, setBottomSheetIndex] = useState(-1);
    const userDetails = useSelector((state) => state.User)

    const bottomSheetRef = useRef(null);

    function showLoader() {
        Keyboard.dismiss();
        setLoading(true);
    }

    function hideLoader() {
        setLoading(false);
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = date => {
        console.warn('A date has been picked: ', date);
        hideDatePicker();
    };

    function isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
        const paddingToBottom = getWidthnHeight(10).width;
        // console.log("@#@#@# CLOSE TO BOTTOM: ", layoutMeasurement.height, contentOffset.y, contentSize.height, paddingToBottom)
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom
    }

    function clearLikeList() {
        setUserLikeList([]);
    }

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar backgroundColor="transparent" barStyle="dark-content" />
                <View style={{ flex: 1 }}>
                    <ProfileHeader />
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{ flex: 9.5, alignItems: 'center', borderColor: 'red', borderWidth: 0 }}>
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
                                    <View style={styles.postupper}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate('PostNavigator', {
                                                    screen: 'Post',
                                                    //initial: true
                                                });
                                            }}
                                            style={[
                                                styles.cardUpper,
                                                {
                                                    borderColor: 'red',
                                                    borderWidth: 0,
                                                    paddingVertical: getMarginTop(1).marginTop,
                                                },
                                            ]}>
                                            <View style={[styles.cardUpperLeft]}>
                                                <Avatar.Image
                                                    size={getWidthnHeight(12).width}
                                                    source={{ uri: userDetails?.User?.profilepic }}
                                                />
                                                <Text style={{ marginLeft: 10, color: '#686868' }}>
                                                    What’s Happening?
                                                </Text>
                                            </View>
                                            <View style={styles.cardUpperRight}>
                                                <View style={styles.postButton}>
                                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                                        Post
                                                    </Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        <View
                                            style={[
                                                {
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-evenly',
                                                },
                                                getMarginTop(3),
                                                getWidthnHeight(90),
                                            ]}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    navigation.navigate('PostNavigator', {
                                                        screen: 'Post',
                                                        //initial: true
                                                        params: {
                                                            type: 'photo'
                                                        }
                                                    });
                                                }}
                                                style={[
                                                    {
                                                        height: '100%',
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        borderWidth: 0,
                                                        borderColor: 'red'
                                                    },
                                                    getWidthnHeight(30),
                                                ]}>
                                                <FontAwesome name="photo" size={20} color="#686868" />
                                                <Text style={{ marginLeft: 5, color: '#686868' }}>
                                                    Photo
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    navigation.navigate('PostNavigator', {
                                                        screen: 'Post',
                                                        //initial: true
                                                        params: {
                                                            type: 'video'
                                                        }
                                                    });
                                                }}
                                                style={[
                                                    {
                                                        height: '100%',
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        borderWidth: 0,
                                                        borderColor: 'red'
                                                    },
                                                    getWidthnHeight(30),
                                                ]}>
                                                <Feather name="video" size={22} color="#686868" />
                                                <Text style={{ marginLeft: 5, color: '#686868' }}>
                                                    Video
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    navigation.navigate('PostNavigator', {
                                                        screen: 'Post',
                                                        //initial: true
                                                        params: {
                                                            type: 'article'
                                                        }
                                                    });
                                                }}
                                                style={[
                                                    {
                                                        height: '100%',
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        paddingLeft: 5,
                                                        justifyContent: 'center',
                                                        paddingHorizontal: getWidthnHeight(3).width,
                                                        borderWidth: 0,
                                                        borderColor: 'red'
                                                    },
                                                ]}>
                                                {/* <Feather name="video" size={22} color="#686868" /> */}
                                                <Entypo
                                                    name="text-document"
                                                    size={20}
                                                    color="#686868"
                                                />
                                                <Text style={{ marginLeft: 5, color: '#686868' }}>
                                                    Write Article
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    {/* ===========Post  Section===== */}
                                    <PostSection
                                        loading={loading}
                                        setLoading={setLoading}
                                        showLoader={showLoader}
                                        hideLoader={hideLoader}
                                        scrollNow={scrollNow}
                                        openBottomSheet={(likeList) => {
                                            setUserLikeList(likeList)
                                            bottomSheetRef.current.snapToIndex(0);
                                        }}
                                        bottomSheetIndex={bottomSheetIndex}
                                    />
                                    {/* <View style={[getWidthnHeight(undefined, 10)]}></View> */}
                                </View>
                            </ScrollView>
                        </View>
                        <>
                            <BottomSheet bottomSheetRef={bottomSheetRef} data={userLikeList} clearData={clearLikeList} setBottomSheetIndex={setBottomSheetIndex} />
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
            </SafeAreaView>
            {/* <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            /> */}
        </>
    );
};

export default Community;

const styles = StyleSheet.create({
    header: { width: '100%', flexDirection: 'row', height: 50 },
    headerLeft: {
        width: '50%',
        paddingLeft: 10,
        paddingVertical: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    headerRight: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 10,
    },
    title: { paddingVertical: 10, paddingLeft: 10 },
    postupper: {
        width: '100%',
        height: 120,
        borderTopColor: '#e5e6e9',

        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderBottomColor: '#e5e6e9',
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 20,
    },
    cardUpper: {
        width: '100%',
        height: '50%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    postLower: {
        width: '100%',
        height: '50%',
        flexDirection: 'row',
    },
    postButton: {
        width: 70,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0F9764',
        marginRight: 10,
    },
    cardUpperLeft: {
        width: '70%',
        height: '50%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardUpperRight: {
        width: '30%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    shareDiv: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
