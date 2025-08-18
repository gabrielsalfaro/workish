import { useSelector } from 'react-redux'
import './JobListingDetails.css'


const JobListingDetails = ({ jobId }) => {
    const jobs = useSelector(state => state.jobs.jobs);
    const job = jobs?.[jobId];

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