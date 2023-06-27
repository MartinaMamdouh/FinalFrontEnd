import React,{useState} from 'react';
import { View, Text ,TextInput,StyleSheet,useWindowDimensions,ScrollView, TouchableOpacity, Alert} from 'react-native';
import SocialSigninButtons from '../../components/SocialSigninButtons';
import { useNavigation } from '@react-navigation/native';
import { Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { CreateUserAPI } from '../../APIs';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Username is required'),
    
  email: Yup.string()
    .email('Invalid email')
    .required('Enter your email address'),

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
      /(?=.*?[#?!@$%^&*-_])/,
      'Must have at least one special character (!@#$%^&*)',
    )
    .required('Enter your new password.'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Your passwords do not match')
    .required('Confirm password is required'),
});



const SignUpScreen = () => {
  const navigation = useNavigation();

  const onSubmit = (values) => {
    const payload = { user: { ...values } };
    delete payload.user.confirmPassword;
    axios.post(CreateUserAPI, payload)
    .then(navigation.navigate('Signin'))
    .catch((error) => {
      if(error.request){
        Alert.alert(
              'Server Error',
              'The server encountered an error. Please try again later.',
              [
                { text: 'OK' },
              ],
              { cancelable: false }
            );
      } else{
      console.log("error", error);
      Alert.alert(
        'Sign Up Error',
        'User already exists, Sign In',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      );}
    });
  }
  const onTermsofUsePressed = () => {
    console.warn('Terms pressed');
  };

  const onPrivacyPressed = () => {
    console.warn('Privacy pressed');
  };

  return(
    <Formik
      initialValues={{
        username:'',
        email:'',
        password:'',
        confirmPassword:'',
    }}
    validationSchema={SignupSchema}
    onSubmit={values=>onSubmit(values)}
    >
        {({values,errors,touched,handleChange,setFieldTouched,isValid,handleSubmit})=>(

        
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
        <Text style={styles.title}>Create an Account</Text>

    <View style={styles.container}> 
      <TextInput 
        placeholder="Username "
        value={values.username}
        onChangeText={handleChange('username')}
        onBlur={()=> setFieldTouched('username')}
      />
    { touched.name && errors.name && (<Text style={styles.errorTxt}>{errors.name}</Text>)}
    </View>

    <View  style={styles.container}>
        <TextInput 
        placeholder="Email"  
        onChangeText={handleChange('email')}
        value={values.email}
        onBlur={()=> setFieldTouched('email')}

        />   
    {touched.email && errors.email && (<Text style={styles.errorTxt}>{errors.email}</Text>)}

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


    <View  style={styles.container}>

    <TextInput 
        placeholder="Confirm password" 
        value={values.confirmPassword} 
        secureTextEntry={true}
        onChangeText={handleChange('confirmPassword')}
        onBlur={()=> setFieldTouched('confirmPassword')}

        />
    {touched.confirmPassword && errors.confirmPassword && (<Text style={styles.errorTxt}>{errors.confirmPassword}</Text>)}
    </View>

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
container:{

  backgroundColor:'#FFFFFF',
  width:'100%',
  borderColor:'#e8e8e8',
  borderEndWidth:1,
  borderRadius:5,
  paddingHorizontal:10,
  marginVertical:5,
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

