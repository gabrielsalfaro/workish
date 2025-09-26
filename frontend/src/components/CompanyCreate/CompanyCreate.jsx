// import { useParams } from 'react-router-dom';
import { useState } from 'react';
import './CompanyCreate.css'
import { createCompany } from '../../store/companies';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompanyCreate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    // const { companyId } = useParams();
    // const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [logoUrl, setLogoUrl] = useState('');
    
    const handleSubmit = async (e) => {
        // console.log('clicked')
        e.preventDefault();

        const newCompanyData = {
        name,
        city,
        state,
        phone,
        email,
        website,
        logoUrl
        };

        console.log('new company: ', newCompanyData);
        try {
          const newCompany = await dispatch(createCompany(newCompanyData))
          navigate(`/companies/${newCompany.id}`)
        } catch (error) {
          console.error('Error creating company', error)
        }
    }

  return (
    <>
    <form className='company-create-form' onSubmit={handleSubmit}>
    <div><h2><center>Create a Company</center></h2></div>
        <label>
          Name
            <input 
                type="text" 
                className="name" 
                value={name} 
                onChange={e => setName(e.target.value)} 
            />
        </label>

        <label>
          City
            <input 
                type="text" 
                className="city" 
                value={city} 
                onChange={e => setCity(e.target.value)} 
            />
        </label>

        <label>
          State
            <input 
                type="text" 
                className="state" 
                value={state} 
                onChange={e => setState(e.target.value)} 
            />
        </label>

        <label>
          Phone
            <input 
                type="text" 
                className="phone" 
                value={phone} 
                onChange={e => setPhone(e.target.value)} 
            />
        </label>

        <label>
          Email
            <input 
                type="text" 
                className="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
            />
        </label>

        <label>
          Website
            <input 
                type="text" 
                className="website" 
                value={website} 
                onChange={e => setWebsite(e.target.value)} 
            />
        </label>

        <label>
          Logo url
            <input 
                type="text" 
                className="logo-url" 
                value={logoUrl} 
                onChange={e => setLogoUrl(e.target.value)} 
            />
        </label>

        {/* <div className='company-create-button-container'> */}
        <center>
          <button 
              className="company-create-submit-button" 
              // onClick={handleSubmit}
              type='submit'
          >Submit</button>
        </center>
        {/* </div> */}
    </form>
    </>
  )
}

export default CompanyCreate