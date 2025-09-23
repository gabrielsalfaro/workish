// import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { csrfFetch } from '../../store/csrf';
import { fetchMyCompany } from '../../store/companies';
import { editCompany } from '../../store/companies';
import { useDispatch, useSelector } from 'react-redux';
import './CompanyEdit.css'

const CompanyEdit = () => {
    // const { companyId } = useParams();
    // const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const companyState = useSelector((state) => state.companies);
    const company = Object.values(companyState)[0];

    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [logoUrl, setLogoUrl] = useState('');
    const [companyId, setCompanyId] = useState(null);

    useEffect(() => {
      dispatch(fetchMyCompany());
    }, [dispatch]);

    useEffect(() => {
      if (company) {
        setName(company.name || '');
        setCity(company.city || '');
        setState(company.state || '');
        setPhone(company.phone || '');
        setEmail(company.email || '');
        setWebsite(company.website || '');
        setLogoUrl(company.logo || '');
        setCompanyId(company.id);
      }
    }, [company]);

    const handleSubmit = async (e) => {
    e.preventDefault();

    const companyData = {
      name,
      city,
      state,
      phone,
      email,
      website,
      logo: logoUrl,
    };

    try {
      const updatedCompany = await dispatch(editCompany(companyId, companyData));
      if (updatedCompany) {
        navigate(`/companies/me`);
      }
    } catch (error) {
      console.error('Failed to update company:', error);
    }
    }
    
  return (
    <>
    <div className='company-edit-container'>
      <div className="company-edit-form-content">
        <h1 className='company-edit-header'>Edit Company Info</h1>
        <form className='company-edit-form' onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Company Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          <input
            type="text"
            placeholder="Logo URL"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
          />

          <center>
            <button 
              className="company-edit-submit-button" 
              type="submit"
            >Update Company
            </button>
          </center>
        </form>
      </div>
    </div>
    </>
  )
}

export default CompanyEdit