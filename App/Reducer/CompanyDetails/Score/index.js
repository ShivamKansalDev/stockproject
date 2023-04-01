import {
    COMPANY_DETAILS_SCORE
} from "../../../ActionType/CompanyDetails";


const initialState = {
    Score: [],

};
export default (state = initialState, action) => {
    switch (action.type) {
        case COMPANY_DETAILS_SCORE:
            // console.log("@#$#$$$ SCORE KB: ", action.data);
            return {
                ...state,
                Score: action.data
            };


        default:
            return state;
    }
};
