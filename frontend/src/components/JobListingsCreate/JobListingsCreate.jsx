import './JobListingsCreate.css';
import ReactQuill from 'react-quill';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { csrfFetch } from '../../store/csrf';

const JobListingsCreate = () => {
  const [title, setTitle] = useState('');
  const [companyId, setCompanyId] = useState(1); 
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      title,
      description,
      city,
      state,
      companyId // need to create company first or..?
    };

    try {
      const res = await csrfFetch('/api/jobs/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData)
      });

      const data = await res.json();
      console.log('Job created:', data);
    } catch (err) {
      console.error('Error posting job:', err);
    }
  };

  return (
    <>
    <div className='create-job-listing-container'>
        <div className="job-listing-form-content">
        <h1 className='create-job-listing-header'>Create a Job Listing</h1>
        <form className="job-listing-form-content" onSubmit={handleSubmit}>
            <input 
                placeholder='job title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input 
                placeholder='city'
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <input 
                placeholder='state'
                value={state}
                onChange={(e) => setState(e.target.value)}
            />
            <input 
                placeholder='CompanyId'
                type='number'
                value={companyId}
                onChange={(e) => setCompanyId(Number(e.target.value))}
            />
            <div>
                <ReactQuill
                    value={description}
                    onChange={setDescription}
                    className="quill"
                    theme="snow"
                />
            </div>
            <button 
                className='job-listing-post-button' 
                type="submit">Post Job
            </button>
        </form>

        </div>
    </div>
    </>
  );
};

export default JobListingsCreate;
