import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyCompany } from '../../store/companies'
import './MyCompany.css'

const MyCompany = () => {
    const dispatch = useDispatch();

  const companyState = useSelector((state) => state.companies);
//   console.log(companyState)

  const myCompany = useMemo(() => Object.values(companyState)[0], [companyState]);
    // console.log('>>> ', myCompany)
    // console.log('>>> ', myCompany.name)
    useEffect(() => {
        dispatch(fetchMyCompany());
    }, [dispatch]);

    if (!myCompany) return <p>Loading...</p>;

  return (
    <>
    <div>MyCompany</div>
    <h2>{myCompany.name}</h2>
      <p>{myCompany.city}, {myCompany.state}</p>
      <p>Email: {myCompany.email}</p>
      <p>Phone: {myCompany.phone}</p>
      <p>Website: {myCompany.website}</p>
      {/* <p>Logo: {company.logo}</p> */}
      <img src={myCompany.logo} alt={`${myCompany.name} logo`} />
    </>
  )
}

export default MyCompany