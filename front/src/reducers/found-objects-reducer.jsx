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

export const fetchObjects = (dispatch) => {
  axios
    .get('/api/objects/list')
    .then((res) => {
      dispatch(fetchObjectsResponse(res.data.objects));
    })
    .catch(() => {});
};

export const postObjects = async (data) => {
  console.log(data);
  axios.post('/api/objects/create', data);
};

export const deactivateObject = async (data, dispatch) => {
  await axios.post(`/api/objects/desactivar/${data.id}`);
  fetchObjects(dispatch);
};
