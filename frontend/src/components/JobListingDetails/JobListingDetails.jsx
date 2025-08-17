import { useSelector } from 'react-redux'
import './JobListingDetails.css'


const JobListingDetails = ({ jobId }) => {
    const jobs = useSelector(state => state.jobs.jobs);
    const job = jobs?.[jobId];

    if (!job) return <div>Select a job to see details.</div>;


  return (
  <>
    <div>JobListingDetails</div>
    <div className="details-container">
        <div>title: {job.title}</div>
        <div>description: {job.description}</div>
        <div>city: {job.city}</div>
        <div>state: {job.state}</div>
    </div>

  </>
  )
}

export default JobListingDetails