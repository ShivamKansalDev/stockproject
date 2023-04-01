


import { StyleSheet, Text, ScrollView, TouchableOpacity, SafeAreaView, LogBox, View, } from 'react-native'
import React, { useState, useEffect } from 'react'
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
import ProfileHeader from '../../Components/Header/ProfileHeader'
import StatusBarView from '../../Components/StatusBar'

import Category from './Components/Category'
import BestPerformingIPO from './Components/BestPerformingIPO'
import ClosedIPO from './Components/ClosedIPO'
import ForthComing from './Components/ForthComing'
import NewListing from './Components/NewListing'
import OpenIPO from './Components/OpenIPO'
import StatusWise from './Components/StatusWise';
import MostViewed from './Components/MostViewed';
import ClassWise from './Components/ClassWise';
import UnlistedCompanies from './Components/UnlistedCompanies';
import CompaniesWithFinancials from './Components/CompaniesWithFinancials';
import { useSelector, useDispatch } from 'react-redux';

import { createMaterialTopTabNavigator, } from '@react-navigation/material-top-tabs';


const Tab = createMaterialTopTabNavigator();


// const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]


const Ipo = ({ route }) => {
    const { Ipo } = useSelector(state => state.Ipo)
    //  console.log(Ipo);
    const dispatch = useDispatch()

    React.useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    }, [])


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBarView />
            <ProfileHeader />


            <Tab.Navigator
                tabBarPosition="top"
                initialRouteName={Ipo}

                screenOptions={{
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
                        backgroundColor: "transparent",
                        borderRadius: 30,
                        top: 4,
                        marginHorizontal: 3,
                    },

                }}

            >
                <Tab.Screen
                    name="BestPerformingIPO"
                    component={BestPerformingIPO}
                    options={{
                        tabBarLabel: 'Best Performing IPO',
                        labelStyle: { textTransform: 'none' },
                        tabBarActiveBackgroundColor: 'yellow',
                        style: {
                            backgroundColor: '#21147a',
                        },
                    }}
                />
                <Tab.Screen
                    name="ForthComing"
                    component={ForthComing}
                    options={{
                        tabBarLabel: 'Forth Coming',
                        labelStyle: { textTransform: 'none' },
                    }}
                />
                <Tab.Screen
                    name="OpenIPO"
                    component={OpenIPO}
                    options={{
                        tabBarLabel: 'Open IPO',
                        labelStyle: { textTransform: 'none' },
                    }}
                />
                <Tab.Screen
                    name="ClosedIPO"
                    component={ClosedIPO}
                    options={{
                        tabBarLabel: 'Closed IPO',
                        labelStyle: { textTransform: 'none' },
                    }}
                />
                <Tab.Screen
                    name="NewListing"
                    component={NewListing}
                    options={{
                        tabBarLabel: 'New Listing',
                        labelStyle: { textTransform: 'none' },
                    }}
                />
                {/* <Tab.Screen
                    name="StatusWise"
                    component={StatusWise}
                    options={{
                        tabBarLabel: 'Status Wise',
                        labelStyle: { textTransform: 'none' },
                    }}
                />
                <Tab.Screen
                    name="MostViewed"
                    component={MostViewed}
                    options={{
                        tabBarLabel: 'Most Viewed',
                        labelStyle: { textTransform: 'none' },
                    }}
                />
                <Tab.Screen
                    name="ClassWise"
                    component={ClassWise}
                    options={{
                        tabBarLabel: 'Class Wise',
                        labelStyle: { textTransform: 'none' },
                    }}
                /> */}
                <Tab.Screen
                    name="UnlistedCompanies"
                    component={UnlistedCompanies}
                    options={{
                        tabBarLabel: 'Unlisted Companies',
                        labelStyle: { textTransform: 'none' },
                    }}
                />
                {/* <Tab.Screen
                    name="CompaniesWithFinancials"
                    component={CompaniesWithFinancials}
                    options={{
                        tabBarLabel: 'Companies With Financials',
                        labelStyle: { textTransform: 'none' },
                    }}
                /> */}


            </Tab.Navigator>


        </SafeAreaView>
    )
}

export default Ipo

const styles = StyleSheet.create({
    userCompany: {
        width: "100%", height: 70, paddingHorizontal: 10,
        alignItems: 'flex-end'
    },
    userCompanyInner: {
        width: 150, height: 40, borderWidth: 1,
        flexDirection: 'row',

        borderRadius: 8,
        borderColor: "#EEEEEE", backgroundColor: '#F9F9F9'
    },
    leftButton: {
        width: "50%", height: "100%",
        justifyContent: 'center', alignItems: 'center'
    },
    rightButton: {
        width: "50%", height: "100%", borderLeftWidth: 1,
        borderLeftColor: "#EEEEEE", justifyContent: 'center', alignItems: 'center'
    }

})