import { NavLink } from 'react-router-dom';
import './Home.css';
import { useState } from 'react';
import JobListingsResults from '../JobListingsResults/JobListingsResults';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState();
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
            // onSubmit={}
        >Search</button>
    </div>
    
    <div>
        <NavLink to='/jobs/new'>create a job listing!</NavLink>
    </div>

    <div>
        <JobListingsResults />
    </div>

</>
  )
}

export default Home