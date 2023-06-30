import React,{useState} from 'react';
import { Alert,Image,View, Text, TextInput,StyleSheet,TouchableOpacity,ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';
import { Formik } from 'formik';
import * as Yup from 'yup';


const SignupSchema = Yup.object().shape({
  email: Yup.string()
  .email('Invalid email')
  .required('Enter your email address'),

});

const ForgotPasswordScreen = () =>{
    const navigation=useNavigation();

    const [email, setEmail] = useState('');

  const onSubmit = (values) => {
    const data = {
      email: values.email
    };
  
    axios.post('/passwords/forgot', data)
      .then((response) => {
        navigation.navigate('CodeScreen',values.email);
      
      })
      .catch((error) => {
        if(error.request.status==404){
           Alert.alert(
            'Error',
            'Your email is incorrect. Please try again.',
            [
              { text: 'OK'},
            ],
            { cancelable: false }
          );
              }
                else {

                Alert.alert(
                  'Server Error',
                  'The server encountered an error. Please try again later.',
                  [
                    { text: 'OK' },
                  ],
                  { cancelable: false }
                );
                 
                }
      
      })
  };
    const onBackPress = () => {
        navigation.navigate('Signin');

    }

    
    
    return (
      <Formik initialValues={{
        email: ''
      }}
  
        validationSchema={SignupSchema}
        onSubmit={values => onSubmit(values)}
  
      >
        {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (
  
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
       
              <Text style={styles.title}>Forgot Password? </Text>

  
              <View  style={styles.container}>
              <TextInput 
              placeholder="Email"  
              onChangeText={handleChange('email')}
              value={values.email}
              onBlur={()=> setFieldTouched('email')}
  
              />   
          {touched.email && errors.email && (<Text style={styles.errorTxt}>{errors.email}</Text>)}
  
          </View>

  
              <View style={styles.row}>
              <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={!isValid}
                  style={[styles.submitBtn,{backgroundColor: isValid ? '#395B64' :'#A5C9CA'},

    ]}> 

    <Text style={styles.submitBtnTxt}>Send</Text>
                </TouchableOpacity>
                <View style={styles.space} />
  
  
                <View style={styles.space} />
  
              </View>
              <TouchableOpacity
                   style={styles.bttn}
                   onPress={onBackPress}
                > 
                  <Feather
                name="arrow-left"
                size={25}
                color="white"
              />
                   <Text style= {styles.txt}>Back</Text>
                
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
row: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 10,
  borderRadius: 10,
  marginVertical: 10,
},
      
    });

export default ForgotPasswordScreen;