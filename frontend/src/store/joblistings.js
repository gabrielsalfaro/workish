// import { csrfFetch } from './csrf';

const LOAD_SEARCH_RESULTS = 'jobs/LOAD_SEARCH_RESULTS';
const CLEAR_JOBS = 'jobs/CLEAR_JOBS';
const LOAD_MY_JOBS = 'jobs/LOAD_MY_JOBS';
const LOAD_SINGLE_JOB = 'spots/LOAD_SINGLE_JOB';


const initialState = {}

export const loadSearchResults = (jobs) => ({
    type: LOAD_SEARCH_RESULTS,
    jobs,
});

export const clearJobs = () => ({
  type: CLEAR_JOBS
});

export const loadMyJobs = (jobs) => ({
  type: LOAD_MY_JOBS,
  jobs,
});

export const loadSingleJob = (job) => ({
  type: LOAD_SINGLE_JOB,
  job
})


// search
export const fetchJobs = (keyword, { city, state, companyName }) => async (dispatch) => {
  try {
    const query = new URLSearchParams();
    if (keyword) query.append('keyword', keyword);
    if (city) query.append('city', city);
    if (state) query.append('state', state); // state not working yet
    if (companyName) query.append('companyName', companyName.trim());

    // console.log('Fetching with query:', query.toString());

    const res = await fetch(`/api/jobs/search?${query.toString()}`);

    if (res.ok) {
      const data = await res.json();
    //   console.log('Job data from backend:', data);
      dispatch(loadSearchResults(data));
    }
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
  }
};

// my-jobs (Created jobs)
export const fetchMyJobs = () => async (dispatch) => {
    const res = await fetch('/api/jobs/created');
    if (res.ok) {
      const data = await res.json();
      dispatch(loadMyJobs(data)); 
    }
};

// fetch Job Details /:jobId
export const fetchJobById = (jobId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/jobs/${jobId}`);
    if (res.ok) {
      const job = await res.json();
      dispatch(loadSingleJob(job));
    } else {
      console.error('Failed to fetch job by ID');
    }
  } catch (error) {
    console.error('Error fetching job by ID:', error);
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
      case LOAD_SINGLE_JOB: {
        return {
            ...state,
            [action.job.id]: action.job
        };
      }
      case LOAD_MY_JOBS: {
        const jobsObj = {};
        action.jobs.forEach(job => {
          jobsObj[job.id] = job;
        });
        // console.log('newState: ', newState)
        // return newState;
        return { ...state, jobs: jobsObj }
      }
      case CLEAR_JOBS:
        return { ...state, jobs: null };
      default:
        return state;
    }
};
  
export default jobsReducer;