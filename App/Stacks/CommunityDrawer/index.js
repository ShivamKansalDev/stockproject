import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { DrawerContent } from '../../Components/DrawerContent';

import TabNaV from '../../Stacks/TabNaV';

import { createDrawerNavigator } from '@react-navigation/drawer';
import Portfolio from '../../Screens/Portfolio';
import CompanyDetails from '../../Screens/CompanyDetails';
import Followers from '../../Screens/Followers';
import Ipo from '../../Screens/Ipo';
import IndexSenSexListed from '../../Screens/IndexSenSexListed';
import Profile from '../../Screens/Profile';
import ProfileNext from '../../Screens/ProfileNext';
import Channel, { ChannelNavigator } from '../../Screens/Channel';
import ChannelOne from '../../Screens/ChannelOne';
import ChannelTwo from '../../Screens/ChannelTwo';
import ChannelThree from '../../Screens/ChannelThree';
import ChannelFour from '../../Screens/ChannelFour';
import ChannelFive from '../../Screens/ChannelFive';
import PortfolioNext from '../../Screens/PortfolioNext';
import WatchList from '../../Screens/WatchList';
import WatchListAdd from '../../Screens/WatchListAdd';
import WatchListAddStocks from '../../Screens/WatchListAddStocks';
import SearchScreen from '../../Screens/SearchScreen';
import ListedSearch from '../../Screens/ListedSearch';
import UnlistedSearch from '../../Screens/UnlistedSearch';
import { WatchlistNavigator } from '../../Screens/WatchList';
import AccountSettings from '../../Screens/AccountSettings';

const Drawer = createDrawerNavigator();

const CommunityDrawer = ({ }) => {
    return (
        <Drawer.Navigator
            drawerPosition="right"
            drawerStyle={{ width: '50%', height: '100%' }}
            screenOptions={{
                headerShown: false,
                // lazy: false,
            }}
            drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen options={{ unmountOnBlur: true }} name="TabNaV" component={TabNaV} />
            <Drawer.Screen name="Portfolio" component={Portfolio} />
            {/* <Drawer.Screen options={{ unmountOnBlur: true }} name="CompanyDetails" component={CompanyDetails} /> */}
            <Drawer.Screen name="Followers" component={Followers} />
            {/* <Drawer.Screen options={{ unmountOnBlur: true }} name="IndexSenSexListed" component={IndexSenSexListed} /> */}
            {/* <Drawer.Screen name="Ipo" component={Ipo} /> */}
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="ProfileNext" component={ProfileNext} />
            <Drawer.Screen name="PortfolioNext" component={PortfolioNext} />
            <Drawer.Screen options={{ unmountOnBlur: true }} name="Channel" component={ChannelNavigator} />
            <Drawer.Screen name="ChannelOne" component={ChannelOne} />
            <Drawer.Screen name="ChannelTwo" component={ChannelTwo} />
            <Drawer.Screen name="ChannelThree" component={ChannelThree} />
            <Drawer.Screen name="ChannelFour" component={ChannelFour} />
            <Drawer.Screen name="ChannelFive" component={ChannelFive} />
            <Drawer.Screen name="WatchlistNavigator" component={WatchlistNavigator} />
            <Drawer.Screen options={{ unmountOnBlur: true }} name='AccountSettings' component={AccountSettings} />
            {/* <Drawer.Screen name="WatchListAdd" component={WatchListAdd} /> */}
            <Drawer.Screen
                options={{ unmountOnBlur: true }}
                name="SearchScreen"
                component={SearchScreen}
            />
            {/* <Drawer.Screen
                name="WatchListAddStocks"
                component={WatchListAddStocks}
            /> */}
            <Drawer.Screen
                options={{ unmountOnBlur: true }}
                name="ListedSearch"
                component={ListedSearch}
            />
        </Drawer.Navigator>
    );
};

export default CommunityDrawer;
