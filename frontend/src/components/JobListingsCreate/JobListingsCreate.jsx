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
    <div className="job-listing-form">
      <h1>Create a Job Listing</h1>
      <form onSubmit={handleSubmit}>
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
        <ReactQuill
          value={description}
          onChange={setDescription}
          className="quill"
          theme="snow"
        />
        <button 
        className='job-listing-post-button' 
        type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default JobListingsCreate;
