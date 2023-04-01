import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Modal as ActionModal, Portal, TextInput } from 'react-native-paper';
import Clipboard from '@react-native-community/clipboard';
import ViewShot, { captureScreen } from "react-native-view-shot";
import { useSelector } from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import QRCode from 'react-native-qrcode-svg';

import { fontSizeH4, getMarginBottom, getMarginTop, getMarginVertical, getWidthnHeight } from '../width';

export const Qrcode = ({
    visible = false,
    onDismiss = () => { },
    containerStyle,
    data = {},
    saveQrToDevice = () => { },
    setProductQRref = () => { }
}) => {

    const [title, setTitle] = useState('');

    const [qrData, setQRData] = useState({});

    const channelDetails = useSelector(state => state.ChannelDetails);

    const userDetails = useSelector(state => state.User);

    const authToken = userDetails.authToken;

    const ref = useRef();

    const communicationUrl = 'https://communication-service-asia-vhteukeytq-el.a.run.app/api';

    useEffect(() => {
        if (visible) {
            axios.get(`${communicationUrl}/channel/preview/generateLink/${channelDetails._id}`, {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            }).then((response) => {
                console.log("@#@#@#@#@ QR RESPONSE: ", response.data.url)
                setQRData(response.data)
            }).catch((error) => {
                console.log("@#@#@#@#@ QR ERROR: ", JSON.stringify(error.response, null, 4))
            })
        }
    }, [visible]);

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
                <View style={[{ borderColor: 'red', borderWidth: 0, padding: getWidthnHeight(2).width, alignItems: 'flex-start' }, containerStyle]}>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: getWidthnHeight(2).width, borderBottomWidth: 1, borderBottomColor: '#C4C4C4' }}>
                        <Text style={{ textAlign: 'left', color: '#0F9764', fontSize: fontSizeH4().fontSize + 5, fontWeight: 'bold' }}>QR Code</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <Text style={[{ textAlign: 'left', color: '#000000', fontSize: fontSizeH4().fontSize + 2, }, getMarginTop(2)]}>Scan or Download QR Code</Text>
                        <TouchableOpacity
                            onPress={() => {
                                captureScreen({
                                    format: "jpg",
                                    quality: 0.8,
                                }).then(
                                    (uri) => {
                                        console.log("Image saved to", uri);
                                        saveQrToDevice(uri)
                                    },
                                    (error) => console.error("Oops, snapshot failed", error)
                                );
                            }}
                        >
                            <Feather name='download' size={getWidthnHeight(8).width} color='#0F9764' />
                        </TouchableOpacity>
                    </View>
                    <View style={[{ borderWidth: 0, borderColor: 'red', width: '100%', alignItems: 'center' }, getMarginTop(2)]}>
                        <ViewShot ref={ref}>
                            <QRCode
                                // value={qrData.url}
                                logo={{ uri: qrData.qr }}
                                logoSize={getWidthnHeight(-1).width}
                                logoBackgroundColor="transparent"
                                getRef={(c) => setProductQRref(c)}
                            />
                        </ViewShot>
                    </View>
                    <Text style={[{ textAlign: 'left', color: '#000000', fontSize: fontSizeH4().fontSize + 2, }, getMarginTop(2)]}>Copy Link</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: '100%' }}>
                        <View style={[{ width: '80%', borderColor: '#0F9764', borderRadius: getWidthnHeight(2).width, borderWidth: 1, justifyContent: 'center' }, getMarginVertical(2)]}>
                            <Text
                                numberOfLines={1}
                                style={[{
                                    textAlign: 'left', color: '#000000', fontSize: fontSizeH4().fontSize + 2, paddingVertical: getWidthnHeight(3).width,
                                    paddingHorizontal: getWidthnHeight(2).width
                                }]}>{qrData.url}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => Clipboard.setString(qrData.url)}
                        >
                            <MaterialIcons name='content-copy' size={getWidthnHeight(8).width} color='#0F9764' />
                        </TouchableOpacity>
                    </View>
                </View>
            </ActionModal>
        </Portal >
    );
};