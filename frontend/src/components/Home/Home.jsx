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
    const [locationQuery, setLocationQuery] = useState('');
    const dispatch = useDispatch();
    // const jobsState = useSelector(state => state.jobs);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Reset search when Home is clicked
        setSearchQuery('');
        setSelectedJobId(null);
        setHasSearched(false);
        dispatch(clearJobs());
    }, [location.key, dispatch]);

    // useEffect(() => {
    //   dispatch(fetchJobs('Developer', { city: 'San Francisco', state: 'CA', companyName: 'Biz' }));
    // Search only by companyName:
    // }, [dispatch]);




    const handleSearch = (e) => {
        e.preventDefault();

        const [city, state] = locationQuery.split(',').map(string => string.trim());
        setHasSearched(true);
        dispatch(fetchJobs(searchQuery, {city: city, state: state, companyName: searchQuery}));
        // dispatch(fetchJobs(searchQuery, { city, state }));
        // dispatch(fetchJobs('', { companyName: searchQuery }));

    };

    // const checkState = () => {console.log('jobsState', jobsState)}

  return (<>
    {/* <h1>Welcome!</h1> */}
    <div className="search-container">
        <form className='search-form' onSubmit={handleSearch}>
            <input 
                placeholder='Job title, keywords, or company'
                type="text" 
                value={searchQuery}
                className='search-field-keyword'
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <input 
                placeholder='City, state, or "remote"'
                type="text" 
                value={locationQuery}
                className='search-field-location'
                onChange={(e) => setLocationQuery(e.target.value)}
            />
            <button 
                className="search-button"
                // onClick={handleSearch}
            >Search</button>
        </form>
    </div>
    
    
    <div>
        {/* <NavLink to='/jobs/new'>create a job listing!</NavLink> */}
    </div>

    <div className="home-job-listings-container">
        <div>
            <JobListingsResults 
                onSelectJob={setSelectedJobId} 
                hasSearched={hasSearched}
                className='home-job-listing-results'
            />
        </div>
        {/* <div className="spacer"></div> */}
        <div>
            <JobListingDetails jobId={selectedJobId} />
        </div>
    </div>

    <div>
        {/* <button onClick={checkState} style={{padding: '10px'}}>check state</button> */}
    </div>

</>
  )
}

export default Home