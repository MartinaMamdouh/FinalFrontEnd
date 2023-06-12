import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { PRICE_SMART_JWT, USER_DATA_COOKIE } from '../config';
import { LogOutAPI } from '../APIs';
import AsyncStorage from '@react-native-community/async-storage';

export const UserAuthContext = createContext();

const UserAuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [authToken, setAuthToken] = useState();
  const [userData, setUserData] = useState();
  const [error, setError] = useState('');

  useEffect(() => {
    const setData = async () => {
      const userData = await AsyncStorage.getItem(USER_DATA_COOKIE);
      setIsAuthenticated(!!(await AsyncStorage.getItem(PRICE_SMART_JWT)));
      setData(userData ? JSON.parse(userData) : null);
      setAuthToken((await AsyncStorage.getItem(PRICE_SMART_JWT)) || null);
    };

    setData();
  }, []);

  const logIn = async (data, token) => {
    if (token) {
      await AsyncStorage.setItem(PRICE_SMART_JWT, token);
      await AsyncStorage.setItem(USER_DATA_COOKIE, JSON.stringify(data));
      setError('');
      setAuthToken(await AsyncStorage.getItem(PRICE_SMART_JWT));
      setUserData(JSON.parse(await AsyncStorage.getItem(USER_DATA_COOKIE)));
      setIsAuthenticated(true);
      axios.defaults.headers.common.Authorization = authToken;
    } else {
      setIsAuthenticated(false);
      AsyncStorage.removeItem(PRICE_SMART_JWT);
      AsyncStorage.removeItem(USER_DATA_COOKIE);
      axios.defaults.headers.common.Authorization = '';
      setError(data);
    }
  };

  const logOut = () => {
    axios.post(LogOutAPI);
    axios.defaults.headers.common.Authorization = '';
    setIsAuthenticated(false);
    AsyncStorage.removeItem(PRICE_SMART_JWT);
    AsyncStorage.removeItem(USER_DATA_COOKIE);
  };

  return (
    <UserAuthContext.Provider
      value={{ isAuthenticated, userData, authToken, error, logIn, logOut }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

UserAuthContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default UserAuthContextProvider;
