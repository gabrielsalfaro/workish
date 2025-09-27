import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './CompanyDetails.css'
import { fetchCompanyById } from '../../store/companies';

const CompanyDetails = () => {
    const { companyId } = useParams();
    const dispatch = useDispatch();

    const company = useSelector(state => state.companies?.[companyId]);

    useEffect(() => {
        if (!company && companyId) {
            dispatch(fetchCompanyById(companyId));
        }
    }, [dispatch, companyId, company]);

    if (!company) return <p>Loading...</p>;

  return (
    <div className="company-details-page">
      <div className="company-header">
        <h2>{company.name}</h2>
        {company.logo && <img src={company.logo} alt={`${company.name} logo`} className="company-details-logo" />}
      </div>

      <div className="company-meta">
        <p><b>Location:</b> {company.city}, {company.state}</p>
        <p><b>Email:</b> {company.email || 'N/A'}</p>
        <p><b>Phone:</b> {company.phone || 'N/A'}</p>
        <p><b>Website:</b> {company.website 
          ? <a href={company.website} target="_blank" rel="noreferrer">{company.website}</a> 
          : 'N/A'}
        </p>
      </div>

      {/* show jobs from this company? */}
      {/* <CompanyJobs companyId={companyId} /> ? */}
    </div>
  )
}

export default CompanyDetails