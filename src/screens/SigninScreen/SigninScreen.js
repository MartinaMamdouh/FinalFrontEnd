import React,{useState} from 'react';
import { View, Text,TextInput ,Image ,StyleSheet,useWindowDimensions,ScrollView,Alert} from 'react-native';
import Logo from '../../../assets/images/logo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSigninButtons from '../../components/SocialSigninButtons';
import { useNavigation } from '@react-navigation/native';
import { Button ,TouchableOpacity} from 'react-native';
import { Formik} from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Username is required'),
    
 

  password: Yup.string()
    .min(8, 'Must be at least 8 characters long')
    .matches(
      /(?=.*?[A-Z])/,
      'Must have at least one uppercase letter',
    )
    .matches(
      /(?=.*?[a-z])/,
      'Must have at least one lowercase letter',
    )
    .matches(
      /(?=.*?[0-9])/,
      'Must have at least one digit',
    )
    .matches(
      /(?=.*?[#?!@$%^&*-])/,
      'Must have at least one special character (!@#$%^&*)',
    )
    .required('Enter your new password.'),

  
});


const SigninScreen = () => {
    const[username,setUsername]=useState('');
    const[password,setPassword]=useState('');

    const {height}= useWindowDimensions();
    const navigation=useNavigation();
    
    /*const onSignInPressed=()=>{
       // console.warn("sign in");

        //validate user first

    navigation.navigate('Profilelog');
}
*/

const onForgotPasswordPressed=()=>{
    

    navigation.navigate('forgotpassword');
    

}


const onSignUpPressed=()=>{
    navigation.navigate('Signup');

}


return(
<Formik initialValues={{
name:'',
password:'',
}}

validationSchema={SignupSchema}
onSubmit={values=>Alert.alert(JSON.stringify(values))}

>
{({values,errors,touched,handleChange,setFieldTouched,isValid,handleSubmit})=>(

    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
    <Text> </Text>
    <Image source={Logo} styles={[styles.logo,{height:10},{width: 10}]} 
    resizeMode="contain"/>

    
<View style={styles.container}> 
    <TextInput 
  placeholder="Username "
  value={values.name}
  onChangeText={handleChange('name')}
  onBlur={()=> setFieldTouched('name')}
/>
{ touched.name && errors.name && (<Text style={styles.errorTxt}>{errors.name}</Text>)}
</View>


    
<View  style={styles.container}>

<TextInput  
placeholder="password" 
value={values.password} 
secureTextEntry={true}
onChangeText={handleChange('password')}
onBlur={()=> setFieldTouched('password')}

/>
{touched.password && errors.password && (<Text style={styles.errorTxt}>{errors.password}</Text>)}

</View>



{/* <Button title="Sign in !" onPress={onSignInPressed}/> */}

<TouchableOpacity
onPress={handleSubmit}
  disabled={!isValid}
  style={[styles.container_PRIMARY, { backgroundColor: isValid ? '#FF6F00' : '#A5C9CA' }]}
>
  <Text style={styles.style3}>Sign in!</Text>
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
     )}
     </Formik>
);

};

const styles =StyleSheet.create({
root:{

    alignItems:'center',
    padding:10,
},
errorTxt :{
  color: '#FF0000',
  
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

