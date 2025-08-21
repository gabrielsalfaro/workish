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

  if (!application) return (
  <div>
      {/* <p>Select an application to see details.</p> */}
  </div>
  );


  return (
    <>
    <div className="application-details-container">
      <div className="application-details-content">

        <div><h1>ApplicationDetails</h1></div>
        <div><b>Job Title:</b> {application.JobListing?.title}</div>
        <div><b>Status:</b> {application.status}</div>
        <div><b>Location:</b> {application.JobListing?.city}, {application.JobListing?.state}</div>
        <div><b>Company:</b> {application.JobListing?.Company?.name}</div>
        <div><b>Submitted:</b> {new Date(application.createdAt).toLocaleDateString()}</div>
      </div>

    </div>

    </>
  )
}

export default ApplicationDetails