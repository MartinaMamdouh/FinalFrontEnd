import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductScreen from '../screens/ProductScreen/ProductScreen';
import HomeScreen from '../screens/HomeScreen';
import AfterSearchScreen from '../screens/AfterSearchScreen';
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