import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
} from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useNavigation, useRoute } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { signOut } from '../../Action/Authentication';

import DrawerItemm from '../DrawerItemm';
import { useDispatch } from 'react-redux';
import { REMOVE_USER } from '../../ActionType/User';
import { getWidthnHeight } from '../width';
const iconLink = {
    bref: <Feather name="briefcase" size={22} color="#686868" />,
    clock: <FontAwesome5 name="clock" size={22} color="#686868" />,
    reward: <AntDesign name="gift" size={24} color="#686868" />,
    chat: <Octicons name="comment-discussion" size={24} color="#686868" />,
    noti: <Ionicons name="ios-notifications-outline" size={24} color="#686868" />,
    logout: <MaterialCommunityIcons name="location-exit" size={getWidthnHeight(6).width} color="#686868" />
};;

export function DrawerContent(props) {
    const dispatch = useDispatch()
    const navigation = useNavigation();;
    const paperTheme = useTheme();

    const route = useRoute();
    // console.log('@#@#DRWER: ', route)
    const gotoList2 = () => {
        alert('page');;
    };;
    const gotoList1 = () => {
        navigation.navigate('Portfolio');
    };;
    const CompanyDetails = () => {
        navigation.navigate('CompanyDetails');
    };;
    const Followers = () => {
        navigation.navigate('Followers');
    };;
    const Ipo = () => {
        navigation.navigate('Ipo');
    };;
    const IndexSenSex2 = () => {
        navigation.navigate('IndexSenSex2');
    };;
    const Profile = () => {
        navigation.navigate('Profile');
    };;
    const Channel = () => {
        navigation.navigate('Channel');
    };;
    const WatchList = () => {
        // console.log("!@@!#@ DRAWER NAV: ",)
        navigation.navigate('WatchlistNavigator', { screen: 'WatchList' })
        // navigation.navigate('CommunityDrawer', { screen: 'WatchListNavigator', params: { screen: 'WatchList' } });
    };;
    const logout = () => {
        dispatch({
            type: REMOVE_USER,

        })
        signOut();
    };

    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    width: '100%',
                    height: 200,
                    backgroundColor: '#0F9764',
                    opacity: 0.5,
                }} />
            <DrawerContentScrollView {...props} style={{ backgroundColor: '#f2f2f2' }}>
                <View style={styles.drawerContent}>
                    <View
                        style={{
                            width: '100%',
                            paddingBottom: 10,
                            borderRadius: 10,
                            backgroundColor: 'white',
                            marginTop: 10,
                        }}>
                        <DrawerItemm
                            title="Portfolio"
                            onPress={gotoList1}
                            leftIcon={iconLink.bref}
                        />
                        <DrawerItemm
                            onPress={WatchList}
                            title="WatchList"
                            leftIcon={iconLink.clock}
                        />
                        {/* <DrawerItemm
                            onPress={gotoList2}
                            title="Rewards"
                            leftIcon={iconLink.reward}
                        /> */}
                        <DrawerItemm
                            onPress={Channel}
                            title="Channels"
                            leftIcon={iconLink.chat}
                        />
                        {/* <DrawerItemm
                            onPress={gotoList2}
                            title="Notifications"
                            leftIcon={iconLink.noti}
                        /> */}
                        {/* <DrawerItemm
                            onPress={CompanyDetails}
                            title="Listed Company"
                            leftIcon={iconLink.clock}
                        /> */}
                        <DrawerItemm
                            onPress={Followers}
                            title="Followers"
                            leftIcon={iconLink.clock}
                        />
                        {/* <DrawerItemm
                            onPress={Profile}
                            title="Portfolie"
                            leftIcon={iconLink.clock}
                        /> */}
                        <DrawerItemm
                            onPress={logout}
                            title="Log Out"
                            leftIcon={iconLink.logout}
                        />
                        {/* <DrawerItemm
                         onPress={gotoList1} title='Watchlist' leftIcon={iconLink.clock} />


                         onPress={gotoList1} title='Notifications' leftIcon={iconLink.noti} /> */}





                    </View>

                    {/* <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section> */}
                </View>
            </DrawerContentScrollView>
            {/* <Drawer.Section style={styles.bottomDrawerSection}>
            <DrawerItem
        label="Help"
        onPress={() => Linking.openURL('https://mywebsite.com/help')}
      />
            </Drawer.Section> */}
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#f2f2f2',
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
