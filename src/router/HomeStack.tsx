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
import SearchBar from '../components/SearchBar';
import AfterSearchScreen from '../screens/AfterSearchScreen';


const Stack = createStackNavigator();

const HeaderComponent = ({setSearchValue}) => {
        // const [searchText, setSearchText] = useState('');
        const handleSearchResult = (result: string) => {
            console.log('Search result:', result);
            // setSearchText(result);
            setSearchValue(result);
            // do something with the search result, such as filtering data or updating state
          }
    return(
       <SafeAreaView style={{backgroundColor:'orange'}}>
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
    return(
      
        // <Stack.Navigator screenOptions={{headerShown:false}}>
        
        <Stack.Navigator screenOptions={{
            header: ()=> (
            <HeaderComponent setSearchValue={setSearchValue} /> ),
        }}>
            <Stack.Screen name="HomeScreen" >
            {()=><HomeScreen searchValue={searchValue}/>}
            </Stack.Screen>
            
            {/* product Details */}
            <Stack.Screen component={ProductScreen} name="ProductDetails"/>
            <Stack.Screen name="RatingScreen" component={RatingScreen} />
        
            {/* <Stack.Screen name="AfterSearchScreen" >
            {()=><AfterSearchScreen searchValue={searchValue}/>}
            </Stack.Screen> */}

            </Stack.Navigator>
       
    );
};

export default HomeStack;