// import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import JobListingsResults from '../JobListingsResults';
import JobListingDetails from '../JobListingDetails';
import { fetchJobs, clearJobs } from '../../store/joblistings';
import './Home.css';


const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();
    // const jobsState = useSelector(state => state.jobs);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
const location = useLocation();

  useEffect(() => {
    // Reset search when Home is visited
    setSearchQuery('');
    setSelectedJobId(null);
    setHasSearched(false);
    dispatch(clearJobs());
  }, [location.key, dispatch]);

    const handleSearch = (e) => {
        e.preventDefault();
        setHasSearched(true);
        dispatch(fetchJobs(searchQuery));

    };

    // const checkState = () => {console.log('jobsState', jobsState)}

  return (<>
    {/* <h1>Welcome!</h1> */}
    <form className='search-container' onSubmit={handleSearch}>
        <input 
            placeholder='search...'
            type="text" 
            value={searchQuery}
            className='search-field'
            onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button 
            className="search"
            // onClick={handleSearch}
        >Search</button>
    </form>
    
    <div>
        {/* <NavLink to='/jobs/new'>create a job listing!</NavLink> */}
    </div>

    <div>
        <JobListingsResults 
            onSelectJob={setSelectedJobId} 
            hasSearched={hasSearched}
        />
    </div>
    <div>
        <JobListingDetails jobId={selectedJobId} />
    </div>
    <div>
        {/* <button onClick={checkState} style={{padding: '10px'}}>check state</button> */}
    </div>

</>
  )
}

export default Home