import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import './UserProfile.css'
import JobHistoryAddModal from '../JobHistoryAddModal/JobHistoryAddModal';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import { fetchUser } from '../../store/users';


const UserProfile = () => {
  const { userId } = useParams();
  // const currentUser = useSelector((state) => state.session.user);
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();


  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    };
    fetchUser();
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [userId]);

  if (!user) return <div className="loading">Loading...</div>;

  const formatDate = (isoDate) => {
      if (!isoDate) return '';
      const date = new Date(isoDate);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const closeMenu = () => setShowMenu(false);

  // const isOwner = currentUser?.id === user.id;

  return (
    <>
    <div className="profile-container">
      <div className="profile-content" onClick={toggleMenu}>
        <div className="profile-header">
          <h1>User Profile</h1>
        </div>

        <div className="profile-card">
          <div className="profile-avatar">
            {user?.profileImg ? (
              <img
                src={user.profileImg}
                alt={`${user.firstName} ${user.lastName}`}
              />
            ) : (
              <div className="avatar-placeholder">
                {`${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`}
              </div>
            )}
          </div>

          <div className="profile-info">
            <h2>
              {user.firstName} {user.lastName}
            </h2>
            <div className="info-box">
              <p>
                <span>Username:</span> {user.username}
              </p>
              <p>
                <span>Email:</span> {user.email}
              </p>
              <p>
                <span>Title:</span> {user.jobTitle}
              </p>
              <p>
                <span>Summary:</span> {user.summary}
              </p>
            </div>

            <div className="employment-history">
              <div className="employment-history-top-section">
                <h2 className="section-title">Employment History</h2>
                <div className="add-job-history">
                  {/* <button>Add Job History</button> */}
                <OpenModalButton
                  buttonText="Add Job History"
                  className={'add-job-history-button'}
                  onItemClick={closeMenu}
                  modalComponent={<JobHistoryAddModal onSuccess={fetchUser}/>}
                />
                </div>
              </div>

            {user?.JobHistories?.length > 0 ? (
              <ul className="employment-list">
                {user.JobHistories.map((job) => (
                  
                  <li key={job.id} className="employment-entry">
                    <div className="employment-row">
                      <div className="employment-header">
                        <span className="employment-title"><b>{job.jobTitle}</b></span>
                        <span className="employment-dates">
                          ({formatDate(job.startDate)} - {formatDate(job.endDate)})
                        </span>
                      </div>
                      <div className="employment-details">
                        <div>{job.employer} </div>
                        <div>{job.city}, {job.state}</div>
                        <div className="employment-entry-actions">
                          {/* edit button
                          delete button */}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-history">No employment history available.</p>
            )}
            </div>

          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default UserProfile