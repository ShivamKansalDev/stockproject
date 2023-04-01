import { CHANNEL_DETAILS, ADD_REMOVE_USERS } from "../../ActionType/Channel"

export default (state = {}, action) => {
    switch (action.type) {
        case CHANNEL_DETAILS:
            return action.payload;
        case ADD_REMOVE_USERS:
            return action.payload
        default:
            return state;
    }
};