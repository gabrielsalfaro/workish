import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyApplications } from '../../store/applications';
import { csrfFetch } from '../../store/csrf';
import { Navigate, NavLink } from 'react-router-dom';
import './ApplicationsSubmitted.css';

const ApplicationsSubmitted = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);
    const applicationsObj = useSelector(state => state.applications);

    useEffect(() => {
        const loadMyJobs = async () => {
            await dispatch(fetchMyApplications());
            setLoading(false);
        };
        loadMyJobs();
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;

    const applications = Object.values(applicationsObj || {});


    const handleDelete = async (applicationId) => {
        // convert to modal
        if (!window.confirm('Are you sure you want to delete this application?')) return;

        try {
                const res = await csrfFetch(`/api/applications/${applicationId}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                dispatch(fetchMyApplications());
                return <Navigate to='/applications/' />
            }
        } catch (error) {
            console.error('Failed to delete job:', error);
        }
    };


  return (
    <>
    <div className="applications-submitted-container">
        <div className="applications-submitted-content">
        <div><h1>ApplicationsSubmitted</h1></div>
            {applications.length > 0 ? (
                applications.map(application => (
                    <>
                    <div key={application.id} className="my-job-listing-content">
                        <NavLink to={`/applications/${application.id}/details`}  >
                            <div><b>{application.JobListing.title} </b></div>
                            <div>{application.JobListing.city}, {application.JobListing.state}</div>
                        </NavLink>

                        <div className="application-status">{application.status}</div>
                        <div className="my-jobs-button-container">
                            <div>
                                <NavLink to={`/applications/${application.id}/details`}>
                                    <button className="my-jobs-update-button">
                                        view
                                    </button>
                                </NavLink>
                            </div>
                            <div>
                                <button 
                                    onClick={() => handleDelete(application.id)} 
                                    className="my-jobs-delete-button"
                                >
                                    delete
                                </button>
                            </div>
                        </div>

                    </div>
                    </>
                ))
            ) : (
                <p>No jobs listed yet</p>
            )}
        </div>
    </div>
    </>
  )
}

export default ApplicationsSubmitted;