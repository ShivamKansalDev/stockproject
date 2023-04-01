import { CHANNEL_DETAILS, ADD_REMOVE_USERS } from '../../ActionType/Channel';

export const setChannelDetails = (item) => {
    //console.log("*****ACTION: ", item)
    return {
        type: CHANNEL_DETAILS,
        payload: item
    };
};

export const addRemoveDetails = (item) => {
    //console.log("*****ACTION: ", item)
    return {
        type: ADD_REMOVE_USERS,
        payload: item
    };
};