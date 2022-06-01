import axios from 'axios';

const FETCH_USER = 'FETCH_USER';

const fetchUserResponse = (data) => ({ type: FETCH_USER, payload: data });
export const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_USER: {
      return { ...state, user: action.payload };
    }
    default:
      throw new Error();
  }
};

export const fetchUser = (dispatch) => {
  axios
    .get('/api/user/info')
    .then((res) => {
      dispatch(fetchUserResponse(res.data.user));
    })
    .catch(() => {});
};
