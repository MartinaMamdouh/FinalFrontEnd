import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import WishlistScreen from '../screens/WishlistScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RatingScreen from '../screens/RatingScreen';
import CustomButton from '../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const ButtomTabNav = () => {
    // const navigation = useNavigation();
    // const onWishlistPressed = () => {
    //     navigation.navigate('WishlistScreen');
    // }


    return (

        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: true,
                tabBarInactiveTintColor: '#b2d8d8',
                tabBarActiveTintColor: '#006666',
                headerShown: false
            }}>
            <Tab.Screen component={HomeStack} name='Home'
                options={{
                    tabBarIcon: ({ color }) => (
                        <Entypo name="home" color={color} size={25} />
                    ),
                }}

            />
            <Tab.Screen component={ProfileStack} name='Profile'
                options={{
                    tabBarIcon: ({ color }) => (
                        <Entypo name="user" color={color} size={25} />
                    ),
                }}
            />
            <Tab.Screen component={WishlistScreen} name='Wishlist'
                options={{
                    tabBarIcon: ({ color }) => (
                        <Entypo name="heart" color={color} size={25} />
                    ),
                }}
            />

            <Tab.Screen component={RatingScreen} name='more'
                options={{
                    tabBarIcon: ({ color }) => (
                        <Entypo name="menu" color={color} size={25} />
                    ),
                }}
            />
            {/* <CustomButton text="My Wishlist"
                //  onPress={() => navigation.navigate('WishlistScreen')}
                bgColor="#E7EAF4"
                fgColor="#4765A9"
            /> */}
        </Tab.Navigator>
    );
};

export default ButtomTabNav;
