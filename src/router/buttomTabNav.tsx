import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import WishlistStack from './WishlistStack';
import RatingScreen from '../screens/RatingScreen';
import AboutUsScreen from '../screens/AboutUsScreen';
const Tab = createBottomTabNavigator();
const ButtomTabNav = () => {
  
    return (

        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarInactiveTintColor: '#b2d8d8',
                tabBarActiveTintColor: '#006666',
                headerShown: false,
                
            }}>
            <Tab.Screen component={HomeStack} name='HomeStack'
                options={{
                    tabBarIcon: ({ color }) => (
                        <Entypo name="home" color={color} size={25} />
                    ),
                }}

            />
            <Tab.Screen component={ProfileStack} name='ProfileStack'
                options={{
                    tabBarIcon: ({ color }) => (
                        <Entypo name="user" color={color} size={25} />
                    ),
                }}
            />
            <Tab.Screen component={WishlistStack} name='Wishlist'
                options={{
                    tabBarIcon: ({ color }) => (
                        <Entypo name="heart" color={color} size={25} />
                    ),                
                }}
            />

            <Tab.Screen component={AboutUsScreen} name='more'
                options={{
                    tabBarIcon: ({ color }) => (
                        <Entypo name="menu" color={color} size={25} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default ButtomTabNav;
