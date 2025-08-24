import { csrfFetch } from './csrf';

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


export const addJobHistory = (jobData) => async () => {
  try {
    const res = await csrfFetch('/api/users/job-history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData),
    });

    const data = await res.json();

    if (!res.ok) throw data;

    return data;
  } catch (error) {
    console.error('Job history creation failed:', error);
    throw error;
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
