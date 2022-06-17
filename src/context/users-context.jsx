import React, { useReducer, useEffect, createContext } from 'react';
import { useContext } from 'react';
import { fetchUsers, reducer } from '../reducers/users-reducer';

export const UsersContext = createContext();

export const UsersContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    users: [],
  });

  useEffect(() => {
    fetchUsers(dispatch);
  }, []);

  return <UsersContext.Provider value={[state, dispatch]} {...props} />;
};

export const useUsersContext = () => {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error('useUserContext must be used within a AppProvider');
  }

  const [state, dispatch] = context;

  return {
    fetchUsers: () => fetchUsers(dispatch),
    getUsers: (data) => getUsers(data, dispatch),

    users: state.users,
  };
};
