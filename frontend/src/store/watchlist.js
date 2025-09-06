const LOAD_MY_WATCHLIST = 'watchlist/LOAD_MY_WATCHLIST';
// const DELETE_WATCHLIST_ITEM = 'watchlist/DELETE_WATCHLIST_ITEM';

const initialState = {};

const loadWatchlist = (items) => ({
  type: LOAD_MY_WATCHLIST,
  items,
});


export const fetchWatchlist = () => async (dispatch) => {
  const res = await fetch('/api/watchlist');
  if (res.ok) {
    const data = await res.json();
    dispatch(loadWatchlist(data));
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
    //   return newState;

    default:
      return state;
  }
}


export default watchlistReducer;