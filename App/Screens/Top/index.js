
import React, { useEffect } from 'react'
import { View, StyleSheet, ActivityIndicator, Linking } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { USER_SET } from '../../Actions/ActionType/User';
// import Axios from 'axios'

const Top = ({ navigation }) => {
  const dispatch = useDispatch()
  const navigatePage = async () => {
    const isRegister = await AsyncStorage.getItem('@user');
     const token = JSON.parse(await AsyncStorage.getItem('@token'));
    // Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const data = isRegister != null ? JSON.parse(isRegister) : null;
    if (data === null) {
      navigation.replace('Home')
    } else {
    //   dispatch({
    //     type: USER_SET,
    //     payload: {
    //       data: data,
    //       token:token
          
    //     }
    //   })
    navigation.replace('Home')
    //   navigation.replace('Profile')
    }

    // data === null
    //   ? this.props.navigation.replace('Home')
    //   : data.isLogin === 0
    //   ? this.props.navigation.replace('Register')
    //   : this.props.navigation.replace('TabNavi');
  };
  useEffect(() => {
    SplashScreen.hide()
    navigatePage()
    // setTimeout(() => {
      
    //   
    // }, 3000);

  }, [])

  return (
    <View style={styles.container}>
      <ActivityIndicator size={80} color={'#0f9764'} />
    </View>
  )
}

export default Top

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})