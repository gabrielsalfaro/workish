import { csrfFetch } from "./csrf";

const LOAD_MY_APPLICATIONS = 'applications/LOAD_MY_APPLICATIONS';
const LOAD_SINGLE_APPLICATION = 'applications/LOAD_SINGLE_APPLICATION';
const LOAD_EMPLOYER_APPLICATIONS = 'applications/LOAD_EMPLOYER_APPLICATIONS';

const initialState = {}


export const loadMyApplications = (applications) => ({
    type: LOAD_MY_APPLICATIONS,
    applications,
});

export const loadSingleApplication = (application) => ({
    type: LOAD_SINGLE_APPLICATION,
    application,
});

export const loadEmployerApplications = (applications) => ({
  type: LOAD_EMPLOYER_APPLICATIONS,
  applications
});


// my applications (submitted)
export const fetchMyApplications = () => async (dispatch) => {
    const rest = await fetch('/api/applications');
    if (rest.ok) {
        const data = await rest.json();
        dispatch(loadMyApplications(data))
    }
}

// fetch Application Details /:jobId
export const fetchApplicationById = (applicationId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/applications/${applicationId}/details`);
    if (res.ok) {
      const application = await res.json();
      dispatch(loadSingleApplication(application));
    } else {
      console.error('Failed to fetch application by ID');
    }
  } catch (error) {
    console.error('Error fetching application by ID:', error);
  }
};

// fetch Applications submitted to my JobListings
export const fetchEmployerApplications = (jobId) => async (dispatch) => {
  const res = await fetch(`/api/jobs/${jobId}/applications`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadEmployerApplications(data));
  }
};

// update application status
export const updateApplicationStatus = (applicationId, newStatus) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/applications/${applicationId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: newStatus })
    });

    if (res.ok) {
      // const data = await res.json();
      // dispatch(loadSingleApplication(data.application));
      dispatch(fetchApplicationById(applicationId));
    } else {
      console.error('Failed to update application status');
    }
  } catch (error) {
    console.error('Error updating status:', error);
  }
};



const applicationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_MY_APPLICATIONS: {
            const newState = {};
            action.applications.forEach(application => {
                newState[application.id] = application;
            });
            return newState;
        }
        case LOAD_SINGLE_APPLICATION: {
        return {
            ...state,
            [action.application.id]: action.application
        };
        }
        case LOAD_EMPLOYER_APPLICATIONS: {
          const jobId = action.applications[0]?.jobListingId;
          const appsByJob = {};
          action.applications.forEach(app => {
            appsByJob[app.id] = app;
          });

          return {
            ...state,
            employerApplications: {
              ...state.employerApplications,
              [jobId]: appsByJob
            }
          };
        }
        default:
          return state;
    }
}

export default applicationsReducer;