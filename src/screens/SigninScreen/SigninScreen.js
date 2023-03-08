import React,{useState} from 'react';
import { View, Text ,Image ,StyleSheet,useWindowDimensions,ScrollView} from 'react-native';
import Logo from '../../../assets/images/logo.jpg';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSigninButtons from '../../components/SocialSigninButtons';
import { useNavigation } from '@react-navigation/native';


const SigninScreen = () => {
    const[username,setUsername]=useState('');
    const[password,setPassword]=useState('');

    const {height}= useWindowDimensions();
    const navigation=useNavigation();
    
    const onSignInPressed=()=>{
       // console.warn("sign in");

        //validate user first

    navigation.navigate('Profile');
}


const onForgotPasswordPressed=()=>{
    

    navigation.navigate('forgotpassword');
    

}


const onSignUpPressed=()=>{
    navigation.navigate('Signup');

}


return(

    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
    <Text> </Text>
    <Image source={Logo} styles={[styles.logo,{height:height*0.3}]} 
    resizeMode="contain"/>

    <CustomInput placeholder="Username" value={username}
     setValue={setUsername}/>
    <CustomInput placeholder="password" 
    value={password} setValue={setPassword}  secureTextEntry={true}/>

<CustomButton text="Sign in !" onPress={onSignInPressed}/>

<CustomButton text="Forgot password ?" 
onPress={onForgotPasswordPressed} 
type="TERTIARY"/>


<SocialSigninButtons/>

<CustomButton text="Dont have an account? Create One" 
onPress={onSignUpPressed} 
type="TERTIARY"/>


    </View>
    </ScrollView>
);

};

const styles =StyleSheet.create({
root:{

    alignItems:'center',
    padding:10,
},
logo: {

    width:'70%',
    maxWidth:300,
    height:'70%',
},

});

export default SigninScreen;

