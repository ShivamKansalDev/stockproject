import { GET_USER, SET_USER, REMOVE_USER } from "../../ActionType/User";


const initialState = {
    User: null,
    loading: true,
    isAuthenticated: false,
    authToken: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,

            };
        case SET_USER:
            return {
                ...state,
                User: action.payload.data,
                isAuthenticated: true,
                authToken: action.payload.token

            };
        case REMOVE_USER:
            return {
                ...state,
                User: null,
                isAuthenticated: false,
                authToken: null

            };


        default:
            return state;
    }
};
