import React from 'react'
import {View,Text} from 'react-native'
import CustomButton from '../CustomButton'


const SocialSigninButoons =()=>{

    const onSignInFacebook=()=>{
        console.warn("Loged in with Facebook");
    
    };
    const onSignInGoogle=()=>{
        console.warn("Loged in with Google");
    
    };
    const onSignInApple=()=>{
        console.warn("Loged in with Apple");
    
    };


return (

    <>


<CustomButton text ="Sign in with Facebook" 
onPress={onSignInFacebook}
bgColor="#E7EAF4"
fgColor="#4765A9"
/>


<CustomButton text ="Sign in with Google"
 onPress={onSignInGoogle}
 bgColor="#FAE9EA"
fgColor="#DD4D44"
 />


<CustomButton text ="Sign in with Apple"
 onPress={onSignInApple}
 bgColor="#e3e3e3"
fgColor="#363636"
 />


    </>
)


}

export default SocialSigninButoons