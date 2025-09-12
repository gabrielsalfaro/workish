// import { useParams } from 'react-router-dom';
// import { useState } from 'react';
import './CompanyCreate.css'

const CompanyCreate = () => {
    // const { companyId } = useParams();
    // const [errors, setErrors] = useState([]);

    const handleSubmit = () => {
        console.log('clicked')
    }
    
  return (
    <>
    <div>CompanyCreate</div>
    <form className='company-create-form'>
        <input type="text" className="name" />
        <input type="text" className="city" />
        <input type="text" className="state" />
        <input type="text" className="phone" />
        <input type="text" className="email" />
        <input type="text" className="website" />
        <input type="text" className="logo-url" />

        <button className="company-create-submit-button" onClick={handleSubmit}>submit</button>
    </form>
    </>
  )
}

export default CompanyCreate