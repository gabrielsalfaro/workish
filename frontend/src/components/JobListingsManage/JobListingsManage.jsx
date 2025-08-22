import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyJobs } from '../../store/joblistings';
import './JobListingsManage.css'
import { NavLink, Navigate } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';


const JobListingsManage = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const jobsObj = useSelector(state => state.jobs.jobs);
    // const jobId = useParams();

    useEffect(() => {
        const loadMyJobs = async () => {
            await dispatch(fetchMyJobs());
            setLoading(false);
        };
        loadMyJobs();
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;

    const jobs = Object.values(jobsObj || {}).filter(
        job => job.employerId === sessionUser?.id
    );

    const handleDelete = async (jobId) => {
        // convert to modal
        if (!window.confirm('Are you sure you want to delete this job?')) return;

        try {
                const res = await csrfFetch(`/api/jobs/${jobId}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                dispatch(fetchMyJobs());
                return <Navigate to='/jobs/my-jobs' />
            }
        } catch (error) {
            console.error('Failed to delete job:', error);
        }
    };

    return (
        <>
        <div className="my-job-listings-container">
            <div className="my-job-listings-content">
            <h1 className="my-job-listings-header">My Job Listings</h1>

            {jobs.length > 0 ? (
                jobs.map((job) => (
                <div key={job.id} className="my-job-listing-card">
                    <div className="my-job-listing-info">
                        <NavLink to={`/jobs/${job.id}/applications`}>
                            <div className="job-title"><strong>{job.title}</strong></div>
                            <div className="job-location">{job.city}, {job.state}</div>
                        </NavLink>
                    </div>

                    <div className="my-jobs-button-container">
                        <NavLink to={`/jobs/${job.id}/edit`}>
                            <button className="my-jobs-update-button">Update</button>
                        </NavLink>

                        <button
                            onClick={() => handleDelete(job.id)}
                            className="my-jobs-delete-button"
                        >
                            Delete
                        </button>
                    </div>
                </div>
                ))
            ) : (
                <p>No jobs listed yet.</p>
            )}
            </div>
        </div>
        </>
    );
};

export default JobListingsManage;
