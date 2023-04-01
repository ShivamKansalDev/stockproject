import {
    StyleSheet,
    Image,
    TouchableOpacity,
    View,
    Text,
    TextInput,
} from 'react-native';
import React, { useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { Menu } from 'react-native-paper';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Autocomplete from 'react-native-autocomplete-input';

import { REMOVE_USER } from '../../../ActionType/User';
import { signOut } from '../../../Action/Authentication';
const ProfileHeader = ({ }) => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [data, setData] = useState([]);
    const [showMenu, setShowMenu] = useState(false);

    const dispatch = useDispatch();

    return (
        <>
            <View style={styles.header}>
                <View style={{ ...styles.headerLeft, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Entypo name="menu" size={24} color="black" />
                    </TouchableOpacity>
                    <View
                        style={{
                            width: 30,
                            height: 30,
                            marginLeft: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Image
                            style={{
                                width: '80%',
                                height: '80%',
                                resizeMode: 'cover',
                            }}
                            source={require('../../../Images/logo.png')}
                        />
                    </View>
                    <View
                        style={{
                            width: 30,
                            height: 30,
                            marginLeft: 8,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Image
                            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                            source={require('../../../Images/logoText.png')}
                        />
                    </View>
                </View>
                <View style={styles.headerMiddle}></View>
                <View style={styles.headerRight}>
                    <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
                        <EvilIcons
                            name="search"
                            size={30}
                            color="black"
                            style={{ marginRight: 15 }}
                        />
                    </TouchableOpacity>
                    <Menu
                        visible={showMenu}
                        onDismiss={() => setShowMenu(false)}
                        anchor={(
                            <TouchableOpacity onPress={() => setShowMenu(true)}>
                                <FontAwesome5 name="user-circle" size={20} color="black" />
                            </TouchableOpacity>
                        )}
                    >
                        <Menu.Item leadingIcon={'account'} title="Account Settings"
                            onPress={() => {
                                setShowMenu(false);
                                navigation.navigate('AccountSettings')
                            }}
                        />
                        <Menu.Item leadingIcon={'location-exit'} title="Log Out" onPress={() => {
                            setShowMenu(false);
                            dispatch({ type: REMOVE_USER });
                            signOut();
                        }} />
                    </Menu>
                </View>
            </View>
        </>
    );
};

export default ProfileHeader;

const styles = StyleSheet.create({
    header: {
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 70,
    },
    headerLeft: {
        width: '25%',
        paddingLeft: 10,
        paddingVertical: 10,
        alignItems: 'center',
    },
    headerMiddle: {
        width: '50%',
        alignItems: 'center',
        position: 'relative',
        zIndex: 50,
    },
    headerRight: {
        width: '25%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 10,
    },
    title: { paddingVertical: 10, paddingLeft: 10 },
    autocompleteContainer: {
        // Hack required to make the autocomplete
        // work on Andrdoid
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 100,
        padding: 5,
    },
});
