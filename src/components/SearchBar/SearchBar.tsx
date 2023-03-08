import React from 'react';
import { View, TextInput, TouchableOpacity,StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type InputTextProps={
  placeholder:string;
  errorMessage?: string;
  onChangeText?:(text:string)=>void;
  onChange?:(e:any)=>void;
  value: string; 
};

const SearchBar:React.FC<InputTextProps>=(props)=>{
    return (
     <View style={styles.container}>
        <View style={styles.inputContainer}>
            <TextInput
            value={props.value}
            
            onChangeText={props.onChangeText}
            onChange={props.onChange}
            style={[styles.input]}
            placeholder={props.placeholder}            
            />
      </View>
      <View style={styles.searchIcon}>
        <TouchableOpacity onPress={()=>console.log('search')}>
            <Icon
            name="search-outline"
            size={23}
            color="#000"
            />
        </TouchableOpacity>

      </View>
   </View>
    );
};
const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
    },
    inputContainer:{
        zIndex:1,
        position:"relative",
        width:'100%',
    },
    input:{
        height:45,
        backgroundColor:'#ff',
        paddingHorizontal:20,
        borderRadius:26,
        marginBottom:10,
    },
    searchIcon:{
      zIndex:6,
      position:'absolute',
      right:20,
      top:12,
    },
});



export default SearchBar;