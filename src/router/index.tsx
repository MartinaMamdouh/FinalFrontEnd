import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ButtomTabNav from './buttomTabNav';
import { UserAuthContext } from '../context/UserAuthContext';
import SigninScreen from '../screens/SigninScreen/SigninScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import TouchIDScreen from '../screens/TouchIDScreen/TouchIDScreen';
const Root = createStackNavigator();
const Router = () => {
  const { isAuthenticated } = useContext(UserAuthContext);
  const [initialRouteName, setInitialRouterName] = useState();

  useEffect(() => {
    setInitialRouterName(isAuthenticated ? 'Home' : 'Signin');
  }, [isAuthenticated]);

  return (
    <NavigationContainer>
      <Root.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{ headerShown: false }}
      >
        <Root.Screen component={ButtomTabNav} name="Home" />
        <Root.Screen component={SigninScreen} name="Signin" />
        <Root.Screen component={SignUpScreen} name="Signup" />
        <Root.Screen component={TouchIDScreen} name="touchID"  />

      </Root.Navigator>
    </NavigationContainer>
  );
};

export default Router;
