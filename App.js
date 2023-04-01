import 'react-native-gesture-handler';
import { StyleSheet, Text, View, LogBox } from 'react-native'
import React, { useEffect } from 'react'
import { RootSiblingParent } from 'react-native-root-siblings';
import { Provider as PaperProvider } from 'react-native-paper';
import MainStack from './App/Stacks/MainStack';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import store from './App/Store';
import { Provider } from 'react-redux';
import { MenuProvider } from 'react-native-popup-menu';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
LogBox.ignoreLogs(['Require cycle: node_modules']);
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { expireCheck, setAuthToken } from './App/Components/Helper';


const App = () => {

    const setToke = async () => {
        const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjVhNTA5ZjAxOWY3MGQ3NzlkODBmMTUyZDFhNWQzMzgxMWFiN2NlZjciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiRFVOSVlBIENPTSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BRWRGVHA1N1VfTktvblBZNzV1ek8xVm1uS0J5RUJ5RW15M05Kc29jb2dMTT1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9zdG9ja2tub2Nrcy1wcm9kIiwiYXVkIjoic3RvY2trbm9ja3MtcHJvZCIsImF1dGhfdGltZSI6MTY3NTg4ODc4MiwidXNlcl9pZCI6IjFxMXNGaHV3cjNSRkZ3Q1RGVTE3ZDdlSGpaZDIiLCJzdWIiOiIxcTFzRmh1d3IzUkZGd0NURlUxN2Q3ZUhqWmQyIiwiaWF0IjoxNjc1ODg4NzgyLCJleHAiOjE2NzU4OTIzODIsImVtYWlsIjoiZHVuaXlhZ2VvbmRhYkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNjI5NTg5ODM0ODA1MTY1MjQ4OCJdLCJlbWFpbCI6WyJkdW5peWFnZW9uZGFiQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.IvXphwco_AhXA0X9_Y4Abq_2jA42cNRE8em0W0gt3_2UkIThTw9tUA1WEh7Mod2XGrzX00duiya0nbOTottYjOz01qap4tWTDBEZNbi9APT2ZmFp7ZLhD2GJrhnOQlTyDcK91xT2Ad16695f0GL2cLHfcOTIeqZW8p4oiF2n_ywviY0mx1t2X_ATVzrr0lDpRytv__arhR0u-josSvffpZdHYMWrgM2OnFWP3aWK32YnRVqfrJfYZ1-FB5SzYX5QQsKSKuWO8z9cppOUbL-tMtn_rG7REqhNzqX5SeoLC3IRoNSQ3LLzCogJkDuTEXdHLEUkpF3Z96KIzdNVvCwHnw"


        // await AsyncStorage.getItem('@user');
        if (token) {
            setAuthToken(token)
        }
    }



    useEffect(() => {
        SplashScreen.hide()
        setToke()
        // setTimeout(() => {

        //   
        // }, 3000);

    }, [])


    return (
        <>
            {expireCheck()}


            <GestureHandlerRootView style={{ flex: 1 }}>
                <BottomSheetModalProvider>
                    <Provider store={store}>

                        <PaperProvider>
                            <MenuProvider>
                                <RootSiblingParent>
                                    <MainStack />
                                </RootSiblingParent>
                            </MenuProvider>
                        </PaperProvider>

                    </Provider>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </>
    )
}

export default App
