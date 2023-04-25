import React,{useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen/ProductScreen';
import RatingScreen from '../screens/RatingScreen';
import Navigation from '../navigation';
import { Text, SafeAreaView,View,TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
// import { SearchBar } from 'react-native-screens';
// import { View } from 'react-native-gesture-handler';
// import SpeechtoText from '../SpeechtoText';
import SearchBar from '../components/SearchBar';


const Stack = createStackNavigator();

interface HeaderComponentProps{
    searchValue:string,
    setSearchValue: () =>void;
}
const HeaderComponent = ({
    searchValue,
    setSearchValue
    }:HeaderComponentProps) => {
    return(
       <SafeAreaView style={{backgroundColor:'orange'}}>
        <View style={{margin:10,
            // padding:5,
            backgroundColor:'white',
            flexDirection:'row',
            alignItems:'center',}}>
            {/* <Feather name="search"size={20}/>
            <TextInput style={{height:40,marginLeft:10}}
            placeholder="Search.."
            value={searchValue}
            onChangeText={setSearchValue}/> */}
            <SearchBar/>
        

           
        </View>

       </SafeAreaView>
      
    );
};
const HomeStack =()=>{
    const[searchValue, setSearchValue]=useState('');
    return(
      
        // <Stack.Navigator screenOptions={{headerShown:false}}>
        
        <Stack.Navigator screenOptions={{
            header: ()=> (
            <HeaderComponent 
            searchValue={searchValue} 
            setSearchValue={setSearchValue}
            /> ),
        }}>
       
            <Stack.Screen name="HomeScreen"
            options={{title:'Home'}}>
            {()=><HomeScreen searchValue={searchValue}/>}
            </Stack.Screen>

            {/* product Details */}
            <Stack.Screen component={ProductScreen} name="ProductDetails"/>
     
        </Stack.Navigator>
       
    );
};

export default HomeStack;