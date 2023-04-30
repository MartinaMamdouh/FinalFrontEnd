import React,{useState} from 'react';
import { View, Text ,TextInput,StyleSheet,useWindowDimensions,ScrollView, TouchableOpacity, Alert} from 'react-native';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSigninButtons from '../../components/SocialSigninButtons';
import { useNavigation } from '@react-navigation/native';
import { Formik} from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Username is required'),
    
    email: Yup.string()
        .email('Invalid email')
        .required('Enter your email address'),
    password:Yup.string()
    .min(8)
    .required('Enter your new password.')
    .matches(

        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
        'Must be at least 8 characters long,at least one uppercase letter,at least one lowercase letter,at least one digit,at least one special character (!@#$%^&*)',
    ),
    confirmPassword:Yup.string().min(8)
    .oneOf([Yup.ref('password')],'Your Passwords donot match')
    .required('Confirm password is required')



  });


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
<Formik initialValues={{
name:'',
email:'',
password:'',
confirmPassword:'',


}}

validationSchema={SignupSchema}
onSubmit={values=>Alert.alert(JSON.stringify(values))}
>
    {({values,errors,touched,handleChange,setFieldTouched,isValid,handleSubmit})=>(

    
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
    <Text style={styles.title}>Create an Account</Text>


    <CustomInput
  placeholder="Username "
  value={values.name}
  onChangeText={handleChange('name')}
  onBlur={()=> setFieldTouched('name')}
/>
{errors.name && <Text style={styles.errorTxt}>{errors.name}</Text>}



    <CustomInput 
    placeholder="Email"  
    onChangeText={handleChange('email')}
    value={values.email}
    
     />   
{errors.email && <Text style={styles.errorTxt}>{errors.email}</Text>}



    <CustomInput 
    placeholder="password" 
    value={values.password} 
    secureTextEntry={true}
    onChangeText={handleChange('password')}
    />
{errors.password && <Text style={styles.errorTxt}>{errors.password}</Text>}




<CustomInput 
     placeholder="Confirm password" 
     value={values.confirmPassword} 
     secureTextEntry={true}
     onChangeText={handleChange('confirmPassword')}
     />
{errors.confirmPassword && <Text style={styles.errorTxt}>{errors.confirmPassword}</Text>}

{/* <CustomButton text="Register" onPress={onRegisterPressed}/> */}

<Text style={styles.text}>
     By registering , you confirm that you accept our {''}
     <Text style={styles.link} onPress={onTermsofUsePressed }> Terms of use </Text> and {''}
     <Text style={styles.link} onPress={onPrivacyPressed }> Privacy policy </Text>

</Text>



<TouchableOpacity
onPress={handleSubmit}
disabled={!isValid}
style={[styles.submitBtn,{backgroundColor: isValid ? '#395B64' :'#A5C9CA'},

]}> 

<Text style={styles.submitBtnTxt}>Submit</Text>
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

errorTxt :{
    color: '#FF0000',
    
  },
  submitBtn:{
    padding:10,
    borderRadius:15,
    justifyContent:'center',

  },
  submitBtnTxt:{
    color:'#fff',
    textAlign:'center',
    fontSize:18,
    fontWeight:'700',

  },
  
});

export default SignUpScreen;

