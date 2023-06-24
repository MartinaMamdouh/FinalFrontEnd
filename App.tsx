/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {StatusBar, StyleSheet, useColorScheme, View,} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Router from './src/router';
import SplashScreen from 'react-native-splash-screen';
import UserAuthContextProvider, { UserAuthContext } from './src/context/UserAuthContext';
import axios from 'axios';
import {API_URL} from '@env';

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

