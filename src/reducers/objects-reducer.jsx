import axios from 'axios';

const FETCH_OBJECTS = 'FETCH_OBJECTS';
const POST_RESPONSE = 'POST_RESPONSE';

const fetchObjectsResponse = (data) => ({ type: FETCH_OBJECTS, payload: data });
const postObjectResponse = (data) => ({ type: POST_RESPONSE, payload: data });
const softDeleteObjectResponse = (data) => ({
  type: POST_RESPONSE,
  payload: data,
});

export const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_OBJECTS: {
      return { ...state, objects: action.payload };
    }
    case POST_RESPONSE: {
      return { ...state, postResponse: action.payload };
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

export const postObject = async (data, dispatch) => {
  axios
    .post('/api/objects/create', data)
    .then(() => {
      fetchObjects(dispatch);
      dispatch(
        postObjectResponse({
          success: true,
        })
      );
    })
    .catch(() => {
      dispatch(
        postObjectResponse({
          success: false,
        })
      );
    });
};

export const clearPostObject = async (dispatch) => {
  dispatch(postObjectResponse(undefined));
};

export const reclaimObject = async (data, dispatch) => {
  await axios.post(`/api/objects/reclaim/${data.id}`);
  fetchObjects(dispatch);
};

export const softDeleteObject = async (data, dispatch) => {
  await axios.put(`/api/objects/${data.id}`, {
    deleted: true,
  });
  fetchObjects(dispatch);
};
