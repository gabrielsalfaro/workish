// import { useParams } from 'react-router-dom';
// import { useState } from 'react';
import './CompanyEdit.css'

const CompanyEdit = () => {
    // const { companyId } = useParams();
    // const [errors, setErrors] = useState([]);

  return (
    <>
    <div>CompanyEdit</div>
    <form className='company-edit-form'>
        <input type="text" className="name" />
        <input type="text" className="city" />
        <input type="text" className="state" />
        <input type="text" className="phone" />
        <input type="text" className="email" />
        <input type="text" className="website" />
        <input type="text" className="logo-url" />

        <button className="company-edit-submit-button">submit</button>
    </form>
    </>
  )
}

export default CompanyEdit