import { createContext, useState, useEffect } from 'react';
import { setLocalStorageItem, getLocalStorageItem, clearAllLocalStorage } from '../services/localStorageHelper';
import $api from '../services/api';
import $toastr from '../services/toastrHelper';

const AuthContext = createContext({});

export const AuthContextProvider = (props) => {
  const [errors, setErrors] = useState({});
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
      setErrors({});
      $toastr.onSuccess(loginResponse.data.msg);
    } catch (err) {
      console.log('AUTH CONTEXT ', err);
      if (err?.response?.data?.data) {
        return setErrors(err.response.data.data);
      } else {
        $toastr.onError(err.response.data.msg || 'Login failed. Please try again.');
      }
    }
  };

  const logout = () => {
    setUser({ user: null, isAuthenticated: false });
    clearAllLocalStorage();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, errors }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
