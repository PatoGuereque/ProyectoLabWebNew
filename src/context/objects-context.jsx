import React, { useReducer, useEffect, createContext } from 'react';
import { useContext } from 'react';
import {
  clearPostObject,
  reclaimObject,
  fetchObjects,
  postObject,
  reducer,
} from '../reducers/objects-reducer';

export const ObjectContext = createContext();

export const ObjectContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    objects: [],
    postResponse: undefined,
  });

  useEffect(() => {
    fetchObjects(dispatch);
  }, []);

  return <ObjectContext.Provider value={[state, dispatch]} {...props} />;
};

export const useObjectContext = () => {
  const context = useContext(ObjectContext);

  if (!context) {
    throw new Error('useObjectContext must be used within a AppProvider');
  }

  const [state, dispatch] = context;

  return {
    fetchObjects: () => fetchObjects(dispatch),
    postObject: (data) => postObject(data, dispatch),
    reclaimObject: (data) => reclaimObject(data, dispatch),
    clearPostResponse: () => clearPostObject(dispatch),

    objects: state.objects,
    postResponse: state.postResponse,
  };
};
