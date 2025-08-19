import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchJobById } from '../../store/joblistings';
import './JobListingDetails.css'


const JobListingDetails = ({ jobId: propJobId }) => {
    const dispatch = useDispatch();
    const params = useParams();
    const jobId = propJobId || params.jobId;
    
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
    <div className="details-container">
        <div><b>title:</b> {job.title}</div>
        <div><b>Company:</b> {job.Company?.name}</div>
        <div><b>City:</b> {job.Company?.city}</div>
        <div><b>State:</b> {job.Company?.state}</div>
        <div><b>Website:</b> {job.Company?.website}</div>
        <div><b>description:</b> 
        {/* {job.description} */}
        <div dangerouslySetInnerHTML={{ __html: job.description }} />
        </div>
        <div><b>city:</b> {job.city}</div>
        <div><b>state:</b> {job.state}</div>
    </div>

  </>
  )
}

export default JobListingDetails