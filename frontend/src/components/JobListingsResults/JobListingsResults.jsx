import { useSelector } from 'react-redux'
// import jobsReducer from '../../store/joblistings'
import './JobListingsResults.css'

const JobListingsResults = ({ onSelectJob, hasSearched }) => {
    const jobs = useSelector(state => state.jobs.jobs);

    
  return (
  <>
    {/* <div><h3>JobListingsResults</h3></div> */}
    <div>
      {Object.values(jobs || {}).length > 0 ? (
        Object.values(jobs).map(job => (
          <div key={job.id} onClick={() => onSelectJob(job.id)} >{job.title}</div>
        ))
      ) : (
        hasSearched && <p>No Jobs Found</p>
      )}
    </div>
  </>
);
}

export default JobListingsResults