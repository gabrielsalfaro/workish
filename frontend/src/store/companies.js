// import { csrfFetch } from "./csrf";

const LOAD_MY_COMPANY = 'applications/LOAD_MY_COMPANY';


const initialState = {}


export const loadMyCompany = (company) => ({
    type: LOAD_MY_COMPANY,
    company
});


export const fetchMyCompany = () => async (dispatch) => {
    const res = await fetch('/api/companies/my-company');
    if (res.ok) {
        const data = await res.json();
        dispatch(loadMyCompany(data))
    }
}

const companiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_MY_COMPANY: {
            const newState = {};
            newState[action.company.id] = action.company;
            return newState;
        }

        default:
          return state;
    }
}

export default companiesReducer;