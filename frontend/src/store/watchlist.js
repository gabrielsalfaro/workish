import { csrfFetch } from "./csrf";

const LOAD_MY_WATCHLIST = 'watchlist/LOAD_MY_WATCHLIST';
const DELETE_WATCHLIST_ITEM = 'watchlist/DELETE_WATCHLIST_ITEM';
const ADD_WATCHLIST_ITEM = 'watchlist/ADD_WATCHLIST_ITEM';


const initialState = {};

const loadWatchlist = (items) => ({
  type: LOAD_MY_WATCHLIST,
  items,
});

const addWatchlistItem = (item) => ({
    type: ADD_WATCHLIST_ITEM,
    item
})

const deleteWatchlistItem = (id) => ({
  type: DELETE_WATCHLIST_ITEM,
  id,
});

// GET Watchlislt Items
export const fetchWatchlist = () => async (dispatch) => {
  const res = await fetch('/api/watchlist');
  if (res.ok) {
    const data = await res.json();
    // console.log('Fetched watchlist:', data);
    dispatch(loadWatchlist(data));
  }
};

// POST Watchlist Items
export const postWatchlistItem = (jobListingId) => async (dispatch) => {
    // const res = await csrfFetch('/api/watchlist/:jobListingId')
    const res = await csrfFetch(`/api/watchlist/${jobListingId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ jobListingId })

    })

    if (res.ok) {
        const data = await res.json();
        // console.log(data)
        dispatch(addWatchlistItem(data))
        return data;
    } else {
        console.error('Failed to create watchlist item')
    }

}

// DELETE Watchlist Item
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
    case ADD_WATCHLIST_ITEM: {
    return {
        ...state,
        [action.item.id]: action.item
    };
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