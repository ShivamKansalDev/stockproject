import {
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    LogBox,
    View,
} from 'react-native';
import React, { useState } from 'react';
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
import ProfileHeader from '../../Components/Header/ProfileHeader';
import StatusBarView from '../../Components/StatusBar';

import Category from './Components/Category';
import DomesticIndex from './Components/DomesticIndex';

import InternationalIndex from './Components/InternationalIndex';
import Deal from './Components/Deal';
import FIIDIIActivity from './Components/FIIDIIActivity';
import TopLoser from './Components/TopLoser';
import TopGainer from './Components/TopGainer';
import OutPerformer from './Components/OutPerformer';
import AdvanceDecline from './Components/AdvanceDecline';
import SectorName from './Components/SectorName';
import OutUnderPerform from './Components/OutUnderPerform';
import ActiveCompanies from './Components/ActiveCompanies';
import HighWeek52 from './Components/HighWeek52';
import AllTimeHigh from './Components/AllTimeHigh';
import ExchangeHolidays from './Components/ExchangeHolidays';
import LowPriceHighVolu from './Components/LowPriceHighVolu';
import LowWeek52 from './Components/LowWeek52';
import AllTimeLow from './Components/AllTimeLow';
import BlockDeal from './Components/BlockDeal';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const IndexSenSexListed = () => {
    React.useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, []);
    const { senSexRouteName } = useSelector(state => state.SenSexRoute);

    const [displyCompomnet, setDisplayComponents] = useState('DomesticIndex');

    // console.log(senSexRouteName)
    const ranDerView = () => {
        switch (true) {
            case displyCompomnet === 'DomesticIndex':
                return <DomesticIndex />;
            case displyCompomnet === 'InternationalIndex':
                return <InternationalIndex />;
            case displyCompomnet === 'FIIDIIActivity':
                return <FIIDIIActivity />;
            case displyCompomnet === 'SectorName':
                return <SectorName />;
            case displyCompomnet === 'Deal':
                return <Deal />;
            case displyCompomnet === 'TopLoser':
                return <TopLoser />;
            case displyCompomnet === 'TopGainer':
                return <TopGainer />;
            case displyCompomnet === 'OutPerformer':
                return <OutPerformer />;
            case displyCompomnet === 'AdvanceDecline':
                return <AdvanceDecline />;
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBarView />
            <ProfileHeader />
            {/* <Category setDisplayComponents={setDisplayComponents} /> */}
            {/* <View style={styles.userCompany}>
              <View style={styles.userCompanyInner}>
                  <TouchableOpacity style={styles.leftButton}>
                      <Text style={{ color: "black" }}>User</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.rightButton}>
                      <Text style={{ color: "#686868" }}>Companies</Text>
                  </TouchableOpacity>
              </View>
          </View> */}
            {/* {ranDerView()} */}

            <Tab.Navigator
                tabBarPosition="top"
                initialRouteName={"DomesticIndex"}
                screenOptions={{
                    lazy: true,
                    tabBarIndicator: () => null,
                    tabBarScrollEnabled: true,
                    tabBarActiveTintColor: '#12626C',
                    tabBarInactiveTintColor: '#686868',
                    tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
                    tabBarStyle: {
                        backgroundColor: '#FAFAFA',
                        overflow: 'hidden',
                    },
                    tabBarItemStyle: {
                        width: 'auto',
                        alignItems: 'flex-start',
                    },
                    tabBarIndicatorStyle: {
                        width: 80,
                        backgroundColor: 'transparent',
                        borderRadius: 30,
                        top: 4,
                        marginHorizontal: 3,
                    },
                }}>
                <Tab.Screen
                    name="DomesticIndex"
                    component={DomesticIndex}
                    options={{
                        tabBarLabel: 'Domestic Index',
                        labelStyle: { textTransform: 'none' },
                        tabBarActiveBackgroundColor: 'yellow',
                        style: {
                            backgroundColor: '#21147a',
                        },
                    }}
                />
                <Tab.Screen
                    name="InternationalIndex"
                    component={InternationalIndex}
                    options={{
                        tabBarLabel: 'International Index',
                        labelStyle: { textTransform: 'none' },
                    }}
                />
                <Tab.Screen
                    name="FIIDIIActivity"
                    component={FIIDIIActivity}
                    options={{
                        tabBarLabel: 'FII / DII Activity',
                        labelStyle: { textTransform: 'none' },
                    }}
                />
                <Tab.Screen
                    name="SectorName"
                    component={SectorName}
                    options={{
                        tabBarLabel: 'Sector',
                        labelStyle: { textTransform: 'none' },
                    }}
                />
                <Tab.Screen
                    name="Deal"
                    component={Deal}
                    options={{
                        tabBarLabel: 'Deal',
                        labelStyle: { textTransform: 'none' },
                    }}
                />
                <Tab.Screen
                    name="TopLoser"
                    component={TopLoser}
                    options={{
                        tabBarLabel: 'Top Loser',
                        labelStyle: { textTransform: 'none' },
                    }}
                />
                <Tab.Screen
                    name="TopGainer"
                    component={TopGainer}
                    options={{
                        tabBarLabel: 'Top Gainer',
                        labelStyle: { textTransform: 'none' },
                    }}
                />
                <Tab.Screen
                    name="ActiveCompanies"
                    component={ActiveCompanies}
                    options={{
                        tabBarLabel: 'Active Companies',
                        labelStyle: { textTransform: 'none' },
                    }}
                />
                <Tab.Screen
                    name="OutUnderPerform"
                    component={OutUnderPerform}
                    options={{
                        tabBarLabel: 'Out / Under Perform',
                        labelStyle: { textTransform: 'none' },
                    }}
                />
                <Tab.Screen
                    name="AdvanceDecline"
                    component={AdvanceDecline}
                    options={{
                        tabBarLabel: 'Advance Declines',
                        labelStyle: { textTransform: 'none' },
                    }}
                />
                <Tab.Screen
                    name="HighWeek52"
                    component={HighWeek52}
                    options={{
                        tabBarLabel: '52 Week High ',
                        labelStyle: { textTransform: 'none' },
                    }}
                />
                <Tab.Screen
                    name="AllTimeHigh"
                    component={AllTimeHigh}
                    options={{
                        tabBarLabel: 'All Time High',
                        labelStyle: { textTransform: 'none' },
                    }}
                />
                <Tab.Screen
                    name="ExchangeHolidays"
                    component={ExchangeHolidays}
                    options={{
                        tabBarLabel: 'Exchange Holidays',
                        labelStyle: { textTransform: 'none' },
                    }}
                />

                <Tab.Screen
                    name="LowPriceHighVolu"
                    component={LowPriceHighVolu}
                    options={{
                        tabBarLabel: 'Low Price High Volume',
                        labelStyle: { textTransform: 'none' },
                    }}
                />
                <Tab.Screen
                    name="LowWeek52"
                    component={LowWeek52}
                    options={{
                        tabBarLabel: '52 Week Low ',
                        labelStyle: { textTransform: 'none' },
                    }}
                />
                <Tab.Screen
                    name="AllTimeLow"
                    component={AllTimeLow}
                    options={{
                        tabBarLabel: 'All Time Low',
                        labelStyle: { textTransform: 'none' },
                    }}
                />
                {/* <Tab.Screen
                    name="BlockDeal"
                    component={BlockDeal}
                    options={{
                        tabBarLabel: 'Block Deal',
                        labelStyle: { textTransform: 'none' },
                    }}
                /> */}
            </Tab.Navigator>
        </SafeAreaView>
    );
};

export default IndexSenSexListed;

const styles = StyleSheet.create({
    userCompany: {
        width: '100%',
        height: 70,
        paddingHorizontal: 10,
        alignItems: 'flex-end',
    },
    userCompanyInner: {
        width: 150,
        height: 40,
        borderWidth: 1,
        flexDirection: 'row',

        borderRadius: 8,
        borderColor: '#EEEEEE',
        backgroundColor: '#F9F9F9',
    },
    leftButton: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightButton: {
        width: '50%',
        height: '100%',
        borderLeftWidth: 1,
        borderLeftColor: '#EEEEEE',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
