/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
//import 'react-native-gesture-handler';
import React, { Component, useContext } from 'react';
import {SafeAreaView,StatusBar,StyleSheet,Text, useColorScheme, View,} from 'react-native';
// import { NativeBaseProvider,Box, } from "react-native-base";
// import SignInScreen from './src/screens/SignInScreen';
import HomeScreen from './src/screens/HomeScreen';
import {Colors} from 'react-native/Libraries/NewAppScreen';
// import TabNav from './src/router/TabNav/TabNav';
import Router from './src/router';
import Navigation from './src/navigation';
import SignUpScreen from './src/screens/SignUpScreen';

import RatingScreen from './src/screens/RatingScreen';
import ProductScreen from './src/screens/ProductScreen';
import WishlistScreen from './src/screens/WishlistScreen/WishlistScreen';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen'
import UserAuthContextProvider, { UserAuthContext } from './src/context/UserAuthContext';
import axios from 'axios';
import {API_URL} from '@env'

const App=() => {
  const isDarkMode = useColorScheme()==='dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex:1,
  };

  axios.defaults.baseURL = API_URL;

  setTimeout(() => {
    SplashScreen.hide();
  }, 1000);

  return (
    <UserAuthContextProvider>
      <View style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Router />
        {/* <NavigationContainer>
          <Navigation/>
        </NavigationContainer> */}
      </View>
    </UserAuthContextProvider>
  );
};

const styles = StyleSheet.create({
  container:{
      flexDirection:'row',
      marginBottom:10,
  },
    root: {
      flex: 1,
      backgroundColor:'white'
    },
});

 export default App;

