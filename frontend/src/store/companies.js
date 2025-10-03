import { csrfFetch } from "./csrf";

const LOAD_MY_COMPANY = 'companies/LOAD_MY_COMPANY';
const DELETE_COMPANY = 'companies/DELETE_COMPANY'
const ADD_COMPANY = 'companies/ADD_COMPANY';
const UPDATE_COMPANY = 'companies/UPDATE_COMPANY';
const LOAD_COMPANY_BY_ID = 'companies/LOAD_COMPANY_BY_ID';


const initialState = {}


export const loadMyCompany = (company) => ({
    type: LOAD_MY_COMPANY,
    company
});

export const addCompany = (company) => ({
  type: ADD_COMPANY,
  company,
});

export const updateCompany = (company) => ({
  type: UPDATE_COMPANY,
  company,
});

export const deleteCompany = (companyId) => ({
    type: DELETE_COMPANY,
    companyId
})

export const loadCompanyById = (company) => ({
  type: LOAD_COMPANY_BY_ID,
  company,
});

// GET my Company
export const fetchMyCompany = () => async (dispatch) => {
    const res = await fetch('/api/companies/me');
    if (res.ok) {
        const data = await res.json();
        dispatch(loadMyCompany(data))
    }
}

// GET single Company by :companyId
export const fetchCompanyById = (companyId) => async (dispatch) => {
  const res = await fetch(`/api/companies/${companyId}`);
  if (res.ok) {
    const company = await res.json();
    dispatch(loadCompanyById(company));
  } else {
    const error = await res.json();
    console.error('Error fetching company:', error);
  }
};

// POST new Company
export const createCompany = (companyData) => async (dispatch) => {
  const res = await csrfFetch('/api/companies', {
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

// GET a Company through search
export const searchCompany = (name) => async () => {
  try {
    const res = await fetch(`/api/companies/search?name=${encodeURIComponent(name)}`);
    if (res.ok) {
      const data = await res.json();
      return data.company;
    } else {
      const error = await res.json();
      console.error('Search error:', error.message);
    }
  } catch (error) {
    console.error('Search failed:', error);
  }
};

// PUT - Assign a Company to UserProfile
export const assignCompany = (companyId) => async () => {
  try {
    const res = await csrfFetch(`/api/companies/assign`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ companyId })
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      const error = await res.json();
      console.error('Assignment failed:', error.message);
    }
  } catch (error) {
    console.error('Error assigning company:', error);
  }
}

const companiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_MY_COMPANY: {
            return {
                ...state, 
                [action.company.id]: action.company
            };
        }
        case ADD_COMPANY:
            return { ...state, [action.company.id]: action.company };
        case UPDATE_COMPANY:
            return { ...state, [action.company.id]: action.company };
        case LOAD_COMPANY_BY_ID:
            return { ...state, [action.company.id]: action.company };

        default:
          return state;
    }
}

export default companiesReducer;