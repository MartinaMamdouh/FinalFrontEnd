import React,{useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen/ProductScreen';
import RatingScreen from '../screens/RatingScreen';
import Navigation from '../navigation';
import { Text, SafeAreaView,View,TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
// import { SearchBar } from 'react-native-screens';
// import { View } from 'react-native-gesture-handler';
// import SpeechtoText from '../SpeechtoText';
import HomeScreen from '../screens/HomeScreen';
import SearchBar from '../components/SearchBar';
import AfterSearchScreen from '../screens/AfterSearchScreen';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

const HeaderComponent = ({setSearchValue}) => {
        const navigation = useNavigation();
        const handleSearchResult = (result: string) => {
            console.log('Search result:', result);
            setSearchValue(result);
            // do something with the search result, such as filtering data or updating state
            navigation.navigate('AfterSearchScreen',{ searchValue: result });
        }
    return(
       <SafeAreaView style={{backgroundColor:'#009999'}}>
        <View style={{margin:10,
            // padding:5,
            backgroundColor:'white',
            flexDirection:'row',
            alignItems:'center',}}>
            
            <SearchBar onResult={handleSearchResult} />
           
        </View>

       </SafeAreaView>
      
    );
};

const HomeStack =()=>{
    const[searchValue, setSearchValue]=useState('');
    const navigation = useNavigation();
    
    return(
      
        // <Stack.Navigator screenOptions={{headerShown:false}}>
        
        <Stack.Navigator 
        // initialRouteName="HomeScreen"
         screenOptions={{

            header: ()=> (
            <HeaderComponent setSearchValue={setSearchValue} /> ),
        }}>
        
            {/* product Details */}
            <Stack.Screen component={HomeScreen} name='HomeScreen'/>
            <Stack.Screen component={ProductScreen} name='ProductScreen'/>
            {/* <ProductScreen item={}/> */}
            <Stack.Screen name="RatingScreen" component={RatingScreen} />
            
             {searchValue ? (
            <Stack.Screen name="AfterSearchScreen" component={AfterSearchScreen} />
            ) : null}

            </Stack.Navigator>
       
    );
};

export default HomeStack;