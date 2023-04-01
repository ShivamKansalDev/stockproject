import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, Keyboard } from 'react-native';
import { Modal as ActionModal, Portal, Avatar, TextInput } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { fontSizeH4, getMarginTop, getMarginVertical, getWidthnHeight } from '../width';

export const Modal = ({
    visible = false,
    onDismiss = () => { },
    containerStyle,
    addFiles = () => { },
    photos = true,
    images = [],
    videos = [],
    removeFile = () => { },
    openCamera = () => { },
}) => {
    return (
        <Portal>
            <ActionModal
                visible={visible}
                onDismiss={() => onDismiss()}
                contentContainerStyle={{ alignItems: 'center' }}>
                <View style={[{ borderColor: 'red', borderWidth: 0 }, containerStyle]}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '100%',
                            justifyContent: 'space-evenly',
                            borderWidth: 0.5,
                            borderColor: '#C4C4C4',
                            paddingBottom: getWidthnHeight(3).width,
                        }}>
                        <TouchableOpacity
                            style={[
                                {
                                    padding: getMarginTop(1).marginTop,
                                    borderWidth: 0,
                                    borderColor: 'red',
                                    backgroundColor: '#0F9764',
                                    borderRadius: getWidthnHeight(2).width,
                                },
                                getMarginTop(2),
                            ]}
                            onPress={() => {
                                addFiles(photos ? 'photo' : 'video');
                            }}>
                            <Text style={{ color: 'white' }}>{`Select ${photos ? 'Photo(s)' : 'Video(s)'
                                }`}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                {
                                    padding: getMarginTop(1).marginTop,
                                    borderWidth: 0,
                                    borderColor: 'red',
                                    backgroundColor: '#0F9764',
                                    borderRadius: getWidthnHeight(2).width,
                                },
                                getMarginTop(2),
                            ]}
                            onPress={() => {
                                openCamera(photos ? 'photo' : 'video');
                            }}>
                            <Text style={{ color: 'white' }}>Launch Camera</Text>
                        </TouchableOpacity>
                    </View>
                    {photos ? (
                        <FlatList
                            horizontal={false}
                            numColumns={3}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.fileName}
                            data={images}
                            renderItem={({ item, index }) => {
                                // console.log('$$&&** ', item.uri);
                                return (
                                    <View
                                        style={{
                                            borderColor: '#C4C4C4',
                                            borderWidth: 0,
                                            padding: getWidthnHeight(3).width,
                                        }}>
                                        <Image
                                            source={{ uri: item.uri }}
                                            resizeMode="contain"
                                            style={{
                                                width: getWidthnHeight(20).width,
                                                height: getWidthnHeight(20).width,
                                            }}
                                        />
                                        <AntDesign
                                            onPress={() => removeFile('photo', item.fileName)}
                                            name="closecircle"
                                            color={'tomato'}
                                            size={getWidthnHeight(6).width}
                                            style={[
                                                {
                                                    borderColor: 'red',
                                                    borderWidth: 0,
                                                    alignSelf: 'flex-end',
                                                    marginTop: getWidthnHeight(2.5).width,
                                                    position: 'absolute',
                                                    backgroundColor: 'white',
                                                    borderRadius: getWidthnHeight(3).width,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                },
                                            ]}
                                        />
                                    </View>
                                );
                            }}
                        />
                    ) : (
                        <FlatList
                            horizontal={false}
                            numColumns={3}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.fileName}
                            data={videos}
                            renderItem={({ item, index }) => {
                                return (
                                    <View
                                        style={{
                                            borderColor: '#C4C4C4',
                                            borderWidth: 0,
                                            padding: getWidthnHeight(3).width,
                                        }}>
                                        <Image
                                            source={{ uri: item.uri }}
                                            resizeMode="contain"
                                            style={{
                                                width: getWidthnHeight(20).width,
                                                height: getWidthnHeight(20).width,
                                            }}
                                        />
                                        <AntDesign
                                            onPress={() => removeFile('video', item.fileName)}
                                            name="closecircle"
                                            color={'tomato'}
                                            size={getWidthnHeight(6).width}
                                            style={[
                                                {
                                                    borderColor: 'red',
                                                    borderWidth: 0,
                                                    alignSelf: 'flex-end',
                                                    marginTop: getWidthnHeight(2.5).width,
                                                    position: 'absolute',
                                                    backgroundColor: 'white',
                                                    borderRadius: getWidthnHeight(3).width,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                },
                                            ]}
                                        />
                                    </View>
                                );
                            }}
                        />
                    )}
                </View>
            </ActionModal>
        </Portal>
    );
};

export const ShareModal = ({
    visible = false,
    onDismiss = () => { },
    containerStyle,
    sharePost = {},
    submit = () => { }
}) => {

    const [title, setTitle] = useState('');

    useEffect(() => {
        setTitle('');
    }, [visible])

    function PostCreator({ item }) {
        return (
            <View
                onPress={() => {
                    navigation.navigate('PostNavigator', {
                        screen: 'ProfileScreen',
                        //initial: true,
                        params: {
                            user: { _id: item?.created_by?.id, name: item?.created_by?.name },
                        },
                    });
                }}
                style={[
                    {
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderWidth: 0,
                        borderColor: 'blue',
                        paddingHorizontal: getWidthnHeight(0).width,
                    },
                ]}>
                <View
                    style={[
                        {
                            justifyContent: 'center',
                            borderWidth: 0,
                            borderColor: 'green',
                        },
                    ]}>
                    <Avatar.Image
                        size={getWidthnHeight(12).width}
                        source={require('../../Images/avatar.png')}
                    />
                </View>
                <View
                    style={[
                        {
                            justifyContent: 'center',
                            paddingHorizontal: getWidthnHeight(3).width,
                        },
                    ]}>
                    <Text
                        style={[
                            {
                                color: '#12626C',
                                fontWeight: '900',
                                fontSize: fontSizeH4().fontSize + 1,
                            },
                        ]}>
                        {item?.created_by?.name}
                    </Text>
                </View>
            </View>
        );
    }
    return (
        <Portal>
            <ActionModal
                visible={visible}
                onDismiss={() => onDismiss()}
                contentContainerStyle={{ alignItems: 'center' }}>
                <View style={[{ borderColor: 'red', borderWidth: 0, paddingHorizontal: getWidthnHeight(2).width, alignItems: 'flex-start' }, containerStyle]}>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: getWidthnHeight(2).width, borderBottomWidth: 1, borderBottomColor: '#C4C4C4' }}>
                        <Text style={{ textAlign: 'left', color: 'black', fontSize: fontSizeH4().fontSize + 3 }}>Share Post</Text>
                        <TouchableOpacity
                            onPress={() => {
                                Keyboard.dismiss();
                                submit(sharePost, title);
                                onDismiss();
                            }}
                            style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#0F9764', paddingHorizontal: getWidthnHeight(3).width, paddingVertical: getWidthnHeight(2).width, borderRadius: getWidthnHeight(1).width }}>
                            <Text style={{ textAlign: 'left', color: '#0F9764', fontSize: fontSizeH4().fontSize + 3 }}>Share</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[getMarginVertical(2)]}>
                        <PostCreator item={sharePost} />
                    </View>
                    <View
                        style={[{ alignItems: 'center', paddingBottom: getMarginTop(2).marginTop }, getWidthnHeight(85)]}>
                        <TextInput
                            style={[{ color: 'black', borderRadius: getWidthnHeight(1).width, width: '100%', backgroundColor: 'white', borderWidth: 1, borderColor: '#C4C4C4' }]}
                            textColor="#000000"
                            cursorColor={'#00000090'}
                            placeholder='Say Something about this'
                            placeholderTextColor={'#C4C4C4'}
                            multiline={true}
                            value={title}
                            onChangeText={(text) => setTitle(text)}
                        />
                    </View>
                </View>
            </ActionModal>
        </Portal>
    );
};
