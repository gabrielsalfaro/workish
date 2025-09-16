// import { csrfFetch } from "./csrf";

import { csrfFetch } from "./csrf";

const LOAD_MY_COMPANY = 'companies/LOAD_MY_COMPANY';
const DELETE_COMPANY = 'companies/DELETE_COMPANY'
const ADD_COMPANY = 'companies/ADD_COMPANY';
const UPDATE_COMPANY = 'companies/UPDATE_COMPANY';

const initialState = {}


export const loadMyCompany = (company) => ({
    type: LOAD_MY_COMPANY,
    company
});

const addCompany = (company) => ({
  type: ADD_COMPANY,
  company,
});

const updateCompany = (company) => ({
  type: UPDATE_COMPANY,
  company,
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

// POST new Company
export const createCompany = (companyData) => async (dispatch) => {
  const res = await csrfFetch('/api/companies/new', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(companyData),
  });

  if (res.ok) {
    const newCompany = await res.json();
    dispatch(addCompany(newCompany));
    return newCompany;
  } else {
    const error = await res.json();
    console.error('Error creating company', error)
  }
};

// PUT existing Company
export const editCompany = (companyId, companyData) => async (dispatch) => {
  const res = await csrfFetch(`/api/companies/${companyId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(companyData),
  });

  if (res.ok) {
    const updatedCompany = await res.json();
    dispatch(updateCompany(updatedCompany));
    return updatedCompany;
  } else {
    const error = await res.json();
    console.error('Error updating company:', error);
    throw error;
  }
};

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
        case ADD_COMPANY:
            return { ...state, [action.company.id]: action.company };
        case UPDATE_COMPANY:
        return { ...state, [action.company.id]: action.company };
        
        default:
          return state;
    }
}

export default companiesReducer;