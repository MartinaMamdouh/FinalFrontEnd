import React,{useState} from 'react';
import { Alert,View, Text ,TextInput ,StyleSheet,TouchableOpacity,ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';
const SignupSchema  = Yup.object().shape({
  
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

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Your passwords do not match')
    .required('Confirm password is required'),
});

const NewPasswordScreen = ({route}) =>{
    const data = route.params;
    const [newPassword, setNewPassword] = useState('');
    const navigation=useNavigation();
    
    const onSubmit = (values) => {axios
      .post('/passwords/reset', { password: values.password, email: data})
      .then((response) => {
        Alert.alert(
          'Password successful',
          'Your password has been changed successfully.',
          [
            { text: 'OK', onPress: () => navigation.navigate('Signin') },
          ],
          { cancelable: false }
        );
      })
      .catch((error) => {
               Alert.alert(
                 'Server Error',
                 'The server encountered an error. Please try again later.',
                 [
                   { text: 'OK' },
                 ],
                 { cancelable: false }
               );
     
      });
    };

    const onBackPressed = () => {
      navigation.navigate('Signin');

  }
    return (
      <Formik
      initialValues={{
        password:'',
        confirmPassword:'',
    }}
    validationSchema={SignupSchema}
    onSubmit={values=>onSubmit(values)}
    >
        {({values,errors,touched,handleChange,setFieldTouched,isValid,handleSubmit})=>(

        
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
        <Text style={styles.title}>Enter new password</Text>


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

    <TouchableOpacity
    onPress={handleSubmit}
    disabled={!isValid}
    style={[styles.submitBtn,{backgroundColor: isValid ? '#395B64' :'#A5C9CA'},

    ]}> 

    <Text style={styles.submitBtnTxt}>Submit</Text>
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
                   <Text style= {styles.txt}>Back to SignIn</Text>
                
                </TouchableOpacity>
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
    
      fontSize:26,
      fontweight:'bold',
      color:'#051C60',
      margin:10,
      marginTop:40,
    marginBottom:50,
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
        marginTop:20,
    
      },
      submitBtnTxt:{
        color:'#fff',
        textAlign:'center',
        fontSize:18,
        fontWeight:'700',
    
      },
      bttn: {
        backgroundColor: 'gray',
        padding: 8,
        borderRadius: 10,
        flexDirection:'row',
        alignSelf: 'flex-start',
        marginTop:250,
      },
      txt: {
        color:"white",
        fontSize: 18,
      },
      
    });
export default NewPasswordScreen;