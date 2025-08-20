import ReactQuill from 'react-quill';
import { useState, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import { csrfFetch } from '../../store/csrf';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMyJobs } from '../../store/joblistings';
import { useDispatch } from 'react-redux';
import './JobListingEdit.css'

const JobListingEdit = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${jobId}`);
        if (res.ok) {
          const data = await res.json();
          setTitle(data.title || '');
          setCompanyName(data.Company?.name || '');
          setCity(data.city || '');
          setState(data.state || '');
          setDescription(data.description || '');
        }
      } catch (error) {
        console.error('Error fetching job:', error);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      title,
      description,
      city,
      state,
      companyName,
    };

    try {
      const res = await csrfFetch(`/api/jobs/${jobId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData),
      });

      const data = await res.json();
      console.log('Job updated:', data);
      if (res.ok) {
          dispatch(fetchMyJobs());
          navigate(`/jobs/${data.id}/details`);
      }
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };


  return (
    <div className='edit-job-listing-container'>
      <div className="job-listing-form-content">
        <h1 className='edit-job-listing-header'>Edit Job Listing</h1>
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

          <button 
            className='job-listing-update-button' 
            onClick={handleSubmit}
            type="submit"
          >
            Update Job
          </button>

        </form>
      </div>
    </div>
  )
}

export default JobListingEdit