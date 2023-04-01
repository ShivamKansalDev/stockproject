import React, { useEffect, useState } from 'react'
import {
    StyleSheet, SafeAreaView, Image, Keyboard, ActivityIndicator,
    FlatList, TouchableOpacity, Dimensions, Text, View, ScrollView
} from 'react-native';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import ProfileHeader from '../../Components/Header/ProfileHeader'
import StatusBarView from '../../Components/StatusBar'
import IndexItem from '../../Components/IndexItem';
import { getWidthnHeight, fontSizeH4, getMarginTop, getMarginLeft, getMarginBottom } from '../../Components/width';
import { selectedWatchlist } from '../../Action/WatchList';
import axios from 'axios';
import { companyUrl } from '../../Url';
import { WatchListSearchModal } from '../../Components/Modal/WatchListModal';
import { getUnlistedSearchDetails } from '../../Action/UnlistedSearch';
import { getCompanyDetails, getPriceVolume, getScore, getEvent } from '../../Action/CompanyDetails';
import { getChecklist } from '../../Action/CheckList';

const WatchListAdd = ({ navigation }) => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [viewWatchlist, setViewWatchlist] = useState({});
    const [searchedStocks, setSearchedStocks] = useState([]);
    const watchlist = useSelector(state => state.WatchList);
    const User = useSelector(state => state.User);
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const authToken = User?.authToken;

    const iconPlus = 'plus-square';

    // console.log("WATCHLIST ADD: ", watchlist);

    useEffect(() => {
        if (!isFocused) {
            dispatch(selectedWatchlist(null))
        } else {
            viewWatchlistFunction();
        }
    }, [isFocused])

    useEffect(() => {
        if (viewWatchlist?.data?.length > 0) {
            let updateIndex = [];
            const data = searchedStocks.map((item) => {
                return {
                    ...item,
                    icon: iconPlus
                }
            })
            viewWatchlist?.data.forEach((item) => {
                data.forEach((subItem, subIndex) => {
                    if (item.co_code === subItem.co_code) {
                        updateIndex.push(subIndex)
                    }
                })
            })
            updateIndex.sort((a, b) => a - b);
            updateIndex.forEach((indexValue) => {
                data[indexValue] = {
                    ...data[indexValue],
                    icon: "minus-square"
                }
            })
            console.log("@#@#@#@# USEEFFECT UPDATE DATA: ", data.length)
            setSearchedStocks(data)
        } else {
            const data = searchedStocks.map((item) => {
                return {
                    ...item,
                    icon: iconPlus
                }
            })
            setSearchedStocks(data)
        }
    }, [viewWatchlist?.data?.length]);

    function showLoader() {
        Keyboard.dismiss();
        setLoading(true);
    }

    function hideLoader() {
        setLoading(false);
    }

    function viewWatchlistFunction() {
        showLoader();
        axios.get(`${companyUrl}/watchlist/view/BSE/${watchlist.id}/1`, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        }).then((response) => {
            hideLoader();
            console.log("#$#$#$*(*(*&*&* VIEW WATCHLIST RESPONSE: ", response.data);
            setViewWatchlist(response.data)
        }).catch((error) => {
            hideLoader();
            console.log("@#@#@ VIEW WATCHLIST ERROR: ", JSON.stringify(error.response, null, 4))
        })
    }

    function searchStocks(text) {
        axios.get(
            `${companyUrl}/listed/search?term=${text}`,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
            },
        ).then(response => {
            let data = response.data;
            let updateIndex = [];
            viewWatchlist?.data.forEach((item) => {
                data.forEach((subItem, subIndex) => {
                    if (item.co_code === subItem.co_code) {
                        updateIndex.push(subIndex)
                    }
                })
            })
            updateIndex.sort((a, b) => a - b);
            updateIndex.forEach((indexValue) => {
                data[indexValue] = {
                    ...data[indexValue],
                    icon: "minus-square"
                }
            })
            console.log("@#@#@#@# UPDATE DATA: ", data)
            setSearchedStocks(data)
        }).catch(error => {
            console.log("@#@#@#@%$**&&* SEARCH STOCK ERROR: ", error)
        });
    }

    function addRemoveStock(action = 'addItem', co_code) {
        console.log("@#@#@#@#@#@ ACTION: ", `${companyUrl}/watchlist/${action}`, `Company/${co_code}`, watchlist.id);
        showLoader();
        axios.put(`${companyUrl}/watchlist/${action}`, {
            "itemId": `Company/${co_code}`,
            "watchListIds": [
                watchlist.id
            ]
        },
            {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            }).then((response) => {
                hideLoader();
                console.log("#$#@@#@#(()**(* REMOVE STOCK RESPONSE: ", response.data);
                viewWatchlistFunction();
            }).catch((error) => {
                hideLoader();
                console.log("#@#@!&*!@!@! REMOVE STOCK ERROR: ", JSON.stringify(error.response, null, 4))
            })
    }

    const getListedCompanyDetails = item => {
        console.log("^^^^^^^^&&&&&&&&& LISTED ITEM: ", item.co_code)
        const startDate1 = moment(moment().subtract(10, 'days')).format(
            'DD-MMM-YYYY',
        );
        const endDate1 = moment(new Date()).format('DD-MMM-YYYY');
        dispatch(getCompanyDetails(item.co_code, authToken));

        dispatch(getPriceVolume('NSE', item.co_code, startDate1, endDate1, authToken));

        dispatch(getScore(item.co_code, authToken));
        dispatch(getEvent(item.co_code, authToken));
        dispatch(getChecklist(authToken));
        // navigation.navigate('CompanyDetails', { co_code: item.co_code });
        navigation.navigate('TabNaV', {
            screen: 'ListedNavigator',
            params: {
                screen: 'CompanyDetails',
                params: { co_code: item.co_code },
                initial: false
            }
        });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
            <StatusBarView />
            <ProfileHeader />
            <View style={{ flex: 1, alignItems: 'center', width: '100%' }}>
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
                    </View>
                    <TouchableOpacity style={{
                        paddingHorizontal: getWidthnHeight(3).width,
                        borderRadius: getWidthnHeight(6).width,
                        paddingVertical: getWidthnHeight(1).width,
                        justifyContent: 'center',
                        alignSelf: 'flex-end',
                        marginVertical: 15,
                        marginRight: 15,
                        alignItems: 'center',
                        flexDirection: 'row',
                        borderColor: '#0F9764',
                        borderWidth: 1.5
                    }}
                        onPress={() => {
                            // navigation.navigate('WatchListAddStocks')
                            setShowModal(true)
                        }}>

                        <Feather name="plus" size={getWidthnHeight(6).width} color="#0F9764" />
                        <Text style={{ color: '#0F9764', fontSize: fontSizeH4().fontSize + 2 }}>Add Stocks</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        {((viewWatchlist?.data?.length === 0) && viewWatchlist?.total_records === 0) ? (
                            <Text style={{ fontSize: fontSizeH4().fontSize + 8 }}>No Results Found</Text>
                        )
                            :
                            (
                                <FlatList
                                    data={viewWatchlist?.data}
                                    keyExtractor={(item) => item.co_code}
                                    renderItem={({ item }) => {
                                        return (
                                            <View style={[{ flexDirection: 'row', alignItems: 'center' }, getWidthnHeight(95), getMarginBottom(2)]}>
                                                <TouchableOpacity
                                                    activeOpacity={0.5}
                                                    style={[{
                                                        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                                                        borderLeftWidth: getWidthnHeight(0.7).width, borderColor: Math.sign(Number(item.price_diff)) === 1 ? "#0F9764" : 'red',
                                                        paddingLeft: getWidthnHeight(1).width
                                                    }]}
                                                    onPress={() => {
                                                        if (item.list_info === 'listed') {
                                                            getListedCompanyDetails(item);
                                                        } else {
                                                            dispatch(getUnlistedSearchDetails(item._id, navigation, authToken));
                                                        }
                                                    }}
                                                >
                                                    <View style={[{ borderWidth: 0, borderColor: 'cyan', paddingVertical: getWidthnHeight(1.5).width }, getWidthnHeight(38)]}>
                                                        <ScrollView horizontal>
                                                            <View>
                                                                <Text style={{}}>{item.name}</Text>
                                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                    <Text style={[]}>{item.exchange}</Text>
                                                                    <Text style={[getMarginLeft(2)]}>{item.list_info}</Text>
                                                                </View>
                                                            </View>
                                                        </ScrollView>
                                                    </View>
                                                    <View style={[{ borderWidth: 0, borderColor: 'green', paddingVertical: getWidthnHeight(1.5).width }, getWidthnHeight(23)]}>
                                                        <Text style={{ textAlign: 'center' }}>{item.open}</Text>
                                                        <Text style={{ textAlign: 'center' }}>{item.close}</Text>
                                                    </View>
                                                    <View style={[{ borderWidth: 0, borderColor: 'tomato', paddingVertical: getWidthnHeight(1.5).width }, getWidthnHeight(23)]}>
                                                        <Text style={{ textAlign: 'center' }}>{item.high}</Text>
                                                        <Text style={{ textAlign: 'center' }}>{item.low}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                    <AntDesign
                                                        onPress={() => addRemoveStock('removeItem', item.co_code)}
                                                        name='closecircle'
                                                        size={getWidthnHeight(7).width}
                                                        color="#000000"
                                                    />
                                                </View>
                                            </View>
                                        );
                                    }}
                                />
                            )}
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
                            color="#ffffff"
                            size={'large'}
                            style={[{ transform: [{ scale: 2 }] }, getMarginTop(-10)]}
                        />
                    )}
                </View>
                {(showModal) && (<WatchListSearchModal
                    visible={showModal}
                    onDismiss={() => {
                        setShowModal(false);
                        setSearchedStocks([]);
                        Keyboard.dismiss();
                    }}
                    containerStyle={[
                        {
                            backgroundColor: 'white',
                            borderRadius: getWidthnHeight(2).width,
                            // paddingVertical: getWidthnHeight(5).width
                        },
                        getWidthnHeight(90, 60),
                    ]}
                    submit={(title) => searchStocks(title)}
                    searchedStocks={searchedStocks}
                    addRemoveStock={(action, co_code) => addRemoveStock(action, co_code)}
                    selectedData={viewWatchlist?.data}
                    loading={loading}
                />)}
            </View>
        </SafeAreaView>
    )
}

export default WatchListAdd

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15,
        paddingHorizontal: 30

    },
    // listItem: {
    //     maxWidth: Dimensions.get('window').width /2,
    //     flex:0.5,
    //     backgroundColor: '#fff',
    //     marginBottom: 30,
    //     borderRadius: 4,
    // },
})