import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ButtomTabNav from './buttomTabNav';
import SigninScreen from '../screens/SigninScreen/SigninScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import AsyncStorage from '@react-native-community/async-storage';
import { PRICE_SMART_JWT } from '../config';
import axios from 'axios';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen/NewPasswordScreen';
import CodeScreen from '../screens/CodeScreen/CodeScreen';
const Root = createStackNavigator();
const Router = () => {
  const [authToken, setAuthToken] = useState();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(PRICE_SMART_JWT).then((res) => {
      axios.defaults.headers.common.Authorization = res;
      setAuthToken(res);
      setReady(true);
    });
  }, []);

  if (!ready) return null;

  return (
    <NavigationContainer>
      <Root.Navigator
        initialRouteName={!!authToken ? 'Home' : 'Signin'}
        screenOptions={{ headerShown: false }}
      >
        <Root.Screen component={ButtomTabNav} name="Home" />
        <Root.Screen component={SigninScreen} name="Signin" />
        <Root.Screen component={SignUpScreen} name="Signup" />
        <Root.Screen component={ForgotPasswordScreen} name="forgotpassword" />
        <Root.Screen component={CodeScreen} name="CodeScreen" />
        <Root.Screen component={NewPasswordScreen} name="newpassword" />
      </Root.Navigator>
    </NavigationContainer>
  );
};

export default Router;
