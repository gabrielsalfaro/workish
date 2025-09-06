import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWatchlist } from '../../store/watchlist';
import './Watchlist.css'

const Watchlist = () => {
  const dispatch = useDispatch();
  const rawWatchlist = useSelector((state) => state.watchlist || {});

  //memo
  const watchlistItems = useMemo(() => Object.values(rawWatchlist), [rawWatchlist]);

  useEffect(() => {
    dispatch(fetchWatchlist());
  }, [dispatch]);

  const handleDelete = () => {
    console.log('clicked')
  };

  return (
    <div className="watchlist-container">
      <h2>Your Watchlist</h2>

      <ul className="watchlist-list">
        {watchlistItems.map((item) => (
          <li key={item.id} className="watchlist-item">
            <div className="job-info">
              <h3>{item.JobListing?.title}</h3>
              <p>{item.JobListing?.Company?.name}</p>
              <p>{item.JobListing?.city}, {item.JobListing?.state}</p>
            </div>

            {/* change to modal */}
            <button onClick={() => handleDelete()}>delete</button>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default Watchlist