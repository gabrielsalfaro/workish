import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyJobs } from '../../store/joblistings';
import { NavLink } from 'react-router-dom';
// import { csrfFetch } from '../../store/csrf';
import { fetchEmployerApplications } from '../../store/applications';
import { useParams } from 'react-router-dom';
import { fetchJobById } from '../../store/joblistings';
import './ApplicationsReview.css';

const ApplicationsReview = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const applicationsObj = useSelector(state => state.applications || {});
    const applications = Object.values(applicationsObj || {});
    const { jobId } = useParams();
    const job = useSelector(state => state.jobs?.[jobId]);
    // const sessionUser = useSelector(state => state.session.user);
    // const userId = sessionUser?.id;


    useEffect(() => {
        const loadApps = async () => {
            if (jobId) {
                await dispatch(fetchJobById(jobId));
            }

            const jobs = await dispatch(fetchMyJobs());
            for (const job of Object.values(jobs)) {
                await dispatch(fetchEmployerApplications(job.id));
            }

            setLoading(false);
    };

    loadApps();
    }, [dispatch, jobId]);

    if (loading) return <p>Loading...</p>;


  return (
    <>
    <div className="applications-review-container">
        <div><h2>Review Applications Submitted</h2></div>

        {job && (
        <div className="job-info-preview">
            <p><strong>Title:</strong> {job.title}</p>
            <p><strong>Company:</strong> {job.Company?.name}</p>
            <p><strong>Location:</strong> {job.Company?.city}, {job.Company?.state}</p>
        </div>
        )}

        {applications.length === 0 && <p>No applications submitted yet.</p>}

        {applications.map((application) => (
            <>
            <NavLink to={`/users/${application.User?.id}`}>
                <div key={application.id} className="application-card">
                    {/* <h3>{application.User?.title}</h3> */}
                    <p><strong>Applicant:</strong> {application.User?.firstName} {application.User?.lastName}</p>
                    <p><strong>Email:</strong> {application.User?.email}</p>
                    <p><strong>Submitted:</strong> {new Date(application.createdAt).toLocaleDateString()}</p>
                    <p><strong>Status:</strong> {application.status}</p>
                </div>
            </NavLink>
            </>
        ))}
    </div>
    </>
  )
}

export default ApplicationsReview;