import React,{useState} from 'react';
import { View, Text ,StyleSheet,useWindowDimensions,ScrollView} from 'react-native';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSigninButtons from '../../components/SocialSigninButtons';
import { useNavigation } from '@react-navigation/native';


const SignUpScreen = () => {
    const[username,setUsername]=useState('');
    const[email,setEmail]=useState('');

    const[password,setPassword]=useState('');
    const[passwordRepeat,setPasswordRepeat]=useState('');
    const navigation=useNavigation();
    
    const onRegisterPressed=()=>{
        console.warn("onRegisterPressed");
};


const onSigninPressed=()=>{
    navigation.navigate('SignIn');


};
const onTermsofUsePressed=()=>{
    console.warn("Terms pressed");

};

const onPrivacyPressed=()=>{
    console.warn("Privacy pressed");

};


return(

    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
    <Text style={styles.title}>Create an Account</Text>


    <CustomInput placeholder="Username" value={username}
     setValue={setUsername}/>   

    <CustomInput placeholder="Email" value={email}
     setValue={setEmail}/>   

    <CustomInput placeholder="password" 
    value={password} setValue={setPassword}  secureTextEntry={true}/>

<CustomInput placeholder="Repeat password" 
    value={passwordRepeat} setValue={setPasswordRepeat}  secureTextEntry={true}/>

<CustomButton text="Register" onPress={onRegisterPressed}/>

<Text style={styles.text}>
     By registering , you confirm that you accept our {''}
     <Text style={styles.link} onPress={onTermsofUsePressed }> Terms of use </Text> and {''}
     <Text style={styles.link} onPress={onPrivacyPressed }> Privacy policy </Text>

</Text>

<SocialSigninButtons/>

<CustomButton text="Have an account? Sign in" 
onPress={onSigninPressed} 
type="TERTIARY"/>


    </View>
    </ScrollView>
);

};

const styles =StyleSheet.create({
root:{

    alignItems:'center',
    padding:20,
},

title:{

fontSize:24,
fontweight:'bold',
color:'#051C60',
margin:10,

},

text:{
color:'gray',
marginVertical:10,


},
link:{

color:'#FDB075',

},


});

export default SignUpScreen;

