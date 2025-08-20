import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobById } from '../../store/joblistings';
import { fetchUser } from '../../store/users';
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


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log( firstName, lastName, email, phone );
    };


  return (
    <>
    <div className="application-form-container">
      {job && (
        <div className="job-info-preview">
          <p><strong>Title:</strong> {job.title}</p>
          <p><strong>Company:</strong> {job.Company?.name}</p>
          <p><strong>Location:</strong> {job.Company?.city}, {job.Company?.state}</p>
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

        <div>
            <h2>Employment History</h2>
            {user?.JobHistories?.map((job, i) => (
                <div key={i}>
                <p>{job.employer} - {job.city}, {job.state}, {formatDate(job.startDate)} - {formatDate(job.endDate)}</p>
                </div>
            ))}
        </div>
        <button type="submit" className="application-apply-button">Submit Application</button>
      </form>
    </div>
    </>
  )
}

export default ApplicationsCreate