const LOAD_USER = 'users/LOAD_USER';


const initialState = {};


export const loadUser = (user) => ({
  type: LOAD_USER,
  user,
});


export const fetchUser = (userId) => async dispatch => {
  const res = await fetch(`/api/users/${userId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadUser(data));
  }
};


const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        [action.user.id]: action.user
      };
    default:
      return state;
  }
};

export default usersReducer;
