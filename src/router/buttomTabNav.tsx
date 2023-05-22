import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import WishlistScreen from '../screens/WishlistScreen';
import ProfileScreen from '../screens/ProfileScreen'
import RatingScreen from '../screens/RatingScreen';

const Tab = createBottomTabNavigator();
const  ButtomTabNav =()=>{
    return(
      
        <Tab.Navigator
         screenOptions={{
            tabBarShowLabel: false, 
            tabBarInactiveTintColor:'#ffbd7d',
            tabBarActiveTintColor:'#e47911',
            headerShown: false}}>
                <Tab.Screen component={HomeStack} name='Home'
                options= {{
                    tabBarIcon:({color})=>(
                    <Entypo name="home" color={color} size ={25}/>
                    ),
                }}
               
                />
                <Tab.Screen component={ProfileStack} name ='Profile'
                    options= {{
                        tabBarIcon:({color})=>(
                        <Entypo name="user" color={color} size ={25}/>
                        ),
                    }}
                />
                <Tab.Screen component={WishlistScreen} name ='Wishlist'
                     options= {{
                        tabBarIcon:({color})=>(
                        <Entypo name="heart" color={color} size ={25}/>
                        ),
                    }}
                />
                <Tab.Screen component={RatingScreen} name ='more'
                  options= {{
                    tabBarIcon:({color})=>(
                    <Entypo name="menu" color={color} size ={25}/>
                    ),
                }}
                />

        </Tab.Navigator>
        
            );
};

export default ButtomTabNav;