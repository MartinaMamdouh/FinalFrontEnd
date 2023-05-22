import React,{useState} from 'react';
import { View, Text ,Image ,StyleSheet,useWindowDimensions,ScrollView} from 'react-native';
import Logo from '../../../assets/images/logo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSigninButtons from '../../components/SocialSigninButtons';
import { useNavigation } from '@react-navigation/native';
import { Button ,TouchableOpacity} from 'react-native';


const SigninScreen = () => {
    const[username,setUsername]=useState('');
    const[password,setPassword]=useState('');

    const {height}= useWindowDimensions();
    const navigation=useNavigation();
    
    const onSignInPressed=()=>{
       // console.warn("sign in");

        //validate user first

    navigation.navigate('Profilelog');
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
    <Image source={Logo} styles={[styles.logo,{height:10},{width: 10}]} 
    resizeMode="contain"/>

    <CustomInput placeholder="Username" value={username}
     setValue={setUsername}/>
    <CustomInput placeholder="Password" 
    value={password} setValue={setPassword}  secureTextEntry={true}/>

{/* <Button title="Sign in !" onPress={onSignInPressed}/> */}

<TouchableOpacity 
  style={styles.container_PRIMARY}
  onPress={onSignInPressed}
>
  <Text style={styles.style3}>Sign in !</Text>
</TouchableOpacity>


<TouchableOpacity 
  style={styles.style2}
  onPress={onForgotPasswordPressed}
>
  <Text style={styles.style3}>Forgot password?</Text>
</TouchableOpacity>



<TouchableOpacity 
  style={styles.style2}
  onPress={onSignUpPressed}
>
  <Text style={styles.style3}>Dont have an account ? Create One Here </Text>
</TouchableOpacity>






<SocialSigninButtons/>

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
    maxWidth:100,
    height:'70%',
},
style2: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: 'grey',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    paddingTop:10,
    paddingBottom:10,
    marginTop:10,
    marginBottom:5,
    width:300,
    alignItems:'center'

  },
  style3: {
    fontWeight: 'bold',
    color: 'white',
  },

  container_PRIMARY:{
    backgroundColor:'#3B71F3',
    padding:15,
    width:'100%',
    borderRadius:5,
    marginVertical:15,
    alignItems:'center'
},


});

export default SigninScreen;

