import {
    StyleSheet,
    Text,
    SafeAreaView,
    TouchableOpacity,
    View,
    TextInput,
    Dimensions,
    FlatList,
    ScrollView,
} from 'react-native';
import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Autocomplete from 'react-native-autocomplete-input';
import { connect, useSelector } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import {
    getCompanyDetails,
    getEvent,
    getPriceVolume,
    getScore,
} from '../../Action/CompanyDetails';
import { getChecklist } from '../../Action/CheckList';
import jsonFile from '../../../getToken.json';
import { getListedSearchDetails } from '../../Action/ListedSearch';
import { getDomesticCompanyNameLawerTwo } from '../../Action/ListedCompanyListLawer2';
import { getUnlistedSearchDetails } from '../../Action/UnlistedSearch';
import { companyUrl } from '../../Url';
import { fontSizeH4 } from '../../Components/width';
import { getGroupMsterForDomesticIndex } from '../../Action/GroupMasterForDomesticIndex';

const { width, height } = Dimensions.get('window');

const SearchScreen = ({
    navigation,
    getScore,
    getPriceVolume,
    getCompanyDetails,
    getChecklist,
    getListedSearchDetails,
    getUnlistedSearchDetails,
}) => {
    const [listedData, setListedData] = useState([]);
    const [unlistedData, setUnlistedData] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [userProfile, setUserProfile] = useState([]);
    const userDetails = useSelector((state) => state.User)
    const { GroupMasterForDomesticIndex } = useSelector(
        state => state.GroupMasterForDomesticIndex,
    );

    const authToken = userDetails?.authToken;

    // console.log("@@@@ SEARCH SCREEN: ", authToken)

    // const getDebouncedData = useCallback(_.debounce(searchCompany, 1000), []);

    useEffect(() => {
        if (searchName) {
            searchCompany(searchName);
        }
    }, [searchName]);

    const searchCompany = data => {
        const token =
            'eyJhbGciOiJSUzI1NiIsImtpZCI6IjVhNTA5ZjAxOWY3MGQ3NzlkODBmMTUyZDFhNWQzMzgxMWFiN2NlZjciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiYW51cCBqYW5hIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FFZEZUcDU1WnNDdHRXYUE5QlhMSENiYklKU1p4Ukw5b3htWm0yMVJQMUlUPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3N0b2Nra25vY2tzLXByb2QiLCJhdWQiOiJzdG9ja2tub2Nrcy1wcm9kIiwiYXV0aF90aW1lIjoxNjc1ODI3OTg4LCJ1c2VyX2lkIjoiOUF1ZzFCRjM4TmdwMDFtdm1rTGtaODlXTk43MiIsInN1YiI6IjlBdWcxQkYzOE5ncDAxbXZta0xrWjg5V05ONzIiLCJpYXQiOjE2NzU4Mjc5ODgsImV4cCI6MTY3NTgzMTU4OCwiZW1haWwiOiJhbnVwQHhpZ21hcHJvLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTA3NjgxMzg2NTg5NDIxOTc1NDgyIl0sImVtYWlsIjpbImFudXBAeGlnbWFwcm8uY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.BrEDKJZu7G_Ik17CX9D_y8UfSPf_9HqFiW_jTIGlviY2Exp5nITdwKTss9-xlgwov03wpnsbYPWgnsdM1DEi8hYrAQQbQEY0XRs_OfJUoYa44x2aRToTNhFgI7TjvsfYb1Wn-PbcBbSSi6U5k5a4B0uMcMvsVSfwF2WnYlgFN_-eauJOV3ua4Q9rJpsOTB5q00exBo3rRicjj2i73dbaayQJPLZxLcmhDEjcU1yImxVyxsl13Xf8D8f7dLPXe1o-ZPUT6zG3giaS1anTuAMHuPRAKtrY7cdlgohvm0ytkaDBAuW2u1ku63qVwhd2JuDr6Sd2Lzf_8cMwJTFtvB4AZQ';

        fetch(
            `https://company-service-vhteukeytq-el.a.run.app/api/listed/search?term=${data}`,
            {
                method: 'Get',

                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
            },
        )
            .then(res => {
                return res.json();
            })
            .then(result => {
                // console.log('LISTED result', result);
                if (result) {
                    setListedData(result);
                }
            })
            .catch(err => console.log(err));

        fetch(
            `https://company-service-vhteukeytq-el.a.run.app/api/unlistedSearch/?term=${data}`,
            {
                method: 'Get',

                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
            },
        )
            .then(res => {
                return res.json();
            })
            .then(result => {
                // console.log('@@@@@@@ UNLISTED result', result);
                if (result) {
                    setUnlistedData(result);
                }
            })
            .catch(err => console.log(err));

        fetch(
            `https://user-service-vhteukeytq-as.a.run.app/api/search/users?term=${data}`,
            {
                method: 'Get',

                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            },
        )
            .then(res => {
                return res.json();
            })
            .then(result => {
                // console.log('@@@@@@@ PROFILE RESULT', result);
                if (result) {
                    setUserProfile(result);
                }
            })
            .catch(err => console.log(err));
    };

    const getCompanyDetail = item => {
        console.log("@#@#@&*&*&*& LISTED ITEM: ", item)
        const startDate1 = moment(moment().subtract(10, 'days')).format(
            'DD-MMM-YYYY',
        );
        const endDate1 = moment(new Date()).format('DD-MMM-YYYY');
        getCompanyDetails(item.co_code, authToken);

        getPriceVolume('NSE', item.co_code, startDate1, endDate1, authToken);

        getScore(item.co_code, authToken);
        getEvent(item.co_code, authToken);
        getChecklist(authToken);
        // navigation.navigate('CompanyDetails', { co_code: item.co_code });
        console.log("^^^^^^@#@#@ ", navigation.navigate)
        navigation.navigate('TabNaV', {
            screen: 'ListedNavigator',
            params: {
                screen: 'CompanyDetails',
                params: { co_code: item.co_code },
                initial: false
            }
        });
    };

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginTop: '2%',
                }}>
                <TouchableOpacity
                    style={{
                        width: '10%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={() => {
                        navigation.goBack();
                    }}>
                    <Feather name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
                <View
                    style={{
                        width: width * 0.8,
                        height: '100%',
                        alignItems: 'center',
                    }}>
                    <TextInput
                        style={[styles.autocompleteContainer, { color: 'black' }]}
                        placeholder="Search company name"
                        placeholderTextColor={'#C4C4C4'}
                        value={searchName}
                        onChangeText={text => setSearchName(text)}
                    />
                </View>
            </View>
            {/* <Autocomplete
            containerStyle={styles.autocompleteContainer}
            style={{color: 'black'}}
            data={data}
            value={name}
            placeholder="Search company name"
            onChangeText={text => seachCompany(text)}
            flatListProps={{
              keyExtractor: (_, idx) => idx,
              renderItem: ({item}) => {
                return (
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      paddingVertical: 5,
                      paddingHorizontal: 20,
                    }}
                    onPress={() => {
                      getCompanyDetail(item.co_code);
                    }}>
                    <Text>{item.CompanyName}</Text>
                  </TouchableOpacity>
                );
              },
            }}
          /> */}
            <View style={{ flex: 1 }}>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                >
                    <View
                        style={{ width: '90%', alignItems: 'flex-start', marginTop: '2%' }}>
                        {listedData.length > 0 && (
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Listed</Text>
                        )}
                        <FlatList
                            keyboardShouldPersistTaps="handled"
                            style={{ marginTop: '2%' }}
                            data={listedData}
                            key={item => item._id}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        style={{ borderColor: 'black', borderWidth: 0 }}
                                        onPress={() => {
                                            console.log('@#@#@#@# ', item.co_code);
                                            getCompanyDetail(item);
                                            // getListedSearchDetails(item.co_code, navigation, authToken);
                                            // navigation.navigate('TabNav', {
                                            //     screen: 'ListedNavigator',
                                            //     params: {
                                            //         screen: 'Listed'
                                            //     }
                                            // })
                                            // navigation.goBack()
                                            // console.log("#@#@# NAV STATE: ", navigation.getState())
                                        }}>
                                        <Text
                                            style={[
                                                {
                                                    paddingVertical: 10,
                                                    fontSize: fontSizeH4().fontSize + 2,
                                                },
                                            ]}>
                                            {item.CompanyName}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                    <View style={{ width: '90%', alignItems: 'flex-start' }}>
                        {listedData.length > 0 && (
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>UnListed</Text>
                        )}
                        <FlatList
                            style={{ marginTop: '2%' }}
                            data={unlistedData}
                            key={item => item._id}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        style={{ borderColor: 'black', borderWidth: 0 }}
                                        onPress={() => {
                                            // console.log("@#@#@# UNLISTED SEARCH: ", item)
                                            getUnlistedSearchDetails(item._id, navigation, authToken);
                                        }}>
                                        <Text
                                            style={[
                                                {
                                                    paddingVertical: 10,
                                                    fontSize: fontSizeH4().fontSize + 2,
                                                },
                                            ]}>
                                            {item.companyName}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                    <View style={{ width: '90%', alignItems: 'flex-start' }}>
                        {userProfile.length > 0 && (
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                User Profile
                            </Text>
                        )}
                        <FlatList
                            style={{ marginTop: '2%' }}
                            data={userProfile}
                            key={item => item._id}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        style={{ borderColor: 'black', borderWidth: 0 }}
                                        onPress={() => {
                                            // getUnlistedSearchDetails(item._id, navigation);
                                            navigation.navigate('TabNaV', {
                                                screen: 'PostNavigator',
                                                params: {
                                                    screen: 'ProfileScreen',
                                                    //initial: false,
                                                    params: {
                                                        user: item,
                                                    },
                                                }
                                            });
                                        }}>
                                        <Text
                                            style={[
                                                {
                                                    paddingVertical: 10,
                                                    fontSize: fontSizeH4().fontSize + 2,
                                                },
                                            ]}>
                                            {item.name}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default connect(null, {
    getPriceVolume,
    getCompanyDetails,
    getChecklist,
    getScore,
    getListedSearchDetails,
    getUnlistedSearchDetails,
})(SearchScreen);

const styles = StyleSheet.create({
    autocompleteContainer: {
        // Hack required to make the autocomplete
        // work on Andrdoid
        width: width * 0.8,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#C4C4C4',
    },
});
