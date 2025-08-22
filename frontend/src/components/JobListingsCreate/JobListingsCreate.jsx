import ReactQuill from 'react-quill';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { csrfFetch } from '../../store/csrf';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMyJobs } from '../../store/joblistings';
import './JobListingsCreate.css';


const JobListingsCreate = () => {
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fillDemoData = () => {
    setTitle('Frontend Developer');
    setCompanyName('Biz Solutions');
    setCity('San Francisco');
    setState('CA');
    setDescription(`<p>We're looking for a passionate frontend developer to join our team and build stunning user experiences.</p>
        <ul>
        <li>3+ years React experience</li>
        <li>Strong CSS and UI skills</li>
        <li>Remote-friendly</li>
        </ul>`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      title,
      description,
      city,
      state,
      companyName
    };

    try {
      const res = await csrfFetch('/api/jobs/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData)
      });

      const data = await res.json();
      console.log('Job created:', data);
      if (res.ok) {
        dispatch(fetchMyJobs());
        navigate(`/jobs/${data.id}/details`);
      }
    } catch (err) {
      console.error('Error posting job:', err);
    }
  };

  return (
    <>
    <div className='create-job-listing-container'>
        <div className="job-listing-form-content">
        <h1 className='create-job-listing-header'>Create a Job Listing</h1>
        <center>
          <button 
            style={{padding: '10px 0', justifyContent: 'center'}}
            type="button" 
            onClick={fillDemoData} 
            className="demo-fill-button">
            Fill Demo Data
          </button>
        </center>
        <form className="job-listing-form-content" onSubmit={handleSubmit}>
            <input 
                placeholder='Job Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input 
                placeholder='City'
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <input 
                placeholder='State'
                value={state}
                onChange={(e) => setState(e.target.value)}
            />
            <input 
                placeholder='Company Name'
                // type='number'
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
            />
            <div>
                <ReactQuill
                    value={description}
                    onChange={setDescription}
                    className="quill"
                    theme="snow"
                />
            </div>
            <center>
              <button 
                  className='job-listing-post-button' 
                  type="submit">Post Job
              </button>
            </center>
        </form>

        </div>
    </div>
    </>
  );
};

export default JobListingsCreate;
