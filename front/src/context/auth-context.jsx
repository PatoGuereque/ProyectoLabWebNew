import React, { useReducer, useEffect, createContext } from 'react';
import { useContext } from 'react';
import { fetchUser, reducer } from '../reducers/auth-reducer';

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, { user: undefined });

  useEffect(() => {
    fetchUser(dispatch);
  }, []);

  return <AuthContext.Provider value={[state, dispatch]} {...props} />;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within a AppProvider');
  }

  const [state] = context;

  return {
    login: () => (window.location = '/auth/google'),
    logout: () => (window.location = '/auth/logout'),

    user: state.user,
  };
};
