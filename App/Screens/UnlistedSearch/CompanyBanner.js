import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { fontSizeH3, fontSizeH4 } from '../../Components/width';

const CompanyBanner = props => {
    useEffect(() => {
        console.log('&&&&&&&&&&&&&&&& CompanyDetails', props.CompanyDetails);
    }, []);
    const CompanyDetails = JSON.parse(props.CompanyDetails);
    return (
        <View
            style={{
                width: '100%',
                paddingHorizontal: 10,
                paddingVertical: 15,
            }}>
            <View style={styles.container}>
                <View style={styles.containerInnner}>
                    <View style={styles.upperLeft}>
                        <View
                            style={{
                                width: 40,
                                height: 40,
                                backgroundColor: 'white',
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <View>
                                <Text style={{ fontSize: fontSizeH3().fontSize, fontWeight: 'bold' }}>{CompanyDetails[0]?.companyName.substring(0, 1)}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.upperRight}>
                        <Text
                            style={{
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: fontSizeH4().fontSize + 2,
                            }}>
                            {CompanyDetails[0]?.companyName}
                        </Text>
                        <Text style={{ color: '#686868' }}>{CompanyDetails[0]?.symbol}</Text>
                    </View>
                </View>
                <View style={styles.lower}>
                    <View style={{ width: '70%', height: '100%', alignItems: 'center' }}>
                        <TouchableOpacity
                            style={{
                                width: 100,
                                height: 35,
                                alignItems: 'center',
                                justifyContent: 'center',

                                flexDirection: 'row',
                                borderRadius: 10,
                                backgroundColor: '#0F9764',
                            }}>
                            <Entypo name="plus" size={22} color="white" />
                            <Text style={{ color: 'white', marginLeft: 5 }}>Follow</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '30%', height: '100%' }}>
                        <Text>
                            <FontAwesome5 name="rupee-sign" size={16} color="black" />
                            <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>
                                {' '}
                                {CompanyDetails[0]?.Price}
                            </Text>
                        </Text>
                        <Text
                            style={{
                                color: CompanyDetails[0]?.change > 0 ? '#0F9764' : 'red',
                                fontWeight: '400',
                            }}>
                            {/* {CompanyDetails[0]?.PriceDiff > 0
                ? `${Number(CompanyDetails[0]?.PriceDiff?.toFixed(2))}`
                : `${Number(CompanyDetails[0]?.PriceDiff?.toFixed(2))}`}

              {CompanyDetails[0]?.change > 0
                ? `(${Number(CompanyDetails[0]?.change?.toFixed(2))}%)`
                : `(${Number(CompanyDetails[0]?.change?.toFixed(2))}%)`} */}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default CompanyBanner;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#EBEBEB',
        borderRadius: 10,
    },
    containerInnner: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
    },
    upperLeft: {
        width: '20%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    upperRight: { width: '80%', height: '100%', justifyContent: 'center' },
    lower: { width: '100%', height: 70, flexDirection: 'row' },
});
