import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductScreen from '../screens/ProductScreen/ProductScreen';
import RatingScreen from '../screens/RatingScreen';
import Navigation from '../navigation';
import { Text, SafeAreaView, View, TextInput,TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import HomeScreen from '../screens/HomeScreen';
import SearchBar from '../components/SearchBar';
import AfterSearchScreen from '../screens/AfterSearchScreen';
import Button from '../components/Button/Button';



const Stack = createStackNavigator();

 

const HeaderComponent = ({ setSearchValue }) => {
    const handleSearchResult = (result: string) => {
        console.log('Search result:', result);
        setSearchValue(result);
        // do something with the search result, such as filtering data or updating state
    }
    return (
        <SafeAreaView style={{ backgroundColor: '#009999' }}>
            <View style={{
                margin: 10,
                backgroundColor: 'white',
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <SearchBar onResult={handleSearchResult} />
               

            </View>
            
        </SafeAreaView>

    );
};

const HomeStack = () => {
    const [searchValue, setSearchValue] = useState('');
   
  
      
    return (


        <Stack.Navigator screenOptions={{
            header: () => (
                <HeaderComponent setSearchValue={setSearchValue} />),
        }}>
          
            {/* product Details */}
            <Stack.Screen component={HomeScreen} name='HomeScreen' />
            <Stack.Screen component={ProductScreen} name='ProductScreen' />
            <Stack.Screen name="RatingScreen" component={RatingScreen} />

            <Stack.Screen name="AfterSearchScreen" >
                {() => <AfterSearchScreen searchValue={searchValue} />}
            </Stack.Screen>

        </Stack.Navigator>

    );
};

export default HomeStack;