import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { fontSizeH4, getWidthnHeight } from '../width';

export const ButtonSelection = ({ }) => {
    const [posts, setPosts] = useState(false);
    return (
        <View style={{ alignItems: 'center' }}>
            {posts ? (
                <View
                    style={[
                        { flexDirection: 'row', alignItems: 'center' },
                        getWidthnHeight(95),
                    ]}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[
                            {
                                backgroundColor: '#0F9764',
                                borderRadius: getWidthnHeight(2).width,
                                alignItems: 'center',
                                justifyContent: 'center',
                            },
                            getWidthnHeight(47.5, 6),
                        ]}>
                        <Text
                            style={[
                                {
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: fontSizeH4().fontSize + 2,
                                },
                            ]}>
                            Posts
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setPosts(false)}
                        activeOpacity={1}
                        style={[
                            {
                                backgroundColor: '#EBEBEB',
                                borderRadius: getWidthnHeight(2).width,
                                alignItems: 'center',
                                justifyContent: 'center',
                            },
                            getWidthnHeight(47.5, 6),
                        ]}>
                        <Text
                            style={[
                                {
                                    color: '#0F9764',
                                    fontWeight: 'bold',
                                    fontSize: fontSizeH4().fontSize + 2,
                                },
                            ]}>
                            Overview
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View
                    style={[
                        { flexDirection: 'row', alignItems: 'center' },
                        getWidthnHeight(95),
                    ]}>
                    <TouchableOpacity
                        // onPress={() => setPosts(true)}
                        style={[
                            {
                                backgroundColor: '#EBEBEB',
                                borderRadius: getWidthnHeight(2).width,
                                alignItems: 'center',
                                justifyContent: 'center',
                            },
                            getWidthnHeight(47.5, 6),
                        ]}>
                        <Text
                            style={[
                                {
                                    color: '#0F9764',
                                    fontWeight: 'bold',
                                    fontSize: fontSizeH4().fontSize + 2,
                                },
                            ]}>
                            Posts
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[
                            {
                                backgroundColor: '#0F9764',
                                borderRadius: getWidthnHeight(2).width,
                                alignItems: 'center',
                                justifyContent: 'center',
                            },
                            getWidthnHeight(47.5, 6),
                        ]}>
                        <Text
                            style={[
                                {
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: fontSizeH4().fontSize + 2,
                                },
                            ]}>
                            Overview
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export const DataSelection = ({ standAlone = true, setStandAlone }) => {
    // console.log('$%^&*%^& STANDALONE: ', standAlone);
    return (
        <View style={{ alignItems: 'center' }}>
            {standAlone ? (
                <View
                    style={[
                        { flexDirection: 'row', alignItems: 'center' },
                        getWidthnHeight(95),
                    ]}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[
                            {
                                backgroundColor: '#0F9764',
                                borderTopLeftRadius: getWidthnHeight(2).width,
                                borderBottomLeftRadius: getWidthnHeight(2).width,
                                alignItems: 'center',
                                justifyContent: 'center',
                            },
                            getWidthnHeight(47.5, 6),
                        ]}>
                        <Text
                            style={[
                                {
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: fontSizeH4().fontSize + 2,
                                },
                            ]}>
                            Standalone
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setStandAlone(false)}
                        activeOpacity={1}
                        style={[
                            {
                                backgroundColor: '#ffffff',
                                borderColor: '#0F9764',
                                borderWidth: 1,
                                borderTopRightRadius: getWidthnHeight(2).width,
                                borderBottomRightRadius: getWidthnHeight(2).width,
                                alignItems: 'center',
                                justifyContent: 'center',
                            },
                            getWidthnHeight(47.5, 6),
                        ]}>
                        <Text
                            style={[
                                {
                                    color: '#0F9764',
                                    fontWeight: 'bold',
                                    fontSize: fontSizeH4().fontSize + 2,
                                },
                            ]}>
                            Consolidated
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View
                    style={[
                        { flexDirection: 'row', alignItems: 'center' },
                        getWidthnHeight(95),
                    ]}>
                    <TouchableOpacity
                        onPress={() => setStandAlone(true)}
                        style={[
                            {
                                backgroundColor: '#ffffff',
                                borderColor: '#0F9764',
                                borderWidth: 1,
                                borderTopLeftRadius: getWidthnHeight(2).width,
                                borderBottomLeftRadius: getWidthnHeight(2).width,
                                alignItems: 'center',
                                justifyContent: 'center',
                            },
                            getWidthnHeight(47.5, 6),
                        ]}>
                        <Text
                            style={[
                                {
                                    color: '#0F9764',
                                    fontWeight: 'bold',
                                    fontSize: fontSizeH4().fontSize + 2,
                                },
                            ]}>
                            Standalone
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[
                            {
                                backgroundColor: '#0F9764',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderTopRightRadius: getWidthnHeight(2).width,
                                borderBottomRightRadius: getWidthnHeight(2).width,
                            },
                            getWidthnHeight(47.5, 6),
                        ]}>
                        <Text
                            style={[
                                {
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: fontSizeH4().fontSize + 2,
                                },
                            ]}>
                            Consolidated
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};
