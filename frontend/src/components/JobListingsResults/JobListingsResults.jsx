import { useSelector } from 'react-redux'
// import jobsReducer from '../../store/joblistings'
import './JobListingsResults.css'

const JobListingsResults = ({ onSelectJob, hasSearched }) => {
    const jobs = useSelector(state => state.jobs.jobs);
    // const joblistings = await Job
    console.log('Jobs from Redux:', jobs);


    
  return (
  <>
    {/* <div><h3>JobListingsResults</h3></div> */}
    <div className="job-result-container">
      {Object.values(jobs || {}).length > 0 ? (
        Object.values(jobs).map(job => (
          <div key={job.id} className="job-result-content">
            <div onClick={() => onSelectJob(job.id)} >
                <b>{job.title} </b>
                    {job.Company?.name && (
                <div className="job-company-name">
                  {job.Company.name}
                </div>
              )}
                <div>
                    {job.city}, {job.state}
                </div>
            
            </div>
          </div>
        ))
      ) : (
        hasSearched && <p>No Jobs Found</p>
      )}
    </div>
  </>
);
}

export default JobListingsResults