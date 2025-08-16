import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JobListingsResults from '../JobListingsResults';
import JobListingDetails from '../JobListingDetails';
import { fetchJobs } from '../../store/joblistings';
import './Home.css';


const Home = () => {
    const [searchQuery, setSearchQuery] = useState();
    const dispatch = useDispatch();
    const jobsState = useSelector(state => state.jobs);


    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(fetchJobs(searchQuery));

    };

    const checkState = () => {console.log('jobsState', jobsState)}

  return (<>
    <h1>Welcome!</h1>
    <div>
        <input 
            placeholder='search...'
            type="text" 
            value={searchQuery}
            className='search-field'
            onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button 
            className="search"
            onClick={handleSearch}
        >Search</button>
    </div>
    
    <div>
        <NavLink to='/jobs/new'>create a job listing!</NavLink>
    </div>

    <div>
        <JobListingsResults />
    </div>
    <div>
        <JobListingDetails />
    </div>
    <div>
        <button onClick={checkState}>check state</button>
    </div>

</>
  )
}

export default Home