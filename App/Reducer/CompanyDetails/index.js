import { COMPANY_DETAILS_FOR_HOME } from "../../ActionType/CompanyDetails";


const initialState = {
    CompanyDetails: [],

};
export default (state = initialState, action) => {
    switch (action.type) {
        case COMPANY_DETAILS_FOR_HOME:
            //   console.log(action.payload.data);
            return {
                ...state,
                CompanyDetails: action.data
            };


        default:
            return state;
    }
};
