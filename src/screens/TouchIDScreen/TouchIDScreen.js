import React, { useEffect } from 'react';
import { Text, Image, View } from 'react-native';
import TouchID from 'react-native-touch-id';
import * as Keychain from 'react-native-keychain';

const TouchIDScreen = () => {
//el file dah mlosh lazma
    const key = async () => {
        const username = 'zuck@gmail.com';
        const password = 'poniesRgr8';

        // Store the credentials
        await Keychain.setGenericPassword(username, password);

        try {
            // Retrieve the credentials
            const credentials = await Keychain.getGenericPassword();
            if (credentials) {
                console.log(
                    'Credentials successfully loaded for user ' + credentials.username
                );
            } else {
                console.log('No credentials stored');
            }
        } catch (error) {
            console.log("Keychain couldn't be accessed!", error);
        }
        await Keychain.resetGenericPassword();
    };

    const isSupported = async () => {
        const supported = await TouchID.isSupported();
        if (supported) {
            console.log("supported");
            // Touch ID is supported, continue with Touch ID authentication
        }
        else { // Touch ID is not supported, display an error message 
            console.log("not supported");
        }

        try {
            const result = await TouchID.authenticate('Scan your fingerprint to continue');
            const fingerprintID = result.fingerprintID;
            console.log('User fingerprint ID:', fingerprintID);
            //console.log('Fingerprint authentication successful:', result);
            // Perform any necessary actions after successful authentication
        } catch (error) {
            console.log('Fingerprint authentication failed:', error);
            // Handle authentication failure
        }
    }

    const handleTouchID=()=>{
        Keychain.getGenericPassword()
      .then((credentials) => {
        const { username, password } = credentials;
        TouchID.authenticate(`to login with username "${username}"`)
          .then(() => {
            login(username, password)
              .then(() => {
                // Handle login success
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
      });
    }

    useEffect(() => {
        //isSupported();
        key();
    }, []);

    return (
        <View>
            <Text>you logged in</Text>

        </View>
    );

};
export default TouchIDScreen;