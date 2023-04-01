
import { LISTED_CHART_BSE } from "../../ActionType/ListedLineChart";


const initialState = {
    BseChart: [],

};
export default (state = initialState, action) => {
    switch (action.type) {
        case LISTED_CHART_BSE:
            //  console.log(action.data);
            return {
                ...state,
                BseChart: action.data.slice(0, 15)
            };


        default:
            return state;
    }
};
