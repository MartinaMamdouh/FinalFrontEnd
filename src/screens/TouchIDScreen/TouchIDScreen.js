import React, { useEffect } from 'react';
import { Text } from 'react-native'; 
import TouchID from 'react-native-touch-id';

const TouchIDScreen = () => {

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
            const result = await TouchID.authenticate();
            console.log('Fingerprint authentication successful:', result);
            // Perform any necessary actions after successful authentication
          } catch (error) {
            console.log('Fingerprint authentication failed:', error);
            // Handle authentication failure
          }
    }

    useEffect(() => {
        isSupported();
    }, []);

    return <Text>you logged in</Text>;
};
export default TouchIDScreen;