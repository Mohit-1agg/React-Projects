import { createContext, useState, useEffect } from 'react';
import $api from '../services/api';
import { setLocalStorageItem, getLocalStorageItem, clearAllLocalStorage } from '../services/localStorageHelper';

const AuthContext = createContext({});

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState({
    user: null,
    isAuthenticated: false
  });

  // Load user from local storage on initialization
  useEffect(() => {
    const storedUser = getLocalStorageItem('authUser');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Login user
  const login = async (email, password) => {
    try {
      const loginResponse = await $api.post('/api/auth/login', {
        email,
        password
      });

      const authenticatedUser = { ...user, isAuthenticated: true };
      setUser(authenticatedUser);
      setLocalStorageItem('authUser', authenticatedUser);
      setLocalStorageItem('core.token', { 'x-header-api-token': loginResponse.data.authToken });
    } catch (err) {
      console.log('login err response', err);
      // setErrors(err.data);
    }
  };

  const logout = () => {
    setUser({ ...user, user: {}, isAuthenticated: false });
    clearAllLocalStorage();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
