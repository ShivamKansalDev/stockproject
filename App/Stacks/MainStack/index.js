import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React, { useState, useEffect } from 'react';
import Login from '../../Screens/Login';
import SingUp from '../../Screens/SingUp';
import Top from '../../Screens/Top';
import Home from '../../Screens/Home';
import Home1 from '../../Screens/Home1';
import Home2 from '../../Screens/Home2';
import Setting from '../../Screens/Setting';
import ResetPassword from '../../Screens/ResetPassword';

import TabNaV from '../../Stacks/TabNaV';
import SingUpSuccess from '../../Components/SingUpSuccess';
import CommunityDrawer from '../CommunityDrawer';

import { connect, useDispatch, useSelector } from 'react-redux';
import MyTabs from '../../Screens/MyTabs';

import Ipo from '../../Screens/Ipo';
import Profile from '../../Screens/Profile';
import Followers from '../../Screens/Followers';
import { getExchangeHolidays } from '../../Action/ListedCompanyList';

const Stack = createNativeStackNavigator();
const MainStack = ({ getExchangeHolidays }) => {
    const { isAuthenticated } = useSelector(state => state.User)
    const { User } = useSelector(state => state.User)
    const [loder, setloder] = useState(true)
    // console.log(User,'User');
    useEffect(() => {
        getExchangeHolidays(setloder, 'bse')
    }, [])
    // console.log(User,'User');
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                {isAuthenticated ? (<>
                    <Stack.Screen name="CommunityDrawer" component={CommunityDrawer} />

                    {/* <Stack.Screen name="Followers" component={Followers} /> */}
                    <Stack.Screen name="Top" component={Top} />


                    <Stack.Screen name="SingUpSuccess" component={SingUpSuccess} />

                    <Stack.Screen name="SingUp" component={SingUp} />
                    {/* <Stack.Screen name="Ipo" component={Ipo} /> */}
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="ResetPassword" component={ResetPassword} />
                    <Stack.Screen name="Setting" component={Setting} />
                    <Stack.Screen name="Home1" component={Home1} />
                    <Stack.Screen name="Home2" component={Home2} />
                    <Stack.Screen name="MyTabs" component={MyTabs} /></>) : (<Stack.Screen name="Home" component={Home} />)}


            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default connect(null, { getExchangeHolidays })(MainStack);
