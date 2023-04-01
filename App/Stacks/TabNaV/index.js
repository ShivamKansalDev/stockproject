import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Post, { PostNavigator } from '../../Screens/Post';
import Unlisted, { UnlistedNavigator } from '../../Screens/Unlisted';
import Listed, { ListedNavigator } from '../../Screens/Listed';
import Community from '../../Screens/Community';
// import TabButton from '../../Components/tabButton/TabButton';
// import tabButtonImage from '../../Components/BottomTabImage/tabButtonImage';
TabButton;
import tabButtonImage from '../../Components/imageLink/tabButtonImage';
import TabButton from '../../Components/tabButton/TabButton';
import { getWidthnHeight } from '../../Components/width';
import { TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator();
const TabNaV = ({ navigation }) => {
    return (
        <Tab.Navigator
            screenOptions={{
                lazy: true,
                headerShown: false,
                tabBarActiveTintColor: 'red',
                tabBarInactiveTintColor: 'gray',
                tabBarShowLabel: false,
                tabBarStyle: {
                    // position: 'absolute',
                    backgroundColor: 'white',
                    // borderRadius: 50,
                    // bottom: 0,
                    // left: 0,
                    // right: 0,
                    // marginHorizontal: 16,
                    height: getWidthnHeight(undefined, 8).height,
                    paddingTop: getWidthnHeight(2).width,
                }
            }}>
            <Tab.Screen
                name="Community"
                component={Community}
                options={{
                    unmountOnBlur: true,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TabButton
                                name="Community"
                                imagePath={tabButtonImage.community}
                                focused={focused}
                            />
                        );
                    },
                }}
            />

            <Tab.Screen
                name="ListedNavigator"
                component={ListedNavigator}
                options={({ navigation }) => ({
                    unmountOnBlur: true,
                    // lazy: true,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => navigation.navigate('ListedNavigator', { screen: 'Listed', initial: true })}
                            >
                                <TabButton
                                    name="Listed"
                                    imagePath={tabButtonImage.listed}
                                    focused={focused}
                                />
                            </TouchableOpacity>
                        );
                    },
                })}
            />
            <Tab.Screen
                name="PostNavigator"
                component={PostNavigator}
                options={{
                    unmountOnBlur: true,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => navigation.navigate('PostNavigator', { screen: 'Post', initial: true })}
                            >
                                <TabButton
                                    name="Post"
                                    imagePath={tabButtonImage.post}
                                    focused={focused}
                                />
                            </TouchableOpacity>
                        );
                    },
                }}
            />
            <Tab.Screen
                name="UnlistedNavigator"
                component={UnlistedNavigator}
                options={{
                    unmountOnBlur: true,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => navigation.navigate('UnlistedNavigator', { screen: 'Unlisted', initial: true })}
                            >
                                <TabButton
                                    name="Unlisted"
                                    imagePath={tabButtonImage.unlisted}
                                    focused={focused}
                                />
                            </TouchableOpacity>
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );
};
export default TabNaV;
