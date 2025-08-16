import { useSelector } from 'react-redux'
// import jobsReducer from '../../store/joblistings'
import './JobListingsResults.css'

const JobListingsResults = () => {
    const jobs = useSelector(state => state.jobs.jobs);
    
  return (
  <>
    <div>JobListingsResults</div>
    <div>
      {jobs ? (
        Object.values(jobs).map(job => (
          <div key={job.id}>{job.title}</div>
        ))
      ) : (
        <p>No Jobs Found</p>
      )}
    </div>
  </>
);
}

export default JobListingsResults