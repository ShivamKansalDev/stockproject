import {
    StyleSheet,
    Text,
    ScrollView,
    Image,
    SafeAreaView,
    StatusBar,
    View,
    FlatList,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Keyboard,
    Pressable
} from 'react-native';
import { TextInput } from 'react-native-paper';
import React, { useState, useEffect, useCallback, useRef, forwardRef } from 'react';
import Video from 'react-native-video';
import { useIsFocused, useNavigation, useRoute, useNavigationState } from '@react-navigation/native';
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
import moment from 'moment';
import { useSelector } from 'react-redux';
import {
    fontSizeH4,
    getMarginLeft,
    getMarginTop,
    getWidthnHeight,
    getMarginRight,
    getMarginHorizontal,
    getMarginVertical,
} from '../../Components/width';
import { ShareModal } from '../../Components/Modal/Modal';

const baseURL = 'https://socialnetwork-service-vhteukeytq-as.a.run.app/api';

export const PostSection = ({
    loading,
    setLoading,
    showLoader = () => { },
    hideLoader = () => { },
    currentUser = null,
    scrollNow = false,
    openBottomSheet = () => { },
    bottomSheetIndex = -1
}) => {
    const [userPosts, setUserPosts] = useState([]);
    const [selectedDot, setSelectedDot] = useState(null);
    const [selectedPostIndex, setSelectedPostIndex] = useState(null);
    const [userComment, setUserComment] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [commentsCurrentPage, setCommentsCurrentPage] = useState(0);
    const [commentsList, setCommentsList] = useState([]);
    const [commentRecordId, setCommentRecordId] = useState(null);
    const [selectedComment, setSelectedComment] = useState({});
    const [selectedCommentIndex, setSelectedCommentIndex] = useState(null);
    const [totalComments, setTotalComments] = useState([]);
    const [totalLikes, setTotalLikes] = useState([]);
    const [scrollComments, setScrollComments] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [postToShare, setPostToShare] = useState(null);
    const [userLikeList, setUserLikeList] = useState([]);
    const [postDeleted, setPostDeleted] = useState(false);
    const focused = useIsFocused();
    const route = useRoute();
    const navigation = useNavigation();
    const userDetails = useSelector(state => state.User);
    const authToken = userDetails?.authToken;

    // console.log("@#@#$!@!@ AUTH TOKEN: ", userDetails)
    // console.log("@#@#$!@!@ NAVIGATION STATE: ", route)

    const pageSize = 10;

    let videoRef = useRef().current;

    useEffect(() => {
        if (postToShare && userPosts.length === 0 && totalLikes.length === 0 && totalComments.length === 0 && currentPage === 0 && commentsCurrentPage === 0) {
            setPostToShare(null);
            getPosts();
        }
    }, [userPosts, totalLikes, totalComments, currentPage, commentsCurrentPage, postToShare]);

    function sharePost(item, postText) {
        unselectDot();
        showLoader();
        axios.post(`${baseURL}/posts/share`, {
            "parent_id": item?.id,
            "parent_type": item?.type,
            "title": postText
        }, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        }).then((response) => {
            hideLoader();
            console.log("^&^&^&^*^*^*^*^ POST SHARED: ", response.data);
            setUserPosts([]);
            setTotalLikes([]);
            setTotalComments([]);
            setCurrentPage(0);
            setCommentsCurrentPage(0);
        }).catch((error) => {
            hideLoader();
            console.log("@#@#@#@#@ SHARE ERROR: ", JSON.stringify(error, null, 4))
        })
    }

    function isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
        const paddingToBottom = getWidthnHeight(10).width;
        // console.log("@#@#@# CLOSE TO BOTTOM: ", layoutMeasurement.height, contentOffset.y, contentSize.height, paddingToBottom)
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom
    }

    useEffect(() => {
        if (scrollNow) {
            console.log("@#@#@##@ SCROLL NOW: ", scrollNow)
            const postsLength = userPosts.length;
            if (postsLength !== 0 && postsLength % pageSize === 0) {
                setCurrentPage((page) => page + 1);
            }
        }
    }, [scrollNow]);

    useEffect(() => {
        if (currentPage > 0) {
            console.log("$@$@$@$@ INSIDE IF: ", currentPage)
            getPosts();
        }
    }, [currentPage, getPosts])

    useEffect(() => {
        if (scrollComments) {
            console.log("^^^^^^^^ SCROLL COMMENTS: ", scrollComments)
            const commentsLength = commentsList.length;
            if (commentsLength !== 0 && commentsLength % pageSize === 0) {
                setCommentsCurrentPage((page) => page + 1);
            }
        }
    }, [scrollComments]);

    useEffect(() => {
        if (commentsCurrentPage > 0) {
            console.log("$@$@$@$@ COMMENTS PAGE COUNT: ", commentsCurrentPage)
            const selectedPost = userPosts[selectedPostIndex];
            getComments(selectedPost?.id, selectedPostIndex, selectedPost?.type);
        }
    }, [commentsCurrentPage, getComments])

    useEffect(() => {
        if (focused) {
            getPosts();
        } else {
            setUserPosts([]);
            unselectDot();
            setSelectedPostIndex(null);
            setUserComment('');
            setCurrentPage(0);
            setCommentsCurrentPage(0)
            setTotalLikes([]);
            setTotalComments([]);
            setCommentRecordId(null);
        }
    }, [focused, getPosts]);

    function likeDislikePost(id, type = 'Post', status = 1, postIndex) {
        console.log('STATUS: ', id, type, status);
        showLoader();
        axios
            .post(
                `${baseURL}/like`,
                {
                    record_id: id,
                    record_type: type,
                    like: status,
                },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                },
            )
            .then(response => {
                hideLoader();
                let data = response.data;
                // console.log('@@#@#@#@ LIKE/DISLIKE REPOSNE: ', data);
                let updateLikesCount = [];
                if (status === 1) {
                    updateLikesCount = totalLikes.map((item, index) => ({
                        ...item,
                        likeType: index === postIndex ? 'like' : item.likeType,
                        likesCount:
                            index === postIndex
                                ? item?.likesCount + 1
                                : item?.likesCount,
                    }));
                } else {
                    updateLikesCount = totalLikes.map((item, index) => ({
                        ...item,
                        likeType: index === postIndex ? 'dislike' : item.likeType,
                        likesCount:
                            index === postIndex
                                ? item?.likesCount - 1
                                : item?.likesCount,
                    }));
                }
                // console.log("$#$#$#$# LIKE TYPE: ", updateLikesCount)
                setTotalLikes(updateLikesCount);
            })
            .catch(error => {
                hideLoader();
                console.log('$$$$ ERROR: ', JSON.stringify(error));
            });
    }

    const getPosts = useCallback(() => {
        showLoader();
        let url = '';
        if (!!currentUser?._id) {
            url = `${baseURL}/wall/${currentUser._id}?page=${currentPage}&pagesize=${pageSize}`;
        } else {
            url = `${baseURL}/timelines?page=${currentPage}&pagesize=${pageSize}`;
        }
        // console.log('@#@#@#@#@ POST : ', url);
        axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then(response => {
                hideLoader();
                let data = response.data;
                const likesData = data.map(item => ({
                    likesCount: item?.likes_count,
                    postId: item?.id,
                    type: item?.type,
                    likeType: item?.like_type
                }));
                const commentsData = data.map(item => ({
                    commentsCount: item?.comments_count,
                    postId: item?.id,
                    type: item?.type,
                }));
                const totalLikesData = totalLikes.map((item) => item);
                const totalCommentsData = totalComments.map((item) => item);
                const userPostsData = userPosts.map((item) => item);

                const concatLikes = [...totalLikesData, ...likesData];
                const concatComments = [...totalCommentsData, ...commentsData];
                const concatUserPosts = [...userPostsData, ...data];

                const uniqueLikes = [...new Map(concatLikes.map(item => [item['postId'], item])).values()];
                const uniqueComments = [...new Map(concatComments.map(item => [item['postId'], item])).values()];
                const uniqueUserPosts = [...new Map(concatUserPosts.map(item => [item['id'], item])).values()];

                setTotalLikes(uniqueLikes);
                setTotalComments(uniqueComments);
                setUserPosts(uniqueUserPosts);

                // console.log("@#@#@#@#@#@ USER POSTS LENGTH: ", uniqueLikes.length, uniqueComments.length, uniqueUserPosts.length)
                // __DEV__ && console.log("@#@#@#@#@#@ USER POSTS: ", JSON.stringify(uniqueUserPosts[0], null, 4))
            })
            .catch(error => {
                hideLoader();
                console.log('@@@@ ERROR: ', JSON.stringify(error, null, 4));
            });
    }, [showLoader, hideLoader, currentUser, baseURL, authToken, currentPage, pageSize, totalLikes, totalComments, userPosts]);

    useEffect(() => {
        if (userPosts.length > 0) {
            // console.log("@#@#@#@#@# USER POSTS: ", JSON.stringify(userPosts, null, 4), "\n\n\n", userPosts.length)
        }
    }, [userPosts])

    useEffect(() => {
        if (postDeleted && userPosts.length === 0 && totalLikes.length === 0 && totalComments.length === 0 && currentPage === 0 && commentsCurrentPage === 0) {
            setPostDeleted(false);
            getPosts();
        }
    }, [userPosts, totalLikes, totalComments, currentPage, commentsCurrentPage, postDeleted]);

    function deletePost(id) {
        unselectDot();
        showLoader();
        axios
            .delete(`${baseURL}/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then(response => {
                __DEV__ && console.log('#$##$#$#$ POST DELETED');
                hideLoader();
                setPostDeleted(true)
                // After POST DELETE, userPosts.length is never a multiple of 10 (PageSize);
                setUserPosts([]);
                setTotalLikes([]);
                setTotalComments([]);
                setCurrentPage(0);
                setCommentsCurrentPage(0);
            })
            .catch(error => {
                hideLoader();
                console.log('***** ERROR: ', JSON.stringify(error, null, 4));
            });
    }

    function postComment(id, type = 'Post') {
        showLoader();
        axios
            .post(
                `${baseURL}/comments`,
                {
                    record_id: id,
                    record_type: type,
                    content: userComment,
                },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                },
            )
            .then(response => {
                hideLoader();
                __DEV__ &&
                    console.log('#$##$#$#$ CHecking INDEX COMMENT: ', selectedPostIndex);
                const updateCommentsCount = totalComments.map((item, index) => ({
                    ...item,
                    commentsCount:
                        index == selectedPostIndex
                            ? item?.commentsCount + 1
                            : item?.commentsCount,
                }));
                setTotalComments(updateCommentsCount);
                getComments(id, selectedPostIndex, type);
                // GET Posts (id, selectedPostIndex);
            })
            .catch(error => {
                hideLoader();
                console.log('***** ERROR: ', JSON.stringify(error));
            });
    }

    const getComments = useCallback((id, index, type) => {
        showLoader();
        axios
            .get(`${baseURL}/comments/${type}/${id}?page=${commentsCurrentPage}&pagesize=${pageSize}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then(response => {
                hideLoader();
                __DEV__ &&
                    console.log('#$##$#$#$ FETCHED USER COMMENTS', id, index, response.data);
                unselectDot(true);
                setUserComment('');
                setSelectedPostIndex(index);
                setSelectedComment({});
                setSelectedCommentIndex(null);
                if (response.data.length === 0) {
                    setCommentsList([]);
                    return;
                }
                setCommentRecordId(response.data[0]['record_id']);
                const concatCommentsList = [...commentsList, ...response.data];
                const uniqueCommentsList = [...new Map(concatCommentsList.map(item => [item['id'], item])).values()];
                setCommentsList(uniqueCommentsList);
            })
            .catch(error => {
                hideLoader();
                setCommentRecordId(null);
                console.log('***** ERROR: ', JSON.stringify(error));
            });
    }, [commentsCurrentPage, unselectDot, commentsList]);

    function updateComment(id, postId, type) {
        showLoader();
        console.log('#$#$#$ EDIT COMMENT: ', `${baseURL}/comments/${id}`);
        axios
            .put(
                `${baseURL}/comments/${id}`,
                {
                    content: userComment,
                },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                },
            )
            .then(response => {
                hideLoader();
                __DEV__ &&
                    console.log('#$##$#$#$ EDIT INDEX COMMENT: ', id, selectedPostIndex);
                getComments(postId, selectedPostIndex, type);
            })
            .catch(error => {
                hideLoader();
                console.log('***** ERROR: ', JSON.stringify(error));
            });
    }

    function deleteComment(id) {
        showLoader();
        axios
            .delete(`${baseURL}/comments/${id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then(response => {
                __DEV__ && console.log('#$##$#$#$ COMMENT DELETED');
                hideLoader();
                const updateCommentsCount = totalComments.map((item, index) => ({
                    ...item,
                    commentsCount:
                        index == selectedPostIndex
                            ? item?.commentsCount - 1
                            : item?.commentsCount,
                }));
                setTotalComments(updateCommentsCount);
                const updateCommentList = commentsList.filter(item => item?.id !== id);
                setCommentsList(updateCommentList);
                // GET Posts(selectedComment?.record_id, selectedPostIndex);
            })
            .catch(error => {
                hideLoader();
                console.log('***** ERROR: ', JSON.stringify(error));
            });
    }

    function EditDelete({ item, resize = null }) {
        return (
            <View
                style={[
                    {
                        alignItems: 'center',
                        backgroundColor: '#FFFFFF',
                        borderWidth: 0,
                        borderColor: '#18c343',
                        shadowColor: '#000000',
                        shadowOpacity: 0.6,
                        shadowRadius: 5,
                        elevation: 8,
                        shadowOffset: { width: 0, height: 15 },
                    },
                    resize && {
                        transform: [
                            { scale: 0.85 },
                            {
                                translateY: getMarginTop(-0.5).marginTop,
                            },
                            {
                                translateX: getMarginLeft(1.5).marginLeft,
                            },
                        ],
                    },
                    getWidthnHeight(27),
                    getMarginLeft(-25),
                    getMarginTop(1),
                ]}>
                <Pressable
                    onPress={() => {
                        if (item?.type === 'Post') {
                            navigation.navigate('PostNavigator', {
                                screen: 'Post',
                                //initial: true,
                                params: {
                                    oldData: JSON.stringify(item),
                                },
                            });
                        } else {
                            console.log('#$#$#$ COMMENT: ', item);
                            setSelectedCommentIndex(null);
                            setUserComment(item?.content);
                        }
                    }}
                    style={[
                        {
                            alignItems: 'flex-start',
                            borderColor: 'red',
                            borderWidth: 0,
                            paddingVertical: getWidthnHeight(3).width,
                            width: '100%',
                        },
                    ]}>
                    <Text
                        style={[
                            {
                                color: 'black',
                                paddingHorizontal: getWidthnHeight(3).width,
                                fontSize: fontSizeH4().fontSize + 1,
                            },
                        ]}>
                        Edit
                    </Text>
                </Pressable>
                <View
                    style={{
                        backgroundColor: '#C4C4C4',
                        width: '100%',
                        height: '0.7%',
                    }}
                />
                <Pressable
                    onPress={() => {
                        if (item?.type === 'Post') {
                            deletePost(item?.id);
                        } else {
                            deleteComment(item?.id);
                        }
                    }}
                    style={[
                        {
                            alignItems: 'flex-start',
                            borderColor: 'red',
                            borderWidth: 0,
                            paddingVertical: getWidthnHeight(3).width,
                            width: '100%',
                        },
                    ]}>
                    <Text
                        style={{
                            color: 'black',
                            paddingHorizontal: getWidthnHeight(3).width,
                            fontSize: fontSizeH4().fontSize + 1,
                        }}>
                        Delete
                    </Text>
                </Pressable>
            </View>
        );
    }

    function unselectDot(call = false) {
        setSelectedDot(null);
        setCommentsCurrentPage(0);
        setCommentsList([]);
        if (!userComment && !call) {
            setSelectedPostIndex(null);
            setSelectedComment({});
            setSelectedCommentIndex(null);
        }
    }

    useEffect(() => {
        setUserComment('');
    }, [selectedPostIndex]);

    function PostCreator({ item }) {
        return (
            <Pressable
                onPress={() => {
                    if (route?.name === 'ProfileScreen') {
                        return;
                    }
                    navigation.navigate('PostNavigator', {
                        screen: 'ProfileScreen',
                        //initial: true,
                        params: {
                            user: { _id: item?.created_by?.id, name: item?.created_by?.name },
                        },
                    });
                }}
                style={[
                    {
                        height: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderWidth: 0,
                        borderColor: 'blue',
                        paddingHorizontal: getWidthnHeight(0).width,
                    },
                ]}>
                <View
                    style={[
                        {
                            height: '100%',
                            justifyContent: 'center',
                            borderWidth: 0,
                            borderColor: 'green',
                        },
                    ]}>
                    {(item?.created_by?.profilepic) ? (
                        <Avatar.Image
                            size={getWidthnHeight(12).width}
                            source={{ uri: item?.created_by?.profilepic + '?' + moment().valueOf() }}
                        />
                    ) : (
                        <View style={{
                            width: getWidthnHeight(12).width,
                            height: getWidthnHeight(12).width,
                            borderRadius: getWidthnHeight(6).width,
                            borderWidth: 1, borderColor: '#C4C4C4',
                            backgroundColor: '#FFFFFF',
                            alignItems: 'center', justifyContent: 'center'
                        }}>
                            <Text style={{ fontSize: fontSizeH4().fontSize + 6, fontWeight: 'bold' }}>{item?.created_by?.name[0].toUpperCase()}</Text>
                        </View>
                    )}
                </View>
                <View
                    style={[
                        {
                            height: '100%',
                            justifyContent: 'center',
                            paddingHorizontal: getWidthnHeight(3).width,
                        },
                    ]}>
                    <Text
                        style={[
                            {
                                color: '#12626C',
                                fontWeight: '900',
                                fontSize: fontSizeH4().fontSize + 1,
                            },
                        ]}>
                        {item?.created_by?.name}
                    </Text>
                    <Text
                        style={{
                            color: '#919191',
                            fontSize: fontSizeH4().fontSize + 1,
                        }}>
                        {moment(item?.updatedAt).fromNow()}
                    </Text>
                </View>
            </Pressable>
        );
    }

    function UserPostMedia({ subItem, shared = false }) {
        return (
            <View
                // key={`${subItem?._id}${moment().valueOf()}`}
                style={[
                    {
                        zIndex: 1,
                        borderRadius: getWidthnHeight(5).width,
                        alignItems: 'center',
                        paddingVertical: getWidthnHeight(3).width,
                    },
                    getWidthnHeight(100),
                ]}>
                {subItem?.type.includes('video') ? (
                    <Pressable
                        onPress={() => {
                            //console.log('@@@@@@ REF: ', videoRef);
                            // setShowControls(!showControls);
                        }}
                        activeOpacity={0.8}
                        //pointerEvents="auto"
                        style={{
                            alignSelf: 'center',
                            width: getWidthnHeight(shared ? 75 : 90).width,
                            height: getWidthnHeight(shared ? 75 : 90).width,
                            borderRadius: getWidthnHeight(5).width,
                        }}>
                        <Video
                            source={{ uri: subItem?.link }} // Can be a URL or a local file.
                            poster={subItem?.link}
                            posterResizeMode="contain"
                            controls={true}
                            ref={ref => {
                                videoRef = ref;
                            }}
                            onBuffer={buffering =>
                                console.log('$^$^$^ BUFFERING: ', buffering)
                            } // Callback when remote video is buffering
                            onError={error =>
                                console.log('$^$^$^ ERROR: ', error)
                            } // Callback when video cannot be loaded
                            resizeMode="contain"
                            style={[
                                {
                                    height: getWidthnHeight(shared ? 75 : 90).width,
                                },
                                StyleSheet.absoluteFill,
                            ]}
                        />
                    </Pressable>
                ) : (
                    <Image
                        key={subItem?.link}
                        source={{ uri: subItem?.link }}
                        style={{
                            width: getWidthnHeight(shared ? 75 : 90).width,
                            height: getWidthnHeight(shared ? 75 : 90).width,
                            resizeMode: 'cover',
                            borderRadius: getWidthnHeight(5).width,
                        }}
                    />
                )}
            </View>
        );
    }

    function likeList(item) {
        showLoader();
        axios.get(`${baseURL}/like/${item?.type}/${item?.id}`, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        }).then((response) => {
            hideLoader();
            __DEV__ && console.log("&*&*&&*&* RESPONSE: ", response.data);
            setUserLikeList(response.data);
        }).catch((error) => {
            hideLoader();
            __DEV__ && console.log("$*$*$*$*$* LIKE LIST ERROR: ", JSON.stringify(error, null, 4))
        })
    }

    useEffect(() => {
        if (userLikeList.length > 0) {
            openBottomSheet(userLikeList);
        }
    }, [userLikeList]);

    useEffect(() => {
        if (bottomSheetIndex < 0 && userLikeList.length > 0) {
            setUserLikeList([])
        }
    }, [bottomSheetIndex])

    return (
        <TouchableOpacity activeOpacity={1} onPress={() => {
            console.log("##### CLICKED #####")
            unselectDot()
        }}>
            <>
                <View>
                    {(!!postToShare && showModal) && (<ShareModal
                        visible={showModal}
                        onDismiss={() => {
                            setShowModal(false);
                            Keyboard.dismiss();
                        }}
                        containerStyle={[
                            {
                                backgroundColor: 'white',
                                borderRadius: getWidthnHeight(2).width,
                            },
                            getWidthnHeight(90),
                        ]}
                        sharePost={postToShare}
                        submit={(item, postText) => sharePost(item, postText)}
                    />)}
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <FlatList
                        nestedScrollEnabled
                        keyboardShouldPersistTaps="handled"
                        keyExtractor={item => `${item?.id}`}
                        data={userPosts}
                        renderItem={({ item, index }) => {
                            return (
                                <View
                                    style={[{
                                        alignItems: 'center', borderBottomWidth: 0.7, borderBottomColor: '#C4C4C4',
                                        paddingBottom: getWidthnHeight(2).width
                                    }, getMarginTop(1)]}>
                                    <View
                                        style={[
                                            {
                                                zIndex: 999,
                                                borderWidth: 0,
                                                borderColor: 'red',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                paddingHorizontal: getWidthnHeight(4).width,
                                            },
                                            getWidthnHeight(100, 10),
                                        ]}>
                                        <PostCreator item={item} />
                                        <View
                                            style={[
                                                {
                                                    flexDirection: 'row',
                                                    height: '100%',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    borderWidth: 0,
                                                    borderColor: 'cyan',
                                                },
                                            ]}>
                                            {userDetails.User?._id === item.created_by?.id && (
                                                <View
                                                    style={[
                                                        {
                                                            alignItems: 'center',
                                                            borderColor: 'red',
                                                            borderWidth: 0,
                                                        },
                                                        getMarginRight(-2),
                                                    ]}>
                                                    <Entypo
                                                        onPress={() => setSelectedDot(index)}
                                                        style={[
                                                            {
                                                                padding: getWidthnHeight(3).width,
                                                                borderColor: 'red',
                                                                borderWidth: 0,
                                                                alignItems: 'center',
                                                            },
                                                        ]}
                                                        name="dots-three-vertical"
                                                        size={getWidthnHeight(5).width}
                                                        color="#5f5e5e"
                                                    />
                                                    {selectedDot === index && (
                                                        <View
                                                            style={[
                                                                {
                                                                    position: 'absolute',
                                                                    alignSelf: 'flex-end',
                                                                },
                                                            ]}>
                                                            <EditDelete item={item} />
                                                        </View>
                                                    )}
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                    {(!!item?.title) && (
                                        <View style={[{ zIndex: 1 }, getWidthnHeight(90)]}>
                                            <Text
                                                style={[
                                                    {
                                                        color: 'black',
                                                        fontSize: fontSizeH4().fontSize + 2,
                                                    },
                                                ]}>
                                                {item?.title}
                                            </Text>
                                        </View>
                                    )}

                                    {/* ==============Image */}
                                    <View
                                        style={[
                                            {
                                                paddingVertical: getWidthnHeight(0).width,
                                                alignItems: 'center',
                                                zIndex: 1,
                                            },
                                            getWidthnHeight(100),
                                        ]}>
                                        {(!!item?.parent) && (
                                            <View style={[{ alignItems: 'center' }, getWidthnHeight(85)]}>
                                                <View style={[
                                                    {
                                                        zIndex: 888,
                                                        borderWidth: 0,
                                                        borderColor: 'red',
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        paddingHorizontal: getWidthnHeight(4).width,
                                                    },
                                                    getWidthnHeight(85, 10)]}>
                                                    <PostCreator item={item.parent} />
                                                </View>
                                                {(item?.parent?.title) && (<View style={[{ alignItems: 'flex-start' }, getWidthnHeight(75)]}><Text
                                                    style={[
                                                        {
                                                            color: 'black',
                                                            fontSize: fontSizeH4().fontSize + 1,
                                                        },
                                                    ]}>
                                                    {item?.parent?.title}
                                                </Text></View>)}
                                                {item?.parent?.media?.map(subItem => <UserPostMedia key={subItem._id} subItem={subItem} shared={true} />)}
                                                {(item?.parent?.description) && (<View style={[{ alignItems: 'flex-start' }, getWidthnHeight(75)]}><Text
                                                    style={[
                                                        {
                                                            color: 'black',
                                                            fontSize: fontSizeH4().fontSize + 1,
                                                        },
                                                    ]}>
                                                    {item?.parent?.description}
                                                </Text></View>)}
                                            </View>
                                        )}
                                        {(!item?.parent) && item?.media?.map(subItem => <UserPostMedia key={subItem._id} subItem={subItem} />)}
                                        {(!!item?.description) && (
                                            <View
                                                style={[{ alignItems: 'flex-start' }, getWidthnHeight(90)]}>
                                                <Text
                                                    style={[
                                                        {
                                                            marginVertical: 10,
                                                            color: 'black',
                                                            fontSize: fontSizeH4().fontSize + 2,
                                                        },
                                                    ]}>
                                                    {item?.description}
                                                </Text>
                                            </View>
                                        )}
                                        <View style={[{ alignItems: 'flex-end' }, getWidthnHeight(90)]}>
                                            <Pressable
                                                onPress={() => {
                                                    if (totalLikes[index]['likesCount'] > 0) {
                                                        likeList(item);
                                                    }
                                                }}
                                                style={{
                                                    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                                                    padding: getWidthnHeight(2).width,
                                                    borderWidth: 0, borderColor: 'red'
                                                }}>
                                                <Text
                                                    style={[
                                                        {
                                                            marginLeft: 10,
                                                            color: '#686868',
                                                            fontSize: fontSizeH4().fontSize + 2,
                                                        },
                                                    ]}>
                                                    {totalLikes[index]['likesCount']}
                                                </Text>
                                                <Text
                                                    style={[
                                                        {
                                                            marginLeft: 10,
                                                            color: '#686868',
                                                            fontSize: fontSizeH4().fontSize + 2,
                                                        },
                                                    ]}>
                                                    Like(s)
                                                </Text>
                                            </Pressable>
                                        </View>
                                        <View
                                            style={[
                                                styles.shareDiv,
                                                { borderWidth: 0, borderColor: 'black' },
                                                getWidthnHeight(90),
                                            ]}>
                                            <Pressable
                                                onPress={() => {
                                                    if (!!item?.parent) {
                                                        setPostToShare(item?.parent)
                                                    } else {
                                                        setPostToShare(item)
                                                    }
                                                    setShowModal(true);
                                                }}
                                                style={[
                                                    {
                                                        height: '100%',
                                                        alignItems: 'center',
                                                        flexDirection: 'row',
                                                        paddingVertical: getWidthnHeight(2).width,
                                                    },
                                                ]}>
                                                <Feather
                                                    name="share-2"
                                                    size={getWidthnHeight(6).width}
                                                    color="#686868"
                                                />
                                                <Text
                                                    style={[
                                                        {
                                                            marginLeft: 10,
                                                            color: '#686868',
                                                            fontSize: fontSizeH4().fontSize + 2,
                                                        },
                                                    ]}>
                                                    Share
                                                </Text>
                                            </Pressable>
                                            <View
                                                style={{
                                                    height: '100%',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderWidth: 0,
                                                    borderColor: 'red',
                                                }}>
                                                <Pressable
                                                    onPress={() => {
                                                        likeDislikePost(
                                                            item?.id,
                                                            item?.type,
                                                            totalLikes[index]?.likeType === 'like' ? 0 : 1,
                                                            index
                                                        );
                                                    }}
                                                    style={{
                                                        height: '100%',
                                                        alignItems: 'center',
                                                        flexDirection: 'row',
                                                        paddingRight: getWidthnHeight(7).width,
                                                        paddingVertical: getWidthnHeight(2).width,
                                                    }}>
                                                    <AntDesign
                                                        name={totalLikes[index]?.likeType === 'like' ? 'like1' : 'like2'}
                                                        size={getWidthnHeight(6).width}
                                                        color={
                                                            totalLikes[index]?.likeType === 'like' ? '#0F9764' : '#686868'
                                                        }
                                                    />
                                                    <Text
                                                        style={{
                                                            marginLeft: 10,
                                                            color: '#686868',
                                                            fontSize: fontSizeH4().fontSize + 2,
                                                        }}>
                                                        {totalLikes[index]['likesCount']}
                                                    </Text>
                                                </Pressable>
                                                <Pressable
                                                    onPress={() => {
                                                        if (selectedPostIndex !== index) {
                                                            getComments(item?.id, index, item.type);
                                                        }
                                                    }}
                                                    style={{
                                                        height: '100%',
                                                        alignItems: 'center',
                                                        flexDirection: 'row',
                                                        paddingVertical: getWidthnHeight(2).width,
                                                    }}>
                                                    <Octicons
                                                        name="comment"
                                                        size={getWidthnHeight(6).width}
                                                        color="#686868"
                                                    />
                                                    <Text
                                                        style={{
                                                            marginLeft: 10,
                                                            color: '#686868',
                                                            fontSize: fontSizeH4().fontSize + 2,
                                                        }}>
                                                        {totalComments[index]['commentsCount']}
                                                    </Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                        {selectedPostIndex === index && (
                                            <View
                                                style={[
                                                    { alignItems: 'flex-end' },
                                                    getWidthnHeight(90),
                                                    getMarginTop(1),
                                                ]}>
                                                <View
                                                    style={[
                                                        {
                                                            borderColor: 'red',
                                                            borderWidth: 0,
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            width: '100%',
                                                        },
                                                    ]}>
                                                    {(!!userDetails?.User?.profilepic) ? (
                                                        <Avatar.Image
                                                            size={getWidthnHeight(12).width}
                                                            source={{ uri: userDetails?.User?.profilepic + '?' + moment().valueOf() }}
                                                        />
                                                    ) : (
                                                        <View style={{
                                                            width: getWidthnHeight(12).width,
                                                            height: getWidthnHeight(12).width,
                                                            borderRadius: getWidthnHeight(6).width,
                                                            borderWidth: 1, borderColor: '#C4C4C4',
                                                            backgroundColor: '#FFFFFF',
                                                            alignItems: 'center', justifyContent: 'center'
                                                        }}>
                                                            <Text style={{ fontSize: fontSizeH4().fontSize + 6, fontWeight: 'bold' }}>{userDetails?.User?.name[0].toUpperCase()}</Text>
                                                        </View>
                                                    )}
                                                    <TextInput
                                                        value={userComment}
                                                        placeholder="Add a comment.."
                                                        placeholderTextColor={'#C4C4C4'}
                                                        multiline={true}
                                                        // numberOfLines={1}
                                                        textColor="#000000"
                                                        cursorColor={'#00000090'}
                                                        style={[
                                                            {
                                                                color: '#000000',
                                                                borderColor: '#C4C4C4',
                                                                borderWidth: 1,
                                                                borderRadius: getWidthnHeight(1).width,
                                                                paddingHorizontal: getWidthnHeight(3).width,
                                                                backgroundColor: 'white',
                                                            },
                                                            getWidthnHeight(73),
                                                        ]}
                                                        onChangeText={text =>
                                                            setUserComment(text.trimStart())
                                                        }
                                                    />
                                                </View>
                                                {!!userComment && (
                                                    <Pressable
                                                        onPress={() => {
                                                            if (selectedComment?.id) {
                                                                updateComment(selectedComment?.id, item?.id, item?.type);
                                                            } else {
                                                                postComment(item?.id, item?.type);
                                                            }
                                                        }}
                                                        style={[
                                                            {
                                                                paddingHorizontal: getWidthnHeight(6).width,
                                                                paddingVertical: getWidthnHeight(2).width,
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                backgroundColor: '#0F9764',
                                                                borderRadius: getWidthnHeight(2).width,
                                                            },
                                                            getMarginTop(1),
                                                        ]}>
                                                        <Text
                                                            style={{
                                                                color: 'white',
                                                                fontWeight: 'bold',
                                                                fontSize: fontSizeH4().fontSize + 2,
                                                            }}>
                                                            Post
                                                        </Text>
                                                    </Pressable>
                                                )}
                                            </View>
                                        )}
                                        {selectedPostIndex === index &&
                                            item?.id === commentRecordId &&
                                            commentsList.length > 0 && (
                                                <View
                                                    style={[
                                                        {

                                                            borderColor: 'green',
                                                            borderWidth: 0,
                                                            //backgroundColor: 'black',
                                                            paddingVertical:
                                                                getMarginVertical(1).marginVertical,
                                                        }, getWidthnHeight(undefined, (commentsList.length === 1 ? 15 : commentsList.length === 2 ? 25 : commentsList.length === 3 ? 35 : 45))
                                                    ]}>
                                                    <ScrollView nestedScrollEnabled
                                                        contentContainerStyle={{
                                                            paddingHorizontal: getWidthnHeight(2).width
                                                        }}
                                                        showsVerticalScrollIndicator={true}
                                                        // indicatorStyle={"black"}
                                                        onScroll={({ nativeEvent }) => {
                                                            if (isCloseToBottom(nativeEvent)) {
                                                                setScrollComments(true)
                                                            } else {
                                                                setScrollComments(false)
                                                            }
                                                        }} >
                                                        <FlatList
                                                            nestedScrollEnabled
                                                            data={commentsList}
                                                            keyExtractor={subItem => `${subItem?.id}`}
                                                            renderItem={({ item: subItem, index: subIndex }) => {
                                                                // console.log("#@#@# COMMENT", item?.id, subItem?.created_by?.id)
                                                                if ((selectedComment?.index === subIndex) && !!userComment) {
                                                                    return;
                                                                }
                                                                return (
                                                                    <TouchableWithoutFeedback
                                                                        onPress={() => setSelectedCommentIndex(null)}>
                                                                        <View
                                                                            style={[
                                                                                {
                                                                                    alignItems: 'center',
                                                                                    shadowColor: '#000000',
                                                                                    shadowOpacity: 0.6,
                                                                                    shadowRadius: 5,
                                                                                    elevation: 5,
                                                                                    shadowOffset: { width: 0, height: 15 },
                                                                                },
                                                                                getWidthnHeight(80),
                                                                                getMarginTop(1.5),
                                                                            ]}>
                                                                            <View
                                                                                style={{
                                                                                    flex: 1,
                                                                                    alignItems: 'center',
                                                                                    borderColor: 'red',
                                                                                    borderWidth: 0,
                                                                                    padding: getWidthnHeight(2).width,
                                                                                    borderRadius: getWidthnHeight(3).width,
                                                                                    backgroundColor:
                                                                                        'rgba(196, 196, 196, 0.4)',
                                                                                }}>
                                                                                <View
                                                                                    style={{ flex: 1, alignItems: 'center' }}>
                                                                                    <View
                                                                                        style={{
                                                                                            width: '100%',
                                                                                            flexDirection: 'row',
                                                                                            alignItems: 'center',
                                                                                            justifyContent: 'space-evenly',
                                                                                            borderWidth: 0,
                                                                                            borderColor: 'cyan',
                                                                                        }}>
                                                                                        {(!!subItem?.created_by?.profilepic) ? (
                                                                                            <Avatar.Image
                                                                                                size={getWidthnHeight(12).width}
                                                                                                source={{ uri: subItem?.created_by?.profilepic + '?' + moment().valueOf() }}
                                                                                            />
                                                                                        ) : (
                                                                                            <View style={{
                                                                                                width: getWidthnHeight(12).width,
                                                                                                height: getWidthnHeight(12).width,
                                                                                                borderRadius: getWidthnHeight(6).width,
                                                                                                borderWidth: 1, borderColor: '#C4C4C4',
                                                                                                backgroundColor: '#FFFFFF',
                                                                                                alignItems: 'center', justifyContent: 'center'
                                                                                            }}>
                                                                                                <Text style={{ fontSize: fontSizeH4().fontSize + 6, fontWeight: 'bold' }}>{subItem?.created_by?.name[0].toUpperCase()}</Text>
                                                                                            </View>
                                                                                        )}
                                                                                        <View
                                                                                            style={[
                                                                                                {
                                                                                                    alignItems: 'flex-start',
                                                                                                    justifyContent: 'space-evenly',
                                                                                                    borderColor: 'red',
                                                                                                    borderWidth: 0,
                                                                                                    width: '75%',
                                                                                                },
                                                                                            ]}>
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
                                                                                                {subItem?.created_by?.name}
                                                                                            </Text>
                                                                                            <Text
                                                                                                style={{
                                                                                                    color: '#000000',
                                                                                                    textAlign: 'justify',
                                                                                                    fontSize:
                                                                                                        fontSizeH4().fontSize + 2,
                                                                                                    paddingVertical:
                                                                                                        getWidthnHeight(1).width,
                                                                                                    paddingHorizontal:
                                                                                                        getWidthnHeight(3).width,
                                                                                                    //width: '23%',
                                                                                                    borderColor: 'blue',
                                                                                                    borderWidth: 0,
                                                                                                }}>
                                                                                                {subItem?.content}
                                                                                            </Text>
                                                                                        </View>
                                                                                        {userDetails?.User?._id === subItem?.created_by?.id && (
                                                                                            <View
                                                                                                style={[
                                                                                                    {
                                                                                                        alignItems: 'center',
                                                                                                        borderColor: 'cyan',
                                                                                                        borderWidth: 0,
                                                                                                    },
                                                                                                    getMarginRight(-2),
                                                                                                ]}>
                                                                                                <Entypo
                                                                                                    style={[
                                                                                                        {
                                                                                                            paddingVertical:
                                                                                                                getWidthnHeight(3).width,
                                                                                                            paddingHorizontal:
                                                                                                                getWidthnHeight(2).width,
                                                                                                            borderColor: 'red',
                                                                                                            borderWidth: 0,
                                                                                                            alignItems: 'center',
                                                                                                        },
                                                                                                    ]}
                                                                                                    name="dots-three-vertical"
                                                                                                    size={getWidthnHeight(5).width}
                                                                                                    color="#5f5e5e"
                                                                                                    onPress={() => {
                                                                                                        const selection = Object.assign(
                                                                                                            subItem,
                                                                                                            { index: subIndex },
                                                                                                        );
                                                                                                        setSelectedCommentIndex(subIndex);
                                                                                                        setSelectedComment(selection);
                                                                                                    }}
                                                                                                />
                                                                                            </View>
                                                                                        )}
                                                                                    </View>
                                                                                </View>
                                                                                {selectedCommentIndex === subIndex && (
                                                                                    <View
                                                                                        style={[
                                                                                            {
                                                                                                backgroundColor: 'transparent',
                                                                                                alignItems: 'center',
                                                                                                justifyContent: 'center',
                                                                                                zIndex: 1999,
                                                                                            },
                                                                                            StyleSheet.absoluteFill,
                                                                                        ]}
                                                                                    // pointerEvents="none"
                                                                                    >
                                                                                        <View
                                                                                            style={{
                                                                                                width: '100%',
                                                                                                height: '100%',
                                                                                                alignItems: 'flex-end',
                                                                                                borderColor: 'blue',
                                                                                                borderWidth: 0,
                                                                                                justifyContent: 'center',
                                                                                            }}>
                                                                                            <EditDelete
                                                                                                item={selectedComment}
                                                                                                resize={true}
                                                                                            />
                                                                                        </View>
                                                                                    </View>
                                                                                )}
                                                                            </View>
                                                                        </View>
                                                                    </TouchableWithoutFeedback>
                                                                );
                                                            }}
                                                        />
                                                    </ScrollView>
                                                </View>
                                            )}
                                    </View>
                                </View>
                            );
                        }}
                    />
                </View>
            </>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    shareDiv: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
