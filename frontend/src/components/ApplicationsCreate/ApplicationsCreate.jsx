import { useState } from 'react';
import './ApplicationsCreate.css';


const ApplicationsCreate = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    // const [coverLetter, setCoverLetter] = useState('');
    // const [resume, setResume] = useState(null);
    // const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log( fullName, email, phone );
    };

    
  return (
    <>
    <div className="application-form-container">
      <h2>Apply for this Job</h2>
      <form onSubmit={handleSubmit} className="application-form">
        <label>
          Full Name
          <input 
            type="text" 
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)} 
          />
          {/* {errors.fullName && <div className="error">{errors.fullName}</div>} */}
        </label>

        <label>
          Email
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          {/* {errors.email && <div className="error">{errors.email}</div>} */}
        </label>

        <label>
          Phone
          <input 
            type="tel" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
          />
        </label>

        <button type="submit" className="apply-button">Submit Application</button>
      </form>
    </div>
    </>
  )
}

export default ApplicationsCreate