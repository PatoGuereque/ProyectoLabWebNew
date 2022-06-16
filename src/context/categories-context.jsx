import React, { useReducer, useEffect, createContext } from 'react';
import { useContext } from 'react';
import { fetchCategories, reducer } from '../reducers/categories-reducer';

export const CategoryContext = createContext();

export const CategoryContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    categories: [],
    postResponse: undefined,
  });

  useEffect(() => {
    fetchCategories(dispatch);
  }, []);

  return <CategoryContext.Provider value={[state, dispatch]} {...props} />;
};

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error('useCategoryContext must be used within a AppProvider');
  }

  const [state, dispatch] = context;

  return {
    fetchCategories: () => fetchCategories(dispatch),

    categories: state.objects,
  };
};
