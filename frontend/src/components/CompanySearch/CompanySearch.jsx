import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { assignCompany } from '../../store/companies';
import { useNavigate } from 'react-router-dom';
import './CompanySearch.css'

const CompanySearch = () => {
  const [companyName, setCompanyName] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCompanySearch = async (e) => {
    e.preventDefault();
    setErrors({});
    setSearchResult(null);
    setLoading(true);

    try {
      const res = await fetch(`/api/companies/search?name=${companyName}`);
      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setSearchResult(data.company);
      } else {
        setErrors({ search: data.message || 'Company not found' });
      }
    } catch (error) {
      console.error(error);
      setErrors({ search: 'Error searching for company.' });
      setLoading(false);
    }
  };

  const handleCompanyAdd = async () => {
    if (!searchResult) return;

    try {
      const response = await dispatch(assignCompany(searchResult.id));

      if (response?.message === 'Company successfully assigned to user.') {
        navigate('/companies/me');
      } else {
        setErrors({ add: 'Failed to assign company.' });
      }
    } catch (error) {
      console.error('Assign company error:', error);
    }
  };

  const handleCompanyUpdate = async () => {
    console.log('clicked')
  };

  return (
    <div className="company-search-container">
      <h2>Search for a Company</h2>

      <form onSubmit={handleCompanySearch} className="company-search-form">
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Enter company name"
          required
        />
        <button type="submit" className="company-search-button">
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {errors.search && <p className="error-message">{errors.search}</p>}

      {searchResult && (
        <div className="company-search-result">
          <h3>{searchResult.name}</h3>
          <p>{searchResult.city}, {searchResult.state}</p>
          <p>Email: {searchResult.email}</p>
          <p>Website: {searchResult.website}</p>

          <button onClick={handleCompanyAdd} className="company-add-button">
            Add to My Profile
          </button>

          <button onClick={handleCompanyUpdate} className="company-update-button">
            Update Company
          </button>

          {errors.add && <p className="error-message">{errors.add}</p>}
          {errors.update && <p className="error-message">{errors.update}</p>}
        </div>
      )}
    </div>
  )
}

export default CompanySearch