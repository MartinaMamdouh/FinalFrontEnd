
import React, { useContext } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { UserAuthContext } from '../../context/UserAuthContext';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
  logo: {
    width: 66,
    height: 58,
  },
  headline: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f7a7a',
    marginBottom: 20,
  },
  headlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headlineText: {
    fontSize: 32,
    letterSpacing: 2,
  },
  headlineTextBold: {
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

const ProfileScreen = () => {
  const navigation = useNavigation();

  const { logOut } = useContext(UserAuthContext);

  const onLogoutPressed = () => {
    logOut();
    navigation.navigate('SignIn');
  };

  const onHistoryPressed = () => {
    navigation.navigate('My History');
  };
  const onWishlistPressed = () => {
    navigation.navigate('WishlistScreen');
  };

  const buttons = [
    {
      text: 'My Wishlist',
      onPress: onWishlistPressed,
    },
    {
      text: 'My History',
      onPress: onHistoryPressed,
    },
    {
      text: 'Logout',
      onPress: onLogoutPressed,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={[styles.headline, { textAlign: 'center' }]}>
        <Text style={[styles.headlineText, styles.headlineTextBold]}>
          MY PROFILE
        </Text>
      </Text>

      <Image style={styles.tinyLogo} source={require('../profile.png')} />
      <Text/>
      {buttons.map((button) => (
        <CustomButton
          text={button.text}
          onPress={button.onPress}
          bgColor="#c2f0f0"
          fgColor="#1e7b7b"

        />
      ))}

    </View>
  );
}

export default ProfileScreen;
