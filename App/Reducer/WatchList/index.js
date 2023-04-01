import { SELECTED_WATCHLIST } from "../../ActionType/WatchList"

export default (state = {}, action) => {
    switch (action.type) {
        case SELECTED_WATCHLIST:
            return action.payload;
        default:
            return state;
    }
};