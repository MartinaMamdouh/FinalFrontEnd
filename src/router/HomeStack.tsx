import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductScreen from '../screens/ProductScreen/ProductScreen';
import RatingScreen from '../screens/RatingScreen';
import { SafeAreaView, View } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import SearchBar from '../components/SearchBar';
import AfterSearchScreen from '../screens/AfterSearchScreen';
import { useNavigation } from '@react-navigation/native';
const Stack = createStackNavigator();


const HomeStack = () => {
    return (
        <Stack.Navigator
              screenOptions={{ headerShown: false }}
        >
            <Stack.Screen component={HomeScreen} name='HomeScreen' />
            <Stack.Screen component={ProductScreen} name='ProductScreen' options={{ headerShown: true }}/>
            <Stack.Screen name="AfterSearchScreen" component={AfterSearchScreen} options={{ headerShown: false }} />

        </Stack.Navigator>
    );
};

export default HomeStack;