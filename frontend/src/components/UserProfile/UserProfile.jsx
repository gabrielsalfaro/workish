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
      <div className='profile-header'><h1>UserProfile</h1></div>

      <div className="profile-card">
        <div className="profile-avatar">
          {user.profileImg ? (
          <img src={user.profileImg} alt={`${user.firstName} ${user.lastName}`} />
            ) : (
            `${user.firstName?.[0]}${user.lastName?.[0]}`
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
          <div>
              <h2>Employment History</h2>
              {user?.JobHistories?.map((job) => (
                  <div key={job.id}>
                    <p>{job.employer} - {job.city}, {job.state}, {formatDate(job.startDate)} - {formatDate(job.endDate)}</p>
                  </div>
              ))}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default UserProfile