import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Modal as ActionModal, Portal, TextInput } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { fontSizeH4, getMarginBottom, getMarginTop, getWidthnHeight } from '../width';

export const WatchListModal = ({
    visible = false,
    onDismiss = () => { },
    containerStyle,
    submit = () => { },
    renameWatchList = () => { },
    editItem = null
}) => {

    const [title, setTitle] = useState('');

    useEffect(() => {
        setTitle('');
    }, [visible])

    useEffect(() => {
        if (editItem) {
            setTitle(editItem.name)
        }
    }, [editItem])

    return (
        <Portal>
            <ActionModal
                visible={visible}
                onDismiss={() => onDismiss()}
                contentContainerStyle={{ alignItems: 'center' }}>
                <View style={[{ borderColor: 'red', borderWidth: 0, padding: getWidthnHeight(2).width, alignItems: 'center' }, containerStyle]}>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: getWidthnHeight(2).width, borderBottomWidth: 1, borderBottomColor: '#C4C4C4' }}>
                        <Text style={{ textAlign: 'left', color: 'black', fontSize: fontSizeH4().fontSize + 5, fontWeight: 'bold' }}>{(!!editItem?.name) ? 'Update Watchlist' : 'Create Watchlist'}</Text>
                    </View>
                    <View
                        style={[{ alignItems: 'center', paddingBottom: getMarginTop(2).marginTop }, getWidthnHeight(85), getMarginTop(2)]}>
                        <TextInput
                            style={[{ fontSize: fontSizeH4().fontSize + 4, color: 'black', borderRadius: getWidthnHeight(1).width, width: '100%', backgroundColor: 'white', borderBottomWidth: 1, borderColor: '#C4C4C4' }]}
                            textColor="#000000"
                            cursorColor={'#00000090'}
                            placeholder='Name'
                            placeholderTextColor={'#C4C4C4'}
                            value={title}
                            onChangeText={(text) => setTitle(text)}
                        />
                    </View>
                    <View style={{ alignItems: 'center', width: '100%' }}>
                        <TouchableOpacity
                            onPress={() => {
                                Keyboard.dismiss();
                                if (title) {
                                    if (!!editItem?.name) {
                                        renameWatchList(title, editItem)
                                    } else {
                                        submit(title);
                                    }
                                    onDismiss();
                                }
                            }}
                            style={[{
                                alignItems: 'center', justifyContent: 'center', backgroundColor: '#0F9764',
                                paddingVertical: getWidthnHeight(2).width, borderRadius: getWidthnHeight(5).width
                            }, getWidthnHeight(85)]}>
                            <Text style={{ textAlign: 'center', color: '#ffffff', fontSize: fontSizeH4().fontSize + 3 }}>{(!!editItem?.name) ? 'Update' : 'Add'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ActionModal>
        </Portal>
    );
};

export const WatchListSearchModal = ({
    visible = false,
    onDismiss = () => { },
    containerStyle,
    submit = () => { },
    searchedStocks = [],
    selectedData = [],
    addRemoveStock = () => { },
    loading = false
}) => {
    const iconPlus = 'plus-square';
    const iconMinus = 'minus-square';
    const [title, setTitle] = useState('');


    useEffect(() => {
        setTitle('');
    }, [visible])

    useEffect(() => {
        submit(title)
    }, [title]);

    return (
        <Portal>
            <ActionModal
                visible={visible}
                onDismiss={() => onDismiss()}
                contentContainerStyle={{ alignItems: 'center' }}>
                <View style={[{ borderColor: 'red', borderWidth: 0, padding: getWidthnHeight(2).width, alignItems: 'center' }, containerStyle]}>
                    {/* <KeyboardAvoidingView> */}
                    <View style={{ width: '100%', height: '100%' }}>
                        {/* <ScrollView> */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: getWidthnHeight(2).width, borderBottomWidth: 1, borderBottomColor: '#C4C4C4' }}>
                            <Text style={{ textAlign: 'left', color: "#0F9764", fontSize: fontSizeH4().fontSize + 5, fontWeight: 'bold' }}>Add Stocks</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                            <View
                                style={[{ alignItems: 'center', paddingBottom: getMarginTop(2).marginTop }, getWidthnHeight(70), getMarginTop(2)]}>
                                <TextInput
                                    style={[{ fontSize: fontSizeH4().fontSize + 4, color: 'black', borderRadius: getWidthnHeight(1).width, width: '100%', backgroundColor: 'white', borderBottomWidth: 1, borderColor: '#C4C4C4' }]}
                                    textColor="#000000"
                                    cursorColor={'#00000090'}
                                    placeholder='Search'
                                    placeholderTextColor={'#C4C4C4'}
                                    value={title}
                                    onChangeText={(text) => setTitle(text)}
                                />
                            </View>
                            <AntDesign name='search1' size={getWidthnHeight(6).width} color="#000000" />
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <FlatList
                                    keyboardShouldPersistTaps="handled"
                                    data={searchedStocks}
                                    keyExtractor={(item) => item._id}
                                    renderItem={({ item }) => {
                                        return (
                                            <View
                                                style={[{
                                                    borderWidth: 0, borderColor: 'red', paddingVertical: getWidthnHeight(2.5).width,
                                                    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                                                    backgroundColor: '#c4c4c43b', borderRadius: getWidthnHeight(2).width
                                                }, getWidthnHeight(80), getMarginBottom(1)]}>
                                                <Text style={[{ borderColor: 'blue', borderWidth: 0, paddingHorizontal: getWidthnHeight(2).width, fontSize: fontSizeH4().fontSize + 3, fontWeight: 'bold' }, getWidthnHeight(65)]}>
                                                    {item.CompanyName}
                                                </Text>
                                                <FontAwesome
                                                    name={(!!item?.icon) ? item.icon : iconPlus} size={getWidthnHeight(7).width}
                                                    color="#0F9764"
                                                    style={{ paddingRight: getWidthnHeight(2).width }}
                                                    onPress={() => {
                                                        if (item?.icon === iconMinus) {
                                                            addRemoveStock('removeItem', item.co_code)
                                                        } else {
                                                            if (selectedData.length < 10) {
                                                                addRemoveStock('addItem', item.co_code)
                                                            } else {
                                                                alert("Max limit to add stocks is 10")
                                                            }
                                                        }
                                                    }}
                                                />
                                            </View>
                                        );
                                    }}
                                />
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
                                        style={[{ transform: [{ scale: 2 }] }, getMarginTop(-5)]}
                                    />
                                )}
                            </View>
                        </View>
                        {/* </ScrollView> */}
                    </View>
                    {/* </KeyboardAvoidingView> */}
                </View>
            </ActionModal>
        </Portal>
    );
};