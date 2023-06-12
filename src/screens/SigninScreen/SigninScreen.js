import React,{useContext, useState} from 'react';
import { View, Text ,Image ,StyleSheet,useWindowDimensions,ScrollView} from 'react-native';
import Logo from '../../../assets/images/logo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSigninButtons from '../../components/SocialSigninButtons';
import { useNavigation } from '@react-navigation/native';
import { Button ,TouchableOpacity} from 'react-native';
import { UserAuthContext } from '../../context/UserAuthContext';
import axios from 'axios';
import { LogInAPI } from '../../APIs';


const SigninScreen = () => {
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const { logIn } = useContext(UserAuthContext)

  const {height}= useWindowDimensions();
  const navigation = useNavigation();
    
const onForgotPasswordPressed=()=>{
    navigation.navigate('forgotpassword');
}

const onSignUpPressed=()=>{
    navigation.navigate('Signup');
}

  const logInHandler = async () => {
    axios.post(LogInAPI, { email, password })
      .then(async ({ data }) => {
        let { user, token } = data
        await logIn(user, token)
        navigation.navigate('Home')
      })
  }


return(

    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
    <Text> </Text>
    <Image source={Logo} styles={[styles.logo,{height:10},{width: 10}]} 
    resizeMode="contain"/>

    <CustomInput placeholder="Email" value={email}
     setValue={setEmail}/>
    <CustomInput placeholder="Password" 
    value={password} setValue={setPassword}  secureTextEntry={true}/>

{/* <Button title="Sign in !" onPress={onSignInPressed}/> */}

  <CustomButton
    text="Sign in"
    onPress={logInHandler}
  />
  {/* <Button title='Sign in' style={styles.style3}>Sign in !</Button> */}


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

