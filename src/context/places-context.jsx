import React, { useReducer, useEffect, createContext } from 'react';
import { useContext } from 'react';
import { fetchPlaces, reducer } from '../reducers/places-reducer';

export const PlaceContext = createContext();

export const PlaceContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    places: [],
    postResponse: undefined,
  });

  useEffect(() => {
    fetchPlaces(dispatch);
  }, []);

  return <PlaceContext.Provider value={[state, dispatch]} {...props} />;
};

export const usePlaceContext = () => {
  const context = useContext(PlaceContext);

  if (!context) {
    throw new Error('usePlaceContext must be used within a AppProvider');
  }

  const [state, dispatch] = context;

  return {
    fetchPlaces: () => fetchPlaces(dispatch),

    places: state.objects,
  };
};
