import { useEffect, 
  // useMemo, useState 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyCompany, removeCompany } from '../../store/companies'
import './MyCompany.css'

const MyCompany = () => {
    const dispatch = useDispatch();
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

  return (
    <>
    { myCompany ? (
      <>
        <div>MyCompany</div>
        <h2>{myCompany?.name}</h2>
        <p>{myCompany?.city}, {myCompany?.state}</p>
        <p>Email: {myCompany?.email || 'N/A'}</p>
        <p>Phone: {myCompany?.phone || 'N/A'}</p>
        <p>Website: {myCompany?.website || 'N/A'}</p>
        {/* <p>Logo: {company.logo}</p> */}
        <img src={myCompany?.logo} alt={`${myCompany?.name} logo`} />
        <button 
          className="delete-company-button" 
          onClick={() => handleCompanyDelete(myCompany?.id)}
        >delete
        </button>
      </>
    ) : (
      <>
      <p>You don&apos;t have a company assigned yet. Search for a company below:</p>
      <input type="text" className="company-search" />
      <button className="add-company" onClick={handleCompanyAdd}>Add Company</button>
      </>
    )}
    
    </>
  )
}

export default MyCompany