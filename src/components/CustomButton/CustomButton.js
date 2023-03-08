import React from 'react';
import {View,Text,StyleSheet,Pressable} from 'react-native';

const CustomButton =({onPress,text,type="PRIMARY",bgColor,fgColor})=>{

return (

    <Pressable onPress={onPress} 
    style={[styles.container,styles[`container_${type}`],
    bgColor ? {backgroundColor:bgColor}:{},
    ]}>
    <Text style={[styles.text,styles[`text_${type}`],
    fgColor ? {color :fgColor} : {},

]}>{text}</Text>

    </Pressable>
);

    
};


const styles=StyleSheet.create({

    container_PRIMARY:{

        padding:15,
        width:'100%',
        borderRadius:5,
        marginVertical:15,
        alignItems:'center'
    },

    container:{
        backgroundColor:'#3B71F3',


    },

    container_SECONDARY:{
        borderColor:'#008CBA',
        borderWidth:3,
        padding:10,
        
        backgroundColor:'white'

    },


    container_TERTIARY:{
        backgroundColor:'white',
        marginVertical:15,

    },

    text:{

        fontweight:'bold',
        color:'white'
    },

    text_SECONDARY:{

        color:'black',
    },

    text_TERTIARY:{

        color:'gray',
    },
});



export default CustomButton;