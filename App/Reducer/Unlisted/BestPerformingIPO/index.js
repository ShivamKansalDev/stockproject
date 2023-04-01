
import { BEST_PERFORMING_IPO } from "../../../ActionType/Unlisted";


  const initialState = {
    BestPerformingIPO: [],
  
  };
  export default (state = initialState, action) => {
    switch (action.type) {
      case BEST_PERFORMING_IPO:
          //  console.log(action.data);
        return {
          ...state,
          BestPerformingIPO:action.data
        };
     
  
      default:
        return state;
    }
  };
  