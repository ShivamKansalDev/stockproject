import React, { useState, useRef, useMemo, useEffect, useLayoutEffect } from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    SafeAreaView,
    LogBox,
    FlatList,
    TouchableOpacity,
    View,
    ActivityIndicator,
    BackHandler
} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import { useIsFocused, useRoute } from '@react-navigation/native';
import ProfileHeader from '../../Components/Header/ProfileHeader';
import StatusBarView from '../../Components/StatusBar';
import BrandImage from '../../Components/BrandImage';
import CompanyBnner from '../../Components/CompanyBanner';
import OverViewFundametal from '../../Components/OverViewFundametal';

import Financials from './Components/Financials';
import CorporateActions from './Components/CorporateActions';
import Category from './Components/Category';
import ShareholdingPattren from './Components/ShareholdingPattren';
import Score from './Components/Score';
import BottomSheetView3 from '../../Components/BottomSheetView3';
import BottomSheetView2 from '../../Components/BottomSheetView2';
import { useSelector, useDispatch, connect } from 'react-redux';
import {
    listedCheck,
    listed_individual_score_card,
} from '../../Utils/listedCheck';
import { ALL_CHECK_LIST_IS_SELETED } from '../../ActionType/CheckList';
import { getChecklist, getCheckPost } from '../../Action/CheckList';
import { companyUrl, headers } from '../../Url';
import jsonFile from '../../../getToken.json';
import { fontSizeH4, getMarginTop, getWidthnHeight } from '../../Components/width';
import Fundamental from './Components/Fundamental';
import { AndroidApp } from './Components/Technicals';
import { COMPANY_DETAILS_FOR_HOME } from '../../ActionType/CompanyDetails';

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

const CompanyDetailsPage = ({ getCheckPost, navigation }) => {
    const route = useRoute();
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const { EventDetails } = useSelector(state => state.Event);
    const { CheckList } = useSelector(state => state.CheckList);
    const [displyCompomnet, setDisplayComponents] = useState('Score');
    const { CheckList1 } = useSelector(state => state.CheckList);
    const { DomesticIndexLayerTwo } = useSelector(
        state => state.DomesticIndexLayerTwo,
    );
    const userDetails = useSelector(state => state.User);
    const authToken = userDetails?.authToken;
    const { CompanyDetails } = useSelector(state => state.CompanyDetails);
    const [shareHolding, setShareHolding] = useState([]);
    const [buttonType, setButtonType] = useState('overview');
    const [loading, setLoading] = useState(null);

    const bottomSheetRef = useRef(null);
    const bottomSheetRef2 = useRef(null);
    const snapPoints = useMemo(() => ['5%', '50%', '75%'], []);

    useLayoutEffect(() => {
        setLoading(null)
        dispatch({
            type: COMPANY_DETAILS_FOR_HOME,
            data: []
        })
    }, [isFocused])

    useEffect(() => {
        const subscribe = BackHandler.addEventListener('hardwareBackPress', () => {
            let routes = navigation.getState().routes;
            routes = routes.filter((item) => item.name !== 'CompanyDetails')
            // console.log("@@*&^^(*& NAV ROUTES: ", route.name)
            if (route.name === "CompanyDetails") {
                navigation.reset({
                    index: 0,
                    routes: routes
                })
                // navigation.goBack();
                dispatch({
                    type: COMPANY_DETAILS_FOR_HOME,
                    data: []
                })
                setLoading(null)
                return true
            } else {
                return false;
            }
        })

        return () => {
            subscribe.remove()
        }
    }, []);

    useEffect(() => {
        //const {} = route.params;
        console.log('$$$$$$$$$ COMPANY DETAILS: ', CompanyDetails, "\n\n\n", DomesticIndexLayerTwo);
        if (Array.isArray(CompanyDetails) && CompanyDetails.length > 0) {
            setLoading(false)
            const co_code = CompanyDetails[0]['co_code'];
            const apiLink = `${companyUrl}/listedshareholdings/pattern/co_code/${co_code}`;
            console.log('***&&&^^^ LOADING...', apiLink);
            axios
                .get(apiLink, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                })
                .then(response => {
                    const data = response.data.data;
                    setShareHolding(data);
                })
                .catch(error => console.log('@@@##$$$&& ERROR: ', error.response));
        } else {
            setLoading(true)
        }
    }, [CompanyDetails]);

    const ranDerView = () => {
        switch (true) {
            case displyCompomnet === 'Financials':
                return <Financials />;

            case displyCompomnet === 'Corporate Actions':
                return <CorporateActions />;
            case displyCompomnet === 'Shareholding pattren':
                return <ShareholdingPattren />;
            case displyCompomnet === 'Score':
                return (
                    <Score
                        bottomSheetRef={bottomSheetRef}
                        bottomSheetRef2={bottomSheetRef2}
                        shareHolding={shareHolding}
                    />
                );
        }
    };

    const seleted = id => {
        dispatch({
            type: ALL_CHECK_LIST_IS_SELETED,
            payload: {
                id: id,
            },
        });
    };
    const filterData = () => {
        // let listed_individual_score_card = [];
        // nn1.map((item, i) => {
        //     listed_individual_score_card.push(item.value);
        // });
        // if (listed_individual_score_card.length > 0) {
        //     getCheckPost(listed_individual_score_card);
        //     // console.log(listed_individual_score_card);

        //     bottomSheetRef.current.close();
        // }
        const listed_individual_score_card = CheckList1
        getCheckPost(listed_individual_score_card);
        bottomSheetRef.current.close()
    };

    return (
        <>
            <SafeAreaView style={[{ flex: 1, backgroundColor: 'white' }]}>
                <StatusBarView />
                <ProfileHeader />
                {/* <View style={{ flex: 1, alignItems: 'center' }}> */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    nestedScrollEnabled={true}
                >
                    {(loading === false) ? (
                        <>
                            <BrandImage />
                            <CompanyBnner />
                            <OverViewFundametal
                                buttonType={buttonType}
                                setButtonType={setButtonType}
                            />
                            <View style={{ flex: 1, borderColor: 'red', borderWidth: 0 }}>
                                {(buttonType === 'overview') && (
                                    <>
                                        <Category setDisplayComponents={setDisplayComponents} />
                                        {ranDerView()}
                                    </>
                                )}
                                {(buttonType === 'fundamental') && (
                                    <>
                                        <Fundamental />
                                    </>
                                )}
                                {(buttonType === 'technicals') && (
                                    <>
                                        <AndroidApp />
                                    </>
                                )}
                            </View>
                        </>
                    ) :
                        (loading === null) && (
                            <ActivityIndicator color={'#0F9764'} size="large" style={{ transform: [{ scale: 1.5 }] }} />
                        )
                    }
                    {(loading) && (
                        <View style={[{ alignItems: 'center', justifyContent: 'center' }, getMarginTop(40)]}>
                            <Text style={{ fontSize: fontSizeH4().fontSize + 4 }}>No data found</Text>
                        </View>
                    )}
                </ScrollView>
                {/* </View> */}
            </SafeAreaView>
            <BottomSheetView3
                data={listedCheck}
                onPress={seleted}
                onPress1={filterData}
                counntData={CheckList1}
                snapPoints={snapPoints}
                bottomSheetRef={bottomSheetRef}
            />
            <BottomSheetView2
                data={EventDetails}
                snapPoints={snapPoints}
                bottomSheetRef={bottomSheetRef2}
            />
        </>
    );
};

export default connect(null, { getCheckPost })(CompanyDetailsPage);

const styles = StyleSheet.create({});
