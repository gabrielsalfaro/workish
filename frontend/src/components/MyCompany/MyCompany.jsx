import { useEffect, 
  // useMemo, useState 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyCompany, removeCompany } from '../../store/companies'
// import CompanyEdit from '../CompanyEdit/CompanyEdit';
import './MyCompany.css'
import { useNavigate } from 'react-router-dom';

const MyCompany = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [companyName, setCompanyName] = useState();
    const companyState = useSelector((state) => state.companies);
//   console.log(companyState)

    const myCompany = Object.values(companyState)[0] || null;
    // console.log('>>> ', myCompany)
    // console.log('>>> ', myCompany.name)
    useEffect(() => {
        dispatch(fetchMyCompany());
    }, [dispatch]);

    // if (!myCompany) return <p>No company assigned.</p>;

    const handleCompanyDelete = (companyId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete the company?')
        if (confirmDelete) {
            dispatch(removeCompany(companyId))
        }
    }

    const handleCompanyAdd = () => {
      console.log('clicked')
    }

    const handleCompanyUpdate = () => {
      navigate(`/companies/edit`);
    }

  return (
    <>
    <div className="my-company-container">
      {myCompany ? (
        <>
          <div className="my-company-header">
            <h2>{myCompany.name}</h2>
          </div>
          <div className="company-details">
            <p>{myCompany.city}, {myCompany.state}</p>
            <p>Email: {myCompany.email || 'N/A'}</p>
            <p>Phone: {myCompany.phone || 'N/A'}</p>
            <p>Website: {myCompany.website || 'N/A'}</p>
            {myCompany.logo && (
              <img src={myCompany.logo} alt={`${myCompany.name} logo`} className="company-logo" />
            )}
          </div>
          <div className="button-group">
            <button 
              className="update-company-button" 
              onClick={() => handleCompanyUpdate()}
            >Update</button>
            <button 
              className="delete-company-button" 
              onClick={() => handleCompanyDelete(myCompany.id)}
            >Delete</button>
          </div>
        </>
      ) : (
        <div className="no-company-message">
          <p>You don&apos;t have a company assigned yet. Search for a company below:</p>
          <input type="text" className="company-search" placeholder="Search for a company..." />
          <button className="add-company" onClick={handleCompanyAdd}>Add Company</button>
        </div>
      )}
    </div>
    </>
  )
}

export default MyCompany