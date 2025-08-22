import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchApplicationById } from '../../store/applications';
import './ApplicationDetails.css';

const ApplicationDetails = () => {
  const dispatch = useDispatch();
  const { applicationId } = useParams();
  const application = useSelector(state => state.applications?.[applicationId])

  useEffect(() => {
    if (!application && applicationId) {
      dispatch(fetchApplicationById(applicationId));
    }
  }, [dispatch, application, applicationId]);

  if (!application) return <div className="loading">Loading...</div>;


  return (
    <>
    <div className="application-details-container">
      <div className="application-details-content">
        <h1>Application Details</h1>

        <div className="application-section">
          <h2>Job Information</h2>
          <p>Job Title: {application.JobListing?.title}</p>
          <p>Company: {application.JobListing?.Company?.name}</p>
          <p>Location: {application.JobListing?.city}, {application.JobListing?.state}</p>
        </div>

        <div className="application-section">
          <h2>Application Info</h2>
          <p>Status: <span className={`status-badge`}><b>{application.status}</b></span></p>
          <p>Submitted: {new Date(application.createdAt).toLocaleDateString()}</p>
        </div>

        {application.user && (
          <div className="application-section">
            <h2>Applicant Info</h2>
            <p>Name: {application.user.firstName} {application.user.lastName}</p>
            <p>Email: {application.user.email}</p>
          </div>
        )}
      </div>
    </div>

    </>
  )
}

export default ApplicationDetails