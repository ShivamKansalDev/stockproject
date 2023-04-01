import {
    StyleSheet,
    SafeAreaView,
    Image,
    FlatList,
    TouchableOpacity,
    Dimensions,
    Text,
    View,
    Keyboard,
    ActivityIndicator,
    Pressable
} from 'react-native';
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useCallback } from 'react';
import axios from 'axios';

import { companyUrl } from '../../Url';
import { WatchListModal } from '../../Components/Modal/WatchListModal';
import ProfileHeader from '../../Components/Header/ProfileHeader';
import StatusBarView from '../../Components/StatusBar';
import { fontSizeH4, getMarginBottom, getMarginRight, getMarginTop, getWidthnHeight } from '../../Components/width';
import WatchListAdd from '../WatchListAdd';
import { selectedWatchlist } from '../../Action/WatchList';

const Stack = createNativeStackNavigator();

const image = [
    { name: 'Reliance Industries' },
    { name: 'Reliance Industries' },
    { name: 'Reliance Industries' },
    { name: 'Reliance Industries ' },
];

export const WatchlistNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="WatchList"
        >
            <Stack.Screen options={{ headerShown: false }} name="WatchList" component={WatchList} />
            <Stack.Screen options={{ headerShown: false }} name="WatchListAdd" component={WatchListAdd} />
        </Stack.Navigator>
    )
}

const WatchList = ({ navigation }) => {
    const [showModal, setShowModal] = useState(false);
    const [list, setList] = useState([]);
    const [editItem, setEditItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const User = useSelector(state => state.User);
    const watchlist = useSelector(state => state.WatchList);

    console.log("!@!@!@!@!@!@!@!@!@ WATCHLIST SCREEN: ", watchlist)

    const dispatch = useDispatch();
    const authToken = User?.authToken;
    __DEV__ && console.log("@#@#@#@# AUTH TOKEN: ", authToken)

    useEffect(() => {
        getWatchList();
    }, [getWatchList]);

    function showLoader() {
        Keyboard.dismiss();
        setLoading(true);
    }

    function hideLoader() {
        setLoading(false);
    }

    const getWatchList = useCallback(() => {
        showLoader();
        axios.get(`${companyUrl}/watchlist`,
            {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            }).then((response) => {
                hideLoader();
                console.log("@#@#@#@# GET WATCHLIST : ", response.data);
                setList(response.data)
            }).catch((error) => {
                hideLoader();
                console.log("@#@#@#@# GET WATCHLIST ERROR: ", JSON.stringify(error, null, 4));
            })
    }, [companyUrl]);

    function createWatchList(title) {
        showLoader();
        axios.post(`${companyUrl}/watchlist/create`, {
            "name": title,
            "list": []
        },
            {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            }).then((response) => {
                hideLoader();
                console.log("@#@#@#@# WATCHLIST CREATED: ", response.data);
                getWatchList();
            }).catch((error) => {
                hideLoader();
                console.log("@#@#@#@# WATCHLIST ERROR: ", JSON.stringify(error, null, 4));
            })
    }

    function renameWatchList(title, item) {
        showLoader();
        // console.log('EDITED: ', `${companyUrl}/watchlist/rename/${item.id}/${title}`)
        axios.patch(`${companyUrl}/watchlist/rename/${item.id}/${title}`, null,
            {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            }).then((response) => {
                hideLoader();
                console.log("@#@#@#@# WATCHLIST RENAMED: ", response.data);
                getWatchList();
            }).catch((error) => {
                hideLoader();
                console.log("@#@#@#@# WATCHLIST RENAME ERROR: ", JSON.stringify(error.response, null, 4));
            })
    }

    function deleteWatchList(id) {
        showLoader();
        axios.delete(`${companyUrl}/watchlist/delete/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            }).then((response) => {
                hideLoader();
                console.log("@#@#@#@# WATCHLIST DELETED: ", response.data);
                getWatchList();
            }).catch((error) => {
                hideLoader();
                console.log("@#@#@#@# WATCHLIST DELETE ERROR: ", JSON.stringify(error.response, null, 4));
            })
    }

    const Item = ({ item }) => {
        return (
            <View
                style={[{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottomColor: '#D4D2D2',
                    borderBottomWidth: 1,
                    paddingVertical: getWidthnHeight(2).width
                }, getWidthnHeight(92), getMarginBottom(1)]}>
                <Pressable onPress={() => {
                    dispatch(selectedWatchlist(item));
                    navigation.navigate('WatchListAdd')
                }}>
                    <Text style={[{
                        paddingHorizontal: getWidthnHeight(2).width, color: 'black', fontWeight: 'bold', fontSize: fontSizeH4().fontSize + 2,
                        borderWidth: 0, borderColor: 'red'
                    }, getWidthnHeight(65)]}>{item.name}</Text>
                </Pressable>
                <View
                    style={{
                        flex: 1,
                        borderColor: 'blue',
                        borderWidth: 0,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingRight: getWidthnHeight(1).width
                    }}>
                    <FontAwesome5
                        name="edit"
                        size={getWidthnHeight(6).width}
                        color="#9fa0a3"
                        style={[getMarginRight(3)]}
                        onPress={() => {
                            setEditItem(item)
                            setShowModal(true)
                        }}
                    />
                    <MaterialIcons
                        name="delete-outline"
                        size={getWidthnHeight(7.5).width}
                        color="#9fa0a3"
                        onPress={() => deleteWatchList(item.id)}
                    />
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBarView />
            <ProfileHeader />
            <View style={[{ flex: 1, alignItems: 'center' }]}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View
                        style={[{
                            borderRadius: 5,
                            padding: getWidthnHeight(3).width,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 5,
                            backgroundColor: '#f2f2f2',
                        }, getWidthnHeight(92)]}>
                        <Text style={{ color: '#0F9764', fontWeight: 'bold', fontSize: fontSizeH4().fontSize + 5 }}>Watchlist</Text>
                        <Pressable
                            onPress={() => {
                                // navigation.navigate('WatchListAdd');
                                setShowModal(true)
                            }}>
                            <MaterialIcons
                                name="add-circle-outline"
                                size={getWidthnHeight(8).width}
                                color="#0F9764"
                            />
                        </Pressable>
                    </View>
                    <View style={[{ alignItems: 'center' }, getMarginTop(2)]}>
                        <FlatList
                            keyExtractor={(item) => item.id}
                            data={list}
                            renderItem={({ item }) => {
                                return (
                                    <Item item={item} />
                                );
                            }}
                        />
                    </View>
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
                            color="#0F9764"
                            size={'large'}
                            style={[{ transform: [{ scale: 2 }] }, getMarginTop(-10)]}
                        />
                    )}
                </View>
                {(showModal) && (<WatchListModal
                    visible={showModal}
                    onDismiss={() => {
                        setShowModal(false);
                        setEditItem(null);
                        Keyboard.dismiss();
                    }}
                    containerStyle={[
                        {
                            backgroundColor: 'white',
                            borderRadius: getWidthnHeight(2).width,
                        },
                        getWidthnHeight(90),
                    ]}
                    submit={(title) => createWatchList(title)}
                    renameWatchList={(title, item) => renameWatchList(title, item)}
                    editItem={editItem}
                />)}
            </View>
            {/* ===========item=========== */}
        </SafeAreaView>
    );
};

export default WatchList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15,
        paddingHorizontal: 30,
    },
    // listItem: {
    //     maxWidth: Dimensions.get('window').width /2,
    //     flex:0.5,
    //     backgroundColor: '#fff',
    //     marginBottom: 30,
    //     borderRadius: 4,
    // },
});
