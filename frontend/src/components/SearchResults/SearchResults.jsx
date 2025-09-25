import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams, useNavigate } from 'react-router-dom';
import JobListingDetails from '../JobListingDetails'
import JobListingsResults from '../JobListingsResults'
import { fetchJobs } from '../../store/joblistings';
import './SearchResults.css'

const SearchResults = () => {
    const [selectedJobId, setSelectedJobId] = useState(null);
    // const [hasSearched, setHasSearched] = useState(false);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
    const [locationQuery, setLocationQuery] = useState('');
    const inputRef = useRef(null);

  useEffect(() => {
    const keyword = searchParams.get('keyword') || '';
    const city = searchParams.get('city') || '';
    const state = searchParams.get('state') || '';

    dispatch(fetchJobs(keyword, { city, state, companyName: keyword }));

    // setHasSearched(false);
    setSearchQuery(keyword);
    setLocationQuery([city, state].filter(Boolean).join(', '));
  }, [dispatch, searchParams]);

    const handleSearch = (e) => {
        e.preventDefault();

        const params = new URLSearchParams();

        if (searchQuery) params.set('keyword', searchQuery);

        if (locationQuery.trim()) {
            const [cityRaw = '', stateRaw = ''] = locationQuery.split(',').map(s => s.trim());
            if (cityRaw) params.set('city', cityRaw);
            if (stateRaw) params.set('state', stateRaw.toUpperCase());
        }

        navigate(`/search?${params.toString()}`);
    };


  return (
    <>
    <div className="search-results-container">
        <div className="search-container">
            <form className='search-form' onSubmit={handleSearch}>
                <input 
                    placeholder='Job title, keywords, or company'
                    type="text" 
                    value={searchQuery} 
                    ref={inputRef} 
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
        
        <div className="job-results-layout">
            <div>
                <JobListingsResults 
                onSelectJob={setSelectedJobId} 
                // hasSearched={hasSearched}
                className='home-job-listing-results'
                />
            </div>
            <div className='home-job-listing-details'>
                <JobListingDetails jobId={selectedJobId} embedded={true} />
            </div>
        </div>
    </div>
    </>
  );
}

export default SearchResults