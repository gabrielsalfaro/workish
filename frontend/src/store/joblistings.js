// import { csrfFetch } from './csrf';

const LOAD_SEARCH_RESULTS = 'jobs/LOAD_SEARCH_RESULTS';
const CLEAR_JOBS = 'jobs/CLEAR_JOBS';

const initialState = {}

export const loadSearchResults = (jobs) => ({
    type: LOAD_SEARCH_RESULTS,
    jobs,
});

export const clearJobs = () => ({
  type: CLEAR_JOBS
});


// search
export const fetchJobs = (keyword, { city, state }) => async (dispatch) => {
  try {
    const query = new URLSearchParams();
    if (keyword) query.append('keyword', keyword);
    if (city) query.append('city', city);
    if (state) query.append('state', state); // state not working yet

    const res = await fetch(`/api/jobs/search?${query.toString()}`);

    if (res.ok) {
      const data = await res.json();
      dispatch(loadSearchResults(data));
    }
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
  }
};



// lookup reducers
const jobsReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_SEARCH_RESULTS: {
        const newState = {};
        action.jobs.forEach(job => {
          newState[job.id] = job;
        });
        // console.log('newState: ', newState)
        // return newState;
        return { ...state, jobs: newState }
      }
      case CLEAR_JOBS:
        return { ...state, jobs: null };
      default:
        return state;
    }
};
  
export default jobsReducer;