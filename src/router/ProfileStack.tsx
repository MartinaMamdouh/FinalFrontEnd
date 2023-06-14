import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SigninScreen from '../screens/SigninScreen';
import WishlistScreen from '../screens/WishlistScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import HistoryScreen from '../screens/HistoryScreen';

const Stack = createStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="SignIn" component={SigninScreen} />
            {/* <Stack.Screen name="Signup" component={SignUpScreen} /> */}
            {/* <Stack.Screen name="forgotpassword" component={ForgotPasswordScreen} /> */}
            {/* <Stack.Screen name="touchID" component={TouchIDScreen} /> */}
            {/* <Stack.Screen name="newpassword" component={NewPasswordScreen} /> */}
            {/* <Stack.Screen name="RatingScreen" component={RatingScreen} /> */}
            <Stack.Screen name="WishlistScreen" component={WishlistScreen} />
            <Stack.Screen name="My History" component={HistoryScreen} />
        </Stack.Navigator>
    );
};

export default ProfileStack;
