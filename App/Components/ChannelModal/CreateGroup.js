import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, Keyboard, TouchableWithoutFeedback, Pressable } from 'react-native';
import { Modal as ActionModal, Portal, TextInput } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { fontSizeH4, getMarginBottom, getMarginTop, getMarginVertical, getWidthnHeight } from '../width';

export const CreateGroup = ({
    visible = false,
    onDismiss = () => { },
    containerStyle,
    submit = () => { },
    searchUser = () => { },
    userList = []
}) => {

    const [title, setTitle] = useState('');
    const [selectionList, setSelectionList] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        resetTitle();
    }, [visible, resetTitle]);

    const resetTitle = useCallback(() => {
        if (!!title) {
            setTitle('');
            setSelectionList('');
            setSelectedImage(null);
        }
    }, [title]);

    const dropDownData = [
        {
            label: 'Standalone', value: 'S',
        },
        {
            label: 'Consolidated', value: 'C'
        }
    ];

    function removeUser(id) {
        const filterList = selectionList.filter((item) => item._id !== id);
        setSelectionList(filterList);
    }

    async function launchImageGallery() {
        let options = {
            mediaType: 'photo',
            selectionLimit: 0,
            // includeBase64: true,
        };
        const result = await launchImageLibrary(options);
        if (result?.didCancel) {
            return;
        } else {
            const addName = result.assets.map(item => ({
                ...item,
                name: item.fileName,
            }));
            setSelectedImage(addName[0])
        }
    }

    return (
        <Portal>
            <ActionModal
                visible={visible}
                onDismiss={() => onDismiss()}
                contentContainerStyle={{ alignItems: 'center' }}>
                {/* <TouchableWithoutFeedback style={{}} onPress={() => Keyboard.dismiss()}> */}
                <View style={[{ borderColor: 'red', borderWidth: 0, padding: getWidthnHeight(2).width, alignItems: 'center' }, containerStyle]}>
                    <>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: getWidthnHeight(2).width, borderBottomWidth: 1, borderBottomColor: '#C4C4C4' }}>
                            <Text style={{ textAlign: 'left', color: '#0F9764', fontSize: fontSizeH4().fontSize + 5, fontWeight: 'bold' }}>Create Group</Text>
                        </View>
                        <View style={[{ alignItems: 'center', width: '100%' }, getMarginTop(2)]}>
                            <Dropdown
                                style={[{
                                    backgroundColor: 'white', paddingHorizontal: getWidthnHeight(2).width,
                                    paddingVertical: getWidthnHeight(1).width, borderRadius: getWidthnHeight(2).width,
                                    borderColor: '#C4C4C4', borderWidth: 1, width: '90%'
                                },]}
                                selectedTextStyle={{ color: '#0F9764', fontSize: fontSizeH4().fontSize + 2, fontWeight: 'bold' }}
                                itemTextStyle={{ fontSize: fontSizeH4().fontSize + 2 }}
                                inputSearchStyle={{ color: '#000000' }}
                                search={true}
                                placeholder='Search User'
                                placeholderStyle={{ color: '#C4C4C4' }}
                                searchPlaceholder="Enter name"
                                activeColor='#3af1ae4c'
                                data={userList}
                                labelField="name"
                                valueField="_id"
                                onChange={(item) => {
                                    // setDropdownValue(item.value)
                                    console.log("@##@#@ ITEM: ", item)
                                    let oldList = selectionList.map((user) => user);
                                    let list = [];
                                    list.push(item);
                                    const concatList = [...oldList, ...list];
                                    const uniqueList = [...new Map(concatList.map(item => [item['_id'], item])).values()];
                                    setSelectionList(uniqueList);
                                    console.log("@#@#@# UNIQUE LIST: ", uniqueList)
                                }}
                                onChangeText={(text) => searchUser(text)}
                            />
                        </View>
                        <View style={[{ alignItems: 'center' }, getMarginTop(2)]}>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => launchImageGallery()}
                            >
                                <FontAwesome name='image' size={getWidthnHeight(7).width} />
                                <Text style={{ fontSize: fontSizeH4().fontSize + 2, paddingLeft: getWidthnHeight(3).width }}>Add Image (Optional)</Text>
                            </TouchableOpacity>
                            {(!!selectedImage) && (
                                <Text style={{ fontSize: fontSizeH4().fontSize + 2, paddingHorizontal: getWidthnHeight(3).width, color: '#0F9764' }}>
                                    {selectedImage.name}
                                </Text>
                            )}
                        </View>
                        <View
                            style={[{ alignItems: 'center', paddingBottom: getMarginTop(2).marginTop }, getWidthnHeight(85), getMarginTop(2)]}>
                            <TextInput
                                style={[{ fontSize: fontSizeH4().fontSize + 4, color: 'black', borderRadius: getWidthnHeight(1).width, width: '100%', backgroundColor: 'white', borderBottomWidth: 1, borderColor: '#C4C4C4' }]}
                                textColor="#000000"
                                cursorColor={'#00000090'}
                                placeholder='Enter a group name'
                                placeholderTextColor={'#C4C4C4'}
                                value={title}
                                onChangeText={(text) => setTitle(text)}
                            />
                        </View>
                        <FlatList
                            data={selectionList}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => {
                                return (
                                    <View
                                        style={[{
                                            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderColor: '#C4C4C4',
                                            borderWidth: 1, borderRadius: getWidthnHeight(10).width
                                        }, getMarginVertical(1)]}>
                                        <Text style={{ padding: getWidthnHeight(3).width, fontSize: fontSizeH4().fontSize + 2 }}>{item.name}</Text>
                                        <Pressable style={{ paddingRight: getWidthnHeight(3).width }} onPress={() => removeUser(item._id)}>
                                            <AntDesign name='closecircle' size={getWidthnHeight(7).width} color='#000000' />
                                        </Pressable>
                                    </View>
                                );
                            }}
                        />
                        <View style={{ alignItems: 'center', width: '100%' }}>
                            <TouchableOpacity
                                disabled={(!!title) ? false : true}
                                onPress={() => {
                                    Keyboard.dismiss();
                                    if (title) {
                                        let concatUserId = '';
                                        selectionList.forEach((item, index) => {
                                            if (concatUserId !== '') {
                                                concatUserId = `${concatUserId},${item._id}`
                                            } else {
                                                concatUserId = item._id
                                            }

                                        })
                                        // console.log("@#@## USER LIST: ", title, concatUserId, selectedImage)
                                        submit(title, concatUserId, selectedImage);
                                        onDismiss();
                                    }
                                }}
                                style={[{
                                    alignItems: 'center', justifyContent: 'center', backgroundColor: (title) ? '#0F9764' : '#C4C4C4',
                                    paddingVertical: getWidthnHeight(2).width, borderRadius: getWidthnHeight(5).width
                                }, getWidthnHeight(85)]}>
                                <Text style={{ textAlign: 'center', color: '#ffffff', fontSize: fontSizeH4().fontSize + 3 }}>Create Group</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                </View>
                {/* </TouchableWithoutFeedback> */}
            </ActionModal>
        </Portal >
    );
};