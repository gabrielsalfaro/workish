import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import JobListingsResults from '../JobListingsResults';
import JobListingDetails from '../JobListingDetails';
import { fetchJobs } from '../../store/joblistings';
import './Home.css';


const Home = () => {
    const [searchQuery, setSearchQuery] = useState();
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(fetchJobs(searchQuery));
    };

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
            onSubmit={handleSearch}
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

</>
  )
}

export default Home