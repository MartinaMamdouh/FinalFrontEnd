import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ButtomTabNav from './buttomTabNav';
import { UserAuthContext } from '../context/UserAuthContext';
import SigninScreen from '../screens/SigninScreen/SigninScreen';

const Root = createStackNavigator();
const Router = () => {
  const { isAuthenticated } = useContext(UserAuthContext);

  return (
    <NavigationContainer>
      <Root.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Root.Screen component={ButtomTabNav} name="Home" />
        ) : (
          <Root.Screen component={SigninScreen} name="Signin" />
        )}
      </Root.Navigator>
    </NavigationContainer>
  );
};

export default Router;
