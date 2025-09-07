import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { fetchJobById } from '../../store/joblistings';
import './JobListingDetails.css'


const JobListingDetails = ({ jobId: propJobId, embedded = false}) => {
    const dispatch = useDispatch();
    const params = useParams();
    const jobId = propJobId || params.jobId;
    const containerClass = embedded ? 'job-details-embedded' : 'job-details-standalone';
    // const jobs = useSelector(state => state.jobs.jobs);
    // const job = jobs?.[jobId];
    const job = useSelector(state => state.jobs?.[jobId]);

    useEffect(() => {
        if (!job && jobId) {
        dispatch(fetchJobById(jobId));
        }
    }, [dispatch, job, jobId]);

    if (!job) return (
    <div>
        {/* <p>Select a job to see details.</p> */}
    </div>
    );

    const handleWatchlistAdd = () => {
        console.log('clicked')
    }


  return (
  <>
    {/* <div><h3>JobListingDetails</h3></div> */}
    <div className={containerClass}>
        <div className='details-header-content'>
            <div>
                <div className="job-details-top-section">
                <div className='job-details-title'><span><h1>{job.title}</h1></span></div>
                <button className="add-to-watchlist" onClick={handleWatchlistAdd}>add to watchlist</button>
                </div>
                <div className='job-details-company'><span> {job.Company?.name}</span></div>
                <div className='job-details-location'><span>{job?.city}, {job?.state}</span></div>
                {/* <div><span><b>State:</b> </span></div> */}
                {/* <div><span><b>Website:</b> {job.Company?.website}</span></div> */}

                <NavLink to={`/jobs/${job.id}/apply`}>
                    <button 
                        className="job-apply-button" 
                        // onClick={console.log('clicked')}
                    >Apply
                    </button>
                </NavLink>
            </div>
         </div>   
        
            <center><hr className='job-detail-header-hr'/></center>

        <div>
            <div className='job-details-description-header'><b>Full job description</b> </div>
        {/* {job.description} */}
            <div className='job-details-description' dangerouslySetInnerHTML={{ __html: job.description }} />
        {/* </div> */}
            {/* <div><b>city:</b> {job.city}</div>
            <div><b>state:</b> {job.state}</div> */}
        </div>

    </div>

  </>
  )
}

export default JobListingDetails