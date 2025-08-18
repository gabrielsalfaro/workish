import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyJobs } from '../../store/joblistings';
import './JobListingsManage.css'
// import { NavLink } from 'react-router-dom';

const JobListingsManage = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const jobsObj = useSelector(state => state.jobs.jobs);

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

    return (
        <>
            <h1>My Job Listings</h1>
            <div className="my-job-listings-container">
                {jobs.length > 0 ? (
                    jobs.map(job => (
                        <div key={job.id} className="my-job-listing-content">
                            <b>{job.title} </b>
                            <div>{job.city}, {job.state}</div>
                        </div>
                    ))
                ) : (
                    <p>No jobs listed yet</p>
                )}
            </div>
        </>
    );
};

export default JobListingsManage;
