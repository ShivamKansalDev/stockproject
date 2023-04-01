import { SELECTED_WATCHLIST } from '../../ActionType/WatchList';

export const selectedWatchlist = (item) => {
    //console.log("*****ACTION: ", item)
    return {
        type: SELECTED_WATCHLIST,
        payload: item
    };
};