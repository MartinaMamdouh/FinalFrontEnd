import React,{useState} from 'react';
import { View, Text ,Image ,StyleSheet,useWindowDimensions,ScrollView} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSigninButtons from '../../components/SocialSigninButtons';
import { useNavigation } from '@react-navigation/native';


const ForgotPasswordScreen = () =>{
    const [username, setUsername] = useState('');
    const navigation=useNavigation();

    const onSendPressed = () => {
        navigation.navigate('newpassword');
    }
    
    const onSignInPress = () => {
        navigation.navigate('Signin');

    }
    
    
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
        <Text style={styles.title}>Reset Password</Text>
        <CustomInput placeholder="Username" value={username} setValue={setUsername}/>

        <CustomButton text="Send" onPress={onSendPressed}/>
        <CustomButton text="Back to Sign in" onPress={onSignInPress} type="TERTIARY"/>    
        </View>
        </ScrollView>
    
    );
   };


const styles = StyleSheet.create({
    root:{
alignItems: 'center',
 padding: 20,
},
 title: {
fontSize: 24,
fontWeight: 'bold',
 color: '#051C60',
  margin: 10,
},
text:{
color: 'gray',
marginVertical: 10,
},

link: {
color: '#FDB075',
},
});
export default ForgotPasswordScreen;