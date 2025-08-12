import './JobListingsCreate.css';
import ReactQuill from 'react-quill';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';

const JobListingsCreate = () => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Job description HTML:', description);
  };

  return (
    <div className="job-listing-form">
      <h2>Create a Job Listing</h2>

      <form onSubmit={handleSubmit}>
        <ReactQuill
          value={description}
          onChange={setDescription}
          className="quill"
          theme="snow"
        />

        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default JobListingsCreate;
