import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, Keyboard, TouchableWithoutFeedback, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Modal as ActionModal, Portal, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import { setChannelDetails } from '../../Action/Channel';

import { fontSizeH4, getMarginBottom, getMarginTop, getWidthnHeight } from '../width';

export const AddRemoveModal = ({
    visible = false,
    onDismiss = () => { },
    containerStyle,
    submit = () => { },
    selectMenu = {}
}) => {
    const navigation = useNavigation();
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        resetTitle();
    }, [visible, resetTitle]);

    const resetTitle = useCallback(() => {
        if (!!title) {
            setTitle('');
        }
    }, [title]);

    return (
        <Portal>
            <ActionModal
                visible={visible}
                onDismiss={() => onDismiss()}
                contentContainerStyle={{ alignItems: 'center' }}>
                <View style={[{ borderColor: 'red', borderWidth: 0, padding: getWidthnHeight(2).width, alignItems: 'center' }, containerStyle]}>
                    <>
                        <Text style={{ textAlign: 'left', color: '#000000', fontSize: fontSizeH4().fontSize + 5, fontWeight: 'bold', paddingBottom: getWidthnHeight(3).width }}>{selectMenu?.name}</Text>
                        <View style={[{ height: 1, backgroundColor: '#C4C4C4', width: '100%' }]} />
                        <View style={[{ alignItems: 'flex-start', width: '100%' }, getMarginTop(2)]}>
                            <TouchableOpacity
                                onPress={() => {
                                    dispatch(setChannelDetails({ type: 'Add', data: selectMenu }))
                                    navigation.navigate('AddRemoveUsers');
                                    onDismiss();
                                }}
                                style={[{
                                    alignItems: 'flex-start', paddingHorizontal: getWidthnHeight(3).width, paddingVertical: getWidthnHeight(3).width,
                                    borderColor: '#C4C4C4', borderWidth: 0, borderRadius: getWidthnHeight(2).width
                                }, getMarginBottom(2), getWidthnHeight(50)]}
                            >
                                <Text style={{ textAlign: 'left', color: '#0F9764', fontSize: fontSizeH4().fontSize + 5, fontWeight: 'bold' }}>Add Participants</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    dispatch(setChannelDetails({ type: 'Remove', data: selectMenu }))
                                    navigation.navigate('AddRemoveUsers');
                                    onDismiss();
                                }}
                                style={[{
                                    alignItems: 'flex-start', paddingHorizontal: getWidthnHeight(3).width, paddingVertical: getWidthnHeight(3).width,
                                    borderColor: '#C4C4C4', borderWidth: 0, borderRadius: getWidthnHeight(2).width
                                }, getMarginBottom(2), getWidthnHeight(50)]}
                            >
                                <Text style={{ textAlign: 'left', color: '#e42e1a', fontSize: fontSizeH4().fontSize + 5, fontWeight: 'bold' }}>Remove Participants</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                </View>
            </ActionModal>
        </Portal >
    );
};