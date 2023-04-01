import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';

import { getWidthnHeight } from '../../../../Components/width';

function App({ uri }) {
    return (
        <View style={[{ flex: 1, borderWidth: 0, borderColor: 'red' }, getWidthnHeight(100, 100)]}>
            <WebView
                style={{ flex: 1 }}
                source={{ uri }}
                allowFileAccessFromFileURLs={true}
                domStorageEnabled={true}
                allowFileAccess={true}
                allowUniversalAccessFromFileURLs={true}
                originWhitelist={['*']}
                onShouldStartLoadWithRequest={() => true}
            />
        </View>
    );
}

export function AndroidApp() {
    const { CompanyDetails } = useSelector(state => state.CompanyDetails);
    const userDetails = useSelector((state) => state.User);
    const co_code = CompanyDetails[0]['co_code'];
    const userId = userDetails?.User?._id;
    console.log("!@!@!(*((())) COMPANY DATA: ", co_code, userId)
    return <App uri={`file:///android_asset/index.html?symbol=${co_code}&userId=${userId}`} />;
}

export function IOsApp() {
    return <App uri={'index.html'} />;
}