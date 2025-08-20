import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
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


  return (
  <>
    {/* <div><h3>JobListingDetails</h3></div> */}
    <div className={containerClass}>
        <div className='details-header-content'>
            <div>
            <div><span><b>title:</b> {job.title}</span></div>
            <div><span><b>Company:</b> {job.Company?.name}</span></div>
            <div><span><b>City:</b> {job.Company?.city}</span></div>
            <div><span><b>State:</b> {job.Company?.state}</span></div>
            <div><span><b>Website:</b> {job.Company?.website}</span></div>
            <button className="job-apply-button" onClick={console.log('clicked')}>apply</button>
            </div>
         </div>   
        
            <hr />

        <div>
            <div><b>description:</b> </div>
        {/* {job.description} */}
            <div dangerouslySetInnerHTML={{ __html: job.description }} />
        {/* </div> */}
            <div><b>city:</b> {job.city}</div>
            <div><b>state:</b> {job.state}</div>
        </div>

    </div>

  </>
  )
}

export default JobListingDetails