import axios from 'axios';

const FETCH_OBJECTS = 'FETCH_OBJECTS';
const POST_RESPONSE = 'POST_RESPONSE';

const fetchUsersResponse = (data) => ({ type: FETCH_OBJECTS, payload: data });

export const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_OBJECTS: {
      return { ...state, users: action.payload };
    }
    default:
      throw new Error();
  }
};

export const fetchUsers = (dispatch) => {
  axios
    .get('/api/users/list')
    .then((res) => {
      dispatch(fetchUsersResponse(res.data.users));
    })
    .catch(() => {});
};
