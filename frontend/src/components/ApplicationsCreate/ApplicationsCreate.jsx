import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobById } from '../../store/joblistings';
import { fetchUser } from '../../store/users';
import { csrfFetch } from '../../store/csrf';
import './ApplicationsCreate.css';


const ApplicationsCreate = () => {
    const { jobId } = useParams();
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    // const [jobHistory, setJobHistory] = useState([]);
    const sessionUser = useSelector(state => state.session.user);
    const user = useSelector(state => state.user?.[sessionUser?.id]);
    // const [coverLetter, setCoverLetter] = useState('');
    // const [resume, setResume] = useState(null);
    // const [errors, setErrors] = useState({});

    const job = useSelector(state => state.jobs?.[jobId]);

    useEffect(() => {
        if (!job && jobId) {
        dispatch(fetchJobById(jobId));
        }
    }, [jobId, job, dispatch]);

    useEffect(() => {
        if (sessionUser?.id && !user) {
        dispatch(fetchUser(sessionUser.id));
        }
    }, [sessionUser, user, dispatch]);

    const formatDate = (isoDate) => {
        if (!isoDate) return '';
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

          const applicationData = {
            firstName,
            lastName,
            email,
            phone,
            userId: sessionUser?.id,
            jobId,
            jobHistory: user?.JobHistories || []
        };

        try {
            const res = await csrfFetch(`/api/applications/${jobId}/apply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(applicationData),
            });

            if (res.ok) {
                const data = await res.json();
                console.log('Application submitted successfully:', data);
                // redirect to application
            } 

        } catch (error) {
            console.error('Error submitting application:', error);
        }
    };


  return (
    <>
    <div className="application-form-container">
      {job && (
        <div className="job-info-preview">
          <p><b>{job.title}</b></p>
          <p>{job.Company?.name}</p>
          <p>{job.Company?.city}, {job.Company?.state}</p>
        </div>
      )}
      <h2>Add your contact information</h2>
      <form onSubmit={handleSubmit} className="application-form">
        <label>
          First Name
          <input 
            type="text" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
          />
          {/* {errors.fullName && <div className="error">{errors.fullName}</div>} */}
        </label>
        <label>
          Last Name
          <input 
            type="text" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
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

        <div className='employment-history-container'>
            <h2>Employment History</h2>
            {user?.JobHistories?.map((job) => (
            <div key={job.id} className="employment-history-entry">
                <div className="employment-header">
                    <div className='employment-job-title'><strong>{job.jobTitle}</strong></div>
                    <div className='employment-employer'><strong>{job.employer}</strong></div>
                    <span className="employment-location">{job.city}, {job.state}</span>
                </div>
                <div className="employment-dates">
                    {formatDate(job.startDate)} - {formatDate(job.endDate)}
                </div>
            </div>
            ))}

        </div>
        <center>
          <button 
              type="submit" 
              className="application-apply-button"
              // onClick={handleSubmit}
          >Submit Application
          </button>
        </center>

      </form>
    </div>
    </>
  )
}

export default ApplicationsCreate