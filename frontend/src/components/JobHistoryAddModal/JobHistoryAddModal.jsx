import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { addJobHistory } from '../../store/users';
import './JobHistoryAddModal.css';

const JobHistoryAddModal = ({ onSuccess }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [jobTitle, setJobTitle] = useState('');
    const [employer, setEmployer] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
//   const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setErrors({});

        const newJob = {
            jobTitle,
            employer,
            city,
            state,
            startDate,
            endDate
        };

        try {
            await dispatch(addJobHistory(newJob));
            closeModal();
            // dispatch(fetchUser)
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error('error', error)
        }
    };


  return (
    <div className="modal-container" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h1 className="modal-title">Add Job History</h1>
        <form onSubmit={handleSubmit} className="job-history-form">
          <label>
            Job Title
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
          </label>

          <label>
            Employer
            <input
              type="text"
              value={employer}
              onChange={(e) => setEmployer(e.target.value)}
              required
            />
          </label>

          <label>
            City
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </label>

          <label>
            State
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </label>

          <label>
            Start Date
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </label>

          <label>
            End Date
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>


          <center>
            <button type="submit" className="submit-button">
              Add Job History
            </button>
          </center>
        </form>
      </div>
    </div>
  );
};

export default JobHistoryAddModal;
