import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { addJobHistory } from '../../store/users';
// import { useSelector } from 'react-redux';
import { fetchUser } from '../../store/users';
import './JobHistoryAddModal.css';
// import { useNavigate } from 'react-router-dom';

const JobHistoryAddModal = ({ onSuccess }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    // const navigate = useNavigate();

    const [jobTitle, setJobTitle] = useState('');
    const [employer, setEmployer] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
//   const [errors, setErrors] = useState({});
    // const sessionUser = useSelector(state => state.session.user);
    // const userId = sessionUser?.id;

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
            setTimeout(() => {
                // navigate(`/users/${userId}`);
            dispatch(fetchUser)
            }, 100);
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
              Add Job History
            </button>
          </center>
        </form>
      </div>
    </div>
  );
};

export default JobHistoryAddModal;
