import { OUT_UNDER_PERFORMERS } from "../../../ActionType/ListedCompanyList";


  const initialState = {
    OutUnderPerform: [],
  
  };
  export default (state = initialState, action) => {
    switch (action.type) {
      case OUT_UNDER_PERFORMERS:
          //  console.log(action.data);
        return {
          ...state,
          OutUnderPerform:action.data
        };
     
  
      default:
        return state;
    }
  };
  