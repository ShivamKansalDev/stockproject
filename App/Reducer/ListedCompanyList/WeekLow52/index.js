import { WEEK_LOW_52 } from "../../../ActionType/ListedCompanyList";


  const initialState = {
    WeekLow52: [],
  
  };
  export default (state = initialState, action) => {
    switch (action.type) {
      case WEEK_LOW_52:
          //  console.log(action.data);
        return {
          ...state,
          WeekLow52:action.data
        };
     
  
      default:
        return state;
    }
  };
  