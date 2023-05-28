/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
//import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {SafeAreaView,StatusBar,StyleSheet,Text, useColorScheme, View,} from 'react-native';
// import { NativeBaseProvider,Box, } from "react-native-base";
// import SignInScreen from './src/screens/SignInScreen';
import HomeScreen from './src/screens/HomeScreen';
import {Colors} from 'react-native/Libraries/NewAppScreen';
// import TabNav from './src/router/TabNav/TabNav';
import Router from './src/router';
import Navigation from './src/navigation';
import SigninScreen from './src/screens/SigninScreen';
import SignUpScreen from './src/screens/SignUpScreen';

import RatingScreen from './src/screens/RatingScreen';
import ProductScreen from './src/screens/ProductScreen';
import WishlistScreen from './src/screens/WishlistScreen/WishlistScreen';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen'
import Pagination from './src/components/Pagination';


const App=() => {
  const isDarkMode = useColorScheme()==='dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex:1,
  };
      setTimeout(()=>{
        SplashScreen.hide();
        },1000)
  
  return (
     <View style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode?'light-content':'dark-content'}/>
           {/* <Pagination/> */}
            <Router/>
            {/* <NavigationContainer>
               <Navigation/>
            </NavigationContainer> */}
     </View>
    
     );
  
};

const styles=StyleSheet.create({
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

