import React, { useContext, useState } from 'react';
import { View, Text,TextInput, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import Logo from '../../../assets/images/logo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSigninButtons from '../../components/SocialSigninButtons';
import { useNavigation } from '@react-navigation/native';
import { Button, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
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
    .required('Enter your password.'),


});
import { UserAuthContext } from '../../context/UserAuthContext';
import axios from 'axios';
import { LogInAPI } from '../../APIs';
import * as Keychain from 'react-native-keychain';
import TouchID from 'react-native-touch-id';

const SigninScreen = () => {
  const enableTouch = true;
  const { logIn } = useContext(UserAuthContext);

  const navigation = useNavigation();

  const onForgotPasswordPressed = () => {
    navigation.navigate('forgotpassword');
  };

  const onSignUpPressed = () => {
    navigation.navigate('Signup');
  }

  // const onTouchID = () => {
  //   navigation.navigate('touchID');
  // }
  const logInHandler = async ({ email, password }) => {
    axios.post(LogInAPI, { email, password })
      .then(async ({ data }) => {
        const username = email; //setGeneric don't accept email only username
        if (enableTouch) {
          Keychain.setGenericPassword(username, password);
          console.log("email:", email);
          console.log("username:", username);
        } 
        let { user, token } = data
        await logIn(user, token)
        navigation.navigate('Home')
      })
  }

  const handleTouchID = async () => {
    //enableTouch=true;
    await Keychain.getGenericPassword().then((credentials) => {
      const { username, password } = credentials;
      console.log("email after credentials:", username);
      console.log("password after credentials",password);
      TouchID.authenticate(`to login with email "${username}"`)
        .then(() => {
          axios.post(LogInAPI, { username, password })
            .then(async ({ data }) => {
              if (enableTouch) {
                Keychain.setGenericPassword(username, password);
              }
              let { user, token } = data
              await logIn(user, token)
              navigation.navigate('Home')
            })
            .catch((error) => {
              if (error === 'INVALID_CREDENTIALS') {
                Keychain.resetGenericPassword();
              }
            });
        })
        .catch((error) => {
          // Handle Touch ID authentication failure
        });
    })
      .catch((error) => {
        // Handle keychain error
        console.log("error", error);
      });

  };

  return (
    <Formik initialValues={{
      email: '',
      password: '',
    }}

      validationSchema={SignupSchema}
      onSubmit={values => logInHandler(values)}

    >
      {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.root}>
            <Image source={Logo} styles={[styles.logo, { height: 10 }, { width: 10 }]}
              resizeMode="contain" />

            <Text style={styles.text}>Please Enter: </Text>

            
            

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
                  placeholder="Password" 
                  value={values.password} 
                  secureTextEntry={true}
                  onChangeText={handleChange('password')}
                  onBlur={()=> setFieldTouched('password')}

              />
              {touched.password && errors.password && (<Text style={styles.errorTxt}>{errors.password}</Text>)}

              </View>




          


            <View style={styles.row}>
            <TouchableOpacity
                onPress={handleSubmit}
                disabled={!isValid}
                style={[styles.row, { backgroundColor: isValid ? '#c2f0f0' : '#808080' }]}
              >
                <Text style={styles.buttonText}>Sign in</Text>
              </TouchableOpacity>
              <View style={styles.space} />


              <View style={styles.space} />
           




              <CustomButton text="Touch ID"
                onPress={handleTouchID}
                bgColor="#c2f0f0"
                fgColor="#29a3a3"
              />

            </View>
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
              <Text style={styles.style3}>Dont have an account ? <Text style={styles.greenText}>  Create One Here</Text></Text>
            </TouchableOpacity>

            <SocialSigninButtons />

          </View>

        </ScrollView>
      )}
    </Formik>
  );

};

const styles = StyleSheet.create({
  root: {

    alignItems: 'center',
    padding: 10,
  },
  errorTxt: {
    color: '#FF0000',

  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'auto',
    color: '#196666'

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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#29a3a3',
    marginLeft: 5, // Adjust the spacing as needed
  },
  space: {
    width: 30,
    height: 30,
  },
  logo: {
    width: '70%',
    maxWidth: 100,
    height: '70%',
  },
  greenText: {
    color: '#00e6b8',
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

  container_PRIMARY: {
    backgroundColor: '#3B71F3',
    padding: 15,
    width: '100%',
    borderRadius: 5,
    marginVertical: 15,
    alignItems: 'center'
  },
  fingerImg: {
    width: 100,
    height: 100,
  },

});

export default SigninScreen;

