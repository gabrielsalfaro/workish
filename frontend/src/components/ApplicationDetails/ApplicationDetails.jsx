import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchApplicationById } from '../../store/applications';
import { updateApplicationStatus } from '../../store/applications';
import './ApplicationDetails.css';


const ApplicationDetails = () => {
  const dispatch = useDispatch();
  const { applicationId } = useParams();
  const application = useSelector(state => state.applications?.[applicationId])
  // const { userId } = useParams();
  const currentUser = useSelector(state => state.session?.user);
  // const status = application.status;
  // const [loading, setLoading] = useState(true);
  const hasFullData = application?.User && application?.JobListing?.Company;


  useEffect(() => {
    if ((!application || !hasFullData) && applicationId) {
      dispatch(fetchApplicationById(applicationId));
    }
  }, [dispatch, application, hasFullData, applicationId]);

  if (!application || !hasFullData) return <div>Loading application details...</div>;

  const JobListing = application.JobListing;
  const createdAt = JobListing?.createdAt || application?.createdAt;
  const User = application.User;
  // const JobHistory = application.JobHistories

  const handleStatusChange = (newStatus) => {
    if (newStatus !== application.status) {
      dispatch(updateApplicationStatus(application.id, newStatus));
    }
  };

  const isEmployer = currentUser?.id === application.JobListing?.employerId;

  const formatDate = (isoDate) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <>
    <div className="application-details-container">
      <div className="application-details-content">
        <h1>Application Details</h1>

        <div className="application-section">
          <h2>Job Information</h2>
          <p><strong>Title:</strong> {JobListing?.title}</p>
          <p><strong>Company:</strong> {JobListing?.Company?.name}</p>
          <p><strong>Location:</strong> {JobListing?.city}, {JobListing?.state}</p>
          <p><strong>Posted:</strong> {new Date(JobListing?.createdAt).toLocaleDateString()}</p>
          <div className="job-description-preview">
            <strong>Description:</strong>
            <div
              dangerouslySetInnerHTML={{
                __html: JobListing?.description?.slice(0, 200) + '...'
              }}
            />
          </div>
        </div>

        <section className="application-section">
          <div className="application-status-top-section">

            <h2>Application Status</h2>
            <div className="update-application-status">
              {isEmployer && (
                <select
                  value={application.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="interviewing">Interviewing</option>
                  <option value="offer">Offer</option>
                  <option value="rejected">Rejected</option>
                  <option value="hired">Hired</option>
                </select>
              )}

            </div>
          </div>
          
          <p><strong>Status:</strong> <span className={`status-badge`}><b>{application.status.toUpperCase()}</b></span></p>
          <p><strong>Submitted:</strong> {new Date(createdAt).toLocaleDateString()}</p>
        </section>

        {User && (
          <section className="application-section applicant-info">
            <h2>Applicant Info</h2>
            <div className="applicant-profile">
              <div className="applicant-profile-content">
                <img
                  src={User.profileImg || ''}
                  alt={`${User.firstName}'s profile`}
                  className="applicant-avatar"
                />
                <div className="applicant-details">
                  <p> <b>{User.firstName} {User.lastName}</b></p>
                  <p> {User.email}</p>
                  <p> {User.jobTitle || 'N/A'}</p>
                  <p> {User.summary || 'N/A'}</p>
                </div>
              </div>

            </div>
          </section>
        )}

        {User?.JobHistories?.length > 0 ? (
          <ul className="employment-list">
            {User.JobHistories.map((job) => (
              
              <li key={job.id} className="employment-entry">
                <div className="employment-row">
                  <div className="employment-header">
                    <span className="employment-title"><b>{job.jobTitle}</b></span>
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
    </div>
    <div style={{ height: '1px' }}></div> 

    </>
  )
}

export default ApplicationDetails