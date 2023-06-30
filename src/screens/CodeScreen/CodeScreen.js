import React, { useState } from 'react';
import {Alert, SafeAreaView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import axios from 'axios';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

const CELL_COUNT = 6;

const CodeScreen = ({route}) => {
  const data = route.params;
  const navigation=useNavigation();

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  const handleSubmit = () => {
    // Make the API call using Axios
    axios.post('/passwords/validation', { otp: value, email: data })
      .then(response => {
        navigation.navigate('newpassword',data);
      })
      .catch(error => {
        if(error.request.status==404){
          Alert.alert(
           'Invalid Code',
           'The code you entered is invalid. Please try again or request a new code.',
           [
             { text: 'OK'},
           ],
           { cancelable: false }
         );
             }
               else {

               Alert.alert(
                 'Server Error',
                 'The server encountered an error. Please try again later.',
                 [
                   { text: 'OK' },
                 ],
                 { cancelable: false }
               );
                
               }
      });
  };

  const onBackPressed = () => {
    navigation.navigate('forgotpassword');
}
const onResendCodePressed= () =>{
  const mail = {
    email: data
  };

  axios.post('/passwords/forgot', mail)
  .then((response) => {
    navigation.navigate('CodeScreen',data);
  
  })
  .catch((error) => {
    if(error.request.status==404){
       Alert.alert(
        'Error',
        'Your email is incorrect. Please try again.',
        [
          { text: 'OK'},
        ],
        { cancelable: false }
      );
          }
            else {

            Alert.alert(
              'Server Error',
              'The server encountered an error. Please try again later.',
              [
                { text: 'OK' },
              ],
              { cancelable: false }
            );
             
            }
  
  })
}

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Verification</Text>
      <Text style={styles.subtext} >Please enter the verification code</Text>
      <Text style={styles.subtext2} >we sent to your email address </Text>
      
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <CustomButton text="Submit" onPress={handleSubmit}/>
      <TouchableOpacity
              style={styles.style2}
              onPress={onResendCodePressed}
            >
              <Text style={styles.style3}>Resend code?</Text>
            </TouchableOpacity>
      <TouchableOpacity
                   style={styles.bttn}
                   onPress={onBackPressed}
                > 
                  <Feather
                name="arrow-left"
                size={25}
                color="white"
              />
                   <Text style= {styles.text}>Try a different Email</Text>
                
                </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  root: { 
    flex: 1, 
    padding: 20 
  },
  title: { 
    textAlign: 'center', 
    fontSize: 50 ,
    marginTop:40,
  },
  codeFieldRoot: { 
    marginTop: 20 
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    marginTop: 20 ,
    marginBottom:30
  },
  focusCell: {
    borderColor: '#000',
  },
  button: {
    backgroundColor: 'gray',
    padding: 8,
    borderRadius: 10,
    flexDirection:'row',
    alignSelf: 'flex-start',
    marginTop:150,
  },
  text:{
    color: 'white',
    fontSize: 18,
    },
    subtext:{
      marginTop:30,
      color: 'grey',
      fontSize: 18,
      alignSelf:'center',
    },
    subtext2:{

      color: 'grey',
      fontSize: 18,
      alignSelf:'center',
      marginBottom:30,
    },
    bttn: {
      backgroundColor: 'gray',
      padding: 8,
      borderRadius: 10,
      flexDirection:'row',
      alignSelf: 'flex-start',
      marginTop:120,
    },
    style2: {
      marginTop: 10,
      alignSelf: 'center',
      backgroundColor: 'grey',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
      paddingTop: 10,
      paddingBottom: 10,
      marginTop: 10,
      marginBottom: 5,
      width: 300,
      alignItems: 'center'
  
    },
    style3: {
      color: 'white',
    },
});
export default CodeScreen;
