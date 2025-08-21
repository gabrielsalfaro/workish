const LOAD_MY_APPLICATIONS = 'applications/LOAD_MY_APPLICATIONS';
const LOAD_SINGLE_APPLICATION = 'applications/LOAD_SINGLE_APPLICATION';

const initialState = {}


export const loadMyApplications = (applications) => ({
    type: LOAD_MY_APPLICATIONS,
    applications,
});

export const loadSingleApplication = (application) => ({
    type: LOAD_SINGLE_APPLICATION,
    application,
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
        default:
          return state;
    }
}

export default applicationsReducer;