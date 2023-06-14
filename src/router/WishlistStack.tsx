import React from 'react';
import WishlistScreen from '../screens/WishlistScreen';
import ProductScreen from '../screens/ProductScreen/ProductScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const WishlistStack = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen component={WishlistScreen} name='My Wishlist' />
            <Stack.Screen component={ProductScreen} name='ProductScreen' />
        </Stack.Navigator>
          );
        };
        
        export default WishlistStack;