import axios from 'axios';

const FETCH_OBJECTS = 'FETCH_OBJECTS';

const fetchObjectsResponse = (data) => ({ type: FETCH_OBJECTS, payload: data });

export const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_OBJECTS: {
      return { ...state, objects: action.payload };
    }
    default:
      throw new Error();
  }
};

export const fetchPlaces = (dispatch) => {
  axios
    .get('/api/places/list')
    .then((res) => {
      dispatch(fetchObjectsResponse(res.data.places));
    })
    .catch(() => {});
};
