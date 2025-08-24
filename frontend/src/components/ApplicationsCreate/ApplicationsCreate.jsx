import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobById } from '../../store/joblistings';
import { fetchUser } from '../../store/users';
import { csrfFetch } from '../../store/csrf';
import './ApplicationsCreate.css';
import { fetchMyApplications } from '../../store/applications';
import { useNavigate } from 'react-router-dom';


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
    const navigate = useNavigate();

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

    useEffect(() => {
      if (user || sessionUser) {
        setFirstName(user?.firstName || '');
        setLastName(user?.lastName || '');
        setEmail(user?.email || '');
        setPhone(user?.phone || '');
      }
    }, [user, sessionUser]);

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
                dispatch(fetchMyApplications());
                navigate(`/applications/${data.id}/details`);
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
              {user?.JobHistories?.length > 0 ? (
                <ul className="employment-list">
                  {user.JobHistories.map((job) => (
                    
                    <li key={job.id} className="employment-entry">
                      <div className="employment-row">
                        <div className="employment-header">
                          <span className="employment-title">{job.jobTitle}</span>
                          <span className="employment-dates">
                            ({formatDate(job.startDate)} - {formatDate(job.endDate)})
                          </span>
                        </div>
                        <div className="employment-details">
                          <div>{job.employer} </div>
                          <div>{job.city}, {job.state}</div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-history">No employment history available.</p>
              )}

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
      <div style={{ height: '1px' }}></div> 

    </>
  )
}

export default ApplicationsCreate