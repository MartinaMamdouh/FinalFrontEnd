import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import WishlistStack from './WishlistStack';
import AboutUsScreen from '../screens/AboutUsScreen';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const ButtomTabNav = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
  
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
  
    return () => backHandler.remove();
  }, []);

  
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
