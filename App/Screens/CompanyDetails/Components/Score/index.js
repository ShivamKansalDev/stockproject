import {
    StyleSheet,
    Text,
    View,
    Platform,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import React, { useRef, useState, useMemo, useEffect } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';

import {
    VictoryBar,
    VictoryTheme,
    VictoryAxis,
    VictoryChart,
    Background,
    VictoryGroup,
    VictoryLine,
} from 'victory-native';
import Price from './Components/Price';

import { useSelector } from 'react-redux';
import ScoreCard from './Components/ScoreCard';
import Volume from './Components/Volume';
import BottomSheetView1 from '../../../../Components/BottomSheetView';
import Event from './Components/Event';
import ShareHolder from './Components/ShareHolders/Index';
import Finance from './Components/Finance';
import ShareHoldings from './Components/ShareHoldings';

export const data = [
    { id: 0, name: 'Score', isActive: false, value: 'Score' },
    { id: 1, name: 'Splits', isActive: false, value: 'Splits' },
    { id: 2, name: 'Rights', isActive: false, value: 'Rights' },
];

const Score = ({ bottomSheetRef, bottomSheetRef2, shareHolding }) => {
    const { Score } = useSelector(state => state.Score);
    const { PriceVolume } = useSelector(state => state.PriceVolume);
    // console.log('!@#$%^@#$%^&', shareHolding);

    const [allItem, setAllItem] = React.useState(data);
    const [activeComponent, setactiveComponent] = useState('score');

    return (
        <>
            <View
                style={{
                    width: '100%',
                    paddingHorizontal: 10,
                    paddingVertical: 12,
                }}>
                <TouchableOpacity
                    onPress={() => {
                        setactiveComponent('score');
                    }}
                    style={{
                        ...styles.button,
                        height: activeComponent == 'score' ? 600 : 50,
                        paddingTop: activeComponent == 'score' ? 0 : 0,
                        alignItems: activeComponent == 'score' ? 'flex-start' : 'center',
                    }}>
                    <View
                        style={{
                            width: '100%',
                            height: 50,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                        }}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '700',
                                color: activeComponent == 'score' ? '#12626C' : '#12626C',
                            }}>
                            Score
                        </Text>
                        <Entypo
                            name={
                                activeComponent == 'score'
                                    ? 'chevron-thin-up'
                                    : 'chevron-thin-down'
                            }
                            size={20}
                            color="black"
                        />
                    </View>

                    {activeComponent == 'score' ? (
                        <View
                            style={{
                                width: '100%',
                            }}>
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
                            <ScoreCard />
                        </View>
                    ) : null}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setactiveComponent('price');
                    }}
                    style={{
                        ...styles.button,
                        height: activeComponent == 'price' ? 750 : 50,
                        paddingTop: activeComponent == 'price' ? 10 : 0,
                        alignItems: activeComponent == 'price' ? 'flex-start' : 'center',
                    }}>
                    <View
                        style={{
                            width: '100%',
                            height: 50,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                        }}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '700',
                                color: activeComponent == 'price' ? '#12626C' : '#12626C',
                            }}>
                            Price
                        </Text>
                        <Entypo
                            name={
                                activeComponent == 'price'
                                    ? 'chevron-thin-up'
                                    : 'chevron-thin-down'
                            }
                            size={20}
                            color="black"
                        />
                    </View>

                    {activeComponent == 'price' ? <Price /> : null}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setactiveComponent('volume');
                    }}
                    style={{
                        ...styles.button,
                        height: activeComponent == 'volume' ? 500 : 50,
                        paddingTop: activeComponent == 'volume' ? 10 : 0,
                        alignItems: activeComponent == 'volume' ? 'flex-start' : 'center',
                    }}>
                    <View
                        style={{
                            width: '100%',
                            height: 50,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                        }}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '700',
                                color: activeComponent == 'volume' ? '#12626C' : '#12626C',
                            }}>
                            Volume
                        </Text>
                        <Entypo
                            name={
                                activeComponent == 'volume'
                                    ? 'chevron-thin-up'
                                    : 'chevron-thin-down'
                            }
                            size={20}
                            color="black"
                        />
                    </View>

                    {activeComponent == 'volume' ? <Volume /> : null}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setactiveComponent('event');
                    }}
                    style={{
                        ...styles.button,
                        height: activeComponent == 'event' ? 700 : 50,
                        paddingTop: activeComponent == 'event' ? 10 : 0,
                        alignItems: activeComponent == 'event' ? 'flex-start' : 'center',
                    }}>
                    <View
                        style={{
                            width: '100%',
                            height: 50,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                        }}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '700',
                                color: activeComponent == 'event' ? '#12626C' : '#12626C',
                            }}>
                            Event
                        </Text>
                        <Entypo
                            name={
                                activeComponent == 'event'
                                    ? 'chevron-thin-up'
                                    : 'chevron-thin-down'
                            }
                            size={20}
                            color="black"
                        />
                    </View>

                    {activeComponent == 'event' ? (
                        <Event bottomSheetRef2={bottomSheetRef2} />
                    ) : null}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setactiveComponent('finance');
                    }}
                    style={{
                        ...styles.button,
                        height: activeComponent == 'finance' ? 700 : 50,
                        paddingTop: activeComponent == 'finance' ? 10 : 0,
                        alignItems: activeComponent == 'finance' ? 'flex-start' : 'center',
                    }}>
                    <View
                        style={{
                            width: '100%',
                            height: 50,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                        }}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '700',
                                color: activeComponent == 'finance' ? '#12626C' : '#12626C',
                            }}>
                            Financials
                        </Text>
                        <Entypo
                            name={
                                activeComponent == 'finance'
                                    ? 'chevron-thin-up'
                                    : 'chevron-thin-down'
                            }
                            size={20}
                            color="black"
                        />
                    </View>

                    {activeComponent == 'finance' ? <Finance /> : null}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setactiveComponent('shareHoldings');
                    }}
                    style={{
                        ...styles.button,
                        height: activeComponent == 'shareHoldings' ? 700 : 50,
                        paddingTop: activeComponent == 'shareHoldings' ? 10 : 0,
                        alignItems:
                            activeComponent == 'shareHoldings' ? 'flex-start' : 'center',
                    }}>
                    <View
                        style={{
                            width: '100%',
                            height: 50,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                        }}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '700',
                                color:
                                    activeComponent == 'shareHoldings' ? '#12626C' : '#12626C',
                            }}>
                            Share Holdings
                        </Text>
                        <Entypo
                            name={
                                activeComponent == 'shareHoldings'
                                    ? 'chevron-thin-up'
                                    : 'chevron-thin-down'
                            }
                            size={20}
                            color="black"
                        />
                    </View>

                    {activeComponent == 'shareHoldings' ? (
                        <ShareHoldings shareHolding={shareHolding} />
                    ) : null}
                </TouchableOpacity>
            </View>
        </>
    );
};

export default Score;

const styles = StyleSheet.create({
    // chipsItem: {
    //     flexDirection: 'row',
    //     // padding: 7,
    //     paddingHorizontal: 15,
    //     height: 40,
    // },
    chipsScrollView: {
        paddingLeft: 5,
        zIndex: 0,
        position: 'absolute',
        top: Platform.OS === 'ios' ? 140 : 140,
        //paddingHorizontal: 10,
    },
    container: {
        width: '100%',
        height: 35,
        backgroundColor: '#EEEEEF',
        flexDirection: 'row',
        borderRadius: 10,
    },
    button: {
        width: '100%',

        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: '#EEEEEF',
    },
    addButton: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        paddingRight: 10,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    addButton: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        paddingRight: 10,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
});
