import { csrfFetch } from "./csrf";

const LOAD_MY_WATCHLIST = 'watchlist/LOAD_MY_WATCHLIST';
const DELETE_WATCHLIST_ITEM = 'watchlist/DELETE_WATCHLIST_ITEM';

const initialState = {};

const loadWatchlist = (items) => ({
  type: LOAD_MY_WATCHLIST,
  items,
});

const deleteWatchlistItem = (id) => ({
  type: DELETE_WATCHLIST_ITEM,
  id,
});

export const fetchWatchlist = () => async (dispatch) => {
  const res = await fetch('/api/watchlist');
  if (res.ok) {
    const data = await res.json();
    // console.log('Fetched watchlist:', data);
    dispatch(loadWatchlist(data));
  }
};

export const removeWatchlistItem = (watchlistId) => async (dispatch) => {
  const res = await csrfFetch(`/api/watchlist/${watchlistId}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    dispatch(deleteWatchlistItem(watchlistId));
  } else {
    console.error('Failed to delete watchlist item');
  }
};



const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MY_WATCHLIST: {
      const newState = {};
      action.items.forEach(item => {
        newState[item.id] = item;
      });
      return newState;
    }

    case DELETE_WATCHLIST_ITEM: {
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    }

    default:
      return state;
  }
}


export default watchlistReducer;