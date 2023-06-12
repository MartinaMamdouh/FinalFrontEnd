import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const CustomButton = ({ onPress, text, type = "PRIMARY", bgColor, fgColor }) => {

  return (

    <Pressable onPress={onPress}
      style={[styles.container, styles[`container_${type}`],
      bgColor ? { backgroundColor: bgColor } : {},
      ]}>
      <Text style={[styles.text, styles[`text_${type}`],
      fgColor ? { color: fgColor } : {},

      ]}>{text}</Text>

    </Pressable>
  );


};


const styles = StyleSheet.create({

  container_PRIMARY: {

    padding: 10,
    // width:'100%',
    borderRadius: 5,
    marginVertical: 7,
    alignItems: 'center'
  },

  container: {
    backgroundColor: 'orange',


  },

  container_SECONDARY: {
    borderColor: '#008CBA',
    borderWidth: 1,
    padding: 1,

    backgroundColor: 'black'

  },


  container_TERTIARY: {
    backgroundColor: 'black',
    marginVertical: 15,

  },

  text: {
    color: 'black',
    fontSize: 20,
  },

});



export default CustomButton;
