import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import './UserProfile.css'

const UserProfile = () => {
  const { userId } = useParams();
//   const sessionUser = useSelector((state) => state.session.user);
  const [user, setUser] = useState(null);

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

  if (!user) return <div className="loading">Loading...</div>;

  const formatDate = (isoDate) => {
      if (!isoDate) return '';
      const date = new Date(isoDate);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <>
    <div className="profile-container">
      <div className="profile-content">
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
            </div>

            <div className="employment-history">
              <div className="employment-history-top-section">
                <h2 className="section-title">Employment History</h2>
                <div className="add-job-history">
                  <button>Add Job History</button>
                </div>
              </div>

              {user?.JobHistories?.length > 0 ? (
                <ul className="employment-list">
                  {user.JobHistories.map((job) => (
                    
                    <li key={job.id} className="employment-entry">
                      <div className="employment-row">
                        <div className="employment-header">
                          <span className="employment-title">{job.jobTitle}</span>
                          <span className="employment-dates">
                            ({formatDate(job.startDate)} - {formatDate(job.endDate)})
                          </span>
                        </div>
                        <div className="employment-details">
                          {job.employer} — {job.city}, {job.state}
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