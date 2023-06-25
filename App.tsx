/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useEffect, useState } from 'react';
import {StatusBar, StyleSheet, useColorScheme, View,} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Router from './src/router';
import SplashScreen from 'react-native-splash-screen';
import UserAuthContextProvider, { UserAuthContext } from './src/context/UserAuthContext';
import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-community/async-storage';
import { PRICE_SMART_JWT } from './src/config';
import { CurrentPageProvider } from './src/context/CurrentPageContext';

const App=() => {
  const isDarkMode = useColorScheme()==='dark';
  const [ready, setReady] = useState();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex:1,
  };

  axios.defaults.baseURL = API_URL;

  useEffect(() => {
    const initState = async () => {
      const authToken = await AsyncStorage.getItem(PRICE_SMART_JWT);
      if (authToken) {
        axios.defaults.headers.common.Authorization = authToken;
        setReady(true);
      }
    };

    initState();
  }, []);

  if (!ready) return null;

  setTimeout(() => {
    SplashScreen.hide();
  }, 1000);

  return (
    <UserAuthContextProvider>
      <CurrentPageProvider>
      <View style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Router />
      </View>
      </CurrentPageProvider>
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

