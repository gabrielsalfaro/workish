import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { editJobHistory, fetchUser } from '../../store/users';
import './JobHistoryEditModal.css';

const JobHistoryEditModal = ({ job, onSuccess }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const userId = job?.userId;

  const [jobTitle, setJobTitle] = useState(job?.jobTitle || '');
  const [employer, setEmployer] = useState(job?.employer || '');
  const [city, setCity] = useState(job?.city || '');
  const [state, setState] = useState(job?.state || '');
  const formatDate = (isoString) => isoString ? isoString.split('T')[0] : '';
  const [startDate, setStartDate] = useState(formatDate(job?.startDate));
  const [endDate, setEndDate] = useState(formatDate(job?.endDate));


  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedJob = {
      jobTitle,
      employer,
      city,
      state,
      startDate,
      endDate
    };

    try {
      await dispatch(editJobHistory(job.id, updatedJob));
      await dispatch(fetchUser(userId));
      closeModal();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('error', error);
    }
  };

  return (
    <div className="modal-container" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h1 className="modal-title">Edit Job History</h1>
        <form onSubmit={handleSubmit} className="job-history-form">

          <label>
            <b>Job Title</b>
            <input 
                type="text" 
                value={jobTitle} 
                onChange={(e) => setJobTitle(e.target.value)} 
                required 
            />
          </label>
          <label>
            <b>Employer</b>
            <input 
                type="text" 
                value={employer} 
                onChange={(e) => setEmployer(e.target.value)} 
                required 
            />
          </label>
          <label>
            <b>City</b>
            <input 
                type="text" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                required 
            />
          </label>
          <label>
            <b>State</b>
            <input 
                type="text" 
                value={state} 
                onChange={(e) => setState(e.target.value)} 
                required 
            />
          </label>
          <label>
            <b>Start Date</b>
            <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
                required 
            />
          </label>
          <label>
            <b>End Date</b>
            <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
            />
          </label>

          <center>
            <button type="submit" className="submit-button">
              Save Changes
            </button>
          </center>
          
        </form>
      </div>
    </div>
  );
};

export default JobHistoryEditModal