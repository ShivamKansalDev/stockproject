import { WEEK_HEIG_52 } from "../../../ActionType/ListedCompanyList";


  const initialState = {
    WeekHigh52: [],
  
  };
  export default (state = initialState, action) => {
    switch (action.type) {
      case WEEK_HEIG_52:
          //  console.log(action.data);
        return {
          ...state,
          WeekHigh52:action.data
        };
     
  
      default:
        return state;
    }
  };
  