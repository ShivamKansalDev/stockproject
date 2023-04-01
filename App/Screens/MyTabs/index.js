import { createMaterialTopTabNavigator, } from '@react-navigation/material-top-tabs';
import One from '../One';
import Two from '../Two';
import Three from '../Three';
import BestPerformingIPO from '../BestPerformingIPO';
import { StyleSheet, Text, Dimensions } from 'react-native'
const Tab = createMaterialTopTabNavigator();
const DEVICE_WIDTH =Dimensions.get('screen').width
const  MyTabs=()=> {
  return (
    <Tab.Navigator
    initialRouteName="One"
    
    screenOptions={{
        tabBarIndicator: () => null,
        tabBarScrollEnabled: true,
        tabBarActiveTintColor: '#12626C',
        tabBarInactiveTintColor: '#686868',
        tabBarLabelStyle: {fontSize: 12, fontWeight: 'bold'},
        tabBarStyle: {
          backgroundColor: '#FAFAFA',
          overflow: 'hidden',
          
        },
        tabBarItemStyle: {
            width: 'auto',
            alignItems: 'flex-start',
          },
        tabBarIndicatorStyle: {
            width:80,
              backgroundColor: "transparent",
              borderRadius:30,
              top: 4,
              marginHorizontal: 3,      
        },

      }}
     
    >
      <Tab.Screen name="One" component={One} />
      <Tab.Screen name="Two" component={Two} />
      <Tab.Screen name="Three" component={Three} />
      <Tab.Screen name="Best Performing IPO" component={BestPerformingIPO} />
    </Tab.Navigator>
  );
}
export default MyTabs