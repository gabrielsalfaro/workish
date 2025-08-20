const LOAD_MY_APPLICATIONS = 'applications/LOAD_MY_APPLICATIONS';

const initialState = {}


export const loadMyApplications = (applications) => ({
    type: LOAD_MY_APPLICATIONS,
    applications,
});



// my applications (submitted)
export const fetchMyApplications = () => async (dispatch) => {
    const rest = await fetch('/api/applications');
    if (rest.ok) {
        const data = await rest.json();
        dispatch(loadMyApplications(data))
    }
}


const applicationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_MY_APPLICATIONS: {
            const newState = {};
            action.applications.forEach(application => {
                newState[application.id] = application;
            });
            return newState;
        }

        default:
          return state;
    }
}

export default applicationsReducer;