// import { csrfFetch } from "./csrf";

import { csrfFetch } from "./csrf";

const LOAD_MY_COMPANY = 'companies/LOAD_MY_COMPANY';
const DELETE_COMPANY = 'companies/DELETE_COMPANY'


const initialState = {}


export const loadMyCompany = (company) => ({
    type: LOAD_MY_COMPANY,
    company
});

export const deleteCompany = (companyId) => ({
    type: DELETE_COMPANY,
    companyId
})

// GET my Company
export const fetchMyCompany = () => async (dispatch) => {
    const res = await fetch('/api/companies/me');
    if (res.ok) {
        const data = await res.json();
        dispatch(loadMyCompany(data))
    }
}

// DELETE Company by :companyId
export const removeCompany = (companyId) => async (dispatch) => {
    // const res = await csrfFetch(`/api/companies/${companyId}`, {
    const res = await csrfFetch(`/api/companies/me`, {
        method: 'DELETE',
    })

    if (res.ok) {
        dispatch(deleteCompany(companyId))
    } else {
        const error = await res.json()
        console.error('Error deleting company: ', error)
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