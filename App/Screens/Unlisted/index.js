import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    LogBox,
    StatusBar,
    FlatList,
    Image,
    Text,
    View,
    ScrollView,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Octicons from 'react-native-vector-icons/Octicons';
import moment from 'moment';
import { useDispatch, useSelector, connect } from 'react-redux';

import ProfilHeaderWithOut from '../../Components/Header/ProfilHeaderWithOut';
import SenSexSingleboxUnlisted from '../../Components/SenSexSingleboxUnlisted';
import BrandImage from '../../Components/BrandImage';
import BottomSheetView1 from '../../Components/BottomSheetView';
import { IPO } from '../../ActionType/Ipo';
import {
    IPO_ALL_LIST,
    IPO_FILTER_LIST,
    IPO_IS_SELECTED,
} from '../../ActionType/IpoRouteNameForFilter';
import { getBestPerformingIPO } from '../../Action/Unlisted';
import UnlistedSearch from '../UnlistedSearch';
import ProfileHeader from '../../Components/Header/ProfileHeader';
import Ipo from '../Ipo';
import CompanyDetails from '../CompanyDetails';

const Stack = createNativeStackNavigator();

export const UnlistedNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Unlisted"
            screenOptions={{ headerShow: false }}>
            <Stack.Screen
                options={{ headerShown: false }}
                name="Unlisted"
                component={Unlisted}
            />
            <Stack.Screen options={{ headerShown: false }} name="Ipo" component={Ipo} />
            <Stack.Screen
                options={{ headerShown: false }}
                name="UnlistedSearch"
                component={UnlistedSearch}
            />
            {/* <Stack.Screen options={{ headerShown: false }} name="CompanyDetails2" component={CompanyDetails} /> */}
        </Stack.Navigator>
    );
};

const Unlisted = ({ navigation }) => {
    const dispatch = useDispatch();
    const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, []);
    const [loder, setloder] = useState(true);

    const { IpoRouteNameForFilterList } = useSelector(
        state => state.IpoRouteNameForFilter,
    );
    const { IpoRouteNameForFilterListAll } = useSelector(
        state => state.IpoRouteNameForFilter,
    );
    const counntData = IpoRouteNameForFilterListAll.filter(
        item => item.isChecked,
    );

    const { BestPerformingIPO } = useSelector(state => state.BestPerformingIPO);

    const [buttonType, setButtonType] = useState('chat');
    const [bseAndNse, setbseAndNsee] = useState('BSE');
    const chart = () => {
        setButtonType('chat');
    };
    const explore = () => {
        setButtonType('explore');
    };
    const bottomSheetRef = useRef(null);

    useEffect(() => {
        dispatch(getBestPerformingIPO(setloder, 'bse'));
        dispatch({
            type: IPO_ALL_LIST,
        });
    }, []);
    const seleted = id => {
        dispatch({
            type: IPO_IS_SELECTED,
            payload: {
                id: id,
            },
        });
    };
    const filterData = () => {
        dispatch({
            type: IPO_FILTER_LIST,
        });
        bottomSheetRef.current.close();
    };
    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <StatusBar backgroundColor="transparent" barStyle="dark-content" />
                <ProfileHeader />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    style={{ backgroundColor: 'white' }}>
                    <View style={{ paddingHorizontal: 5 }}>
                        <BrandImage />
                    </View>

                    {/* ===========company View======= */}

                    {/* ===========company View======= */}
                    <Text
                        style={{
                            color: '#12626C',
                            marginLeft: 15,
                            marginVertical: 15,
                            fontSize: 18,
                            fontWeight: '600',
                        }}>
                        Best Performing IPO{' '}
                    </Text>
                    <View
                        style={{
                            width: '100%',
                            paddingHorizontal: 15,
                            flexDirection: 'row',
                            height: 90,
                        }}>
                        <View
                            style={{
                                width: '100%',
                                height: '100%',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                            <SenSexSingleboxUnlisted
                                title={BestPerformingIPO[0]?.CO_NAME}
                                title1={moment(BestPerformingIPO[0]?.LISTDATE).format(
                                    'Do MMM YYYY',
                                )}
                                title2="CLOSE"
                                title3={
                                    BestPerformingIPO[0]?.PerChange > 0
                                        ? `+${Number(BestPerformingIPO[0]?.PerChange.toFixed(2))}%`
                                        : `${Number(BestPerformingIPO[0]?.PerChange.toFixed(2))}%`
                                }
                            />
                            <SenSexSingleboxUnlisted
                                title={BestPerformingIPO[1]?.CO_NAME}
                                title1={moment(BestPerformingIPO[1]?.LISTDATE).format(
                                    'Do MMM YYYY',
                                )}
                                title2="CLOSE"
                                title3={
                                    BestPerformingIPO[1]?.PerChange > 0
                                        ? `+${Number(BestPerformingIPO[1]?.PerChange.toFixed(2))}%`
                                        : `${Number(BestPerformingIPO[1]?.PerChange.toFixed(2))}%`
                                }
                            />
                            <SenSexSingleboxUnlisted
                                title={BestPerformingIPO[2]?.CO_NAME}
                                title1={moment(BestPerformingIPO[2]?.LISTDATE).format(
                                    'Do MMM YYYY',
                                )}
                                title2="CLOSE"
                                title3={
                                    BestPerformingIPO[2]?.PerChange > 0
                                        ? `+${Number(BestPerformingIPO[2]?.PerChange.toFixed(2))}%`
                                        : `${Number(BestPerformingIPO[2]?.PerChange.toFixed(2))}%`
                                }
                            />
                        </View>
                    </View>
                    {/* ==========brand image======= */}

                    {/* ==========toggle=== */}
                    <View
                        style={{
                            width: '100%',
                            height: 50,
                            flexDirection: 'row',
                            paddingHorizontal: 15,
                            alignItems: 'center',
                        }}>
                        <View
                            style={{ width: '80%', height: '100%', justifyContent: 'center' }}>
                            <Text style={{ color: '#12626C', fontWeight: '500', fontSize: 16 }}>
                                Explore
                            </Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                bottomSheetRef.current.snapToIndex(2);
                            }}
                            style={{
                                width: '20%',
                                height: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                            }}>
                            <Text>
                                {' '}
                                <Octicons name="diff-added" size={24} color="#0F9764" />
                            </Text>
                            <Text
                                style={{ marginLeft: 10, fontWeight: '900', color: '#0F9764' }}>
                                Add
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/* ================ */}

                    <FlatList
                        style={{ margin: 8, borderColor: 'red', borderWidth: 0 }}
                        nestedScrollEnabled={true}
                        data={IpoRouteNameForFilterList}
                        numColumns={2}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        dispatch({
                                            type: IPO,
                                            data: item.value,
                                        });
                                        // console.log('IPO: ', item.value);
                                        // navigation.navigate('CommunityDrawer', {
                                        //     screen: 'Ipo',
                                        //     params: {
                                        //         screen: item.value,
                                        //     },
                                        // });
                                        navigation.navigate('Ipo',
                                            {
                                                screen: item.value,
                                                initial: false
                                            },
                                        );
                                    }}
                                    style={{
                                        flex: 1,
                                        margin: 8,
                                        borderRadius: 5,

                                        borderColor: '#EBEBEB',
                                        borderWidth: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 150,
                                    }}>
                                    <View style={{ width: 70, height: 70 }}>
                                        <Image
                                            source={item.img}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                resizeMode: 'cover',
                                            }}
                                        />
                                    </View>
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            );
                        }}
                    />
                    <View style={{ height: 60 }}></View>
                </ScrollView>
            </SafeAreaView>
            {/* <BottomSheetView1
                snapPoints={snapPoints}
                bottomSheetRef={bottomSheetRef}
            /> */}
            <BottomSheetView1
                data={IpoRouteNameForFilterListAll}
                onPress={seleted}
                onPress1={filterData}
                counntData={counntData}
                snapPoints={snapPoints}
                bottomSheetRef={bottomSheetRef}
            />
        </>
    );
};

export default connect(null, {})(Unlisted);

const styles = StyleSheet.create({
    companyView: { paddingHorizontal: 10, flexDirection: 'row', width: '100%' },

    companyLeft: {
        paddingHorizontal: 10,
        height: 40,
        alignItems: 'center',
        flexDirection: 'row',
    },
    companyInneview: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        backgroundColor: '#D7D9E4',
        borderRadius: 10,
    },
    // container: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     paddingTop: 15,
    //     paddingHorizontal: 35,

    // },
    flatContainer: {
        width: '100%',
        flexWrap: 'wrap',

        flexDirection: 'row',
    },
    flatItem: {
        width: '45%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',

        borderRadius: 5,

        borderColor: '#EBEBEB',
        borderWidth: 1,

        // shadowColor: "#aaaaaa",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.23,
        // shadowRadius: 2.62,

        // elevation: 4,
    },
});
