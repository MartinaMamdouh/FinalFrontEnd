
import React from 'react';
import { View, Image, StyleSheet ,Text} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    
    alignSelf: 'center'
  },
  logo: {
    width: 66,
    height: 58,
  },
  headline: {
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 10,
    width: 200,
    backgroundColor: 'white',
    alignSelf: 'center',

  },
});



const ProfileScreen = () => {



    const navigation=useNavigation();

    const onLogoutPressed=()=>{
        // console.warn("sign in");
    
         //validate user first
    
     navigation.navigate('SignIn');
    }
    
    const onNotificationsPressed=()=>{
      // go to notifications
  }

  const onHistoryPressed=()=>{
    // go to History
}
const onFavoritesPressed=()=>{
  navigation.navigate('WishlistScreen');}

  return (
    <View style={styles.container}>

<Text style={styles.headline}>
    My Profile
</Text>

      <Image
        style={styles.tinyLogo}
        source={require('../profile.png')}
         />
      

      <CustomButton text ="My Favorites" 
          onPress={onFavoritesPressed}
            bgColor="#E7EAF4"
            fgColor="#4765A9"
            />


        <CustomButton text ="My History"
        onPress={onHistoryPressed}
         bgColor="#E7EAF4"
         fgColor="#4765A9"
        />


        <CustomButton text ="My Notifications"
        onPress={onNotificationsPressed}
        bgColor="#E7EAF4"
        fgColor="#4765A9"
        />
        <CustomButton text ="Logout"
        onPress={onLogoutPressed}
        bgColor="#FAE9EA"
          fgColor="#DD4D44"
        />



      
      
    </View>
  );
}

export default ProfileScreen;