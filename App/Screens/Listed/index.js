import React, { useState, useMemo, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    Text,
    FlatList,
    Image,
    View,
    LogBox,
    ScrollView,
    Animated,
    Easing
} from 'react-native';
import moment from 'moment';
import ProfileHeader from '../../Components/Header/ProfileHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import TextTicker from 'react-native-text-ticker';

import SenSexSinglebox from '../../Components/SenSexSinglebox';
import BrandImage from '../../Components/BrandImage';
import ToggleTypeButton from '../../Components/ToggleTypeButton';
import LineChart1 from '../../Components/LineChart';
import VolumeChart from '../../Components/VolumeChart';

import BseAndNse from '../../Components/BseAndNse';
import BottomSheetView1 from '../../Components/BottomSheetView';
import { connect, useDispatch, useSelector } from 'react-redux';
import { SENSEX_ROUTE_NAME } from '../../ActionType/SenSexRoute';
import { getListedHomeIndex } from '../../Action/CompanyName';
import OneRowLoder from '../../Components/Lodder/OneRowLoder';
import ThreeColumLoder from '../../Components/Lodder/ThreeColumLoder';
import { getListNiftySensex } from '../../Action/ListedNiftySensex';
import { getGroupMsterForDomesticIndex } from '../../Action/GroupMasterForDomesticIndex';
import { getListedchartBse } from '../../Action/ListedLinechart';
import {
    ALL_LIST,
    IS_SELECTED,
    FILTER_LIST,
} from '../../ActionType/BottoSheetDataList';
import { getWidthnHeight } from '../../Components/width';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IndexSenSexListed from '../IndexSenSexListed';
import CompanyDetails from '../CompanyDetails';

const Stack = createNativeStackNavigator();

export const ListedNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName='Listed'
            screenOptions={({ navigation }) => ({
                headerShown: false
            })}
        >
            <Stack.Screen options={{ headerShown: false }} name='Listed' component={Listed} />
            <Stack.Screen options={{ headerShown: false }} name="IndexSenSexListed" component={IndexSenSexListed} />
            <Stack.Screen options={{ headerShown: false }} name="CompanyDetails" component={CompanyDetails} />
        </Stack.Navigator>
    );
}

const Listed = ({
    navigation
}) => {
    const [animateMarquee, setAnimateMarquee] = useState(new Animated.Value(0))
    const { CompanyName = [] } = useSelector(state => state.CompanyName);
    const { BottoSheetDataList } = useSelector(state => state.BottoSheetDataList);
    const { ListedNiftySensex } = useSelector(state => state.ListedNiftySensex);
    const { ExchangeHolidays } = useSelector(state => state.ExchangeHolidays)
    //   console.log(ListedNiftySensex[68],'BottoSheetDataListllll');
    const { BottoSheetDataListAll } = useSelector(
        state => state.BottoSheetDataList,
    );
    const counntData = BottoSheetDataListAll.filter(item => item.isChecked);
    const scrollRef = useRef(null);

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, []);
    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.User)
    const [buttonType, setButtonType] = useState('chart');
    const [bseAndNse, setbseAndNsee] = useState('BSE');
    const [indexLoder, setIndexLoder] = useState(true);
    const [niftySense, setniftySensex] = useState(true);
    const [animateData, setAnimateData] = useState([]);
    const [itemData, setItemData] = useState([]);
    const [layoutWidth, setLayoutWidth] = useState(0);
    const authToken = userDetails?.authToken;

    const chart = () => {
        setButtonType('chart');
    };
    const explore = () => {
        setButtonType('explore');
    };
    const bse = () => {
        setbseAndNsee('BSE');
    };
    const nse = () => {
        setbseAndNsee('NSE');
    };
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);
    useEffect(() => {
        dispatch(getListedHomeIndex(setIndexLoder));
        dispatch(getListNiftySensex(setniftySensex));
    }, []);
    useEffect(() => {
        dispatch(getGroupMsterForDomesticIndex(authToken));
    }, []);
    useEffect(() => {
        dispatch({
            type: ALL_LIST,
        });
    }, []);
    const seleted = id => {
        dispatch({
            type: IS_SELECTED,
            payload: {
                id: id,
            },
        });
    };
    const filterData = () => {
        dispatch({
            type: FILTER_LIST,
        });
        bottomSheetRef.current.close();
    };

    useEffect(() => {
        console.log("^&&&&&&& SAVED LAYOUT WIDTH: ", animateData.length, layoutWidth)
        if (animateData.length > 0 && layoutWidth > 0) {
            // console.log("#$#$#$#$# SAVED LAYOUT WIDTH: ", layoutWidth)
            Animated.loop(
                Animated.timing(animateMarquee, {
                    toValue: 1,
                    duration: (animateData.length > 30) ? 50000 : 30000,
                    useNativeDriver: false,
                    easing: Easing.linear
                })
            ).start()
        }
    }, [animateData, layoutWidth]);

    let animateWidth = 0;

    function onLayout(e, i) {
        const { width } = e.nativeEvent.layout;
        animateWidth += width;
        if (i === (CompanyName.length - 1)) {
            // console.log("^^^^^^^^^^^^********** ANIMATE WIDTH: ", animateWidth)
            setLayoutWidth(animateWidth)
        }
    }

    function animateTextFunction() {
        const animateText = CompanyName.map((item, i) => {
            return {
                id: `${i}-${item.Co_Code}`, component: (
                    <View onLayout={(e) => onLayout(e, i)} key={i} style={[styles.companyLeft]}>
                        <Text style={{ color: '#12626C' }}>{item.Co_Name} </Text>
                        <Text
                            style={{
                                color: item?.Price_Diff > 0 ? 'green' : 'red',
                            }}>
                            {item.Low_Price}
                        </Text>
                        <AntDesign
                            name="caretdown"
                            style={{
                                transform: [
                                    {
                                        rotate:
                                            item?.Price_Diff > 0 ? '180deg' : '0deg',
                                    },
                                ],
                                marginLeft: 4,
                            }}
                            size={16}
                            color={item?.Price_Diff > 0 ? 'green' : 'red'}
                        />
                    </View>
                )
            };
        })
        // console.log("@!@!@!@#@ ANIMATE ARRAY: ", animateText)
        setAnimateData(animateText)
    }

    useEffect(() => {
        // console.log("^^^^^^^^^^ COMPANY NAME DATA: ", CompanyName?.length)
        if (Array.isArray(CompanyName) && CompanyName?.length > 0 && !indexLoder) {
            console.log("^^^^^^^^^^ CALL FUNCTION^^^^^^^^^^")
            animateTextFunction();
        }
    }, [CompanyName, indexLoder]);

    const getDateData = () => {
        // Get the current date
        const today = new Date();// Get the last day of the current month
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);// Find the last Thursday of the month
        let lastThursday = new Date(lastDayOfMonth); while (lastThursday.getDay() !== 4) {
            lastThursday.setDate(lastThursday.getDate() - 1);
        }

        const findate = ExchangeHolidays.find(i => moment(i.HolidayDate).format('YYYY-MM-DD') == moment(lastThursday).format('YYYY-MM-DD'))
        if (findate) {
            const endDate1 = moment((findate.HolidayDate)).subtract(1, 'days').format('YYYY-MM-DD')
            dispatch(getListedchartBse(endDate1))
        } else {
            const endDate11 = moment((lastThursday)).subtract(1, 'days').format('YYYY-MM-DD')
            dispatch(getListedchartBse(endDate11))
        }
    }

    useEffect(() => {
        getDateData()
    }, [])

    let animatedNumber = animateMarquee.interpolate({
        inputRange: [0, 1],
        outputRange: [getWidthnHeight(100).width, ((-1) * layoutWidth)]
    })

    // console.log("#@#@#@# ANIMATION: ", typeof animatedNumber, animatedNumber);

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
                <StatusBar backgroundColor="transparent" barStyle="dark-content" />
                <ProfileHeader />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    style={{ backgroundColor: 'white' }}>
                    {/* ===========company View======= */}
                    <View style={styles.companyView}>
                        {indexLoder ? (
                            <OneRowLoder />
                        ) : (
                            (animateData.length > 0) && (
                                <View style={[{ alignItems: 'center' }, getWidthnHeight(100)]}>
                                    <View style={[{
                                        justifyContent: 'center',
                                        backgroundColor: '#D7D9E4',
                                        borderRadius: getWidthnHeight(2).width,
                                        overflow: 'hidden'
                                    }, getWidthnHeight(93, 6)]}>
                                        <Animated.View style={[styles.companyInneview, { borderWidth: 0, borderColor: 'red', transform: [{ translateX: (animatedNumber) }] }]}>
                                            {animateData.map((item) => item.component)}
                                        </Animated.View>
                                    </View>
                                </View>
                            )
                        )}
                    </View>
                    {/* ===========company View======= */}
                    <Text style={styles.company}>Indicies</Text>
                    {niftySense ? (
                        <ThreeColumLoder />
                    ) : (
                        <View
                            style={{
                                width: '100%',
                                paddingHorizontal: 10,
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
                                <SenSexSinglebox
                                    title={ListedNiftySensex[68]?.lname}
                                    price={ListedNiftySensex[68]?.Last}
                                    percent={
                                        ListedNiftySensex[68]?.Change > 0
                                            ? `${Number(ListedNiftySensex[68]?.Change.toFixed(2))}`
                                            : `${Number(ListedNiftySensex[68]?.Change.toFixed(2))}`
                                    }
                                    color={ListedNiftySensex[68]?.Change > 0 ? 'green' : 'red'}
                                    rotate={ListedNiftySensex[68]?.Change > 0 ? '180deg' : '0deg'}
                                />
                                <SenSexSinglebox
                                    title={ListedNiftySensex[43]?.lname}
                                    price={ListedNiftySensex[43]?.Last}
                                    percent={
                                        ListedNiftySensex[43]?.Change > 0
                                            ? `${Number(ListedNiftySensex[43]?.Change.toFixed(2))}`
                                            : `${Number(ListedNiftySensex[43]?.Change.toFixed(2))}`
                                    }
                                    color={ListedNiftySensex[43]?.Change > 0 ? 'green' : 'red'}
                                    rotate={ListedNiftySensex[43]?.Change > 0 ? '180deg' : '0deg'}
                                />
                                <SenSexSinglebox
                                    title={ListedNiftySensex[57]?.lname}
                                    price={ListedNiftySensex[57]?.Last}
                                    percent={
                                        ListedNiftySensex[57]?.Change > 0
                                            ? `${Number(ListedNiftySensex[57]?.Change.toFixed(2))}`
                                            : `${Number(ListedNiftySensex[57]?.Change.toFixed(2))}`
                                    }
                                    color={ListedNiftySensex[57]?.Change > 0 ? 'green' : 'red'}
                                    rotate={ListedNiftySensex[57]?.Change > 0 ? '180deg' : '0deg'}
                                />
                            </View>
                        </View>
                    )}
                    {/* ==========brand image======= */}
                    <BrandImage />
                    {/* ==========toggle=== */}
                    <ToggleTypeButton
                        buttonType={buttonType}
                        chart={chart}
                        explore={explore}
                    />
                    {buttonType === 'chart' ? (
                        <>
                            {/* <View style={styles.bse}>
                                <BseAndNse bseAndNse={bseAndNse} bse={bse} nse={nse} />
                                <Feather
                                    name="external-link"
                                    size={24}
                                    color="#686868"
                                    style={{ marginLeft: 15 }}
                                />
                            </View> */}
                            <View style={{ width: '100%', height: 300 }}>
                                {/* <VolumeChart />  */}
                                <LineChart1 />
                            </View>

                            <View style={{ height: 20 }} />
                            <BrandImage />
                            <View style={{ height: 20 }} />
                        </>
                    ) : (
                        <>
                            <TouchableOpacity
                                onPress={() => {
                                    bottomSheetRef.current.snapToIndex(2);
                                }}
                                style={styles.addButton}>
                                <Octicons name="diff-added" size={24} color="#0F9764" />
                                <Text
                                    style={{ marginLeft: 10, fontWeight: '900', color: '#0F9764' }}>
                                    Add
                                </Text>
                            </TouchableOpacity>

                            <FlatList
                                style={{ margin: 8 }}
                                nestedScrollEnabled={true}
                                data={BottoSheetDataList}
                                numColumns={2}
                                keyExtractor={(item, index) => index}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                // dispatch({
                                                //     type: SENSEX_ROUTE_NAME,
                                                //     data: item.value,
                                                // });
                                                // navigation.navigate('CommunityDrawer', {
                                                //     screen: 'IndexSenSexListed',
                                                //     params: {
                                                //         screen: item.value,
                                                //     },
                                                // });
                                                navigation.navigate('IndexSenSexListed',
                                                    {
                                                        screen: item.value,
                                                        initial: false
                                                    }
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
                        </>
                    )}

                    <View style={{ height: 120 }}></View>
                </ScrollView>
            </SafeAreaView>
            <BottomSheetView1
                data={BottoSheetDataListAll}
                onPress={seleted}
                onPress1={filterData}
                counntData={counntData}
                snapPoints={snapPoints}
                bottomSheetRef={bottomSheetRef}
            />
        </>
    );
};

export default connect(null, {
})(Listed);

const styles = StyleSheet.create({
    companyView: { paddingHorizontal: 0, flexDirection: 'row', width: '100%' },

    companyLeft: {
        paddingHorizontal: 10,
        height: 40,
        alignItems: 'center',
        flexDirection: 'row',
    },
    companyInneview: {
        flexDirection: 'row',
        // paddingHorizontal: getWidthnHeight(3).width
    },
    company: {
        color: '#12626c',
        marginLeft: 10,
        marginVertical: 10,
        fontSize: 18,
        fontWeight: '600',
    },
    bse: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        paddingRight: 10,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    addButton: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        paddingRight: 10,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    flatContainer: {
        width: '100%',
        height: 350,
        paddingHorizontal: 10,
    },
    flatItem: {
        width: '48%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        marginRight: 5,
        borderRadius: 5,

        shadowColor: '#aaaaaa',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    scrolling2: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    welcome: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
