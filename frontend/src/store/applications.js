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
            const newState = { ...state };
            action.applications.forEach(app => {
                newState[app.id] = app;
            });
            return newState;
        }
        default:
          return state;
    }
}

export default applicationsReducer;